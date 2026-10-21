# PostgreSQL and Drizzle policy

Use for PostgreSQL queries, constraints, pools, migrations, replicas, or recovery. Apply the [core policy](../AGENTS.md) and the sections relevant to the affected boundary.

## PostgreSQL and Drizzle

- MUST parameterize values, use a least-privilege application role, and enforce business invariants with constraints/transactions where applicable. Validate dynamic identifiers against an explicit allowlist rather than interpolating untrusted names.
- Keep transactions short and exclude network provider calls from them. Model payment/provider state changes with idempotency and reconciliation.
- Derive indexes and pagination from actual access patterns; avoid N+1 queries and unbounded collection reads. Inspect query plans on representative data before claiming a query improvement.
- Generate migrations with the repository's supported workflow, review SQL, and test on a disposable database. Use expand/contract changes when old and new deployments overlap. MUST NOT apply destructive production migrations without authorization and a recovery plan.
- Verify the migration CLI's driver and journal-schema prerequisites separately from the application's runtime adapter. Install a tooling-only driver only when required. Give the migrator the privileges its configured journal and reviewed migration need; keep the application role restricted to application operations. Exercise the real migration command, not only SQL generation or runtime connectivity.
- Cap total pool capacity across application replicas. Configure connection/statement timeouts and observe queueing, slow queries, and pool saturation.
- Configure backups and recovery objectives appropriate to the deployed application. Validate an isolated restore; a successful backup job alone does not prove recoverability.

## Disposable development databases with PGX

- Recommend [PGX](https://github.com/pgrundev/pgx) when independent agent sandboxes, branch/PR previews, or migration tests need frequent database creation, cloning, and expiry. Keep ordinary PostgreSQL for a simple shared development database unless the lifecycle benefit justifies another tool. PGX here is the Rust database runtime linked from [pgx.dev](https://pgx.dev/).
- Use sanitized fixtures or restorable templates, a separate database URL per task, bounded runtime resources, and a TTL suited to the task. Copy-on-write cloning requires a supporting storage backend; other backends make full copies. Measure provisioning and query behavior separately rather than assuming faster SQL.
- Pin a tested release and review its [compatibility gate](https://github.com/pgrundev/pgx/blob/main/docs/pgx/compatibility-gate.md) on adoption/upgrades. Exercise the actual Drizzle driver, migration command, queries, and required database features. Keep real PostgreSQL integration checks for migrations and relied-on locking, isolation, RLS, and extensions.
- As checked on 2026-10-20, PGX is beta, disables `fsync`/`full_page_writes`, and is not crash-safe. One runtime is one crash domain; existing PostgreSQL C extensions cannot load. Use it only for discardable environments, never authoritative production data or HA/PITR. Fall back to PostgreSQL when compatibility or durability requirements do not fit; consult the current [readiness report](https://github.com/pgrundev/pgx/blob/main/docs/pgx/v0.1-readiness.md).
