---
name: modern-typescript-web-stack-kickoff
description: Initialize and verify a minimal website foundation using the Modern TypeScript Web Stack profile. Gather requirements, preserve defaults, install and scaffold required components, and leave persistent guidance and actionable deferred decisions. Use during project kickoff, not routine feature work or stack migrations.
---

# Modern TypeScript Kickoff

Prepare the smallest verified initial foundation that fits the user's known requirements and the selected stack's goals. For planning-only requests, produce the foundation plan. Keep applicable defaults unless the user explicitly chooses otherwise or a concrete constraint justifies a scoped departure.

## Bundled profile

Invoking this product's kickoff selects **modern-typescript-web-stack**. Read the bundled [profile core](../modern-typescript-web-stack/AGENTS.md) and follow its reference routing. Keep this profile unless the user explicitly changes the selection; missing guidance leaves affected work pending.

## Establish scope and the selected profile

Use the profile explicitly selected by the user or established in applicable project instructions. If the selection is missing or conflicting, ask the user which profile to use; continue independent product questions while awaiting that choice. Keep the selected profile throughout planning unless the user changes it.

Read its core instructions and architecture/tooling references, following its own routing for other affected boundaries. Use supplied files or installed guidance; record the source location and revision/release from a supplied `SOURCE.json` marker or the source checkout's Git metadata when available, otherwise "unknown". Label local policy modifications separately. Retrieve missing required guidance rather than reconstructing it from memory. Keep affected selections pending if that guidance is unavailable.

The selected profile supplies the technology catalog. This skill does not require a sibling stack package or maintain a second copy of its recommendations.

Establish the target directory and setup scope from the request and available context; ask about unresolved ambiguity before writes. Inspect existing instructions and files when a target exists. Preserve compatible configuration and resume only unfinished initial setup when a kickoff foundation already exists; adapting an established application or migrating its stack is outside this workflow.

## Gather material requirements

Read the user's brief and available project context first. Ask concise, grouped questions about missing information that can change the initial foundation:

- What the website does, who uses it, and which capabilities are needed for the first usable version. Separate committed needs from possible future features.
- Public content and SEO, interactive workflows, accounts/roles, and persistent or shared data.
- Relevant data ownership, tenancy, realtime/offline behavior, uploads, background work, and external integrations.
- Known hosting, regional/data residency, budget, operational, and integration constraints; required technologies or existing services.
- Expected usage and critical user journeys. Ask for rough estimates when useful; label assumptions and unknown performance budgets.

Ask only relevant questions the brief has not answered. Accept "undecided" and avoid asking the user to select routine libraries. Use follow-ups for answers that materially affect a boundary; a complete brief needs no ritual questionnaire. Never request credentials as interview answers or include them in the plan.

Distinguish facts, user choices, and provisional assumptions. An unanswered question is not approval of a proposed departure. Pause dependent selections when an unknown could invalidate the foundation; continue independent planning and defer choices that can safely wait.

## Select conservatively

1. Start from the selected profile's applicable defaults and supported branches. A content-only branch or omission of an unnecessary database follows the profile; it is not a reason to replace the rest of the stack.
2. Map required capabilities to their recommended tools and boundaries. Feature names such as "realtime", "AI", or "high traffic" alone do not justify changing a framework, database, runtime, or deployment architecture. Establish the specific requirement and assess how the defaults address it.
3. Add conditional components for concrete launch needs or credible workload requirements, checking compatibility. Do not install the catalog in anticipation of possible future features. Distinguish a selected tool's initial applicability from its availability for later use.
4. Depart from a default for an explicit user choice, a concrete conflict with a requirement, a verified support gap, or credible workload evidence. Record the user's explicit choice or explain why the default is insufficient, then identify the smallest affected boundary, the tradeoff, and how the alternative will be validated. Meet the selected profile's evidence requirements for that boundary; estimates do not establish benchmark results. An agent's preference or general claim that something is faster is insufficient. Keep unverified compatibility concerns visible as open checks.
5. Preserve accepted choices across follow-ups. Reconsider the affected boundary when the user changes a requirement, a recorded trigger occurs, or evidence establishes a relevant limitation. A new feature or newer dependency version does not authorize a broad redesign or migration.

Routine default choices need no comparison exercise or extra approval. Explicit user requirements take precedence over profile preferences; explain material conflicts rather than silently overriding them. Resolve material uncertainty through the interview and preserve existing authorization boundaries.

## Produce the kickoff plan

Produce a concise plan containing the information below. Planning-only requests receive the plan in the response; save it only when requested, using an existing planning document or `docs/stack-plan.md`. For an authorized project kickoff/setup or a request for persistent guidance, write the handoff using [Persistent project handoff](references/handoff.md). Do not require a separate confirmation to save guidance already covered by that request. Include:

- **Project brief:** initial outcome, committed capabilities, constraints, and labeled assumptions.
- **Selected foundation:** profile/source, applicable rendering/runtime/data/tooling choices, their roles, and only the services needed initially. Distinguish profile defaults, supported branches, conditional additions, and explicit departures.
- **Minimal setup scope:** essential files/configuration and a minimal runnable page or endpoint to create later. Avoid speculative feature directories, domain models, abstraction layers, and unused service integrations.
- **Material decisions:** chosen options and a short rationale. Record departures with their requirement/evidence, tradeoff, and planned validation. Recording a selection does not mean it has been installed or verified.
- **Deferred decisions:** the unresolved question and reason; safe provisional behavior (or explicitly none); affected scope and what can proceed; the event that requires revisiting it; and what the next agent must ask or do. Identify decisions that currently block dependent setup.
- **Verification plan:** applicable install, type, lint/format, production build, startup/smoke, and selected integration checks. Identify checks awaiting access or credentials without claiming readiness.

For example: payment-provider selection can remain deferred while public pages are planned. Before implementing checkout or subscriptions, ask about supported countries, billing requirements, and provider preferences. Record that checkout is blocked by that decision; do not create a speculative payment abstraction.

Update the plan when answers arrive. Resolve deferred entries into chosen decisions, and mark replaced material decisions as superseded. Once a persistent record exists, maintain decisions there rather than in competing plans. Future agents should revisit open choices when their recorded trigger is reached, without rerunning kickoff or questioning settled choices during unrelated tasks.

## Execute the requested initial setup

For a setup request, establish the persistent handoff, read [Installation and minimal scaffolding](references/scaffolding.md), and implement the selected, unblocked foundation. Then read [Verification and delivery](references/verification.md), exercise the actual setup, and fix defects introduced by this work. Use the selected profile's applicable guidance and version-compatible official setup paths. Plan-only or documentation-only requests do not run installation, generators, or application checks.

Keep the decision record current as setup proceeds, preserving its IDs and independent pending choices. Deliver the prepared foundation with real commands, check results, readiness scope, remaining blockers, and the next actions for deferred decisions. Installation or a development server alone does not establish production readiness.
