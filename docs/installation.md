# Installation

Run one of the following commands inside your website's folder, creating the folder first if needed. Install [Git](https://git-scm.com/downloads) and either [Bun](https://bun.com/docs/installation) or [Node.js 22.20+](https://nodejs.org/en/download).

These commands use Codex. For Claude Code, replace `codex` with `claude-code`.

**Bun:**

```sh
bun x --bun skills@1.7.1 add https://github.com/rayan6ms/modern-typescript-web-stack/tree/v0.1.8 --agent codex --copy --yes
```

**Node.js/npm:**

```sh
npx --yes skills@1.7.1 add https://github.com/rayan6ms/modern-typescript-web-stack/tree/v0.1.8 --agent codex --copy --yes
```

**[pnpm](https://pnpm.io/installation) with Node.js:**

```sh
pnpm dlx skills@1.7.1 add https://github.com/rayan6ms/modern-typescript-web-stack/tree/v0.1.8 --agent codex --copy --yes
```

Both skills install as project-local copies without prompts. Open the same folder in your coding agent and ask it to use the `modern-typescript-web-stack-kickoff` skill to set up this directory. Kickoff installs the website dependencies using the stack defaults.

## Agents and scope

Set `--agent` to the agent you use:

| Agent | Option | Project skill directory |
| --- | --- | --- |
| Claude Code | `--agent claude-code` | `.claude/skills/` |
| Codex | `--agent codex` | `.agents/skills/` |

For other [supported agents](https://github.com/vercel-labs/skills#supported-agents), replace `codex` with their identifier. To install for both Codex and Claude Code, use `--agent codex claude-code`. The explicit target bypasses agent detection and the interactive picker.

[Codex reads project skills from `.agents/skills/`](https://learn.chatgpt.com/docs/build-skills#where-codex-loads-local-skills). If a skill does not appear, start a new agent session in the website's folder.

Add `--global` to make the skills available across projects. Keep the final `--yes` to skip installer prompts; npm's earlier `--yes` only skips its download confirmation.

## Local or manual installation

To install from a downloaded release or checkout, replace the GitHub URL with its local directory path.

For manual installation, copy the complete `skills/modern-typescript-web-stack/` and `skills/modern-typescript-web-stack-kickoff/` directories into your agent's skill directory, such as those listed above. Keep both together and preserve their supporting files.

## Updates and removal

To update a pinned installation, choose a new [release](https://github.com/rayan6ms/modern-typescript-web-stack/releases), replace `v0.1.8` with its tag, and rerun the install command. This replaces the installed copies, so save any local skill edits first. Updating a skill does not automatically update instructions already copied into a website project.

To remove these skills, use your preferred runner:

```sh
bun x --bun skills@1.7.1 remove modern-typescript-web-stack modern-typescript-web-stack-kickoff --yes
```

```sh
npx --yes skills@1.7.1 remove modern-typescript-web-stack modern-typescript-web-stack-kickoff --yes
```

```sh
pnpm dlx skills@1.7.1 remove modern-typescript-web-stack modern-typescript-web-stack-kickoff --yes
```

This removes this product's named skills across agents in the current project without prompts. Include `--global` if you installed globally.

## Plugins

The included `plugin.json` can be used with compatible plugin hosts. See the [local plugin installation guide](https://developers.openai.com/plugins/build/plugins).
