# Database and persistence

The current prototype has no database. This document is the production contract for a Supabase/Postgres implementation.

## Core tables

- `organizations`: tenant identity and plan metadata.
- `memberships`: user-to-organization relationship, role, status, and audit timestamps.
- `agreements`: stable agreement identity, current version, lifecycle state, and owner.
- `agreement_versions`: canonical source, document reference, content hash, IR version, and created-by.
- `milestones`: version-linked amount, condition, due date, review window, and state.
- `verification_runs`: immutable parity result, engine version, evidence JSON, severity, and timestamp.
- `execution_records`: contract/network metadata and transaction lifecycle, never asserted confirmed without chain evidence.
- `activity_events`: append-only actor, action, related resource, and details.
- `notifications`: recipient, type, read state, and related resource.

## RLS

Every agreement, file, verification, transaction, activity event, and notification query must be scoped through an organization membership. Service-role operations are limited to server-side jobs and never exposed to the browser. Deletion is a controlled retention workflow, not a direct hard delete from the UI.
