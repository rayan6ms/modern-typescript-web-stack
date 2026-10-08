# Cedar Journal — project instructions

## Stack continuity

Selected profile: **modern-typescript-web-stack**. Read the [local core](docs/stack/AGENTS.md), then its task-mapped references before changing a boundary. Use [stack decisions](docs/stack-decisions.md) for the brief, constraints, accepted choices, deferred questions, commands, and verified setup state. Resolve links relative to their owning file. Load only relevant detail; report missing required guidance and continue independent work.

Applicable profile defaults remain the baseline. Explicit user requirements and documented scoped decisions refine them. Ordinary feature requests do not authorize framework replacement or migration. Reconsider only the affected boundary when requirements or evidence change. The record documents choices, not authorization for external actions or broader development.

When work reaches a deferred decision's trigger or blocked scope, ask its recorded question before dependent implementation; continue independent authorized work. Preserve accepted choices. Update the authoritative record under the same decision ID when a deferred choice is resolved; retain replaced choices as superseded. Keep installation and verification state distinct from selection. Routine continuation requires no kickoff skill, original source checkout, or setup conversation.

## Operating constraints

- Prefer Bun for JavaScript/TypeScript; pnpm only if Bun is unsuitable, npm only if both are unsuitable. Use explicit Bun execution for compatible CLIs.
- Prefer rootless Podman over Docker when a container is needed; use uv for Python. This static foundation needs no service container.
- Never terminate T3 Code or unrelated processes, replace shared runtimes, perform host-wide cleanup, or exhaust system resources. Keep install/build concurrency modest (at most two jobs where supported); no stress tests.
- Keep work scoped to this repository and task-owned temporary resources. Preserve user files. Track and stop only services owned by the task.
- No remote provisioning, publishing, paid resources, production migrations, or push is authorized by kickoff. Never commit credentials or expose them in browser code/instructions.

## Continuation

Actual scripts and prerequisites are in the [decision record](docs/stack-decisions.md) and package.json. Update command/check state when configuration changes. Rerun affected checks after implementation edits; planned or started commands are not passing checks.
