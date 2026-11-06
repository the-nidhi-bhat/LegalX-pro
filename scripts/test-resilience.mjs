import { readFile } from 'node:fs/promises'

const app = await readFile(new URL('../src/App.tsx', import.meta.url), 'utf8')
const css = await readFile(new URL('../src/styles.css', import.meta.url), 'utf8')
const rehearsal = await readFile(new URL('./rehearse-demo.mjs', import.meta.url), 'utf8')

const required = [
  ['Judge Mode route', "if (path === '/demo')"],
  ['guided step persistence', "legalx:guided-step"],
  ['guided active persistence', "legalx:guided-active"],
  ['pause control', 'Guided demo paused safely.'],
  ['resume control', 'Resume this step'],
  ['safe reset confirmation', 'Reset only local LEGALX demo state?'],
  ['local-only reset boundary', "key.startsWith('legalx:')"],
  ['offline simulation', "'offline'"],
  ['slow-network simulation', "'slow'"],
  ['no false success message', 'no success is shown'],
  ['recovery banner', 'Return to Demo Control Center'],
  ['rehearsal timestamps', 'startedAt'],
]
for (const [label, needle] of required) {
  if (!(app.includes(needle) || rehearsal.includes(needle))) throw new Error(`missing resilience contract: ${label}`)
}
if (!css.includes('.recovery-banner') || !css.includes('.demo-network-panel')) throw new Error('missing resilience presentation styles')
if (app.includes('localStorage.clear()')) throw new Error('unsafe whole-storage reset remains')
console.log(`resilience checks passed: ${required.length} Judge Mode, recovery, and failure-handling contracts`)
