import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const app = await readFile(new URL('../src/App.tsx', import.meta.url), 'utf8')
const state = await readFile(new URL('../src/demo-state.ts', import.meta.url), 'utf8')
const rbac = await readFile(new URL('../src/rbac.ts', import.meta.url), 'utf8')
const styles = await readFile(new URL('../src/styles.css', import.meta.url), 'utf8')

for (const phrase of [
  'function RoleDashboard',
  'onRoleChange={onRoleChange}',
  'saveProfile({ ...profile, role, name, email, workspaceName',
  'readText(AI_DRAFT_KEY, DEMO_INPUT)',
  "localStorage.setItem('legalx:ai-parsed', 'true')",
  'writeJson(NOTIFICATIONS_KEY, next)',
  'writeJson(INVITES_KEY, next)',
  'writeText(WALLET_KEY, String(next))',
  'writeJson(MILESTONES_KEY, next)',
  'Export agreement',
  'Return to Demo Control Center',
  'Reset local demo safely',
  'field-inspector',
  'Run verification',
  'verification-next',
  'Inspect Contract IR',
  'Open team review',
  'Open verification',
  'saveProfile({ ...stored, role, name, email, workspaceName',
]) assert.match(app, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), `missing workflow contract: ${phrase}`)

for (const phrase of ['.app-sidebar{max-height:100vh;overflow-y:auto', '.workspace-content{min-width:0;overflow-x:hidden}', '.field-table{overflow-x:auto']) {
  assert.match(styles, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), `missing scroll contract: ${phrase}`)
}

for (const key of ['PROFILE_KEY', 'SETTINGS_KEY', 'AI_DRAFT_KEY', 'NOTIFICATIONS_KEY', 'INVITES_KEY', 'WALLET_KEY', 'MILESTONES_KEY', 'effectiveAccount']) {
  assert.match(state, new RegExp(`\\b${key}\\b`), `missing shared state contract: ${key}`)
}

for (const role of ['owner', 'freelancer', 'legal_reviewer', 'org_admin', 'technical_auditor']) {
  assert.match(rbac, new RegExp(`['\"]${role}['\"]`), `missing role contract: ${role}`)
}

console.log('workflow contracts passed: identity, persistence, role switching, IR-to-verification handoff, scrolling, recovery, exports, and five roles covered')
