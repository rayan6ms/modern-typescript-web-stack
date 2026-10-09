# Project instructions

## Stack continuity

Selected profile: **{{PROFILE_NAME}}**.

Read the [local stack core](docs/stack/AGENTS.md) for its goals, defaults, invariants, and task-to-reference map. Then load only the references mapped to the current task. Resolve each link relative to its owning file; skip duplicate reads of current guidance already in context. Report missing required guidance and continue independent authorized work.

Use the [decision record](docs/stack-decisions.md) for the project brief, current foundation, constraints, and setup state. Check relevant decision entries before work that touches their scope; unrelated small edits need no full history review.

Keep applicable stack defaults and accepted project choices. Explicit user requirements take precedence over defaults. A departure needs an explicit user choice or a concrete, documented reason meeting the selected profile's evidence requirements; ordinary feature requests and agent tool preferences do not justify replacing the foundation. Reconsider only the affected boundary when requirements change or relevant evidence warrants it. Recorded choices do not authorize migrations or broader actions.

## Deferred decisions and updates

When a task reaches a deferred entry's revisit trigger or blocked scope, ask its recorded question before dependent work. Use its documented provisional behavior where applicable, and continue independent authorized work. An unanswered question is not approval of a new choice. Preserve unrelated accepted decisions.

Maintain decisions in the local record. Keep each ID attached to its original subject. Resolve answered scope in place, retaining remaining questions and triggers under that ID. Use new IDs for new material decisions; preserve replaced selections as superseded with replacement references. Update the affected implementation/check state when work lands, keeping selection separate from installation and verification.

Keep the record current and compact: replace obsolete check summaries, store each fact once, and group routine defaults. Before and after editing handoff documents, count their words using the same tool (for example, `wc -w`); review growth for duplication. For small projects, use soft upper targets of 500 words for root stack guidance and 1,000 for the decision record. Compaction-only work should reduce size. Preserve necessary commands, constraints, provenance, decision IDs, open questions/triggers and verification limits. Report counts and justified excess briefly in the task response; do not add size-history logs or trim unrelated user rules to meet a target.

## Commands and continuation

Find actual development/check commands, working directories, prerequisites, and readiness limits in the decision record. Express working directories relative to the project root so commands survive a moved checkout. Check current manifests/configuration before execution; update the record when commands change. Planned checks are not passing results, and a selected service is not necessarily configured. Results describe the recorded state and environment; rerun affected checks when implementation or configuration changes.

Continue using these instructions, the local profile, and the decision record. Routine development and resolution of open choices do not require rerunning kickoff or access to the setup conversation.
