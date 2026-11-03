# Tooling and workspace policy

Use for dependency, lint/format, build, workspace, CI toolchain, or native Bun API decisions. Apply the [core policy](../AGENTS.md) and the sections relevant to the affected boundary.

## Linting and dependency maintenance

DEFAULT: apply Ultracite's `core` and relevant framework presets to the selected engine, which still lints/formats. Pin compatible versions, expose local check/fix scripts, run non-mutating checks in CI, and verify Bun execution. Merge generated agent rules with project policy; select supported editor/agent hooks deliberately and review fixes. Retain suitable configs for scoped fixes and separate TypeScript checks.

For new setup, explicitly pass `--pm bun --linter biome` to the pinned Ultracite initializer, or `--linter oxlint` when that engine is selected. Unspecified noninteractive setup currently defaults to Oxlint/Oxfmt. Oxlint JS plugins require that engine; do not add them to Biome configuration.

For maintained repositories, use Renovate for reviewed update PRs, or suitable Dependabot/existing automation. Review lockfiles/changelogs and validate coupled toolchain upgrades.

For Knip, framework diagnostics, and applicable audit tooling, follow [website quality checks](quality.md).

Selected Marko/HTMX foundations also follow their [rendering profile](rendering-profiles.md), including template checks and scoped formatter coverage.

## Versions and compatibility

- Verify selected/changed APIs, maturity, adapters, and runtime support against installed source/types or official docs; prefer supported stable compatible release combinations. If a needed integration requires a prerelease, establish its purpose, target/version support limits, and validation/fallback before selection; pin it and record those limits. Local checks do not establish production support. Resolve incompatibility within the affected version/adapter boundary before considering a wider change.
- Pin supported patched toolchains/local tools and use one package-manager lockfile per workspace. Frozen installs need a lockfile. Preserve working tools for unrelated fixes.
- MUST type-check application code with a compatible checker. Plain transpilation, execution, and bundling do not check types; Bun's explicit `check`/`--check` mode is a separate capability.
- Use Bun explicitly for compatible tools; `--bun` overrides Node shebangs, not incompatibility. Another runtime needs a verified unmet Bun requirement; upstream metadata alone is insufficient. pnpm manages packages, not execution. Fetch missing tools at verified versions.
- Prefer rootless Podman, Docker when unsuitable, and `uv` for Python. Containers are optional.

When type checking fails in third-party declarations, first inspect compatible dependency versions and separate those diagnostics from authored errors. If needed, document `skipLibCheck` in the smallest affected configuration; it skips declaration-file checking, not checking of authored code against imported APIs. Retain strict application, configuration, and test checks and verify their coverage. Record the vendor-check limitation rather than masking authored errors or installing unused optional integrations.

When changing workspace/build configuration, declare package exports and task dependencies and keep server-only imports out of browser graphs. Separate code generation from deploy/migration commands.

For new foundations, expose one documented `verify` command covering applicable non-mutating type, lint/format, meaningful local tests, and contract checks; retain a suitable existing equivalent. Keep individual checks available and propagate failures. Builds, code generation that updates source, live-service checks, migrations, and deployment remain explicit commands. Do not add no-op checks or test infrastructure just to fill the umbrella.

## Build and CI performance

- Measure end-to-end wait and the critical path through checkout, installation, compilation, test setup/execution, and cache transfer. Optimize the dominant cost; developer/CI speed does not establish website performance.
- Cache reproducible tasks when reuse justifies transfer/storage costs; declare inputs/outputs, lockfiles, toolchain versions, build-affecting environment, and relevant OS/architecture. Measure restore/save cost and cache misses. Do not cache external mutations or persistent tasks; exclude secrets/private data from artifacts and logs.
- Parallelize independent tasks within CPU/memory limits; sequence generators before consumers. In a useful workspace graph, use the selected orchestrator's affected-task support, including dependents and shared configuration/lockfile changes. If the graph or base/head history cannot establish the affected set, run the full applicable checks.
- Consider partial/blobless clones only when checkout is expensive, accounting for lazy fetches. They differ from shallow history: preserve the commits/merge base needed for affected checks and versioning.
- Keep Vitest file isolation by default. Disable it only for selected suites after checking shared module/global/DOM state, cleanup, and order dependence, and measuring the benefit. Follow the installed version's [performance guidance](https://vitest.dev/guide/improving-performance.html).
- Choose larger/faster runners, including providers such as Blacksmith, when timings and cost justify them. Optional project-scoped pre-push hooks should run quick targeted checks; required validation remains in CI, since hooks can be bypassed. Preserve existing hook tooling.

## TypeScript checking and faster feedback

- For new compatible foundations, prefer built-in [Bun type checking](https://bun.com/docs/runtime/check) using a pinned supporting Bun release. Check its bundled TypeScript baseline against the framework, configs, and editor; installing another `typescript` version does not change Bun's checker. Retain supported official TypeScript when compatibility requires it; changing language versions solely for speed is not a prerequisite.
- Expose a project-wide `typecheck` script such as `bun check --no-script -p tsconfig.json`; use `-b` when all referenced projects need checking. `--no-script` prevents a package's `check` script from shadowing the checker. Include application, configuration, and test code in the selected configs; entry-point or staged-file checks can miss other affected code. Bound concurrency with supported options such as `--threads 2`, adjusted to the host.
- Before replacing an authoritative checker, compare file coverage, diagnostics, and failure exits with supported official TypeScript on representative valid/invalid project code, including references where used. Keep the existing check authoritative until compatibility is established. Retain framework checks such as `astro check` and selected template diagnostics. Bun check emits neither declarations nor `.tsbuildinfo`; keep required emit/code-generation and editor tooling. Recheck relevant coverage after upgrades and measure actual wait/memory.
- Use [tsrs](https://github.com/oxc-project/tsrs) as an alternative local accelerator when its tested compatibility and measured benefit justify another tool. Check its [compatibility report](https://github.com/oxc-project/tsrs/blob/main/docs/COMPATIBILITY.md), pin it, and expose a separate script such as `types:fast` running `tsrs --noEmit -p tsconfig.json`, adapted to the actual configs. Retain the accepted project-wide type and framework checks in `verify`/CI when adding experimental tsrs feedback; do not install overlapping accelerators by default. Isolate incremental caches between compilers where needed.

## Native Bun capabilities

CONDITIONAL: use `Bun.S3Client` for S3/R2/presigning, `Bun.SQL` for PostgreSQL/MySQL/SQLite, or `Bun.markdown` for simple build/server content in Bun. Verify Drizzle's dialect adapter and retain schema/migrations; local SQLite is not Turso. Check Markdown maturity and sanitize untrusted HTML. These APIs do not run in browsers, Workers, or Convex.

## Official documentation

Use documentation matching the installed version.

- [Bun runtime and APIs](https://bun.com/docs/runtime)
- [Ultracite setup](https://www.ultracite.ai/docs/setup)
- [TypeScript skipLibCheck](https://www.typescriptlang.org/tsconfig/skipLibCheck.html)
- [Turborepo caching](https://turborepo.dev/docs/crafting-your-repository/caching) and [environment inputs](https://turborepo.dev/docs/crafting-your-repository/using-environment-variables)
