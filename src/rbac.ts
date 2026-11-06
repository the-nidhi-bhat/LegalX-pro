export type Role = 'owner' | 'freelancer' | 'legal_reviewer' | 'org_admin' | 'technical_auditor'
export type Permission = 'agreement:create' | 'agreement:view' | 'agreement:edit' | 'agreement:suggest' | 'agreement:approve_legal' | 'agreement:approve_parity' | 'escrow:fund' | 'escrow:view_financials' | 'milestone:submit' | 'milestone:approve' | 'workspace:manage' | 'workspace:view_activity' | 'audit:view' | 'trust:export'
export type WorkspaceId = 'acme-digital' | 'lexora-studio'

export type DemoAccount = { email: string; name: string; role: Role; workspaceId: WorkspaceId; workspaceName: string; initials: string }

export const ROLE_LABELS: Record<Role, string> = {
  owner: 'Agreement Owner',
  freelancer: 'Freelancer / Contractor',
  legal_reviewer: 'Legal Reviewer',
  org_admin: 'Organization Admin',
  technical_auditor: 'Technical Auditor',
}

export const ROLE_DESCRIPTIONS: Record<Role, string> = {
  owner: 'Creates agreements, funds supported escrow, approves milestones, and owns the client workflow.',
  freelancer: 'Accepts assigned agreements, submits deliverables, and tracks permitted payments.',
  legal_reviewer: 'Reviews clauses, flags ambiguity, suggests revisions, and records legal review evidence.',
  org_admin: 'Manages workspace membership, roles, integrations, and security without legal or payment authority by default.',
  technical_auditor: 'Inspects Contract IR, parity evidence, hashes, versions, and chain references without edit access.',
}

export const DEMO_ACCOUNTS: DemoAccount[] = [
  { email: 'owner@legalx.demo', name: 'Nirvan Shah', role: 'owner', workspaceId: 'acme-digital', workspaceName: 'Acme Digital', initials: 'NS' },
  { email: 'freelancer@legalx.demo', name: 'Alex Freelancer', role: 'freelancer', workspaceId: 'acme-digital', workspaceName: 'Acme Digital', initials: 'AF' },
  { email: 'lawyer@legalx.demo', name: 'Rhea Shah', role: 'legal_reviewer', workspaceId: 'acme-digital', workspaceName: 'Acme Digital', initials: 'RS' },
  { email: 'admin@legalx.demo', name: 'Maya Rao', role: 'org_admin', workspaceId: 'acme-digital', workspaceName: 'Acme Digital', initials: 'MR' },
  { email: 'auditor@legalx.demo', name: 'Karan Mehta', role: 'technical_auditor', workspaceId: 'acme-digital', workspaceName: 'Acme Digital', initials: 'KM' },
]

const ROLE_PERMISSIONS: Record<Role, readonly Permission[]> = {
  owner: ['agreement:create', 'agreement:view', 'agreement:edit', 'agreement:suggest', 'escrow:fund', 'escrow:view_financials', 'milestone:submit', 'milestone:approve', 'workspace:view_activity', 'trust:export'],
  freelancer: ['agreement:view', 'agreement:suggest', 'escrow:view_financials', 'milestone:submit', 'trust:export'],
  legal_reviewer: ['agreement:view', 'agreement:suggest', 'agreement:approve_legal', 'workspace:view_activity', 'trust:export', 'audit:view'],
  org_admin: ['agreement:view', 'workspace:manage', 'workspace:view_activity'],
  technical_auditor: ['agreement:view', 'workspace:view_activity', 'audit:view', 'trust:export'],
}

export const ROLE_NAV: Record<Role, readonly [string, string, string][]> = {
  owner: [['Overview', '/app', 'grid'], ['My Agreements', '/app/agreements', 'file'], ['AI Workspace', '/app/ai-workspace', 'spark'], ['Contract IR', '/app/contract-ir', 'database'], ['Verification', '/app/parity', 'scan'], ['Escrow', '/app/smart-contracts', 'wallet'], ['Milestones', '/app/milestones', 'layers'], ['Trust Passport', '/app/agreements/website-project', 'shield'], ['Team', '/app/team', 'users'], ['Notifications', '/app/notifications', 'bell'], ['Settings', '/app/settings', 'settings']],
  freelancer: [['My Dashboard', '/app', 'grid'], ['My Agreements', '/app/agreements', 'file'], ['Projects & Milestones', '/app/milestones', 'layers'], ['Deliverables', '/app/activity', 'file'], ['Payments', '/app/transactions', 'wallet'], ['Disputes', '/app/help', 'alert'], ['Notifications', '/app/notifications', 'bell'], ['Profile & Wallet', '/app/profile', 'users']],
  legal_reviewer: [['Review Dashboard', '/app', 'grid'], ['Assigned Agreements', '/app/agreements', 'file'], ['Document Review', '/app/agreements/website-project', 'edit'], ['AI Extraction Review', '/app/ai-workspace', 'spark'], ['Contract IR Review', '/app/contract-ir', 'database'], ['Parity Reports', '/app/parity', 'scan'], ['Trust Passport', '/app/agreements/website-project', 'shield'], ['Notifications', '/app/notifications', 'bell']],
  org_admin: [['Workspace Overview', '/app', 'grid'], ['Members', '/app/team', 'users'], ['Roles & Permissions', '/app/settings', 'shield'], ['Agreements', '/app/agreements', 'file'], ['Activity Logs', '/app/activity', 'activity'], ['Integrations', '/app/smart-contracts', 'layers'], ['Security', '/app/help', 'lock'], ['Workspace Settings', '/app/settings', 'settings']],
  technical_auditor: [['Audit Overview', '/app', 'grid'], ['Agreements', '/app/agreements', 'file'], ['Contract IR Inspector', '/app/contract-ir', 'database'], ['Parity Reports', '/app/parity', 'scan'], ['Document Integrity', '/app/agreements/website-project', 'shield'], ['Smart Contract Versions', '/app/smart-contracts', 'code'], ['Blockchain Explorer', '/app/transactions', 'external'], ['Audit Logs', '/app/activity', 'activity']],
}

const ROUTE_PERMISSIONS: Record<string, Permission | undefined> = {
  '/app/ai-workspace': 'agreement:create',
  '/app/contract-ir': 'audit:view',
  '/app/parity': 'audit:view',
  '/app/smart-contracts': 'escrow:fund',
  '/app/milestones': 'milestone:submit',
  '/app/transactions': 'escrow:view_financials',
  '/app/team': 'workspace:manage',
  '/app/activity': 'workspace:view_activity',
}

export function hasPermission(role: Role, permission: Permission): boolean { return ROLE_PERMISSIONS[role].includes(permission) }
export function canAccessRoute(role: Role, path: string): boolean { if (path === '/app/transactions' || path === '/app/smart-contracts') return hasPermission(role, 'escrow:view_financials') || hasPermission(role, 'escrow:fund') || hasPermission(role, 'audit:view'); const required = ROUTE_PERMISSIONS[path]; return !required || hasPermission(role, required) }
export function permissionsFor(role: Role): readonly Permission[] { return ROLE_PERMISSIONS[role] }
export function accountForRole(role: Role): DemoAccount { return DEMO_ACCOUNTS.find((account) => account.role === role)! }
export function roleLabel(role: Role): string { return ROLE_LABELS[role] }
export function roleForEmail(email: string): Role | undefined { return DEMO_ACCOUNTS.find((account) => account.email === email.trim().toLowerCase())?.role }
export function maskFinancials(role: Role): boolean { return !hasPermission(role, 'escrow:view_financials') }
