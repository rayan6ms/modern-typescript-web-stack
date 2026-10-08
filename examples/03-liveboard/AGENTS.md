# LiveBoard project instructions

Read [the selected stack core](docs/stack/AGENTS.md), then its task-relevant references. Read [the authoritative decision record](docs/stack-decisions.md) for constraints, commands, current setup state, and deferred choices. This local snapshot is self-contained; copying policy does not select every listed service.

Keep applicable profile defaults. Explicit user choices and recorded project decisions refine them. Convex owns the future shared-data/functions boundary; do not add PostgreSQL, Drizzle, or overlapping RPC for boards. Ordinary feature requests do not authorize a stack replacement, migration, external mutation, or broader product development.

When work reaches a deferred decision's trigger, ask its recorded question before dependent implementation and continue independent authorized work. Preserve settled choices during unrelated tasks; new requirements or evidence reopen only the affected boundary. Maintain stable decision IDs and actual verification state in the one decision record.

## Operating constraints

- Prefer Bun for JavaScript/TypeScript; pnpm only if Bun is unsuitable, npm only if both are unsuitable. Prefer rootless Podman over Docker and uv for Python.
- Never terminate T3 Code or unrelated processes, replace shared runtimes, perform host-wide cleanup, or exhaust resources. Keep concurrency modest, with two build jobs where supported. Stop and confirm shutdown of task-owned services after verification.
- Initial scope is a public English shell and account-free Convex configuration. Do not create domain schemas, fake collaboration, accounts, deployments, paid resources, production migrations, or speculative integrations.
- Private board work requires identity and board membership authorization inside Convex first. Deployment URL configuration alone establishes neither connectivity nor authentication.
- Keep credentials in ignored local environment files or private provider storage, never browser variables, instructions, or logs. Only the public deployment URL may use a VITE_ variable.
- Local installation/checks and a local commit are authorized. Pushing, publishing, remote provisioning, and provider login are not.
