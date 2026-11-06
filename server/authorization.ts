import { hasPermission, type Permission, type Role, type WorkspaceId } from '../src/rbac'

export type AuthContext = { userId: string; workspaceId: WorkspaceId; roles: Role[] }
export type Resource = { workspaceId: WorkspaceId; ownerId?: string; assignedUserIds?: string[] }

export function requireWorkspace(context: AuthContext, resource: Resource): void {
  if (context.workspaceId !== resource.workspaceId) throw new Error('FORBIDDEN_WORKSPACE')
}

function requireAgreementScope(context: AuthContext, resource: Resource): void {
  requireWorkspace(context, resource)
  const isOwner = resource.ownerId === context.userId
  const isAssignee = resource.assignedUserIds?.includes(context.userId) ?? false
  const isWorkspaceObserver = context.roles.some((role) => role === 'org_admin' || role === 'technical_auditor')
  if (!isOwner && !isAssignee && !isWorkspaceObserver) throw new Error('FORBIDDEN_RESOURCE_SCOPE')
}

export function requirePermission(context: AuthContext, permission: Permission, resource: Resource): void {
  requireWorkspace(context, resource)
  const allowed = context.roles.some((role) => hasPermission(role, permission))
  if (!allowed) throw new Error(`FORBIDDEN_PERMISSION:${permission}`)
}

export function canReadFinancials(context: AuthContext, resource: Resource): boolean {
  requireAgreementScope(context, resource)
  return context.roles.some((role) => hasPermission(role, 'escrow:view_financials'))
}

export function canEditAgreement(context: AuthContext, resource: Resource): boolean {
  requireAgreementScope(context, resource)
  return resource.ownerId === context.userId && context.roles.some((role) => hasPermission(role, 'agreement:edit'))
}

/** API contract: invoke before every read/write, then apply the same workspace predicate in SQL. */
export function authorizeAgreementRead(context: AuthContext, resource: Resource): { userId: string; workspaceId: WorkspaceId } {
  requireAgreementScope(context, resource)
  if (!context.roles.some((role) => hasPermission(role, 'agreement:view'))) throw new Error('FORBIDDEN_PERMISSION:agreement:view')
  return { userId: context.userId, workspaceId: context.workspaceId }
}
