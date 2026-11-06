# Testing

## Current checks

- `npm run build` — Vite production bundle.
- `npx tsc --noEmit` — TypeScript diagnostics.
- `npm run test` — deterministic demo engine assertions.
- Managed Preview screenshots — desktop and mobile visual smoke checks for `/`, `/demo`, `/app/parity`, and `/app/ai-workspace`.

## Required production suites

Add component/form tests, route and mobile navigation tests, API authorization tests, AI schema/malformed-output tests, parity match/mismatch/unsupported tests, Solidity state-transition/security tests, and Playwright E2E flows from landing through demo, onboarding, agreement creation, verification, tamper restore, settings, and mobile navigation. Tests must preserve real behavior and must not be removed to hide failures.
