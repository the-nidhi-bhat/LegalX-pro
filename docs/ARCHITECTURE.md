# LEGALX architecture

## Current prototype

The current repository is a browser-first Vite/React/TypeScript application. A single typed route dispatcher renders public marketing pages, demo authentication/onboarding, and the authenticated-looking workspace. Demo state is local to the session; no private content leaves the browser.

The UI is deliberately organized around the trust chain:

`plain-language agreement → extracted clauses → Contract IR → legal output + supported parameters → parity evidence → human approval → simulated execution`

## Production target

A production implementation should split the current UI into a Next.js App Router frontend and server-side service boundary. Supabase Auth identifies a user; organization/workspace membership scopes every query; PostgreSQL stores versioned agreements and immutable verification evidence; private Storage holds documents; a server-side AI provider produces validated structured output; the wallet client only signs explicit user-approved operations.

## Module boundaries

- **Agreement service:** versions, parties, clauses, documents, lifecycle transitions.
- **AI service:** provider abstraction, prompt versioning, structured response validation, clarification jobs.
- **IR service:** canonical schema, normalization, schema validation, source references.
- **Parity service:** structural comparison, supported semantic mapping, severity, evidence, engine version.
- **Execution service:** contract metadata, wallet/session state, transaction lifecycle, explorer links.
- **Trust layer:** version hash, canonicalization version, approvals, parity record, timestamp, transaction reference.
- **Notification service:** reminders, clarification, verification, team activity, and deployment events.

## State policy

Critical transitions are monotonic and review-gated: a content change creates a new version; a new version invalidates prior parity evidence; critical parity failures block execution; wallet actions require explicit confirmation; blockchain state is only marked confirmed after chain evidence.
