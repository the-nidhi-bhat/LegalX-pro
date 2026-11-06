# Webhooks

Chain and payment providers must sign webhook payloads. The server verifies signature, timestamp tolerance, event ID uniqueness, and organization/resource ownership before writing an event. Processing is idempotent; transient failures retry with backoff and permanent failures surface in an operations queue. The current prototype has no webhook endpoint and never fabricates a confirmed event.
