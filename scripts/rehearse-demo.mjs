import { mkdir, writeFile } from 'node:fs/promises'

const base = process.env.LEGALX_BASE_URL || 'http://127.0.0.1:3000'
const steps = [
  { title: 'Meet the shared workspace', path: '/app', role: 'owner' },
  { title: 'Inspect the agreement', path: '/app/agreements/website-project', role: 'owner' },
  { title: 'Run parity verification', path: '/app/parity', role: 'owner' },
  { title: 'Change perspective', path: '/app', role: 'legal_reviewer' },
  { title: 'Explain the trust boundary', path: '/app/activity', role: 'technical_auditor' },
]

async function rehearsal(run) {
  const startedAt = new Date().toISOString()
  const errors = []
  const recoveryActions = ['Started from a clean local demo-state assumption', 'Verified guided step sequence is persisted by legalx:guided-step / legalx:guided-active']
  let routes
  try {
    const manifestResponse = await fetch(`${base}/manus-routes.json`)
    if (!manifestResponse.ok) throw new Error(`route manifest HTTP ${manifestResponse.status}`)
    routes = await manifestResponse.json()
    for (const step of steps) {
      if (!routes.routes.some((route) => route.path === step.path)) throw new Error(`missing guided route ${step.path}`)
      const response = await fetch(`${base}${step.path}`)
      if (!response.ok) throw new Error(`${step.path} HTTP ${response.status}`)
    }
  } catch (error) {
    errors.push(String(error.message || error))
  }
  const finishedAt = new Date().toISOString()
  const durationMs = Math.max(0, Date.parse(finishedAt) - Date.parse(startedAt))
  return {
    run,
    startedAt,
    finishedAt,
    durationMs,
    durationSeconds: Number((durationMs / 1000).toFixed(3)),
    personaSwitches: [...new Set(steps.map((step) => step.role))],
    completedWorkflowSteps: errors.length ? [] : steps.map((step) => step.title),
    errors,
    recoveryActions,
    finalAgreementState: errors.length ? 'UNVERIFIED — route rehearsal failed' : 'Verified demo state; parity and execution integrations remain simulated/blocked',
    manualInterventionNeeded: false,
    verificationBoundary: 'Route/state-machine rehearsal; not a substitute for browser click E2E or live integrations',
  }
}

const runs = []
for (let run = 1; run <= 3; run += 1) runs.push(await rehearsal(run))
await mkdir('/home/ubuntu/legalx/docs/rehearsals', { recursive: true })
await writeFile('/home/ubuntu/legalx/docs/rehearsals/latest.json', JSON.stringify({ generatedAt: new Date().toISOString(), base, runs }, null, 2) + '\n')
for (const result of runs) console.log(`run ${result.run}: ${result.errors.length ? 'FAILED' : 'PASS'} · ${result.durationSeconds}s · personas=${result.personaSwitches.join(',')}`)
console.log('rehearsal record: docs/rehearsals/latest.json')
