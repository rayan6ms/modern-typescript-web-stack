# Kickoff trial assessment

This product includes 3 scenarios from the original five-scenario assessment on 2026-10-08. Their local foundations passed applicable install, type/lint/format, production build/startup, and relevant browser/service checks. These published copies preserve the original application code and policy, with host paths and publication notes adapted as listed in [demo provenance](demo-provenance.json).

| Demo | Local-foundation score | Finding |
| --- | --- | --- |
| [Cedar Journal](../examples/01-cedar-journal/README.md) | 10/10 | No initial-scope defect found; publication metadata and hosting are deferred. |
| [DeskLedger](../examples/02-deskledger/README.md) | 10/10 | Public shell and restricted local DB connection verified; identity/SSO and domain authorization remain deferred. |
| [LiveBoard](../examples/03-liveboard/README.md) | 10/10 | Convex SDK/configuration prepared; no hosted connectivity, subscriptions, or authentication claim. |

## Method and evidence

The original experiment used frozen source revision `ff254aae09cd3cee626c39f07767d4e8f559e108`, GPT 6.1 Sol with high reasoning, and prepared product answers. Five scenarios needed seven dispatches because two were cancelled externally and resumed. This product's subset used 5 dispatches for 3 scenarios. The cancellation cause is unknown. No evaluator repairs were applied to the original websites, and the source guidance was revised only after the assessment.

[Scores](scores.json) follow the [predeclared rubric](RUBRIC.md). [Command results](check-summary.json) record 19 passing command executions in this subset; expected failure probes can correctly have a nonzero exit status. These are executions, not counts of distinct tests. Prepared [briefs and answers](cases/) and browser/HTTP evidence are included for these cases. Agent traces, credentials, host tooling, volumes, raw environment inventories, and dependency caches are not distributed.

The scored outputs used frozen local guidance and retained selected defaults, complete policy snapshots, stable deferred IDs, explicit blocked scopes, and chosen-versus-verified distinctions. That demonstrates instruction use, but the prepared answers also influenced selection. There was no control group, so causal improvement cannot be quantified. The interview itself and fresh-agent continuation were not tested.

## Scope and known limits

The installs passed on an existing Linux/Bun 1.4.0 host and cache. This was not a clean-machine or cross-platform certification. Interactive foundations use a documented pinned Nitro prerelease; passing local checks does not establish production support. No deployment, traffic capacity, field Core Web Vitals, auth/payment behavior, or complete application is claimed.

Convex connectivity/subscriptions/authentication were unavailable and remain unverified. DeskLedger verified a restricted PostgreSQL connection and failure/recovery, while identity and domain authorization remained pending. Cedar verified static article/image delivery; hosting and final publication metadata remain pending.

## Improvements informed by this assessment

Current product guidance checks focus after asynchronous transitions, recommends a documented verification command with clear coverage, puts readiness/commands/open IDs first in the durable record, assesses required prereleases explicitly, and stamps release provenance. Published demos remain historical evidence, not proof that the revised guidance fixes every future agent's behavior.

Publication checks passed 11 recorded install/build/code commands and the relevant production startup/HTTP smoke checks on the relocated copies; see [publication results](publication-checks.json). These are separate from the historical scores. Both products also passed isolated Skills CLI discovery/copy installation for Codex and Claude Code, package routing/provenance tests, and plugin manifest schema validation. See [installation validation](../docs/installation.md#supported-environments-and-validation). Future evaluation should cover a live incomplete interview, a fresh continuation agent, clean-environment installation, and a matched control if causal effect is the question.
