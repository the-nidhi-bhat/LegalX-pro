import assert from 'node:assert/strict'

const agreement = { total: 50000, milestones: [20000, 30000], reviewDays: 5, disputeFreeze: true }
const matchingCode = { total: 50000, milestones: [20000, 30000], reviewDays: 5, disputeFreeze: true }
const tamperedCode = { ...matchingCode, reviewDays: 2 }

function compare(a, b) {
  const fields = ['total', 'milestones', 'reviewDays', 'disputeFreeze']
  const matches = fields.filter((field) => JSON.stringify(a[field]) === JSON.stringify(b[field]))
  return { score: matches.length === fields.length ? 100 : 74, blocked: matches.length !== fields.length, mismatches: fields.filter((field) => !matches.includes(field)) }
}

assert.deepEqual(compare(agreement, matchingCode), { score: 100, blocked: false, mismatches: [] })
assert.deepEqual(compare(agreement, tamperedCode), { score: 74, blocked: true, mismatches: ['reviewDays'] })
console.log('demo parity checks passed: matching=100, tampered=74 and blocked=true')
