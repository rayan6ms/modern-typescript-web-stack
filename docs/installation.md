# Installation

Setup installs the CLI and both skills globally. You choose the agents; none is assumed.

## Install

With [Bun](https://bun.com/docs/installation) and [Git](https://git-scm.com/downloads):

```sh
bun x --bun github:rayan6ms/modern-typescript-web-stack#v0.1.9
```

With curl and either Bun or Node.js 22+ (Linux/macOS):

```sh
curl -fsSL https://raw.githubusercontent.com/rayan6ms/modern-typescript-web-stack/v0.1.9/install.sh | sh
```

With Node.js 22+ and Git:

```sh
npx --yes github:rayan6ms/modern-typescript-web-stack#v0.1.9
```

With pnpm, Node.js 22+ and Git:

```sh
pnpm dlx github:rayan6ms/modern-typescript-web-stack#v0.1.9
```

The installer shows popular agents alphabetically, with search and multiple selection. It then asks **Install additional agents?**, defaulting to **No**. Choose Yes for the remaining agents, also sorted and searchable. Leave the popular list empty if you only want an additional agent.

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

Use `--dry-run` to preview destinations. Existing or edited copies require confirmation or `--force` before replacement. Updates preserve unrelated files and skills.

After setup, open your website in your agent and ask it to use the `modern-typescript-web-stack-kickoff` skill. Website dependencies are installed during kickoff.

## Updates and removal

Rerun setup with a newer [release](https://github.com/rayan6ms/modern-typescript-web-stack/releases) to update the CLI and bundled skills. `modern-stack init` uses the version already installed; it does not fetch a new release. Updating skills does not change instructions previously copied into a website project.

```sh
modern-stack remove
modern-stack remove --local
```

Removal uses the same agent picker, or accepts `--agent`. It removes only this product's two skills from the selected agents and scope. Agents that share a skill directory share those copies.

## Local files and plugins

From a release archive or checkout, run `bun cli/index.mjs` or `node cli/index.mjs`. Skills are bundled, so setup works offline after downloading the CLI.

For manual installation, copy both complete skill directories from `skills/` into your agent's skill directory. [Codex](https://learn.chatgpt.com/docs/build-skills#where-codex-loads-local-skills) uses `~/.agents/skills/` globally and `.agents/skills/` in a project. Claude Code uses `~/.claude/skills/` and `.claude/skills/`.

The included `plugin.json` supports compatible plugin hosts; see the [local plugin installation guide](https://developers.openai.com/plugins/build/plugins).
