# Installation

Setup installs the CLI and both skills globally. You choose the agents; none is assumed.

## Install

With [Bun](https://bun.com/docs/installation) and [Git](https://git-scm.com/downloads):

```sh
bun x --bun github:rayan6ms/modern-typescript-web-stack#v0.1.13
```

With curl and either Bun or Node.js 22+ (Linux/macOS):

```sh
curl -fsSL https://raw.githubusercontent.com/rayan6ms/modern-typescript-web-stack/v0.1.13/install.sh | sh
```

With Node.js 22+ and Git:

```sh
npx --yes github:rayan6ms/modern-typescript-web-stack#v0.1.13
```

With pnpm, Node.js 22+ and Git:

```sh
pnpm dlx github:rayan6ms/modern-typescript-web-stack#v0.1.13
```

The picker starts with popular agents in alphabetical order. **Other agents** opens the full list in the same picker; Tab switches between views and preserves your selections. Search finds any supported agent directly. Space selects agents and Enter confirms. All popular agents appear when the terminal has room; smaller terminals show a visible range and indicate more agents below.

The CLI is installed under `~/.local/share/modern-stack`, with its command in `~/.local/bin`. If needed, add that bin directory to your PATH:

```sh
export PATH="$HOME/.local/bin:$PATH"
```

On Windows, the CLI creates `modern-stack.cmd` in the same bin directory; add it to your user PATH.

## Use the CLI

```sh
modern-stack init
```

This installs or updates the bundled skills globally. To install into the current website instead:

```sh
modern-stack init --local
```

To skip agent selection, specify one or more identifiers from `modern-stack agents`:

```sh
modern-stack init --agent cursor
modern-stack init --agent claude-code,codex
```

Use `--dry-run` to preview destinations. Unchanged copies managed by this installer update directly; edited or unrecognized copies require confirmation or `--force` before replacement. Updates preserve unrelated files and skills.

After setup, open your website in your agent and ask it to use the `modern-typescript-web-stack-kickoff` skill. Website dependencies are installed during kickoff.

## Updates

1. Open the desired [release](https://github.com/rayan6ms/modern-typescript-web-stack/releases/latest) and rerun its installation command. Choose the agents whose global skills should update; setup replaces the CLI and those skills with that release.
2. Check the installed CLI version with `modern-stack --version`. `modern-stack init` uses this bundled version and works offline; it does not fetch a newer release.
3. For project-local installations, run `modern-stack init --local` from each website after updating the CLI, selecting the relevant agents again. Other agents and projects keep their existing copies.

Review and back up skill customizations before accepting replacement. `--force` discards edits inside the selected skill directories; it does not merge them. Manually installed copies may also need confirmation.

### Existing website policies

Kickoff saves a project policy snapshot, usually under `docs/stack/`. Skill updates leave that snapshot, project decisions, and application dependencies unchanged.

To refresh an existing website, ask your agent to compare its snapshot with the newly installed profile, merge the applicable policy changes while preserving local rules and decisions, and update the snapshot's provenance and decision record. Preserve the upstream `SOURCE.json` marker and label local modifications separately. Review the resulting diff and run checks for any affected configuration. Dependency upgrades or architecture migrations are separate work; rerunning kickoff is unnecessary.

## Removal

```sh
modern-stack remove
modern-stack remove --local
```

Removal uses the same agent picker, or accepts `--agent`. It removes only this product's two skills from the selected agents and scope. Agents that share a skill directory share those copies.

## Local files and plugins

From a release archive or checkout, run `bun cli/index.mjs` or `node cli/index.mjs`. Skills are bundled, so setup works offline after downloading the CLI.

For manual installation, copy both complete skill directories from `skills/` into your agent's skill directory. [Codex](https://learn.chatgpt.com/docs/build-skills#where-codex-loads-local-skills) uses `~/.agents/skills/` globally and `.agents/skills/` in a project. Claude Code uses `~/.claude/skills/` and `.claude/skills/`.

The included `plugin.json` supports compatible plugin hosts; see the [local plugin installation guide](https://developers.openai.com/plugins/build/plugins).
