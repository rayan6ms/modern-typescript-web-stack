# Operation and delivery checks

Use for instrumentation, health/recovery, migration rollout, release/production preparation, or broader delivery validation. Apply the [core policy](../AGENTS.md) and the sections relevant to the affected boundary.

Runtime/hosting-target changes also use [architecture](architecture.md); query/migration correctness uses the selected database policy.

## Observability and production operation

- Use OpenTelemetry-compatible instrumentation at request, persistence, queue, and provider boundaries. Choose Sentry and/or a managed/composable backend that fits the deployment. Propagate correlation and trace context without duplicate uncontrolled instrumentation.
- Track relevant latency, errors, saturation, queue age, retries, releases, and cost. Bound trace/log volume and metric cardinality; redact credentials/personal data.
- A production stateful deployment needs health/readiness, shutdown, dependency bounds, SLOs, backups/recovery, compatible migrations, and rollback. Apply these to selected services; prototypes and static sites have different operating needs.
- Split deployment units for independent ownership, capacity, or failure isolation; select hosting/services by data locality and operating needs.

## Verification and delivery gates

Apply [website quality checks](quality.md) for relevant code diagnostics, accessibility, lab/field browser measurements, and public-site crawls.

Use affected packages' existing checks. New applications need discoverable type, lint/format, build, and meaningful behavior checks. Run the documented verification umbrella where present and inspect its actual coverage; complete affected explicit build/integration checks separately. Test database/provider, browser, migration/restore, and failure boundaries when changed. Use the supported Workers environment and Bun for Bun-specific behavior; retain existing Vitest suites.

Inspect changed UI at representative viewports and with keyboard interaction, checking focus after asynchronous loading, retry, or validation completes. Small content/style/accessibility fixes can use direct inspection and existing checks; avoid tests/infrastructure solely for a checklist. Use isolated bounded fixtures without production secrets/data.

Support performance claims with relevant before/after measurements, workload, region, device, and cache conditions; lab results do not establish field/SLO compliance. Retain applicable integration invariants.

For CPU-heavy JavaScript/WASM benchmarks, compare baseline and candidate on equivalent inputs and required results. Prevent constant-folded/eliminated work, reset mutated fixtures, and keep benchmark reporting outside timed regions. Include affected construction/conversion and cleanup costs at their actual frequency, plus the relevant request/journey cost. Repeat interleaved baseline/candidate runs and report absolute changes and variability; retain the baseline when gains are inconclusive. Label proxy-hardware results and limit target-specific claims until representative validation is available.

Complete requested work and fix its regressions. After relevant checks pass, broaden only for new changes, failures, or unresolved risks; report prerequisite blockers rather than endlessly retrying. Labeled prototypes are valid scoped deliverables; never present mocks/untested assumptions as production behavior.

Report delivered behavior, material deviations, actual checks/measurements, and remaining limits. Commit when requested or required; pushing/publishing needs its own authorization.
