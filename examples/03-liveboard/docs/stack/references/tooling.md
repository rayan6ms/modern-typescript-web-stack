# Tooling and workspace policy

Use for dependency, lint/format, build, workspace, CI toolchain, or native Bun API decisions. Apply the [core policy](../AGENTS.md) and the sections relevant to the affected boundary.

## Linting and dependency maintenance

DEFAULT: apply Ultracite's `core` and relevant framework presets to the selected engine, which still lints/formats. Pin compatible versions, expose local check/fix scripts, run non-mutating checks in CI, and verify Bun execution. Merge generated agent rules with project policy; select supported editor/agent hooks deliberately and review fixes. Retain suitable configs for scoped fixes and separate TypeScript checks.

For maintained repositories, use Renovate for reviewed update PRs, or suitable Dependabot/existing automation. Review lockfiles/changelogs and validate coupled toolchain upgrades.

## Versions and compatibility

- Verify selected/changed APIs, maturity, adapters, and runtime support against installed source/types or official docs; disclose gaps.
- Pin supported patched toolchains/local tools and use one package-manager lockfile per workspace. Frozen installs need a lockfile. Preserve working tools for unrelated fixes.
- MUST type-check application code with `tsc --noEmit` or a supported equivalent; transpilation, Bun execution, and bundling do not type-check it.
- Use Bun explicitly for compatible tools; `--bun` overrides Node shebangs, not incompatibility. Another runtime needs a verified unmet Bun requirement; upstream metadata alone is insufficient. pnpm manages packages, not execution. Fetch missing tools at verified versions.
- Prefer rootless Podman, Docker when unsuitable, and `uv` for Python. Containers are optional.

When changing workspace/build configuration, declare package exports and task dependencies, keep server-only imports out of browser graphs, and include build-affecting inputs/environment in cache keys. Separate code generation from deploy/migration commands; do not cache external mutations or persistent tasks. Keep secrets/private data out of cached artifacts and logs.

## Native Bun capabilities

CONDITIONAL: use `Bun.S3Client` for S3/R2/presigning, `Bun.SQL` for PostgreSQL/MySQL/SQLite, or `Bun.markdown` for simple build/server content in Bun. Verify Drizzle's dialect adapter and retain schema/migrations; local SQLite is not Turso. Check Markdown maturity and sanitize untrusted HTML. These APIs do not run in browsers, Workers, or Convex.

## Official documentation

Use documentation matching the installed version.

- [Bun runtime and APIs](https://bun.com/docs/runtime)
- [Ultracite setup](https://www.ultracite.ai/docs/setup)
- [Turborepo caching](https://turborepo.dev/docs/crafting-your-repository/caching) and [environment inputs](https://turborepo.dev/docs/crafting-your-repository/using-environment-variables)
