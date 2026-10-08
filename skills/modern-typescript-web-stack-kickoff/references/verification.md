# Verification and delivery

Read after [installation and minimal scaffolding](scaffolding.md) for an authorized setup request. Verify the components actually prepared, using the selected profile's relevant guidance and the current decision record. A minimal foundation needs evidence that its configuration and runnable surface work; it does not need speculative features, an exhaustive test suite, or a load benchmark.

## Check the prepared foundation

Choose checks from the real manifests, configuration, runtime target, and initial capabilities. Run required code generation before checks that depend on it. Run the documented verification umbrella and inspect its coverage; a script called `check` may cover only lint/format. Complete applicable checks outside that command explicitly. Run independent checks with bounded concurrency; await their completion before dependent builds or startup. Keep results tied to the files and environment tested.

- **Installation and configuration:** confirm required dependencies/tools, matching lockfiles, scripts, adapters, and documented environment prerequisites. Verify a frozen/locked install when the lockfile exists and installation consistency has not already been checked for this state. Do not replace a valid lockfile to make a check pass.
- **Types and lint/format:** run the configured non-mutating checks, including a separate TypeScript/framework type check and applicable Rust checks. Cover generated configuration and supported application file types; disclose uncovered formats. Review necessary formatting fixes rather than blindly rewriting preserved user files.
- **Production output:** build the intended production artifact with its selected adapter/target, confirming that expected output exists. Exercise the supported production entrypoint or target emulator where available. Static sites need served built output; SSR needs its actual server artifact. A development server or generic preview is not proof of the selected production runtime. Record targets that cannot be exercised locally as pending.
- **Startup and behavior:** start the necessary components, wait for actual readiness, request the minimal route/endpoint, and check responses and logs. Inspect a prepared UI in an available browser at representative wide/narrow viewports; exercise its actual interaction and keyboard behavior where applicable, including meaningful focus after loading, retry, and validation transitions complete. An HTTP 200 alone does not prove hydration or browser behavior. If browser tooling is unavailable, record that limit and perform the feasible HTTP/artifact checks.
- **Selected boundaries:** exercise required local service connections and cross-process contracts that exist in the initial foundation, including relevant failure/denial behavior when those boundaries were implemented. Use isolated non-production resources and avoid unnecessary writes. Config files or invented credentials do not establish a working integration. A deferred future provider needs no dummy handler or test; a required unavailable service leaves its dependent capability unverified.

Use existing meaningful tests for implemented behavior. Add a focused test only when a setup boundary needs it; do not add empty tests, no-op check scripts, or test frameworks just to fill a checklist. Performance, accessibility, security, recovery, and provider claims need their own applicable evidence; passing starter checks cannot establish them for the future application.

## Resolve failures without broadening the stack

Inspect the failing command and diagnostics. Fix defects introduced by setup, then rerun the affected check and its dependents. Once relevant checks pass, repeat or broaden them only for new changes, failures, or unresolved concerns. Do not disable checks, loosen strictness, conceal errors, or substitute an unselected stack to manufacture a pass.

A verified incompatibility reopens only its affected version, adapter, or component under the selection rules. Document the constraint and scoped resolution; a failure in an optional tool does not justify replacing the framework or database. A missing decision, prerequisite, or external access remains an actionable blocker. Stop retries when no new evidence or feasible remedy exists, preserve working portions, and continue independent checks.

Use task-owned processes, ports, and temporary resources. Do not displace an occupied port or stop an existing service. Track the processes started for verification, including child/detached services, inspect relevant logs without exposing credentials, and stop only those processes when finished, unless the user requested that they remain running. Confirm shutdown; a CLI exiting does not establish that its server stopped. Bound resource use; no host-wide cleanup or stress testing is part of kickoff.

## Finish the durable handoff

Update the authoritative decision record rather than creating another readiness report. Keep chosen/deferred decisions separate from implementation state. Record:

- The tested revision or file state, date, tool/runtime versions and target, real commands/working directories, prerequisites, and verification-umbrella coverage. Summarize latest outcomes and material failure/resolution evidence; link detailed logs when useful rather than embedding a troubleshooting transcript. Keep evidence non-secret.
- Checks that passed, failed, were blocked/not run, or were inapplicable, with brief reasons. A command that was merely started has no passing result. Subsequent edits invalidate the affected prior results until rechecked.
- The prepared capabilities that are verified locally, and any external or production target checks still pending. If a required check failed or could not run, describe the foundation as partial or verified only for the independent scope; do not claim full readiness.
- Remaining decisions and blockers with their stable IDs, triggers, and next actions. Deferring future payments need not prevent a verified public-site foundation; unavailable required persistence prevents claiming a working data-backed application.

Recheck the handoff's local links and preservation after setup fixes. Read it as a fresh agent without the kickoff package or source checkout: it must expose the current stack, runnable commands, readiness limits, and actionable open decisions. Omit staging paths, unused template tokens, and duplicate records.

Deliver a concise account of what was prepared, how to run it, what was verified, and what remains blocked or deferred, with links to the project instructions and record. State the scope of local readiness without implying deployment, performance guarantees, or remote validation. Follow existing commit/publish authorization; kickoff itself grants none.
