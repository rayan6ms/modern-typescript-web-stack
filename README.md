# Modern TypeScript Web Stack

A practical reference architecture for teams building production web applications in TypeScript. It recommends modern tools for application performance, type safety, reliable operation, and fast development, with a broader catalog for product capabilities and scale.

This is a guide, not a framework starter. Versions move; follow the linked project documentation and pin versions in the application that you build.

## Contents

- [Use with AI agents](#use-with-ai-agents)
- [What this stack optimizes for](#what-this-stack-optimizes-for)
- [Start here](#start-here)
- [Architecture](#architecture)
- [Core choices](#core-choices)
- [UI and browser state](#ui-and-browser-state)
- [Images and delivery](#images-and-delivery)
- [API and domain boundaries](#api-and-domain-boundaries)
- [Application reliability with Effect](#application-reliability-with-effect)
- [Data and infrastructure](#data-and-infrastructure)
- [Application platform capabilities](#application-platform-capabilities)
- [Hosting choices](#hosting-choices)
- [Authentication and authorization](#authentication-and-authorization)
- [Observability and reliability](#observability-and-reliability)
- [Testing and delivery](#testing-and-delivery)
- [Performance acceptance criteria](#performance-acceptance-criteria)
- [Complete stack summary](#complete-stack-summary)
- [Decision record](#decision-record)
- [Further reading](#further-reading)

## Use with AI agents

This product includes two skills: **modern-typescript-web-stack** for ongoing development and **modern-typescript-web-stack-kickoff** for preparing a new website. With Bun and Git available, install both from your website workspace:

```sh
bunx --bun skills@1.7.1 add https://github.com/rayan6ms/modern-typescript-web-stack/tree/v0.1.0 --skill modern-typescript-web-stack modern-typescript-web-stack-kickoff --agent codex --copy
```

Choose your agent when prompted or replace `codex` with its supported identifier. Installation defaults to the current project; add `--global` to make the skills available across projects. See [installation and updates](docs/installation.md) for GitHub installation, prerequisites, manual copying, and other agents. Installation registers guidance; website dependencies are installed by the agent during kickoff.

Then ask your agent:

```text
Use $modern-typescript-web-stack-kickoff to initialize a website in ./my-site.
It will be [describe the product, users, and first required features].
Ask about material unknowns, prepare the minimal foundation, install what it
needs, verify it, and leave project instructions and deferred decisions.
```

The agent interviews you where necessary, preserves the profile's defaults, installs only needed tools/services, and verifies the prepared scope. It leaves a short project `AGENTS.md`, a local policy snapshot, and an authoritative decision record with commands, readiness, and actionable open choices. Continue through those project instructions; kickoff is for initial setup rather than routine feature work.

For existing work, invoke `$modern-typescript-web-stack` or read its [core instructions](skills/modern-typescript-web-stack/AGENTS.md), which route to task-specific references. Preserve applicable project rules and explicit user choices. Automatic loading and invocation syntax vary by agent. Examples are in [demos](examples/README.md); evidence and known limits are in [the assessment](assessment/REPORT.md).

The package also includes a portable `plugin.json` manifest with kickoff as its onboarding skill. Plugin-host installation is an additional distribution option; the tested path here is the Skills CLI. No connector, paid account, or model subscription is bundled. Use a coding agent that can read files, run commands, and access dependency registries.

Retain `SOURCE.json` in release packages and local policy snapshots. It identifies the source revision; document local edits separately. See [supported environments and validation](docs/installation.md#supported-environments-and-validation).

## What this stack optimizes for

- Type safety across UI, transport, validation, and persistence
- Server rendered HTML and progressively enhanced interactions
- A short path from one deployable application to independently scaled workers
- Managed operations where they remove toil
- Observable, testable behavior

It is a good fit for SaaS products, dashboards, marketplaces, AI products, internal tools, and content with authenticated features. For a mostly static site, use Astro with islands and skip the application server. For a native mobile backend or a polyglot organization, publish an OpenAPI contract rather than making TypeScript types the only contract.

## Start here

1. Decide whether the product needs SSR, server functions, or only static HTML.
2. Choose a persistence/backend profile when needed: PostgreSQL for general relational data, Turso for embedded data/sync or databases per tenant, or Convex when reactive shared data and an integrated TypeScript backend suit the application. Include a queue, cache, or search service when the product requirements justify it.
3. Define domain modules and request schemas before sharing types between packages.
4. Measure Core Web Vitals and API latency with representative data.
5. Use representative load tests and capacity estimates to choose caches, workers, and read models before the expected traffic arrives.

The core is the recommended application foundation. Use its defaults for new work unless an existing architecture or concrete constraint favors an alternative; no comparison exercise is needed for every dependency. Capability sections recommend tools when the product needs that feature, including at launch. A selected backend profile replaces overlapping core choices at its boundary; use its supported data, API, and job capabilities. This guide does not require every reader to deploy every component.

## Architecture

This diagram shows the PostgreSQL profile; the [Convex profile](#convex-for-reactive-application-backends) uses its own database/function boundary.

```text
Browser
  │ HTML, assets, API requests
  ▼
CDN ── cached public assets and pages
  │ dynamic requests
  ▼
TanStack Start (React, on Workers or Bun)
  ├── server functions / API routes / oRPC handler
  ├── Better Auth session handler
  └── domain services: authorization and business rules
        ├── Drizzle ── connection management ── PostgreSQL
        ├── R2: uploads and generated files
        ├── Redis / Valkey: cache and transient state
        └── jobs / workflows ── external providers
```

The browser and server share schemas, not database models. A route validates untrusted input, calls a domain function, and returns a deliberately shaped result. This keeps authorization and business rules out of UI components and transport handlers.

## Core choices

| Layer | Default | Use it when | Reconsider when |
| --- | --- | --- | --- |
| Language | TypeScript with `strict` | The team and product are TypeScript-first | A CPU-bound service or existing Rust/Go platform dominates |
| Full-stack framework | [TanStack Start](https://tanstack.com/start/latest/docs/framework/react/overview) | You want typed routing, SSR, streaming, server functions, and Vite/Rsbuild deployment options | You require a framework with a fully stable release today; evaluate [React Router](https://reactrouter.com/) or a mature alternative |
| Build | [Vite](https://vite.dev/guide/) | Fast development and a portable production build | Your host requires a different official adapter |
| Application runtime | Cloudflare Workers for the edge profile; Bun for a regional server | Workers bindings and distributed ingress, or Bun execution close to PostgreSQL | Choose using database latency, runtime API support, and workload tests |
| Local tooling | Bun package manager and script runner | Fast installs, workspaces, and local execution | pnpm is a package-manager alternative; pin the runtime separately |
| Lint and format | [Ultracite](https://www.ultracite.ai/docs) presets over Biome | Consistent formatting, lint rules, and agent guidance | Ultracite over Oxlint + Oxfmt for a dedicated fast toolchain; preserve suitable existing configuration |
| Monorepo | Bun workspaces + Turborepo | Multiple deployables or genuine shared package/task boundaries, when dependencies support Bun | Use pnpm workspaces when Bun is unsuitable; one application can stay a single package |
| API contract | oRPC for TypeScript clients; OpenAPI for external/polyglot clients | Typed clients without hand-maintained DTOs | Convex-native functions in its backend profile; public APIs need language-neutral contracts |
| Application logic | Effect for nontrivial domain services and async processing | Typed expected failures, dependencies, resource scopes, and controlled concurrency | Plain functions and `async`/`await` are sufficient for simpler CRUD |
| Database | PostgreSQL | Transactions, relational queries, and a mature operational ecosystem | Convex backend profile for reactive application data; Turso for embedded data, sync, or independent tenant databases; a purpose-built store for another access pattern |
| SQL access | Drizzle ORM plus SQL migrations | Typed queries with a thin abstraction | Complex SQL or performance hot paths should use reviewed SQL directly |
| Validation | Zod through Standard Schema for new general-purpose/shared contracts | Runtime validation at every trust boundary | Valibot for browser bundle/integration needs; Effect Schema for Effect services; native Convex validators in its profile; retain suitable existing schemas |

As checked on 2026-09-15, TanStack Start is documented as a release candidate. Treat it as a deliberate choice: pin it, run upgrade tests, and keep the hosting adapter replaceable. Its server functions are not a reason to expose an internal database shape.

### React versus other frontends

- **React + TanStack Start:** the default here when ecosystem breadth, hiring, and typed routing matter.
- **React Router or Next.js:** reasonable choices when your organization already operates them or a stable release policy matters more than this guide's router choice.
- **SolidStart 2:** a strong alternative for fine-grained reactivity and a smaller client runtime; verify the libraries you need and your deployment adapter.
- **Astro:** prefer it for content-first pages. Add React/Solid islands only where interaction exists.

No framework guarantees a small page. Keep server-only code out of client imports, inspect the production bundle, and load interactive modules on demand.

### Native Bun capabilities

For Bun-hosted code or build tools, consider native APIs when they cover the required operations:

- **[S3Client](https://bun.com/docs/runtime/s3):** S3-compatible object access and presigned uploads, including R2. Verify the provider's required operations and credential/signing behavior; Workers can use its native R2 binding.
- **[Bun.SQL](https://bun.com/docs/runtime/sql):** PostgreSQL, MySQL, and SQLite access. Keep Drizzle's schema and reviewed migrations where selected. Its documented [Bun SQL/PostgreSQL](https://orm.drizzle.team/docs/connect-bun-sql) and [bun:sqlite](https://orm.drizzle.team/docs/sqlite/connect-bun-sqlite) adapters are distinct; verify the chosen dialect and driver rather than assuming every Bun SQL backend shares an adapter. Local SQLite is not a Turso integration.
- **[Bun.markdown](https://bun.com/docs/runtime/markdown):** straightforward build/server content rendering. As checked on 2026-10-08, the API is documented as unstable; pin and test it, and retain an existing content pipeline when its features are needed. Sanitize untrusted HTML output before rendering it.

These APIs require Bun execution. Using Bun to install or build an application does not make them available in browser code, Workers, or Convex functions. Preserve suitable existing SDKs when broader features or runtime portability matter.

## UI and browser state

- Start with [shadcn/ui](https://ui.shadcn.com/) and Tailwind CSS for new React UI without an existing design system. Add the components you need and adapt their source to the product. [Radix](https://www.radix-ui.com/) supplies accessible primitives used by many components; verify the chosen version's primitives and test the resulting UI. Astro pages and Solid UI can use framework-compatible components without adding React for this recommendation.
- Use CSS Modules or plain CSS when existing conventions or styling requirements favor them.
- Use [TanStack Query](https://tanstack.com/query/latest) for remote server state and cache invalidation. Use a small local store such as Zustand only for genuinely client-owned state (for example, a draft or interaction preference).
- Use TanStack Form or native forms with a Standard Schema validator. A form's server action must validate again; browser validation is an enhancement.
- Use TanStack Table for behavior and your design system for presentation.
- Use Lucide for consistent icons. [Motion for React](https://motion.dev/docs/react) (formerly Framer Motion) is recommended for coordinated transitions, layout animation, and gestures. Use CSS for simple transitions, respect reduced motion, and load animation code only on routes that need it.

## Images and delivery

Choose responsive markup, image transformation, and cached delivery together. A product gallery needs correctly sized variants and `srcset`/`sizes`; re-encoding an upload alone does not provide responsive delivery. Reserve lazy loading for off-screen images and discover the LCP image promptly.

- **[Astro `<Image>` / `<Picture>`](https://docs.astro.build/en/guides/images/):** start here in the content profile, using a deployment-compatible image service. A passthrough service performs no optimization.
- **[Unpic](https://unpic.pics/img/):** the recommended responsive component for provider-backed React/Solid images when the framework does not already supply a suitable component. Configure a supported CDN/service or a custom transformer; Unpic generates provider URLs and loading attributes, delegating processing to that provider.
- **[vite-imagetools](https://github.com/JonasKruckenberg/imagetools/blob/main/packages/vite/README.md):** build-time sizes, formats, and `srcset` data for imported static Vite assets, using Sharp underneath. Avoid processing the same asset through overlapping pipelines.
- **[Cloudflare Images transformations](https://developers.cloudflare.com/images/optimization/transformations/overview/):** managed transformation and edge caching, including an R2-backed design. R2 supplies storage; Images supplies processing.
- **[imgproxy](https://docs.imgproxy.net/):** a separate libvips-based HTTP image service when operating your own transformer fits the application; pair it with a CDN/cache.

**[Bun.Image](https://bun.com/docs/runtime/image)** is a conditional processing engine for Bun-hosted jobs or build tools, with native resizing and re-encoding without a separate addon. Use **[Sharp](https://sharp.pixelplumbing.com/)** when required formats or transformations favor its broader support; Sharp also runs under Bun. As checked on 2026-10-08, Bun's AVIF/HEIC support is unavailable on Linux and depends on OS codecs/hardware elsewhere. Verify the deployment target. Bun Image does not supply responsive markup or an automatic optimization/cache endpoint; existing [Next.js image optimization](https://nextjs.org/docs/messages/install-sharp) still requires Sharp with its standard optimizer.

Reuse build/upload-time variants where practical; choose cached on-demand transformation when changing sizes or media volume justify it. Key variants by source version and transform settings, preserving private-file authorization in originals, variants, and caches. Bound input bytes/pixels, source access, variants, and processing concurrency. Compare visual quality, output bytes, cold processing, cache hits, and cost before claiming one engine is better.

## API and domain boundaries

Use a vertical slice layout so a feature owns its route, schema, domain function, persistence, and tests:

```text
src/
  routes/                 # transport and page composition
  features/billing/
    billing.schema.ts
    billing.service.ts    # domain rules and authorization calls
    billing.repository.ts # database access
    billing.test.ts
  lib/
    auth/
    db/
    observability/
```

For oRPC, mount an `RPCHandler` in a framework server route and use a server-side client during SSR to avoid a needless loopback request. A TypeScript browser client can use the RPC contract directly. Expose an OpenAPI handler for consumers that need conventional HTTP routes or generated clients in other languages. Keep the transport error format stable and map database errors to safe public errors. Use oRPC documentation for the installed major version; examples across major versions can differ.

### Where Hono fits

[Hono](https://hono.dev/docs/) remains the recommended option for an independent lightweight HTTP API, a Worker serving webhooks, or a service shared by several frontends. It can host oRPC with middleware for authentication, tracing, CORS, and rate limiting. TanStack Start's own routes can host the same handler inside the web application; choose the boundary that matches deployment and ownership. Hono and oRPC solve different problems: HTTP routing/middleware and typed procedures/contracts.

### Type safety across boundaries

Keep `strict` enabled and validate incoming requests, environment variables, webhooks, and provider responses at runtime. Share public schemas and inferred types across UI and API. Keep database-only columns, secrets, and internal permission flags out of response DTOs. Database types document storage; runtime schemas and constraints enforce behavior. Add type-aware lint rules for floating promises and unsafe operations where useful.

For new general-purpose or shared contracts, start with [Zod](https://zod.dev/) through Standard Schema. Choose [Valibot](https://valibot.dev/guides/comparison/) when browser bundle constraints or integration support favor it, measuring the actual artifact before claiming a benefit. Retain an existing suitable validator and avoid duplicating the same contract across libraries. Effect services can use Effect Schema with its supported adapter.

Authenticate the request, then authorize the action against the resource. A user ID in input is not an authorization check. Add rate limiting, CSRF protection for cookie-authenticated mutations, request size limits, and idempotency keys for retried writes.

## Application reliability with Effect

**[Effect](https://effect.website/docs/v4/getting-started/why-effect)** is recommended for server-side domain services and async processing with substantial failure or concurrency handling: billing integrations, imports, provider calls, streaming, and AI orchestration. Its [`Effect<Success, Error, Requirements>` type](https://effect.website/docs/v4/getting-started/the-effect-type) makes expected failures and required services explicit. Unexpected defects remain possible and need reporting.

Use its resource scopes, cancellation, bounded concurrency, retry schedules, and tracing to give these operations a consistent lifecycle. For example, an import can limit concurrent provider requests, retry transient failures within a deadline, and release resources on completion or interruption. Propagate cancellation to SDKs and drivers that support it; interrupting a fiber alone cannot undo an external side effect.

Keep TanStack Start, Hono, and oRPC as transport boundaries. Implement domain operations in Effect, provide database/provider services through layers, and execute them through a configured runtime at the request or job boundary. Drizzle can remain behind a repository service. Map expected domain failures to the public API's documented errors, and connect request cancellation and trace context explicitly. Avoid rebuilding shared connection pools for every operation.

**Effect Schema** is a validation option when the service adopts Effect. Its [Standard Schema adapter](https://effect.website/docs/v4/schema/standard-schema) can expose compatible schemas to forms and API libraries; schemas passed through that adapter must not require decoding services. Keep Zod or Valibot where they remain a better fit, with deliberate boundaries rather than duplicate definitions of the same contract.

Effect adds a programming model to learn and execution overhead to measure. Plain functions and `async`/`await` remain appropriate for simpler services. Keep server-only dependencies out of browser imports and measure any client-side adoption. Ordinary fibers, retries, and in-memory queues do not persist work across restarts; retain a durable job/workflow system when that requirement exists.

As checked on 2026-10-07, **[Effect 4.0](https://effect.website/blog/releases/effect/40)** is stable and has a published long-term support policy, while some modules retain unstable or experimental status. Pin compatible versions and use documentation for the installed major. Its [Bun platform integration](https://effect.website/docs/v4/platform/introduction) supports the regional runtime profile; on Workers, choose compatible integrations and test in `workerd`. The reported v4 improvements compare Effect versions, not Effect against equivalent plain TypeScript.

## Data and infrastructure

### PostgreSQL and Drizzle

Validate Drizzle migrations in CI and apply them through a controlled deployment step, with a least-privilege application role, statement timeouts, and indexes derived from real query plans. Keep transactions short. Back up the database and periodically restore a backup into an isolated environment. Drizzle is a query and schema tool; it does not replace a data model, migration review, or database observability.

### Turso and embedded SQLite-compatible data

**[Turso](https://docs.turso.tech/introduction)** is a database alternative when the application benefits from embedded SQL, local operation with synchronization, or independent databases per tenant, user, or agent. This profile can be selected at launch. PostgreSQL remains the general default for shared relational data and its established operational ecosystem.

Distinguish **libSQL**, the older SQLite-derived engine, from **Turso Database**, the newer engine written in Rust, and from **Turso Cloud**, the managed service. Their SDKs and behavior differ. The newer engine supports MVCC with `BEGIN CONCURRENT`; its [0.8 release](https://turso.tech/blog/turso-0.8.0) improves concurrent writes. SQLite's traditional single-writer limitation should not be applied to every Turso deployment. As checked on 2026-10-07, the [project FAQ](https://github.com/tursodatabase/turso#faq) reports production use but a pre-1.0 engine with compatibility gaps and experimental features.

[Drizzle's libSQL integration](https://orm.drizzle.team/docs/sqlite/connect-turso) provides a documented TypeScript path. Confirm support for the specific engine and SDK selected; changing from PostgreSQL requires reviewing SQL dialect, schemas, types, constraints, and migrations. Check the authentication adapter and other database integrations too.

Choose an explicit access and consistency model:

- **Remote access:** use a supported HTTP client on Workers or a server. Requests still cross a network; managed SQLite-compatible SQL does not imply local-query latency.
- **Embedded access:** run the database in a compatible application runtime with storage that meets durability requirements. Local queries avoid the database network hop. A persistent local replica is not available in every serverless environment.
- **Synchronization:** [Turso Sync](https://docs.turso.tech/sync/usage) reads and writes locally, with explicit push/pull operations and documented last-push-wins conflict handling. Legacy [libSQL embedded replicas](https://docs.turso.tech/features/embedded-replicas/introduction) forward writes to the primary by default. Specify which mode is used, acceptable staleness, and how conflicts affect business invariants.

Databases per tenant provide a useful isolation and distribution boundary, but require fleet-wide migrations, provisioning, backups, and a separate plan for cross-tenant reporting or transactions. Benchmark representative reads and writes, contention, sync lag, recovery, and cost. Keep independent backups and test restoration; low local latency and a large database fleet do not establish unlimited write capacity or global transactional consistency.

### Convex for reactive application backends

**[Convex](https://docs.convex.dev/functions/overview)** is an optional backend profile for applications such as live dashboards, chat, and shared collaborative tools, where reactive data subscriptions and an integrated TypeScript backend simplify development. Compare its document/query model with the application's SQL/reporting, integration, hosting, and portability requirements. PostgreSQL remains the general relational default; preserve a suitable existing backend.

For data owned by Convex, use its schemas, indexes, database functions, and generated client. This changes the database/API boundary: Convex takes the role of PostgreSQL/Drizzle and oRPC there. Its React client and documented [TanStack Start integration](https://docs.convex.dev/client/tanstack/tanstack-start/) support reactive queries; another store, API, or mirrored client cache needs a distinct purpose.

Queries read reactive data, mutations enforce atomic database changes, and actions handle external services. Queries/mutations must remain deterministic. An action's separate database calls and provider effects are not one transaction, so idempotency and reconciliation still matter. Use native [argument/return validators](https://docs.convex.dev/functions/validation) and enforce resource/tenant authorization inside Convex, even when the browser calls it directly. Verify authentication for both browser and SSR.

Native [scheduling](https://docs.convex.dev/scheduling/scheduled-functions) can cover suitable background jobs, with scheduling from a mutation committed atomically. Scheduled actions are not automatically retried, and caller authentication is not propagated; required retries/reconciliation and authorization context need explicit handling.

Convex functions use [Convex's runtime](https://docs.convex.dev/functions/runtimes), with Node actions available for dependencies that need them; Bun remains the compatible local-tooling choice. Bound reads and subscriptions, and evaluate limits, contention, traffic, and cost with representative users/data. Choose managed or [self-hosted](https://docs.convex.dev/self-hosting) operation deliberately, with compatible schema/client deployments and a tested recovery/export plan. A small realtime demo does not establish production capacity or latency.

### Cache

Start with database queries and HTTP/CDN caching. Use managed Redis or Valkey for hot data, distributed rate limits, or ephemeral coordination. Define a key format, TTL, invalidation rule, maximum value size, and behavior when the service is unavailable. Read caches can fall back to the authoritative database within a bounded load budget; security-sensitive rate limits and session checks need an explicit fail-closed or fail-open policy.

Use a Workers-compatible client for edge access and account for the extra network hop. Distributed locks require lease expiry, fencing or another stale-writer defense, and a clear ownership model. Use database transactions and constraints for business invariants such as preventing duplicate payments.

### Files

Native Convex storage is an option in its profile when delivery and recovery needs fit. Its [direct file URLs](https://docs.convex.dev/file-storage/serve-files) remain usable without further app authentication; if every download needs authorization, use authenticated delivery and verify its response-size limits.

Use S3-compatible object storage such as Cloudflare R2 for user uploads and generated files. Upload directly with short-lived signed URLs, validate content type and size server-side, store metadata in the selected database, and scan or transform untrusted files before serving them. R2 is object storage, not a transactional database.

### Jobs

Use [Inngest](https://www.inngest.com/) for event-driven workflows with durable steps and retries. Choose [Trigger.dev](https://trigger.dev/) for its task execution model and workloads needing a dedicated execution environment. On Cloudflare, use Queues for message delivery and Workflows for durable orchestration; these are different responsibilities.

In the Convex profile, native scheduling can cover suitable jobs; compare its guarantees with required execution/recovery behavior before adding another platform.

Typical uses include notifications, scheduled tasks, imports, file processing, and AI workflows. Every job needs a stable idempotency key, retry policy, timeout, failed-job handling, and a way to inspect and replay failures. At-least-once delivery can run a job more than once. Use a transactional outbox or the selected backend's atomic scheduling when a database update and an event must survive failures together.

## Application platform capabilities

These recommendations complete the product platform. Add them when the corresponding feature is required, including at launch.

### Email

**Default: Resend** for TypeScript-friendly transactional mail. **Postmark** is an alternative for transactional delivery workflows; **AWS SES** is attractive for volume pricing and existing AWS operations. Compare delivery, region availability, suppression handling, templates, and support. Queue mail outside the request path and handle bounces and complaints.

### Payments

**Default: Stripe** for subscriptions, payments, and billing integrations. **Paddle** and **Lemon Squeezy** offer merchant-of-record models, which change responsibility for tax and transaction handling; compare eligibility, countries, fees, and product restrictions. Verify webhook signatures, deduplicate event IDs, and make fulfillment idempotent. Protect state transitions from out-of-order events and reconcile with authoritative provider state after missed or ambiguous deliveries.

### Analytics and feature flags

**Default: PostHog** for product analytics, feature flags, session replay, and experiments. Define a stable event taxonomy and a safe default for each flag. Redact sensitive replay fields and control capture volume. Track the SDK's browser cost and avoid delaying rendering to initialize analytics.

### Search

| Choice | Recommended use | Main tradeoff |
| --- | --- | --- |
| PostgreSQL full-text search | Search transactional data with existing filters and joins | Ranking and typo tolerance need additional design |
| Meilisearch | Responsive product search with typo tolerance and filters | A separate index needs synchronization and rebuilds |
| Algolia | Managed search with hosted relevance and delivery tools | Usage costs and provider dependence |
| Elasticsearch / OpenSearch | Rich search, aggregations, and larger search platforms | Greater tuning, memory, and operational requirements |

Choose using relevance tests and response-time targets as well as data size. Track indexing lag, deletion propagation, and recovery from an index rebuild.

### Internationalization

**Default: Paraglide.js** when compiled messages and typed message access fit the framework. **i18next** suits runtime resource loading and an established translation ecosystem. **FormatJS** suits ICU messages and Intl-based formatting. Verify SSR locale isolation, localized URLs, plural rules, and extraction workflows. Load only the locale data a route needs.

### AI

**Default: [Vercel AI SDK](https://sdk.vercel.ai/)** for streamed responses, provider abstraction, and tool calling in TypeScript. **LangChain** is an option for orchestration and integrations; **LlamaIndex** is an option for ingestion, indexing, and retrieval workflows. These libraries overlap in some features but do not replace one another in every role. A provider's direct SDK is often sufficient for a single simple integration.

Choose based on the actual task and supported runtime. Keep provider calls behind a domain interface, bound time and token use, propagate cancellation, and validate model output. Authorize tool actions independently from the model's request. Evaluate quality, latency, and cost together.

## Hosting choices

Pick one primary hosting shape and document its constraints.

- **Cloudflare Workers:** useful for globally distributed request handling, CDN integration, R2, Queues, and Durable Objects. Use the official [Cloudflare Vite plugin](https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack-start/) and test all dependencies in `workerd`.
- **Bun server:** use a supported TanStack deployment adapter and Bun production target, such as [Nitro's Bun preset](https://nitro.build/deploy/runtimes/bun), for a regional server close to PostgreSQL. Verify SSR, auth, streaming, and database behavior on the built artifact.
- **Edge plus centralized PostgreSQL:** add Hyperdrive for connection pooling and optional read-query caching, or use Worker Placement to run near the database. Hyperdrive does not invalidate cached reads after writes; use a cache-disabled path where read-after-write consistency matters.

Workers implements only part of Node's API surface; compatibility shims can import successfully and still throw at runtime. Do not select edge merely because it is geographically distributed. A single region near the data often wins for a write-heavy application.

Bun runs local tools and can run a regional application server; it does not run inside Workers. pnpm replaces the package manager, not the application runtime. Add Node.js only for a verified dependency/host requirement Bun cannot satisfy, documenting and testing the exception. Node-oriented compatibility metadata alone does not require an additional runtime. Fast package installation does not by itself improve request latency.

## Authentication and authorization

[Better Auth](https://www.better-auth.com/docs/integrations/tanstack) integrates with TanStack Start and can manage sessions and common providers. Alternatives include Auth.js, Clerk, WorkOS, and a self-hosted OIDC provider. Choose based on compliance, account ownership, enterprise SSO, and operating capacity.

Use secure, httpOnly, appropriately scoped cookies for browser sessions; rotate session identifiers after sign-in and privilege changes; require MFA or passkeys for sensitive actions; and store secrets in the host's secret manager. Model authorization as application policy (RBAC, ABAC, or relationship checks) and test denial cases.

## Observability and reliability

Instrument the request, database, queue, and provider boundaries with [OpenTelemetry](https://opentelemetry.io/), using an SDK/exporter supported by the deployment runtime. Send errors to Sentry and choose a metrics/traces backend with the retention and query features the team needs.

| Option | Primary reason to choose it |
| --- | --- |
| Sentry | Application errors, releases, and supported tracing/profiling integrations |
| Honeycomb | Investigation using distributed traces and rich event attributes |
| Datadog / New Relic | Managed application and infrastructure observability across services |
| Grafana with metrics, logs, and trace backends | Control over a composable observability platform, self-hosted or managed |

OpenTelemetry supplies instrumentation and export interfaces; it is not the storage backend. Record request IDs, deployment version, latency, and status. Put high-cardinality identifiers in appropriately sampled traces/logs, not unbounded metric labels. Never log tokens or personal data by default.

Set an SLO for the user-visible path, alert on an error-budget burn rate, and practice rollback. Required production controls include:

- automated backups and a tested restore
- health and readiness checks
- graceful shutdown and bounded retries
- dependency timeouts and circuit-breaking where appropriate
- migration compatibility across the deploy boundary
- dependency and secret scanning
- a documented incident and rollback procedure

## Testing and delivery

- Type-check with `tsc --noEmit` in CI even if a faster compiler is used for builds.
- Use **Ultracite by default** as the preset and CLI layer over Biome for integrated formatting/linting, or over Oxlint + Oxfmt when that toolchain is selected. It configures and invokes these tools; keep ESLint only for necessary uncovered rules.
- Vitest for unit and domain tests; Testing Library for behavior-focused component tests; Playwright for browser journeys; Testcontainers for a small set of real PostgreSQL integration tests.
- Run accessibility checks, production builds, migrations, and a smoke test in CI. Keep contract tests for every external webhook and public API.
- Use [Renovate](https://docs.renovatebot.com/modules/manager/bun/) by default for dependency-update PRs in maintained repositories. Dependabot or existing automation is suitable when it covers the repository's needs. Review lockfiles/changelogs, group coupled toolchain upgrades, and validate them before merging.

Choose Ultracite's `core` and applicable framework presets, such as React/TanStack for the application profile or Astro for content. Pin compatible Ultracite and engine versions, expose local `check`/`fix` scripts, and run the non-mutating check in CI. Keep separate TypeScript checking. Review and merge its generated agent rules with project instructions; select editor integration and supported agent hooks for the tools the team uses. These integrations are separate setup choices, not additional required runtimes. Preserve suitable existing configurations during scoped fixes.

Expose one documented `bun run verify` command (or existing equivalent) for applicable non-mutating types, lint/format, meaningful local tests, and contract checks. Keep builds, live-service checks, migrations, and deployment explicit. Prefer stable compatible release combinations; document and pin any required prerelease adapter with its support limits and validation/fallback.

Use Bun with an explicit `--linter biome` or `--linter oxlint` during [setup](https://www.ultracite.ai/docs/setup), and verify actual Bun execution for the selected release; listing `bunx` alone does not establish runtime compatibility. Ultracite currently recommends Oxlint + Oxfmt upstream, but this guide retains Biome as its integrated default. Choose the engine using required rule coverage, plugin support, and repository timings.

For an application with genuinely shared packages, a possible repository shape is:

```text
apps/web
packages/ui
packages/config
packages/contracts
packages/db
packages/auth
infra/
docs/adr/
```

Do not create a package for every folder. A package should have an owner, a stable boundary, or an independent release need. One application can remain a single package, while shared libraries can justify workspaces even with only one deployable.

Use Bun workspaces and Turborepo when packages share a build graph. Pin Bun and dependencies, commit the lockfile, and use frozen installs in CI. `bun run` can honor an executable's Node shebang; use Bun's documented `--bun` option when the tool supports Bun and the intention is Bun execution. Workers integration tests should run in Cloudflare's supported Vitest integration or a deployed preview. Testcontainers can use a compatible rootless Podman setup; verify its container API integration.

Declare package exports and task dependencies, keeping server-only code out of browser imports. [Cache reproducible tasks](https://turborepo.dev/docs/crafting-your-repository/caching) with their inputs, outputs, and [build-affecting environment values](https://turborepo.dev/docs/crafting-your-repository/using-environment-variables). Keep code generation separate from deploy/migration commands; external mutations and persistent tasks must execute rather than be restored from cache. Exclude secrets/private data from cached artifacts and logs.

For Effect services, test expected-error mapping, cancellation, resource cleanup, concurrency limits, and retry deadlines with replaceable provider services. For a Turso deployment, run database integration tests against the selected engine and access mode, including synchronization conflicts, contention, restarts, and backup restoration.

## Performance acceptance criteria

Use real devices and the 75th percentile of field data. The current Core Web Vitals “good” thresholds are LCP ≤ 2.5 s, INP ≤ 200 ms, and CLS ≤ 0.1. These are user-experience targets, not a promise that every route will meet them.

Track server time to first byte, cache hit rate, query latency, bundle size by route, JavaScript execution time, error rate, and cost per request. Profile the affected path and address its dominant costs: unnecessary work, browser/server placement, safe caching, bytes, queries, or execution. Choose placement from the interaction and data needs rather than moving every operation to a server. A benchmark without workload, region, device, and measurement method is not evidence.

## Complete stack summary

| Category | Recommended starting point | Alternatives or scale path |
| --- | --- | --- |
| Framework | TanStack Start | React Router, Next.js, SolidStart 2, Astro |
| Language | TypeScript, strict mode | Rust/Go service for a measured native hot path |
| Runtime | Cloudflare Workers or Bun, selected by deployment shape | Node.js only for a verified dependency/host requirement Bun cannot satisfy |
| Build | Vite | Rsbuild where its ecosystem or build graph is a better fit |
| Lint and format | Ultracite presets + Biome | Ultracite + Oxlint/Oxfmt; suitable existing configuration; supplementary ESLint for uncovered rules |
| Workspace | Bun workspaces + Turborepo | pnpm workspaces; a single application may need neither |
| API | oRPC for TypeScript; OpenAPI for external clients | Hono as an independent HTTP edge/API framework; Convex-generated functions in its profile |
| Application logic | Effect for nontrivial domain services and async processing | Plain functions and `async`/`await` for simpler services |
| UI | shadcn/ui + supported accessible primitives + Tailwind for React | Framework-compatible components; CSS Modules/native CSS; an existing design system |
| State | TanStack Query + component state | Convex reactive integration in its profile; Zustand for client-owned state where needed |
| Forms | TanStack Form or native forms | Server actions with schema validation |
| Tables | TanStack Table | A specialized grid for virtualization/export requirements |
| Validation | Zod via Standard Schema for new general-purpose/shared contracts | Valibot for browser bundle/integration needs; Effect Schema for Effect services; native Convex validators in its profile |
| Database | PostgreSQL + Drizzle | Convex backend profile for reactive application data; Turso for embedded data, sync, or tenant databases; reviewed SQL or a purpose-built store |
| Cache | CDN/HTTP cache | Redis or Valkey for hot data and coordination |
| Files | Cloudflare R2 or S3-compatible storage | Native Convex storage in its profile; specialized media processing/delivery |
| Images | Supported framework components or Unpic with reusable variants | vite-imagetools for static assets; Bun Image or Sharp for processing; Cloudflare Images or imgproxy for delivery |
| Native Bun APIs | S3Client, SQL, or Markdown when Bun execution and requirements fit | Runtime-compatible SDKs, platform bindings, or an existing content pipeline |
| Jobs | Inngest, Trigger.dev, or Cloudflare Queues/Workflows | Native Convex scheduling in its profile; a dedicated queue/event platform for proven scale |
| Email | Resend | Postmark, AWS SES |
| Payments | Stripe | Paddle, Lemon Squeezy (merchant of record) |
| Analytics | PostHog | A privacy-focused or warehouse-native analytics system |
| Search | PostgreSQL full-text search | Meilisearch, Algolia, OpenSearch/Elasticsearch |
| Internationalization | Paraglide.js | FormatJS, i18next |
| AI | Vercel AI SDK | Direct provider SDK, LangChain, LlamaIndex |
| Observability | OpenTelemetry + Sentry | Honeycomb, Datadog, New Relic, Grafana stack |
| Tests | Vitest, Testing Library, Playwright | Workers Vitest integration, Testcontainers |
| Dependency updates | Renovate for maintained repositories | Dependabot or existing suitable automation |

## Decision record

For material architecture choices or deviations from defaults, record:

1. the bottleneck or requirement;
2. relevant alternatives and the reason for the choice;
3. operational ownership and failure behavior;
4. data and security implications;
5. a removal or replacement path;
6. the metric that will tell you whether it helped.

This keeps the stack current without turning the README into a list of fashionable dependencies.

## Further reading

- [TanStack Start overview](https://tanstack.com/start/latest/docs/framework/react/overview)
- [TanStack Start hosting](https://tanstack.com/start/latest/docs/framework/react/guide/hosting)
- [Cloudflare Workers Node.js compatibility](https://developers.cloudflare.com/workers/runtime-apis/nodejs/)
- [Cloudflare Hyperdrive](https://developers.cloudflare.com/hyperdrive/concepts/how-hyperdrive-works/)
- [Core Web Vitals](https://web.dev/articles/vitals)
- [OWASP Application Security Verification Standard](https://github.com/OWASP/ASVS)
- [Bulletproof React](https://github.com/alan2207/bulletproof-react)
- [System Design Primer](https://github.com/donnemartin/system-design-primer)
- [Vite](https://vite.dev/guide/)
- [Bun runtime](https://bun.sh/docs/runtime)
- [Hono](https://hono.dev/docs/)
- [Effect programming model](https://effect.website/docs/v4/getting-started/why-effect)
- [Effect Schema and Standard Schema](https://effect.website/docs/v4/schema/standard-schema)
- [Turso engines and production status](https://github.com/tursodatabase/turso#faq)
- [Turso Sync](https://docs.turso.tech/sync/usage)

## License and scope

MIT; see [LICENSE](LICENSE). The sample photograph has its own [attribution and terms](THIRD_PARTY_NOTICES.md).

Treat this repository as an opinionated starting point. Review licenses, data residency, provider terms, accessibility, and threat models before production use. “Best” depends on the workload, team, region, and constraints that you can measure.
