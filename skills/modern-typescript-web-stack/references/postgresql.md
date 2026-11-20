# PostgreSQL and Drizzle policy

Use for PostgreSQL queries, constraints, pools, migrations, replicas, or recovery. Apply the [core policy](../AGENTS.md) and the sections relevant to the affected boundary.

## PostgreSQL and Drizzle

Use a patched, supported PostgreSQL major. PostgreSQL 18 remains the established baseline. [PostgreSQL 19](https://www.postgresql.org/docs/19/release-19.html) is available for a new or explicitly planned deployment after verifying provider, driver, extensions, migrations, pooling, and backup/restore against that target.

- MUST parameterize values, use a least-privilege application role, and enforce business invariants with constraints/transactions where applicable. Validate dynamic identifiers against an explicit allowlist rather than interpolating untrusted names.
- Keep transactions short and exclude network provider calls from them. Model payment/provider state changes with idempotency and reconciliation.
- Derive indexes and pagination from actual access patterns; avoid N+1 queries and unbounded collection reads. Inspect query plans on representative data before claiming a query improvement.
- Generate migrations with the repository's supported workflow, review SQL, and test on a disposable database. Use expand/contract changes when old and new deployments overlap. MUST NOT apply destructive production migrations without authorization and a recovery plan.
- Verify the migration CLI's driver and journal-schema prerequisites separately from the application's runtime adapter. Install a tooling-only driver only when required. Give the migrator the privileges its configured journal and reviewed migration need; keep the application role restricted to application operations. Exercise the real migration command, not only SQL generation or runtime connectivity.
- Cap total pool capacity across application replicas. Configure connection/statement timeouts and observe queueing, slow queries, and pool saturation.
- Configure backups and recovery objectives appropriate to the deployed application. Validate an isolated restore; a successful backup job alone does not prove recoverability.

## Disposable development databases with PGBoxDB

- Recommend [PGBoxDB](https://github.com/pgrundev/pgboxdb) when independent agent sandboxes, branch/PR previews, or migration tests need frequent database creation, cloning, and expiry. Keep ordinary PostgreSQL for a simple shared development database unless the lifecycle benefit justifies another tool. Upstream renamed PGX to PGBoxDB.
- Use sanitized fixtures or restorable templates, a separate database URL per task, bounded runtime resources, and a TTL suited to the task. Copy-on-write cloning requires a supporting storage backend; other backends make full copies. Measure provisioning and query behavior separately rather than assuming faster SQL.
- Pin a tested release and review its [compatibility gate](https://github.com/pgrundev/pgboxdb/blob/v0.2.0/docs/pgboxdb/compatibility-gate.md) on adoption/upgrades. Exercise the actual Drizzle driver, migration command, queries, and required database features. Keep real PostgreSQL integration checks for migrations and relied-on locking, isolation, RLS, and extensions.
- PGBoxDB v0.2.0 is tagged as early, PostgreSQL 18-compatible software for discardable databases. The runtime disables `fsync`, shares one crash domain, and cannot load external PostgreSQL C extensions. Keep production data and checks for required production guarantees on real PostgreSQL. See the [upstream status](https://github.com/pgrundev/pgboxdb/tree/v0.2.0#status).
