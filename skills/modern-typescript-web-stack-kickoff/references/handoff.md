# Persistent project handoff

Read when a kickoff/setup request includes preparing the target project, or the user asks to save persistent project guidance. Planning-only requests need no handoff files. This workflow writes instructions, decisions, and the selected policy snapshot; it does not install dependencies or scaffold application code.

## Choose the destination and preserve context

Use the established target and existing project conventions. Inspect its active instruction files, decision/planning documents, and any local stack policy first. A conventional new project uses:

```text
AGENTS.md
docs/
  stack-decisions.md
  stack/
    AGENTS.md
    references/
    SOURCE.json          # when supplied with the profile
```

Use equivalent existing locations where appropriate and adapt every output link. Templates are [project instructions](../assets/project-instructions.md) and [the decision record](../assets/stack-decisions.md). They describe generated output, not additional policy to install verbatim.

Merge with existing instructions and records; preserve user rules, accepted choices, open questions, and notes. Add one discoverable stack-continuity section rather than duplicate policy blocks. Subsequent handoff updates should change only affected facts/instructions and avoid duplicate snapshots or decision IDs. A conflicting profile or material decision requires resolution under the user's instructions; this workflow grants no migration or wholesale policy replacement.

## Keep one local profile snapshot

Copy the selected profile's core `AGENTS.md`, complete `references/` directory, and supplied `SOURCE.json` marker into the local policy location. Keep their contents and relative layout intact, including currently unused references needed for future tasks. The marker identifies the upstream package revision; copying it does not imply that the snapshot contains every upstream file. Copying a policy file does not select or install its technologies. Use real project files so continuation does not depend on the source checkout, global skill installation, symlinks, or this kickoff package. The profile's README, skill entrypoint, and UI metadata are unnecessary for project-policy use.

Check that the required source files and their local links are available before activating routing to the snapshot. If guidance is missing, keep the affected handoff pending, save known decisions within scope, and report the gap; do not emit links to absent files or describe the policy as complete.

Use a compatible existing local snapshot when one already governs the project. Do not silently refresh it from a newer upstream copy or overwrite local edits. Record the profile name, upstream source/package, revision or release from supplied provenance or the source checkout's Git metadata (otherwise "unknown"), snapshot date, and local relative path in the decision record. Label local policy modifications separately; preserve the upstream marker rather than presenting edited policy as an exact upstream copy. Missing provenance alone does not block usable guidance. Future source updates are scoped policy changes, not automatic resynchronization.

## Write the project entrypoint

Adapt the project-instruction template into the root `AGENTS.md`, or the instruction file/location explicitly requested by the user. When merging, integrate its guidance into existing sections and omit the template's extra document title. Keep the entrypoint short and independent of the kickoff skill.

The entrypoint must tell the next agent to read the local selected core and use its task-to-reference routing. It must point to the current decision record for project constraints, selected capabilities, relevant open choices, and setup/command state. Load task-relevant detail rather than the whole reference catalog or decision history for every edit.

Persist the conservative selection rule: applicable profile defaults remain the baseline; explicit user choices and documented project-specific decisions refine them. Ordinary feature requests do not justify wholesale replacement. A decision record describes choices and state, not authorization for migrations, external mutations, or broader work.

Persist the continuation rule: when a task reaches a deferred decision's trigger or blocked scope, ask its recorded question before dependent implementation, while proceeding on independent authorized work. Accepted choices remain in place during unrelated tasks. Changes to requirements or evidence reopen only the affected boundary, following the selected policy's evidence requirements and the user's authorization.

## Write the durable decision record

Use one authoritative record, adapting the template to existing conventions. Transfer the phase-1 brief, selected foundation, constraints, assumptions, and material decisions without expanding the technology catalog. If a saved plan already contains these decisions, consolidate them into the record and mark the plan's decision section as superseded with a link, preserving useful planning/history. Avoid two independently maintained versions of current choices.

Lead with a concise current foundation/setup summary, exact run/check commands and verification coverage, readiness limits, and linked pending decision IDs. Keep rationale and deferred-question details in their authoritative entries, using IDs elsewhere rather than repeating them. Summarize latest check outcomes and material failures/resolutions; link detailed evidence when useful instead of retaining a long command transcript. Do not create a separate readiness document.

Record the initial capabilities and minimal setup scope. Assign stable IDs to material decisions and use these states:

- **Chosen:** the selected option, its scope and basis (default, supported branch, conditional need, explicit user choice, or evidenced departure), and a short rationale. Material departures also need their evidence/constraint, tradeoff, and planned validation.
- **Deferred:** the unresolved question and why it remains open; safe provisional behavior or explicitly none; dependent/blocked scope; what can proceed; a concrete revisit trigger; and the next question/action. A current blocker can use "before the initial data/API scaffold" as its trigger. Unknown requirements that could invalidate a foundation must keep that dependent setup pending.
- **Superseded:** a replaced material choice with its original ID, brief reason for replacement, and link or ID for the new choice. A resolved deferred entry becomes chosen under its existing ID; do not leave an active duplicate open question.

Keep implementation/verification state separate from those decision states. A chosen database is not necessarily installed, connected, or tested. Describe actual files/services present, work remaining, and checks performed or pending. Include real development/check commands with their working directory and prerequisites when they exist; verify names against manifests/configuration. Record check outcomes against the tested revision/state, runtime, and date, with scoped readiness and blockers. If no runnable application exists, state that and describe planned checks without inventing runnable scripts or passing results. Record credential-dependent prerequisites by purpose or variable name, never by value.

Use the same record during subsequent tasks: update the affected decision and its implementation state when answers arrive or scoped changes land. A missing optional provider should remain an actionable entry, not a reason to reopen the whole stack. Preserve the selected profile's goals and constraints when revisiting choices.

## Validate and hand over

Fill or remove every template token and unused example block. Confirm that generated relative links resolve from their owning files, copied policy links stay within the selected local snapshot, and the root entrypoint reaches the record and core. Check that no persistent instruction requires this skill, another stack, the original installation path, or the setup conversation.

Read the result as a fresh continuation: it must identify the selected foundation, distinguish planned work from verified work, and tell the agent which question to ask when an open decision blocks its task. Verify preservation of existing instructions and decisions, and report the written paths, policy/decision gaps, and remaining setup work. These are handoff checks; for setup requests, also complete [application verification and delivery](verification.md).
