# DeskLedger — prepared kickoff interview answers

## Product answers

**Users and committed features?** Agency owners and staff will manage projects under an organization. The product will need login, organization membership and role checks, but those workflows are future feature implementation. For this kickoff prepare a useful public app shell and verify the local database connection; do not invent a project/task schema or seed tenants.

**Rendering and interaction?** Interactive application with a small public entry page. No complex public SEO requirement and no offline writes or collaborative realtime editing.

**Data ownership and persistence?** One authoritative relational database per deployment, with organization isolation in the eventual application. No per-tenant databases or managed reactive backend is requested. SQL reporting and transactions will matter.

**Authentication?** Accounts are committed to the eventual product, but whether agencies require corporate SSO is still undecided. Prepare only what is safe without choosing an identity provider; document the decision and ask again before implementing login, sessions or membership authorization. Do not create dummy login or pretend tenant authorization exists.

**Required local readiness?** A real local PostgreSQL development service/connection, with bounded connection behavior and restart/stop instructions. Isolated development setup is authorized; use rootless Podman if suitable. The app shell must render without external provider credentials.

**Hosting, language, traffic and budget?** Regional hosting in Brazil or nearby state is the current assumption; provider undecided. Portuguese (pt-BR) UI. Initially 20 agencies with about 5 users each; maybe 2,000 active users later. Low operational budget, roughly US$50/month initially. Do not create distributed infrastructure from these estimates.

**Other capabilities?** No payment integration, email delivery, upload pipeline, AI, queue or monorepo is needed for the initial foundation. Billing can be revisited when a paid plan is implemented.

**Existing files?** Existing README notes and project rules are intentional and should be merged/preserved. The existing notes are not a complete app implementation.

## Setup scope and operating constraints

**What should be ready now?** Prepare the essential initial repository, compatible tools/dependencies/configuration, a minimal runnable surface and persistent agent instructions. This is project kickoff, not a request to build the complete product. Implement only the initial behavior explicitly requested below; later product features should guide selection without speculative schemas or directories.

**Can you install and verify locally?** Yes: install project dependencies, generate the essential files, and run proportionate local checks. You may pull a required official image and use task-owned rootless Podman containers or an isolated local service. Keep install/build concurrency modest (two build jobs where supported); no stress tests, shared-runtime replacement, host-wide cleanup or termination of unrelated processes. Stop your owned verification services on completion and document how to restart them.

**Can you deploy or use accounts?** No remote provisioning, publishing, paid resources or production migrations. No provider account or credentials are supplied for this trial. Missing external access should be documented honestly. Keep local credentials outside committed instructions and browser code.

**Package/runtime preferences?** Prefer Bun for JavaScript/TypeScript; use pnpm if unsuitable and npm only if both are unsuitable. Rootless Podman before Docker; uv for Python.

**Repository?** The target is a local Git repository in the supplied test directory. Preserve existing files/instructions, commit the finished foundation in that repository, and leave useful continuation instructions. No push is requested.
