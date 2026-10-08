# PostgreSQL and Drizzle policy

Use for PostgreSQL queries, constraints, pools, migrations, replicas, or recovery. Apply the [core policy](../AGENTS.md) and the sections relevant to the affected boundary.

## PostgreSQL and Drizzle

- MUST parameterize values, use a least-privilege application role, and enforce business invariants with constraints/transactions where applicable. Validate dynamic identifiers against an explicit allowlist rather than interpolating untrusted names.
- Keep transactions short and exclude network provider calls from them. Model payment/provider state changes with idempotency and reconciliation.
- Derive indexes and pagination from actual access patterns; avoid N+1 queries and unbounded collection reads. Inspect query plans on representative data before claiming a query improvement.
- Generate migrations with the repository's supported workflow, review SQL, and test on a disposable database. Use expand/contract changes when old and new deployments overlap. MUST NOT apply destructive production migrations without authorization and a recovery plan.
- Cap total pool capacity across application replicas. Configure connection/statement timeouts and observe queueing, slow queries, and pool saturation.
- Configure backups and recovery objectives appropriate to the deployed application. Validate an isolated restore; a successful backup job alone does not prove recoverability.
