# Installation and minimal scaffolding

Read for an authorized initial project setup after intake and [the persistent handoff](handoff.md). The selected profile and current decision record supply the stack, capabilities, and constraints. This workflow installs and configures the initial foundation, followed by [verification and delivery](verification.md).

## Establish the executable scope

Read the selected foundation, actual setup state, and decisions relevant to each component. When setup reaches a deferred entry's trigger or blocked scope, ask its recorded question before dependent work, keep that work pending, and proceed on independent setup. Do not choose a substitute database/provider or create an abstraction merely to bypass an undecided requirement or unavailable credentials.

Inspect the actual target, manifests, lockfiles, configuration, and available tool versions. Distinguish existing handoff documents or a partially prepared foundation from an established application. Reuse prepared portions without rerunning generators, resetting configuration, or reinstalling unrelated tools. A mismatch between the record and files needs reconciliation before affected work; record intentions and actual state separately.

Use the profile's runtime, package-manager, container, and Python preferences. Reuse suitable installed tools, prefer project-local dependencies, and obtain only missing toolchains required by the selected components within the authorized scope. Avoid replacing shared runtimes or changing unrelated global/editor/shell settings. Record an unavailable prerequisite as a scoped blocker; do not repeatedly seek authorization already supplied for routine setup.

## Select compatible versions and official setup paths

Use matching official documentation, registry metadata, CLI help, and installed source/types to establish supported releases, adapters, and toolchain requirements. Prefer supported stable compatible release combinations and current patches. If a needed integration requires a prerelease, establish its purpose, target/version support limits, and validation/fallback before selecting it; pin the version and record those limits. A local pass does not establish production support. Keep reconsideration within the affected version/adapter boundary rather than automatically replacing the framework.

Record the versions actually selected. Pin invoked generators and local tools; where a generator fetches a template separately, select a supported revision when possible and record the resolved source when known. An exact generator version alone does not pin its downloaded template or generated dependencies.

Check that the chosen framework, build integration, runtime target, backend/data adapters, and lint/format presets fit together. Preserve the recorded defaults; a verified incompatibility reopens only its affected boundary under the selection rules. Upstream Node metadata alone does not establish that Bun is unsuitable. Use the selected runtime explicitly for compatible CLIs and scripts; package management and application execution are distinct choices.

Verify flags before running a generator. Unattended answers must implement the recorded choices rather than silently accepting a different framework, provider, package manager, or hosted service. Use the smallest supported starter or documented manual setup when a starter would add unrelated features. Do not hard-code release-specific generator recipes into the project policy.

## Generate without displacing the handoff

The target may already contain instructions and decisions. If a generator expects an empty directory or can overwrite files, run it in a task-owned temporary directory, then review and merge the necessary output into the established target. When supported, defer automatic dependency installation until the final manifests are reviewed, avoid nested Git initialization, and skip generated agent files or merge their relevant rules with the existing policy.

Review generated manifests, scripts, integrations, lockfiles, agent instructions, ignore files, and environment examples against the selected foundation. Add absent required files and merge compatible configuration changes. Preserve existing user files and local policy/decision edits; a collision does not authorize blanket replacement. Install in the final project location after removing staging-specific paths or names. Do not copy generated dependency caches, build output, nested repositories, or temporary absolute paths.

Keep staging cleanup limited to task-owned resources. Failures should leave a clear partial state and recoverable user files; do not delete the target to obtain a clean rerun.

## Keep the initial surface essential

Create only the structure needed to run the selected components and their checks:

- Framework/language configuration, dependency manifests/lockfiles, applicable runtime/build adapters, and a minimal page or endpoint. Preserve required routing/layout files; omit starter showcase features and speculative feature/service directories.
- Selected lint/format configuration and supported presets, strict TypeScript or the framework's equivalent checks, and actual development/build/check commands. Expose one documented `verify` command (or suitable existing equivalent) covering applicable non-mutating types, lint/format, meaningful local tests, and contract/Rust checks, with failures propagated and individual checks retained. Keep builds, source-updating code generation, live-service checks, migrations, and deployment explicit. Transpilation is not type checking. Handle unsupported file types deliberately rather than pretending the selected linter covers them.
- Minimal backend entry/configuration when authoritative server behavior is required. Follow the selected profile's ownership model; frontend convenience does not replace the authoritative backend. Multiple required processes need clear commands and boundaries, not automatic service splitting or build orchestration.
- Data/service client configuration, environment-variable documentation, and local development prerequisites for required capabilities. Add domain schemas, migrations, provider handlers, UI component inventories, and test cases when real behavior needs them; do not invent entities or dummy integrations to fill folders.
- Applicable repository workflow configuration required by the selected profile. Prepare files within scope without enabling unselected remote services, global hooks, or deployment actions.

Use one JavaScript package manager and its lockfile per workspace; Cargo's lockfile is separate. A second deployable does not by itself require a monorepo orchestrator. Follow the selected profile's actual sharing/build criteria and choose only the needed components of its UI, testing, caching, and integration recommendations.

## Install selected components and configure prerequisites

Install only components selected for the initial scope, distinguishing runtime from development dependencies. Align generator-selected versions with the compatible foundation and pin local toolchains/tools as required by the profile. Create the initial lockfile with the selected manager; preserve a compatible existing lockfile on continuation, updating only for intentional dependency changes. Do not regenerate lockfiles as a routine retry or use frozen/locked flags before an initial lockfile exists.

Inspect installation failures and lifecycle/native-module diagnostics. Resolve necessary scripts or system prerequisites narrowly; do not suppress errors, disable integrity/type checks, or switch the whole stack to make installation appear successful. Bound install/build concurrency to the host, and stop retries that cannot resolve a missing prerequisite. Record the completed portions and failing step before continuing independent work.

For a required local service, reuse a suitable instance or prepare the selected development setup and lifecycle commands. Containers are needed only when the selected local setup calls for them. Keep local service configuration distinct from production provisioning, migrations, publishing, and paid resources; apply the selected profile's authorization rules. Missing remote access should block the dependent connection/check, not trigger an unrequested replacement or fake success.

Document required variable names/purposes with non-secret examples. Keep actual credentials outside tracked instructions, records, and logs, using the host's private input mechanism when credentials must come from the user. Do not invent tokens or require secrets to prepare independent local files. Check that generated ignore rules preserve this boundary.

## Record progress and prepare verification

Update the authoritative decision record as each portion is prepared. Include actual tool/component versions, files/services created or reused, manifest/lockfile locations, and any scoped deviation. Keep chosen/deferred decision states distinct from installed, configured, blocked, and verified implementation state.

Record real development and check commands with their working directory, prerequisites, expected runtime target, and service lifecycle where needed. List which independent commands can run and which are currently blocked. Recheck instruction/policy/record links after generator merges, preserving the local selected snapshot and decision IDs.

Check installation exit results, expected files, manifest/script consistency, and reported configuration errors as part of setup. Fix defects attributable to this work. Application type/lint checks, production build/startup, and integration behavior remain pending until actually exercised; no-op scripts, empty tests, or placeholder credentials do not establish readiness.

Proceed to [verification and delivery](verification.md) for the prepared portions. Preserve working components and current commands so subsequent agents can continue through the project instructions and record without reconstructing the setup conversation or rerunning kickoff.
