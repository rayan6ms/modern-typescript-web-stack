# Application contracts and Effect services

Use for APIs, runtime schemas, wire contracts, domain services, retries, or Effect orchestration. Apply the [core policy](../AGENTS.md) and the sections relevant to the affected boundary.

For Convex-owned functions/data, use the [Convex profile](convex.md); its native contracts replace overlapping SQL/RPC defaults. Load [integrations](integrations.md) when identity/session or external-provider behavior changes.

## Application boundaries and contracts

- Keep transport handling separate from substantive domain invariants and resource authorization. Prefer feature boundaries; add repository abstractions/packages for meaningful ownership, lifecycle, or sharing needs.
- MUST distinguish public request/response schemas from persistence models. Never expose private database columns, credential material, internal permission flags, or provider objects by serializing a row directly.
- Use `unknown` at untrusted boundaries and narrow with runtime schemas. Avoid `any`, unchecked assertions, and compiler suppressions that conceal an unsafe application contract; localize unavoidable SDK interop and document its validation.
- Validate untrusted data at runtime. Define wire representations, including timestamps, IDs, decimal money, binary data, and nullability; JavaScript numbers must not corrupt large IDs or financial amounts.
- Mount oRPC in an existing server route when one deployable suffices. Use a server-side client during SSR to avoid a needless HTTP loopback. Select Hono when an independent API/webhook deployment has a real ownership or runtime purpose.
- Maintain a reviewable OpenAPI contract for public or polyglot consumers. Runtime validation, authorization, and compatibility tests are required even when client types are generated.
- Map expected failures to stable, safe public error codes. Unexpected failures should be reported with a correlation ID; do not return stack traces, raw SQL errors, tokens, or sensitive provider output.
- Propagate deadlines and cancellation across request, database, queue, and provider boundaries where supported. Bound outbound concurrency, payloads, and buffers.
- MUST make retried mutations idempotent using durable keys/constraints appropriate to the operation. Retry only eligible failures within a bounded policy, respecting upstream limits and `Retry-After`.

## Effect implementation requirements

When selected, use Effect for the substantial async/service boundary, not every function:

- Model failures/dependencies in `Effect<Success, Error, Requirements>`; distinguish defects, provide services at appropriate lifecycles, and map results at entrypoints to public contracts.
- Scope acquired resources/request-owned tasks, reuse runtimes/pools, bound concurrency, and propagate supported interruption. Combine retries/timeouts with idempotency and overall deadlines; interruption cannot undo accepted effects.
- Fibers, queues, and retries are in-memory; verify persistence or use durable jobs when work must survive restart.
- Use version-supported Standard Schema adapters with compatible service requirements and wire transformations. Check module stability/API compatibility; core stability does not cover every module.
- Keep server imports out of browser bundles. Measure client-side adoption against equivalent plain TypeScript; comparisons to old Effect versions do not prove superiority. Test affected errors, cleanup, cancellation, retries, time, and concurrency.

## Official documentation

Use documentation matching the installed version.

- [Effect](https://effect.website/docs/v4/getting-started/why-effect) and [Standard Schema integration](https://effect.website/docs/v4/schema/standard-schema)
