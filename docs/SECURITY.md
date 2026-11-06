# Security

- Keep server-only secrets out of client bundles and repositories.
- Scope every organization resource through membership/RLS.
- Use secure, cross-site-compatible application session cookies in hosted Preview.
- Use short-lived signed URLs for private documents; never place sensitive agreement content in public HTML or public storage paths.
- Validate uploads by type, size, content, and malware-scanning readiness.
- Canonicalize and hash only defined representations; a hash proves integrity, not legal validity.
- Treat AI output as untrusted input; validate schema, escape rendered text, and require human review.
- Require explicit wallet confirmation and protect execution endpoints with idempotency, replay protection, and authorization checks.
- Prepare CSP, CSRF protection where applicable, dependency scanning, secret rotation, incident response, MFA readiness, and session revocation.
