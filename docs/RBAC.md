# LEGALX role-based access control

LEGALX uses one shared agreement lifecycle with a centralized, deny-by-default policy. The browser consumes `src/rbac.ts` for navigation, route guards, role-aware dashboards, and field masking. The server-side policy mirror lives in `server/authorization.ts`; real API handlers must call it before reading or mutating any agreement, document, financial record, evidence item, or workspace setting.

## Roles and boundaries

| Role | Can do | Must not do by default |
| --- | --- | --- |
| Agreement Owner | Create/edit agreements, fund supported escrow, approve milestones, export permitted trust evidence | Bypass failed parity or erase verification evidence |
| Freelancer / Contractor | View assigned agreements, suggest changes, submit deliverables, see permitted payment status | Change approved client terms or release escrow |
| Legal Reviewer | Review clauses, comment, suggest revisions, approve legal review, inspect Contract IR | Treat legal approval as technical parity approval or manage billing |
| Organization Admin | Manage members, roles, workspace settings, activity, and integrations | Approve legal terms, alter verification records, or execute blockchain payments by default |
| Technical Auditor | Read approved versions, hashes, Contract IR, parity, versions, chain references, and audit logs | Edit agreements, change verification results, or access unrelated workspace data |

A user can hold multiple roles, but each role is scoped to a workspace. The demo role switcher changes the active identity only among seeded Acme Digital identities and recalculates the permitted navigation and dashboard data.

## Frontend enforcement

The shell uses `canAccessRoute` before rendering protected content. A denied route renders a 403-style state and does not mount the underlying page component. Navigation is filtered from the same role policy. Financial widgets are masked for roles without `escrow:view_financials`; this is presentation defense-in-depth, not the security boundary.

## API enforcement

Every handler must derive the authenticated user and workspace from the server session, never from a client-provided role or workspace ID. It must load the resource’s workspace membership, call `requirePermission` or `authorizeAgreementRead`, and apply the same workspace predicate to the database query. Return a generic 403 response without leaking resource existence across workspaces.

```ts
const context = await sessionContext(request)
const agreement = await db.agreements.findById(params.id)
authorizeAgreementRead(context, agreement)
return db.documents.findFirst({ where: { agreementId: params.id, workspaceId: context.workspaceId } })
```

## Database enforcement

Enable RLS on every tenant-owned table. The application role must never use a client-supplied workspace filter as its only protection.

```sql
alter table agreements enable row level security;
create policy agreement_workspace_member_read on agreements
for select using (
  exists (
    select 1 from memberships m
    where m.workspace_id = agreements.workspace_id
      and m.user_id = auth.uid()
      and m.status = 'active'
  )
);

create policy agreement_owner_or_editor_write on agreements
for update using (
  exists (
    select 1 from memberships m
    where m.workspace_id = agreements.workspace_id
      and m.user_id = auth.uid()
      and m.role in ('owner', 'agreement_owner')
      and m.status = 'active'
  )
) with check (workspace_id = (select current_setting('request.workspace_id')::uuid));
```

Verification runs and audit evidence should be append-only. Organization admins can manage memberships but do not receive legal approval or escrow permissions implicitly. Service-role jobs are server-only and must still enforce resource ownership in code.

## Demo accounts

The UI seeds these accounts without passwords or production credentials: `owner@legalx.demo`, `freelancer@legalx.demo`, `lawyer@legalx.demo`, `admin@legalx.demo`, and `auditor@legalx.demo`. Demo login is local-only and labeled as simulation.

## Unauthorized test cases

The required negative cases are covered by `scripts/test-rbac.mjs`: freelancer access to AI creation and escrow funding; admin access to parity or financial transactions; auditor access to editing or funding; and cross-workspace resource access at the server policy boundary. A passing test means the request is denied, not merely hidden from the sidebar.
