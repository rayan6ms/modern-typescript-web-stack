# Architecture and runtime profiles

Use for new architecture or changes to framework, rendering, deployment target, API/data ownership, or service boundaries. Apply the [core policy](../AGENTS.md) and the sections relevant to the affected boundary.

## Establish the application profile

Establish rendering, data/tenant ownership and consistency, deployment constraints, capabilities, and acceptance criteria for new architecture. Update affected decisions only for incremental work. Record material choices in existing docs/handoff notes. Start with one deployable and required services; static content may omit the server/database.

## Technology selection rules

| Concern | Default | Conditional alternative |
| --- | --- | --- |
| Application language | TypeScript with `strict` | A native service only for an existing platform or measured workload requiring it |
| Interactive full-stack web | React + TanStack Start | React Router or Next.js for release policy, host support, or existing operations; SolidStart for an appropriate ecosystem/runtime tradeoff |
| Content-first site | Astro with minimal interactive islands | Full application framework when authenticated interactions require it |
| Build | Framework-supported Vite | Rsbuild or another supported build path when compatibility or measured build requirements justify it |
| Local runtime and package manager | Bun | pnpm for package management when Bun is unsuitable; npm only when both are unsuitable |
| Application runtime | Bun for regional execution, Workers for a compatible edge profile | Node.js only for a verified dependency/host requirement Bun cannot satisfy |
| Typed application contract | oRPC for TypeScript consumers | OpenAPI for external, public, mobile, or polyglot consumers; generated Convex functions in its backend profile |
| Independent HTTP service | Hono | Framework server routes when a separate service boundary is unnecessary |
| Domain and async services | Effect for substantial failure, resource, or concurrency handling | Plain functions and `async`/`await` for simpler services |
| Transactional database | PostgreSQL | Convex backend profile for reactive application data; Turso for embedded data, sync, or independent tenant databases; another store for a demonstrated access pattern |
| SQL access | Drizzle + reviewed SQL migrations | Direct reviewed SQL for complex queries and hot paths |
| Runtime schemas | Zod through Standard Schema for new general-purpose/shared contracts | Valibot for browser bundle/integration needs; Effect Schema for an Effect service; native Convex validators in its backend profile |
| UI | shadcn/ui + supported accessible primitives, Tailwind for React | Framework-compatible components, CSS Modules/native CSS, or an existing design system |
| Remote state | TanStack Query where caching/refetching is needed | Framework route data alone when sufficient; supported Convex reactive client/integration in its profile |
| Local state | Component state | Zustand for shared client-owned state with a real ownership boundary |
| Workspace | One application | Bun workspaces + Turborepo for actual shared packages or multiple deployables |
| Tests | Vitest, Testing Library, Playwright | Supported Workers integration for `workerd`; real-database integration tests for persistence |
| Lint and format | Ultracite presets + Biome | Ultracite + Oxlint/Oxfmt; supplementary ESLint for necessary uncovered rules |
| Dependency updates | Renovate for maintained repositories | Dependabot or existing suitable automation |

Overlapping frameworks, validators, stores, and orchestrators need distinct roles. Evaluate application behavior, not popularity or install speed.

Selected backend profiles override overlapping defaults at their data/API boundary. Apply shared correctness/security requirements through that profile; do not install every profile's services.

Keep suitable existing validators; use Zod for new general-purpose/shared schemas unless integration or browser budgets favor Valibot. Verify bundle-size claims and share one wire contract. Use Effect Schema within selected Effect services and native validators at Convex boundaries; avoid duplicating schemas solely to follow a default.

## Rendering and deployment profile

### Content profile

Use Astro pre-rendering and React/Solid islands for identified interactions. Add sessions, SSR, persistence, or APIs only for required behavior.

### Regional application profile

Run the supported Bun production build near its authoritative data and latency-sensitive providers. Verify applicable auth, database, streaming, shutdown, and artifact behavior; a working development server does not establish production compatibility.

### Workers profile

Choose Workers for compatible distributed request handling and relevant platform bindings. Use the framework's supported Cloudflare integration. MUST test runtime behavior in `workerd` with the supported integration or an authorized preview.

Do not equate Workers with Bun or a full Node runtime. Check supported APIs, shims, native modules, filesystem assumptions, CPU limits, request lifetime, and background execution. For PostgreSQL, evaluate Hyperdrive and Worker Placement using actual database distance and sequential query count. Hyperdrive read caching does not automatically invalidate on writes; use a cache-disabled path for read-after-write requirements.

In every profile, cache only data whose freshness and authorization rules permit it. Partition private caches by the correct identity/tenant or bypass shared caching. Set deliberate cache headers and invalidation rules.

## Official documentation

Use documentation matching the installed version.

- [TanStack Start](https://tanstack.com/start/latest/docs/framework/react/overview)
- [Cloudflare Workers compatibility](https://developers.cloudflare.com/workers/runtime-apis/nodejs/)
- [Hyperdrive behavior](https://developers.cloudflare.com/hyperdrive/concepts/how-hyperdrive-works/)
