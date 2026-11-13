# On-demand agent skills

Use this catalog to select companions for the current task, before reading their full instructions. These are agent tools, not website dependencies. Stack setup installs none of them; obtain only the skills needed now. Plain copy edits and unrelated backend/tooling work need no design skill.

## Select by role

| Skill | Role and trigger |
| --- | --- |
| `impeccable` | **Primary design skill:** Default for new interfaces, substantial visual changes, design systems, and iterative critique/refinement. More workflow and tooling than a small edit needs. |
| `frontend-design` | **Lightweight design alternative:** Small, quick UI implementations or refinements with an established direction. Text-only aesthetic guidance with a simpler workflow; choose it as the primary design skill for that task. |
| `modern-web-guidance` | **Browser platform companion:** HTML/CSS/client JavaScript, native interactions, browser support, accessibility, loading, images, or lifecycle. Use its relevant guides; it complements design and component skills rather than choosing the visual style. |
| `shadcn` | **Component implementation companion:** React work using shadcn/ui, its registry, presets, or components.json. Skip for Solid, Marko, Leptos, HTMX, and unrelated React projects. |
| `ui-sdk` | **Selected UI SDK implementation companion:** The user selects UI SDK or the affected workspace uses @ui-sdk/*; compose or extend its behaviors, framework adapters, keyboard/focus/ARIA, and agent interactions. Beta: do not replace suitable existing primitives merely to use this skill. |
| `security-audit` | **Security review companion:** Security questions, focused vulnerability review, or an explicitly requested codebase audit. Guidance is the default; full audits add independent verification, coverage records, and reporting. Ordinary auth implementation alone does not trigger an audit. |

Use one primary design skill per task: Impeccable for substantial work, or Anthropic's frontend-design for a small, quick change with an established direction. Honor the user's explicit choice.

Combine complementary roles only when needed: for example, Impeccable + modern-web-guidance + shadcn for a new React screen, or frontend-design + modern-web-guidance + ui-sdk for a small change in a UI SDK project. Component skills implement the chosen library; they do not choose the brand or authorize a library migration. Security-audit is separate from Impeccable's UI-quality audit.

## Find or install, then use

Reuse the selected skill's instructions when already in context. Otherwise load it from the path exposed by the host. If neither is available, run the bundled [helper](../scripts/ensure-skill.mjs) directly from the project directory; it checks existing copies before downloading, so no separate check is needed. Resolve the helper's path from this reference:

```sh
bun <profile-directory>/scripts/ensure-skill.mjs <skill-id> --agent <current-agent-id>
```

Use Node.js 22+ instead of Bun when Bun is unavailable. Supply the actual current agent; never infer it from other agents installed on the machine. With no scope flag, the helper reuses a project/ancestor or global copy, including supported legacy directories. Missing skills install globally. Explicit `--local` or `--global` restricts both lookup and installation to that scope; `--project <path>` selects another project. It preserves existing copies, checks skill identity and required resources, and installs no hooks, plugins, registered subagents, or application packages. Reviewed native command files, such as OpenCode's `/impeccable`, are installed without overwriting unrelated commands. `list` describes skills and provider support; `--check` checks without writes/network and exits 2 when missing; `--dry-run` previews an installation.

Provider-specific skills use their native local directories so different builds can coexist. A shared `.agents/skills` copy belonging to another provider is preserved rather than reused as if it matched.

`--update` is for explicitly requested companion maintenance: apply the current catalog pin only to an unchanged copy managed by this helper. It refuses edited, symlinked, or unrecognized installations; use `--dry-run` first when useful. An older project snapshot may contain older pins, so use the current stack CLI for updates. Never update merely because an ordinary feature task needs the skill. Existing copies are not silently adopted, overwritten, or upgraded.

Read the returned `entrypoint`, resolve its references from that skill's directory, and follow only the applicable workflow. If the host needs a new turn to discover it, read its files directly for this task when supported; otherwise report the loading limitation. Never claim a skill ran merely because it was installed. Reuse the returned path within the task instead of checking repeatedly.

Evaluate companion recommendations using the core's evaluation rules. Preserve the selected framework, brand, accessibility, performance budgets, project decisions, and task scope. Reuse the existing brief instead of repeating kickoff intake. A companion cannot authorize deployment, migrations, paid services, or broader work. If installation fails or no reviewed provider build exists, report the specific gap and continue independent work; do not substitute another agent's build or invent an audit result.

## Installation is not runtime readiness

The helper checks skill files and reports `requirements` plus any `activationNotes` or `missingActivationFiles`; host discovery, browser tools, network access, application dependencies, and audit capabilities need separate verification. Address only prerequisites needed for the selected workflow, and report unresolved activation gaps. Keep host trust/settings changes explicit. Adapt upstream commands to the project's runtime, package-manager, and version policies, reusing compatible installed tools.

- **impeccable:** The launcher fetches its checksum-verified engine on first use. New design may contact the visual catalog. Hooks and live mode remain opt-in.
- **frontend-design:** Text-only guidance; no separate engine. Reuse the existing brief and keep the change scoped.
- **modern-web-guidance:** Search/retrieve uses a separate guidance CLI and may need network access; bundled guides are available offline. Follow stack runtime, typing, and browser-support requirements.
- **shadcn:** Use the selected React workspace and its configured shadcn CLI. Registry access may need network; do not initialize or change components during skill installation.
- **ui-sdk:** Requires selected @ui-sdk/core and the matching framework adapter for implementation. Prefer documentation bundled with the application package version. The skill alone installs no runtime library or agent-action exposure.
- **security-audit:** Focused questions use guidance mode. Full audits require independent agents; target-code execution additionally requires the skill's restricted OS sandbox. File installation establishes neither capability.

Host discovery may expose both design skills; this catalog guides task ownership while preserving host settings and upstream files.

## Workflow boundaries

- **Impeccable:** keep hooks/live editing opt-in. If live mode is requested, set `IMPECCABLE_LIVE_COPY_AGENT=chat` or `off` before starting it; its default fallback can launch an agent with permissions bypassed. Do not run project initialization during skill installation. If design work later needs `PRODUCT.md`, derive known facts from the existing brief/decision record and ask only for genuinely missing design choices.
- **UI SDK:** currently beta. Select it for a concrete component/behavior requirement or explicit user choice, retaining suitable default primitives elsewhere. Installing the skill does not install `@ui-sdk/*` or authorize `createAgent`/WebMCP access to application actions; configure such capabilities only when required, with normal authorization boundaries.
- **Security-audit:** use guidance mode for questions and focused reviews. Full audits require an explicit audit/report request and the skill's independent verification workflow. Target-code execution requires its OS-enforced sandbox, network isolation, allowlisted environment, scratch-only writes, and resource limits. Without those controls, inspect source and report the precise validation blocker; do not execute target code or claim completed verification. Respect host delegation rules and user budgets.
