# Turso policy

Use for Turso/libSQL selection, SDK access, tenant databases, local/offline synchronization, or recovery. Apply the [core policy](../AGENTS.md) and the sections relevant to the affected boundary.

## Turso profile

- Choose and record the exact engine, SDK, access mode, and managed/self-hosted arrangement: libSQL, the Rust-based Turso engine, and Turso Cloud are distinct choices.
- Verify current maturity, SQLite compatibility, auth/ORM support, and concurrent-write behavior for that selection. Do not apply SQLite's single-writer limitation to every Turso engine or treat PostgreSQL schemas as portable without review.
- Drizzle's documented libSQL path is one integration. Confirm support for the selected engine and SDK; review types, SQL, constraints, migrations, and query semantics when changing from PostgreSQL.
- Remote HTTP access has network latency. Embedded access needs a compatible runtime and a storage lifecycle that meets durability requirements. Do not assume a Worker or ephemeral serverless filesystem provides a persistent local replica.
- Distinguish primary-forwarded legacy embedded replicas from local-write push/pull synchronization. Verify the chosen SDK's behavior; define sync cadence, staleness, conflict rules, and read-your-writes semantics.
- Where Turso Sync uses last-push-wins conflicts, MUST NOT rely on that policy alone to enforce shared financial, inventory, or uniqueness invariants. Use an authoritative owner/transaction model for those invariants.
- If disconnected devices can change the same bounded resource, specify how the global invariant survives disconnection: exclusive allocations/rights, another proven coordination model, or online authorization. State the availability tradeoff and ensure replay, restoration, or cloned state cannot duplicate rights; do not promise unrestricted offline writes and a coordinated invariant without a design that supports both.
- For tenant databases, implement provisioning, scoped credentials, schema rollout, fleet backups/restores, deletion, and cross-tenant reporting. Do not give browser code a broad account/database administration token.
- Test concurrency, conflicts, offline/reconnect behavior where relevant, restarts, and restoration with the selected engine/access mode. Define independent backup and recovery procedures rather than assuming cloud synchronization is a backup.

## Official documentation

Use documentation matching the installed version.

- [Drizzle / Turso](https://orm.drizzle.team/docs/sqlite/connect-turso), [Turso engine FAQ](https://github.com/tursodatabase/turso#faq), and [Turso Sync](https://docs.turso.tech/sync/usage)
