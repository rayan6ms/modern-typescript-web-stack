# Convex backend policy

Use for Convex selection or changes to its functions, schemas, auth, reactive clients, storage, scheduling, or operation. Apply the [core policy](../AGENTS.md) and the sections relevant to the affected boundary.

## Convex backend profile

CONDITIONAL: choose Convex for reactive shared data when integrated TypeScript functions simplify delivery/operation. Evaluate query/reporting needs, integrations, hosting control, and portability against PostgreSQL; realtime alone does not justify migrating a suitable backend.

- Use native schemas/indexes, database functions, and generated clients for Convex-owned data. This replaces PostgreSQL/Drizzle and oRPC at that boundary; additional stores/APIs need distinct roles. Prefer plain TypeScript domain helpers unless orchestration needs more.
- Use native `v` validators for schemas and public arguments/returns. Retain suitable schemas elsewhere without duplicating Convex contracts for the Zod default.
- Verify Convex identity and enforce resource/tenant authorization inside Convex, including browser calls. Use internal functions for backend-only work. Verify browser/SSR identity-provider support; a SQL auth adapter does not establish Convex support.
- Keep queries/mutations deterministic and atomic database invariants in mutations. Use actions/HTTP actions for network effects; their database calls and external effects are not one transaction. Retain idempotency, webhook verification, and reconciliation.
- Use suitable native scheduling. Mutation scheduling is atomic; scheduled actions have no automatic retries or propagated caller authentication. Define durable retry/reconciliation for required effects and explicit authorization context.
- Native storage can cover files; anyone holding a `getUrl` URL can use it. Per-download authorization needs authenticated delivery with verified response-size limits.
- Convex has its own runtime; use Node actions only for justified dependencies. Bun remains the compatible tooling default. Verify libraries/Effect against that runtime and function restrictions.
- Use supported React or Convex/TanStack Query integration for subscriptions/SSR. Isolate SSR identity/caches per request; avoid redundant polling/mirrored stores. Verify auth changes, subscription recovery, and relevant optimistic updates.
- Derive indexes, bounded reads/pagination, and subscription scope from access patterns. Evaluate limits, contention, recomputation, client delivery, and cost with representative data/subscribers.
- Record hosting mode, region, budget, and recovery/export. Coordinate schema/data migrations, generated clients, and compatible releases.

## Official documentation

Use documentation matching the installed version.

- [Convex functions](https://docs.convex.dev/functions/overview), [runtimes](https://docs.convex.dev/functions/runtimes), [TanStack Start integration](https://docs.convex.dev/client/tanstack/tanstack-start/), [scheduled functions](https://docs.convex.dev/scheduling/scheduled-functions), [file delivery](https://docs.convex.dev/file-storage/serve-files), and [best practices](https://docs.convex.dev/understanding/best-practices)
