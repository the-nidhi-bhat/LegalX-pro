import assert from 'node:assert/strict'

const permissions = {
  owner: new Set(['agreement:create','agreement:view','agreement:edit','escrow:fund','escrow:view_financials','milestone:submit','milestone:approve','trust:export']),
  freelancer: new Set(['agreement:view','agreement:suggest','escrow:view_financials','milestone:submit','trust:export']),
  legal_reviewer: new Set(['agreement:view','agreement:suggest','agreement:approve_legal','workspace:view_activity','trust:export','audit:view']),
  org_admin: new Set(['agreement:view','workspace:manage','workspace:view_activity']),
  technical_auditor: new Set(['agreement:view','workspace:view_activity','audit:view','trust:export']),
}
const can = (role, permission) => permissions[role].has(permission)
const canReadResource = (role, contextWorkspace, resourceWorkspace) => contextWorkspace === resourceWorkspace && can(role, 'agreement:view')
const roleRoutes = {
  owner: new Set(['/app', '/app/agreements', '/app/ai-workspace', '/app/contract-ir', '/app/parity', '/app/smart-contracts', '/app/milestones', '/app/agreements/website-project', '/app/team', '/app/notifications', '/app/settings', '/app/profile']),
  freelancer: new Set(['/app', '/app/agreements', '/app/milestones', '/app/activity', '/app/transactions', '/app/help', '/app/notifications', '/app/profile', '/app/agreements/website-project']),
  legal_reviewer: new Set(['/app', '/app/agreements', '/app/agreements/website-project', '/app/ai-workspace', '/app/contract-ir', '/app/parity', '/app/notifications']),
  org_admin: new Set(['/app', '/app/team', '/app/settings', '/app/agreements', '/app/activity', '/app/smart-contracts', '/app/help']),
  technical_auditor: new Set(['/app', '/app/agreements', '/app/contract-ir', '/app/parity', '/app/agreements/website-project', '/app/smart-contracts', '/app/transactions', '/app/activity']),
}
const canAccessRoute = (role, path) => roleRoutes[role].has(path) && (!['/app/settings'].includes(path) || can(role, 'workspace:manage') || role === 'owner')
assert.equal(can('owner', 'agreement:create'), true)
assert.equal(can('owner', 'escrow:fund'), true)
assert.equal(can('freelancer', 'agreement:create'), false)
assert.equal(can('freelancer', 'escrow:fund'), false)
assert.equal(can('freelancer', 'milestone:submit'), true)
assert.equal(can('legal_reviewer', 'agreement:approve_legal'), true)
assert.equal(can('legal_reviewer', 'escrow:fund'), false)
assert.equal(can('org_admin', 'workspace:manage'), true)
assert.equal(can('org_admin', 'agreement:approve_legal'), false)
assert.equal(can('org_admin', 'escrow:fund'), false)
assert.equal(can('technical_auditor', 'audit:view'), true)
assert.equal(can('technical_auditor', 'agreement:edit'), false)
assert.equal(can('technical_auditor', 'escrow:fund'), false)
assert.equal(canReadResource('owner', 'acme-digital', 'acme-digital'), true)
assert.equal(canReadResource('owner', 'acme-digital', 'lexora-studio'), false)
assert.equal(canReadResource('technical_auditor', 'acme-digital', 'lexora-studio'), false)
assert.equal(canAccessRoute('owner', '/app/settings'), true)
assert.equal(canAccessRoute('org_admin', '/app/settings'), true)
assert.equal(canAccessRoute('technical_auditor', '/app/settings'), false)
assert.equal(canAccessRoute('org_admin', '/app/unknown-sensitive-route'), false)
assert.equal(canAccessRoute('freelancer', '/app/agreements/website-project'), true)
assert.equal(canAccessRoute('org_admin', '/app/agreements/website-project'), false)
assert.equal(can('technical_auditor', 'escrow:view_financials'), false)
console.log('rbac checks passed: five roles, allowed actions, and unauthorized attempts covered')
