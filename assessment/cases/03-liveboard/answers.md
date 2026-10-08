# LiveBoard — prepared kickoff interview answers

## Product answers

**Users and committed product capabilities?** Small teams share boards and update items; authentication and board membership are required before real private data is added. Initially create a clean app shell and prepare the selected backend/client configuration that can safely be set up without an account. No domain tables or fake collaboration is needed now.

**Backend preference?** I explicitly choose Convex for the future shared-data/functions boundary. Keep the rest of the selected stack conservative. I understand the portability/hosting tradeoff; no second relational database is requested for those boards.

**Offline and consistency?** Online-first collaboration. Reconnect should refresh shared state, but offline writes, CRDTs and custom synchronization are not required. No benchmark yet; around 50 teams with 5–10 members initially.

**Auth, hosting and access?** Managed Convex is the intended mode, but I have not created a deployment, picked its region or chosen an identity provider. No credentials are available. Do not create an account, deploy functions, invent a deployment URL or present subscriptions/auth as verified. Document the decisions/access prerequisites and the trigger before real private board implementation. Independent app rendering must still run locally.

**Initial UI?** English public app shell with an honest indication that backend connection/auth await configuration. No mock board data that suggests a working backend.

**Other services?** No separate job queue, object store, payment handler, SQL reporting store or public API is committed. Optional providers can wait. Approximate total budget US$50/month, subject to checking Convex pricing before provisioning.

## Setup scope and operating constraints

**What should be ready now?** Prepare the essential initial repository, compatible tools/dependencies/configuration, a minimal runnable surface and persistent agent instructions. This is project kickoff, not a request to build the complete product. Implement only the initial behavior explicitly requested below; later product features should guide selection without speculative schemas or directories.

**Can you install and verify locally?** Yes: install project dependencies, generate the essential files, and run proportionate local checks. You may pull a required official image and use task-owned rootless Podman containers or an isolated local service. Keep install/build concurrency modest (two build jobs where supported); no stress tests, shared-runtime replacement, host-wide cleanup or termination of unrelated processes. Stop your owned verification services on completion and document how to restart them.

**Can you deploy or use accounts?** No remote provisioning, publishing, paid resources or production migrations. No provider account or credentials are supplied for this trial. Missing external access should be documented honestly. Keep local credentials outside committed instructions and browser code.

**Package/runtime preferences?** Prefer Bun for JavaScript/TypeScript; use pnpm if unsuitable and npm only if both are unsuitable. Rootless Podman before Docker; uv for Python.

**Repository?** The target is a local Git repository in the supplied test directory. Preserve existing files/instructions, commit the finished foundation in that repository, and leave useful continuation instructions. No push is requested.
