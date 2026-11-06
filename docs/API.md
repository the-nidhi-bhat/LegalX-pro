# API contract

The browser demo currently has no server API. The planned API is versioned under `/api/v1`.

- `POST /agreements` — create an idempotent draft after validating workspace membership.
- `POST /agreements/:id/interpret` — queue AI interpretation; returns a job status.
- `POST /agreements/:id/versions/:version/verify` — run parity against the approved version.
- `GET /agreements/:id/trust-passport` — return version-specific evidence without private document content.
- `POST /agreements/:id/execution/prepare` — validate parity, permissions, network, funding, and return a transaction preview.
- `POST /webhooks/chain` — verify provider signature and process idempotent events.
- `GET /health/integrations` — report configuration state without exposing secrets.

All requests require authenticated organization context. Responses use typed success/error envelopes, request IDs, and stable error codes such as `VALIDATION_FAILED`, `MISSING_CLARIFICATION`, `PARITY_BLOCKED`, `WRONG_NETWORK`, and `INTEGRATION_UNAVAILABLE`.
