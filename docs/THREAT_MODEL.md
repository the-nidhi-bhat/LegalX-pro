# Threat model

Primary risks are tenant data leakage, unauthorized agreement edits, private document exposure, hallucinated contractual terms, replayed execution requests, wrong-network wallet actions, spoofed chain webhooks, malicious uploads, and misleading trust claims.

Mitigations include RLS and membership checks, immutable versions, signed private URLs, schema validation and source citations, idempotency keys, chain/account validation, webhook signatures, content scanning readiness, strict output escaping, explicit simulation labels, and human approval gates.
