# LiveBoard foundation and decisions

Authoritative continuation record. Updated 2026-10-08. This is initial setup, not a finished planning application. Decision states describe choices; verification below describes evidence.

## Brief and constraints

Small teams will share boards and update items online, with reactive updates and reconnect refresh. Authentication and board membership are mandatory before private data. Initial scope: English public shell and account-free backend/client configuration, no domain tables or fake board data. User estimate: 50 teams of 5–10 members; no benchmark, latency budget, or capacity result exists. Offline writes, CRDTs, and custom synchronization are out of scope.

Approximate total budget: US$50/month, subject to checking current Convex pricing before provisioning. No credentials, deployment, region, identity provider, or app hosting choice are supplied. No remote provisioning, login, function deployment, publishing, paid resources, or production migrations are authorized. Optional queue, object store, payments, SQL reporting and public API remain unselected. Install and verify locally with bounded resources; commit locally without pushing; stop owned services.

Continuation inspection found an empty Git repository with no commits, files, or existing instructions. No prepared code was discarded and no generator was rerun. Only this repository and task-owned verification resources may be modified.

## Profile provenance

- Selected package: `modern-typescript-web-stack`; supplied frozen profile, revision unknown.
- Source: user-supplied `inputs/modern-typescript-web-stack` package for this kickoff; upstream URL/revision not provided.
- Snapshot date: 2026-10-08. Local core: [stack/AGENTS.md](stack/AGENTS.md); complete unchanged references: `docs/stack/references/`.
- Core SHA-256: `5f07e66c1ea61306b6b5cbcb2e2f0ad2e1b70683ba0e4c4c7bcbb9fe445e6ae4`.
- Future work reads the local snapshot; no original checkout, global skill, or conversation is required. Snapshot updates are scoped policy changes, never automatic resynchronization.

## Material decisions

### D01 — Chosen: application and runtime defaults

Strict TypeScript, React 19, TanStack Start and supported Vite; one app deployable. Bun is the local package manager/tool runtime and local production target. Nitro's supported Bun preset produces the SSR server. Hosting provider remains D05. Manual official setup avoids unrelated starter features. No Hono, Effect, workspaces or orchestrator are needed for this shell.

### D02 — Chosen: minimal UI and tooling

Tailwind for responsive semantic HTML; no shadcn component is needed for static text/links. Ultracite core/React presets over Biome with separate strict TypeScript checks. Renovate configuration and a minimal GitHub check workflow are prepared as local files; no remote automation is enabled. Generated route code and the unchanged policy snapshot are excluded from formatting. Markdown, YAML, env files and Bun lockfiles receive manual review rather than a false claim of Biome coverage. No test framework or empty tests are added: HTTP and browser checks cover the actual shell; future behavior requires focused tests.

### D03 — Chosen: Convex owns future shared data/functions

Explicit user choice, refining the profile's PostgreSQL/Drizzle and oRPC defaults only at the board data/functions boundary. Convex's integrated functions, native validators and generated API are intended to support reactive shared state. User accepts hosting/portability tradeoffs; no second relational store is requested. Online-first behavior and modest estimated usage fit a trial, but neither performance nor cost has been demonstrated. Future queries/reporting/export must be assessed against actual access patterns and provider limits.

Prepared scope: installed SDK/CLI, `convex.json`, an empty functions boundary documented in `convex/README.md`, and an optional browser-only React provider. No schemas, functions, generated API, fake URLs or backend process. With an absent/invalid URL the provider stays inactive. A valid public managed deployment URL may initialize the client in a browser effect; close it on unmount. There are no calls, subscriptions, auth tokens, SSR clients, private caches or server data. A configured URL never means connected/authenticated. The shell's status remains pending until product integration is implemented and verified. Standard Convex React hooks are supported by Start; add Query integration only if future loaders/SSR caching need it.

### D04 — Deferred: managed deployment, region, access, pricing and recovery

Managed Convex is the chosen mode; its deployment, region and plan remain undecided. Safe behavior: no provisioning and no active backend without a real URL. Independent shell checks proceed; data/function deployment, code generation, connectivity/subscriptions and recovery verification are blocked.

Trigger: before the first hosted backend setup or data/function scaffold. Ask: **Which supported Convex region and plan fit the team's residency/latency needs and approximately US$50 total monthly budget, and is creating a development deployment authorized?** Check current pricing/limits and expected subscriptions/storage/function usage; settle export/recovery requirements. Obtain access privately only after authorization. Then run the installed CLI to create/configure the approved development deployment and generate code; do not handwrite `_generated` files. Put only its public URL in `VITE_CONVEX_URL`, deployment selector in ignored `.env.local`, and secrets in private provider/local storage. Rebuild Vite after changing public configuration.

### D05 — Deferred: identity and tenancy

Identity provider and membership roles are deliberately undecided. Safe behavior: public shell only, no private queries/writes or auth UI. These choices block private board implementation, but not local rendering.

Trigger: before private board functions, membership or authenticated SSR. Ask: **Which identity provider supports the required browser and server Convex flows, who owns/invites/manages each board, and what membership roles are required?** Verify current compatibility; configure verified identity and tenant/resource authorization in every Convex function. Test unauthenticated, nonmember and cross-team denial before real private data. Never trust client IDs or UI gating.

### D06 — Deferred: app hosting and operations

App hosting provider and region remain deliberately undecided. Safe behavior: local Bun production target only, no publication. Independent local app work proceeds; remote deployment and host-specific configuration/checks remain blocked.

Trigger: before publishing the app. Ask: **Which app host and region fit Convex locality and the total budget, and is deployment authorized?** Local Bun build verification is not host verification. Set deployment env, health/shutdown, observability, recovery and rollback controls for the chosen target. Confirm private SSR caches/identity are per request if added.

## Implementation and commands

All commands run at the repository root. Bun 1.4.0 is installed; no shared toolchain changes. Exact top-level versions are in `package.json`; Bun owns `bun.lock`. React/DOM 19.3.0, Start 1.168.60, Router 1.170.41, Vite 8.3.4/plugin-react 6.1.2, Nitro 3.0.260903-beta, Convex 1.46.0, Tailwind 4.3.3, TypeScript 6.0.3, Ultracite 7.12.4/Biome 2.5.15. Nitro's Vite integration is actively developed and pinned; toolchain upgrades require coupled validation. TypeScript 6 preserves the JavaScript API used by tooling; no TypeScript 7 native compiler is needed.

```sh
bun install --frozen-lockfile --network-concurrency 4
bun run build
bun run typecheck
bun run check
bun run dev
```

Build first on a fresh checkout to generate `src/routeTree.gen.ts`. Generated route code is committed for discoverability; Vite refreshes it when routes change. Dev binds only `127.0.0.1:3000` and refuses occupied ports. Stop a foreground service with Ctrl-C. Use a free alternative port via `bun run dev --port 43173` if necessary; never terminate another listener.

```sh
NITRO_HOST=127.0.0.1 PORT=43173 bun run start
```

Production artifact expected at `.output/server/index.mjs` with client assets in `.output/public`. Build bounds Rust workers and libuv to two jobs; checks bound Biome threads to two. No database/container/service is necessary to render. Do not run `convex dev` merely to check the public shell: it may provision/deploy. Offline CLI help is safe: `bun --bun convex --help`.

## Verification state

Tested 2026-10-08 on Linux x64 with Bun 1.4.0, against the final application/configuration files and lockfile in the initial local foundation commit. No application changes followed these checks; final edits only recorded handoff results. The listener's executable was confirmed as `the installed Bun executable` (its compatibility process title can say `node`). No runtime was replaced.

- **Passed:** `bun install --network-concurrency 4` and `bun install --frozen-lockfile --network-concurrency 4`; exact selected packages installed and the lockfile remained unchanged on frozen installs.
- **Passed:** `bun --bun convex --help`; installed CLI runs under Bun without provisioning. Config keys/schema were checked against the installed Convex package. No deployment or function generation command ran.
- **Passed:** `bun run typecheck` after route generation; strict application and Vite configuration checks. Dependency declarations use `skipLibCheck`; this does not validate the SDK internals or future functions.
- **Passed:** `bun run check`; Biome checked 11 authored TS/TSX/CSS/JSON files with Ultracite core/React. Initial failure was formatting/config-pattern fixes and prohibited `void` in async cleanup; reviewed safe fixes and a static cleanup-error handler resolved it. Generated route declarations contribute to router type inference, but the generator marks its implementation `@ts-nocheck`; it is also excluded from formatting. No authored source uses compiler suppressions or loose types. Markdown/YAML/env/lockfiles were manually reviewed.
- **Passed:** `bun run build` after the fixes; actual Nitro `bun` output at `.output/server/index.mjs` and `.output/public`. Upstream Nitro/Rolldown emitted code-splitting debug-name and React Router `use client` bundling warnings. These did not fail the build or observed SSR/hydration; they are not suppressed. No RSC or production compatibility claim beyond this shell.
- **Passed:** `NITRO_HOST=127.0.0.1 PORT=43173 bun run start`; a Bun `bun`-preset SSR server started on loopback. HTTP smoke assertions checked `/` = 200 with English/pending-backend content, all three referenced JS/CSS assets = 200 with matching MIME types, and `/not-a-route` = 404 with the return link. The production host variable was corrected from an initial untested `BUN_HOST` draft after reading Nitro's installed runtime (`NITRO_HOST`/`HOST` are supported).
- **Passed:** T3 collaborative browser inspection of built output at 1440×900 and 390×844 CSS pixels: readable responsive layout, no horizontal overflow, actual hydrated React DOM, no console errors/failed asset requests, and no Convex requests with URL absent. Tab focused the visible skip link; Enter transferred focus to `main`. Visual/keyboard checks are scoped evidence, not a WCAG certification or field performance measurement.
- **Passed:** `VITE_CONVEX_URL=not-a-url bun run dev --port 43173`; dev startup and HTTP 200, hydrated shell, honest pending status, no Convex resources or browser errors. An immediate check before module loading finished showed hydration pending; a bounded wait confirmed completion. No valid deployment URL was invented or contacted.
- **Passed:** shutdown. Built server (PID 20518) stopped via its own foreground Ctrl-C with successful graceful-close message. Dev servers (PIDs 20860 and 21246, with their Bun launchers) stopped via their task-owned foreground sessions. PID checks and `ss -ltnp '( sport = :43173 or sport = :3000 )'` confirmed no owned listener/process remained. Task-owned browser tabs were closed. Restart with the documented commands; no persistent backend/container was started.
- **Passed:** copied profile content/layout and local Markdown-link validation; root guidance reaches the decision record and complete local profile. Environment ignore rules keep `.env.local`/deployment credentials out while tracking `.env.example`. Final staged whitespace check is part of local commit verification.
- **Not run / blocked by D04–D06:** managed connection, generated function API, subscriptions/reconnect, identity, board authorization, export/recovery, price/capacity validation and hosted production checks. Backend/account access is intentionally absent. CI and Renovate are only prepared files, not remotely executed or enabled.

**Readiness:** verified independent local public shell, Bun build/runtime, compatible checks and inactive Convex configuration. No working boards, shared persistence or authentication; not a production collaboration application. Continue D04 before backend provisioning, D05 before private board code, and D06 before publishing. No stress/load test, external provider call, database, migration or remote mutation was performed. No optional service is needed for the initial shell.

## Official compatibility sources

Read 2026-10-08 alongside registry metadata and installed types/source. No generator/template was used.

- [TanStack Start manual setup](https://tanstack.com/start/latest/docs/framework/react/build-from-scratch) and [Bun/Nitro hosting](https://tanstack.com/start/latest/docs/framework/react/guide/hosting).
- [Convex Start support](https://docs.convex.dev/client/tanstack/tanstack-start/), [React client](https://docs.convex.dev/client/react) and [project configuration](https://docs.convex.dev/config/convex.json).
- [Ultracite configuration](https://www.ultracite.ai/docs/configuration) and [Tailwind Vite setup](https://tailwindcss.com/docs/installation/using-vite).
- Future provisioning: check [Convex pricing](https://www.convex.dev/pricing), [production guidance](https://docs.convex.dev/production) and identity documentation for the selected provider. Pricing/region/identity have not been verified or selected now.
