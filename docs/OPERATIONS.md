# Operations

Production operations should expose an unauthenticated health check, integration readiness without secret values, structured request/job logs, error monitoring, queue/job status, webhook retry state, deployment version, and rollback guidance. Database backups and restore drills must be scheduled outside the frontend. The current static prototype has no server process, queue, or durable operational state; its visible labels make that boundary explicit.
