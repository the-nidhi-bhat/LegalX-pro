import { hasPermission, type Permission, type Role, type WorkspaceId } from '../src/rbac'

export type AuthContext = { userId: string; workspaceId: WorkspaceId; roles: Role[] }
export type Resource = { workspaceId: WorkspaceId; ownerId?: string; assignedUserIds?: string[] }

export function requireWorkspace(context: AuthContext, resource: Resource): void {
  if (context.workspaceId !== resource.workspaceId) throw new Error('FORBIDDEN_WORKSPACE')
}

export function requirePermission(context: AuthContext, permission: Permission, resource: Resource): void {
  requireWorkspace(context, resource)
  const allowed = context.roles.some((role) => hasPermission(role, permission))
  if (!allowed) throw new Error(`FORBIDDEN_PERMISSION:${permission}`)
}

export function canReadFinancials(context: AuthContext, resource: Resource): boolean {
  requireWorkspace(context, resource)
  return context.roles.some((role) => hasPermission(role, 'escrow:view_financials'))
}

export function canEditAgreement(context: AuthContext, resource: Resource): boolean {
  requireWorkspace(context, resource)
  return context.roles.some((role) => hasPermission(role, 'agreement:edit'))
}

/** API contract: invoke before every read/write, then apply the same workspace predicate in SQL. */
export function authorizeAgreementRead(context: AuthContext, resource: Resource): { userId: string; workspaceId: WorkspaceId } {
  requirePermission(context, 'agreement:view', resource)
  return { userId: context.userId, workspaceId: context.workspaceId }
}
