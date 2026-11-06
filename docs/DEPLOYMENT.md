# Deployment checklist

## Current managed static app

The Webdev static build contract uses `npm ci && npm run build` and publishes `dist`. The project must be checkpointed to `main` before publication. Never include `.env`, credentials, `node_modules`, or `dist` in Git.

## Production checklist

- Configure environment variables via the hosting secret manager.
- Run Supabase migrations and verify RLS with a non-owner account.
- Configure private Storage bucket and signed URL policy.
- Configure Gemini server route, rate limits, logs, and failure states.
- Deploy and verify the Sepolia contract from a dedicated test wallet.
- Configure domain, canonical metadata, sitemap, robots, CSP, monitoring, backups, and rollback procedure.
- Run build, typecheck, deterministic tests, contract tests, and Playwright flows.
- Confirm all public claims match observed integrations.
