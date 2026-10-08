# DeskLedger — stack decisions

Updated: 2026-10-08. This is the authoritative record; implementation/check state is updated below as setup proceeds.

## Brief and scope

Brazilian agency owners/staff will eventually manage projects inside organizations. Kickoff delivers a pt-BR public shell and a verified isolated local PostgreSQL connection. Login, memberships, roles and organization isolation are committed future behavior, not implemented here. No domain schema or seeded tenants. Future export amounts use BRL; other currencies are undecided.

Assumptions: regional hosting in Brazil or nearby; 20 agencies × 5 users initially, possibly 2,000 active users later; roughly US$50/month initially. No measured performance budget. No offline writes, realtime collaboration, complex SEO, payments, email, uploads, AI, queues or monorepo required now. No remote provisioning, publishing, paid resources, production migrations or push authorized. Local dependency installation and isolated services authorized; modest concurrency and owned-resource cleanup only.

## Profile snapshot

- Profile: modern-typescript-web-stack.
- Source: supplied package `frozen modern-typescript-web-stack input (source revision unknown to the original agent)`.
- Revision: unknown (frozen package has no supplied revision). Snapshot date: 2026-10-08.
- Self-contained local [core](stack/AGENTS.md) and complete [references](stack/references/). These files are copied intact; unused policies do not select their tools. Continuation does not require the source.

## Chosen decisions

### D01 — Application foundation
Status: chosen. Profile defaults: strict TypeScript, React + TanStack Start, supported Vite; one deployable, Bun for tooling and provisional regional runtime. Tailwind and only a needed shadcn Button. Native component state handles a public disclosure. No remote state or typed RPC yet; add oRPC at the first required TypeScript API boundary. No independent Hono service, Effect layer, speculative modules or test framework. Official manual setup preserves the existing repository.

### D02 — Relational persistence
Status: chosen. Profile default and explicit product need: PostgreSQL + Drizzle, one authoritative database per deployment. Native Bun SQL adapter is supported by Drizzle. Reviewed SQL migrations via Drizzle Kit, no domain tables/migrations invented. Rootless Podman local PostgreSQL, loopback-only port, restricted application role and separate migration role, bounded pool/connection/statements. No data access exposed in the public shell. Connection readiness is checked by a local CLI. Future handlers must validate and authorize against the actual organization.

### D03 — Repository checks
Status: chosen. Bun lockfile and exact dependency versions; Ultracite core/React presets + Biome and a separate strict type check; build, browser and real-database checks. Renovate configuration prepared, remote activation deferred. No global hooks or editor changes.

## Deferred decisions

### D04 — Identity and corporate SSO
Status: deferred. Question: Do agencies require corporate SSO, which protocols/providers and enrollment/recovery expectations apply? User deliberately undecided. Safe provisional behavior: public unauthenticated shell only, no identity provider, dummy login, sessions or pretend authorization. Blocks login/session and membership/role implementation. Public UI and local SQL toolchain may proceed. Trigger: before implementing login, sessions or membership authorization. Next agent asks the question, then evaluates the profile's Better Auth baseline and requirement-driven alternatives, including Bun/Drizzle compatibility and denial/cross-tenant tests.

### D05 — Hosting and production operations
Status: deferred. Question: Which Brazil/nearby provider and region meet the budget, residency, database/TLS, backup/recovery and runtime needs? Safe provisional behavior: locally verified Bun artifact; no provider selected or provisioned. Blocks remote deployment and production readiness. Local app/DB checks proceed. Trigger: before deployment configuration for a real provider. Ask requirements and verify actual regional support, pool capacity across replicas, shutdown, observability, backup/restore and rollback.

### D06 — Paid plans and currencies
Status: deferred. Billing is future scope; export amounts remain BRL. Question: When paid plans are implemented, what countries, tax/invoicing and provider requirements apply? What export currency support beyond BRL is wanted? Safe provisional behavior: no billing integration and BRL-only future exports. Blocks billing or multicurrency exports; foundation proceeds. Trigger: before those features. Ask relevant questions without reopening unrelated stack choices.

## Setup state and verification

### Prepared files and versions

Initial foundation is prepared and verified for the local scope below. Existing README notes and root project rules are preserved. The complete policy snapshot was compared with the frozen selected package and matches unchanged.

- Exact packages and Bun lockfile: [manifest](../package.json), [lockfile](../bun.lock). Tested Bun 1.4.0 on Linux; package-manager pin is `bun@1.4.0`. React/React DOM 19.3.0, TanStack Start 1.168.60, Router 1.170.41, Vite 8.3.4, TypeScript 7.0.2, Tailwind 4.3.3, Drizzle ORM 0.45.4/Kit 0.31.11, Ultracite 7.12.4/Biome 2.5.15. Other exact UI/tool versions are in the manifest.
- [Vite config](../vite.config.ts) selects the official Nitro Bun preset. Nitro 3.0.260903-beta is an exact pinned prerelease used by the documented Vite integration. This evolving adapter needs revalidation before production/updates; local artifact behavior was exercised, not inferred from a development server.
- Public root/index routes, generated route tree, strict TS configuration, Tailwind styles and a shadcn/Base UI Button are present. Disclosure uses component state; no provider credentials or DB connection are needed to render. No login, sessions, memberships, organization authorization, application API or domain tables exist.
- [Server-only SQL factory](../src/db/client.server.ts), [schema placeholder](../src/db/schema.ts), [Drizzle config](../drizzle.config.ts), [DB check](../scripts/check-db.ts), [owned DB lifecycle](../scripts/local-db.ts) and [role initialization](../infra/postgres-init.sh) are present. There are zero product tables and no migrations. The placeholder is only the Drizzle entrypoint for future reviewed schemas.
- Podman 5.8.7 reported rootless mode. PostgreSQL 17.11 uses pinned official image `docker.io/library/postgres@sha256:aa90e97ee862e558111d34cfb8b2c4bec768c2b039fb791341686928560263b3`. Owned container `deskledger-dev-d60c576ad2`, volume `deskledger-dev-d60c576ad2-data`, ownership label `io.deskledger.local-project` matching this repository. The script derives the name from the repository path and refuses a container-label mismatch. Do not operate on shared containers.
- Local DB listens only at `127.0.0.1:55432`; container limits: 512 MiB, one CPU, 128 PIDs, 20 PostgreSQL connections, 32 MiB shared buffers. The client factory caps each pool at four, with a five-second connection timeout, 20-second idle timeout, 300-second max lifetime and two-second close timeout. This is a factory, not a request-scoped pool convention: future server integration must share a bounded pool per process and account for replicas.
- Restricted `deskledger_app` role has no elevated role flags or schema CREATE permission; `deskledger_migrator` owns the schema without elevated flags. App role defaults: statement timeout 5s, lock timeout 2s, idle transaction timeout 10s; migration role statement timeout 30s and lock timeout 2s. These local defaults are not a production provider configuration. There is no tenant isolation implementation to test yet.
- Generated local credentials are in ignored `.env.local` and `.local/postgres.env` (mode 600); `.local` is mode 700. Keep the two files and retained volume together. Do not commit, log, paste or expose their values. [Environment example](../.env.example) documents purposes without credentials. `.env.local` contains `DATABASE_URL`, `MIGRATION_DATABASE_URL`, `HOST`, `PORT`; the container env file holds initialization secrets.
- [Renovate config](../renovate.json) is prepared with bounded update PR concurrency. No remote CI/dependency bot is activated in this local-only repository; wire the existing non-mutating check commands when a remote repository/CI provider is established. No hosted account was used.

### Commands and prerequisites

Working directory for all commands: repository root (the directory containing `package.json`). Bun 1.4.x is required; DB lifecycle also requires rootless Podman, the pinned image or network access to pull it, and a free loopback port 55432. Never displace another process if a port is occupied.

```sh
bun install --frozen-lockfile --network-concurrency 2
bun run db:start
bun run db:check
bun run dev
```

`db:start` creates local credentials only on the first setup, checks ownership, starts/reuses the owned service and polls readiness sequentially for a bounded number of attempts. `db:check` then verifies a real connection. Dev explicitly selects loopback port **43102** even when `.env.local` contains production port 43103. Open `http://127.0.0.1:43102`. Ctrl+C stops the foreground server; confirm its port is no longer listening.

```sh
bun run typecheck
bun run check
UV_THREADPOOL_SIZE=2 bun run build
HOST=127.0.0.1 PORT=43103 bun run start
```

Build generates routes and the Nitro `.output/server/index.mjs` entrypoint with `.output/public` assets. On a fresh checkout, build once before type checking because it generates the route tree; the initial generated tree is also committed. `start` runs the actual Bun production artifact. Open `http://127.0.0.1:43103`; Ctrl+C requests graceful shutdown. HOST/PORT are local listener choices, not a hosting selection. Do not run overlapping builds. `bun run fix` applies formatter/linter fixes; review its changes, then rerun `check`.

To demonstrate public startup independent of local credential files, with DB stopped:

```sh
env -u DATABASE_URL -u MIGRATION_DATABASE_URL HOST=127.0.0.1 PORT=43103 bun --no-env-file .output/server/index.mjs
```

Database lifecycle:

```sh
bun run db:status
bun run db:stop
bun run db:status
bun run db:start
bun run db:check
```

Stop retains the owned volume and credentials. Restart does not rerun role initialization against existing data. No destructive reset/cleanup command is supplied. If secrets or initialization no longer match, inspect/recover this owned development instance privately; do not rotate files independently of the existing DB or clean other containers. If the repository moves, the derived container name changes: explicitly plan recovery of its old owned resources.

Future relational workflow: add only the authorized schema, run `bun run db:generate`, review generated SQL, then `bun run db:migrate` against the isolated development DB. Those scripts use the separate `MIGRATION_DATABASE_URL`. No production migrations are authorized. At kickoff `db:generate` reports zero tables/no schema changes. Its empty metadata was removed after verification; no starter migration is committed. Migration application and schema recovery remain untested until an actual reviewed migration exists. The current DB check intentionally asserts zero product tables; adapt that kickoff assertion when authorized schemas are added, preserving privilege and timeout checks.

### Actual verification — 2026-10-08

Tested the completed kickoff file state in this repository on Bun 1.4.0/Linux, subsequently committed as the initial foundation commit. Changes after this state require affected checks again. These are local setup checks, not field performance or production evidence.

- **PASS — install:** `bun install --frozen-lockfile --network-concurrency 2`; 253 installs/396 packages checked, no lockfile changes or suppressed installation failures.
- **PASS — types and lint/format:** `bun run typecheck` and `bun run check`. Separate strict application/config/script type check; Ultracite core/React presets checked TS/TSX, JSON/JSONC and CSS. Generated route tree and intact policy snapshot are deliberately excluded from lint. Markdown and shell are not covered by Biome; role shell script separately passed `sh -n infra/postgres-init.sh`.
- **PASS — build:** `UV_THREADPOOL_SIZE=2 bun run build` produced a Nitro artifact whose metadata reports preset `bun`. Nonfatal upstream warnings concern `use client` directives in React Router/Base UI SSR bundles and an unnamed bundler timing group. Browser hydration/interaction passed despite these warnings; they were not silenced. No performance guarantee is claimed.
- **PASS — startup/HTTP/artifacts:** `HOST=127.0.0.1 PORT=43103 bun run start` served production SSR and assets. `/` returned 200/pt-BR content; `/missing-page` returned a Portuguese 404. Browser network entries showed CSS and JS returning 200. Built public assets contain no DB URLs/role identifiers, server-only Bun imports or environment-variable references from this SQL integration. `bun run dev` also served SSR/200 at port 43102 after the port fix.
- **PASS — browser:** T3 collaborative Chromium preview at 1280×800 and 390×844 CSS pixels. Visually inspected layout; no horizontal overflow. pt-BR document language/title, hydrated disclosure, Enter/Space activation, pointer toggle, `aria-expanded` and section visibility agreed. Tab revealed the skip link with focus styling; Enter moved focus to `#conteudo`, then Tab reached the disclosure button. No console errors or failed asset requests were reported on the public entry page. The final 404 route also passed skip-link focus and keyboard navigation back home; its expected HTTP 404 produces the normal browser resource diagnostic, while its CSS/JS load successfully. This is a focused manual check, not a complete accessibility audit.
- **PASS — independent public startup:** stopped PostgreSQL and ran the same production entrypoint with `--no-env-file` and DB variables removed; SSR and browser assets still rendered. No external provider credentials were supplied.
- **PASS — PostgreSQL/Drizzle:** `bun run db:start` and `bun run db:check` exercised the real native Bun SQL/Drizzle path. Parameterized text round trip, restricted role, zero product tables, schema DDL denial SQLSTATE 42501, transaction-local 100ms statement timeout SQLSTATE 57014 using a 200ms sleep, and a subsequent successful query. Separately connected as migrator and verified schema CREATE permission with no elevated role flags. No product data or tenants were seeded.
- **PASS — bounded failure:** with DB stopped, `db:check` exited 1 with redacted diagnostics in approximately 41ms. A task-owned loopback TCP peer that accepted but did not answer PostgreSQL timed out via the factory in approximately 5,008ms and was closed. `db:check` has an additional 15-second overall CLI deadline. These measurements cover local failure handling only, not host networking or pool saturation.
- **PASS — restart/shutdown:** DB stop/status confirmed stopped, start/check reconnected successfully with retained credentials and zero tables. Production server Ctrl+C reported graceful closure, and the same artifact restarted successfully on its original port. All production/dev verification runs were stopped; final listener checks found no owned listeners at 43102, 43103 or 55432. DB container remains stopped; its development volume and ignored credentials are retained. Task-owned browser tabs are closed.
- **PASS — handoff:** local Markdown links resolve, root instructions reach the core/decision record, selected core/reference contents match the frozen source, existing project notes/rules remain intact, and private/build/temp files are ignored and absent from the commit. Continuation uses local project guidance rather than this kickoff skill.

Resolved setup failures: the DB checker initially expected SQLSTATE in `code`; Bun's PostgresError uses `errno`, now recognized without printing raw driver errors. The development command initially inherited `.env.local` production PORT despite the Vite CLI flag; explicit dev HOST/PORT fixed it. An attempted output-only Drizzle CLI override did not load required config; the repository's unmodified `db:generate` command passed. Generated empty migration metadata was temporary verification output and removed, avoiding speculative migrations/formatter failures.

### Readiness and next actions

**Locally verified initial foundation:** public shell, development server, Bun production artifact, SQL toolchain, restricted local PostgreSQL connection and lifecycle. All required kickoff checks for this scope passed. No feature implementation or remote/production readiness is implied.

**Deferred/blocked later scopes:** D04 blocks login, sessions and membership authorization until corporate SSO requirements are answered; D05 blocks provider deployment and production readiness until hosting, residency/TLS, observability, backup/restore, SLOs and rollout/rollback are established and exercised; D06 blocks billing/multicurrency work. No domain migrations, tenant denial paths, load tests, field performance, backup/restore, provider integration, remote CI, Vitest/Playwright suites or production DB shutdown under load were run because those capabilities are not part of this initial foundation. Start with the specific recorded trigger when continuing; do not rerun kickoff or replace the stack.

Official setup/support sources consulted: [TanStack hosting/Bun/Nitro](https://tanstack.com/start/latest/docs/framework/react/guide/hosting), [Start server entry](https://tanstack.com/start/latest/docs/framework/react/guide/server-entry-point), [Drizzle Bun SQL](https://orm.drizzle.team/docs/connect-bun-sql), [Bun SQL](https://bun.com/docs/runtime/sql), [Ultracite setup](https://www.ultracite.ai/docs/setup). Installed adapter types and generated Nitro metadata were checked against the pinned versions; latest documentation alone is not proof of compatibility.

## Superseded decisions

None.
