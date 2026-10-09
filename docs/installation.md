# Installation

Run one of the following commands inside your website's folder, creating the folder first if needed. Install [Git](https://git-scm.com/downloads) and either [Bun](https://bun.com/docs/installation) or [Node.js 22.20+](https://nodejs.org/en/download).

**Bun:**

```sh
bun x --bun skills@1.7.1 add https://github.com/rayan6ms/modern-typescript-web-stack/tree/v0.1.7 --skill modern-typescript-web-stack modern-typescript-web-stack-kickoff --copy
```

**Node.js/npm:**

```sh
npx --yes skills@1.7.1 add https://github.com/rayan6ms/modern-typescript-web-stack/tree/v0.1.7 --skill modern-typescript-web-stack modern-typescript-web-stack-kickoff --copy
```

**[pnpm](https://pnpm.io/installation) with Node.js:**

```sh
pnpm dlx skills@1.7.1 add https://github.com/rayan6ms/modern-typescript-web-stack/tree/v0.1.7 --skill modern-typescript-web-stack modern-typescript-web-stack-kickoff --copy
```

These install both skills. Open the same folder in your coding agent and ask it to use the `modern-typescript-web-stack-kickoff` skill to set up this directory. Kickoff installs the website dependencies using the stack defaults.

## Agents and scope

Choose your agent when prompted, or append an explicit option to any command above:

| Agent | Option | Project skill directory |
| --- | --- | --- |
| Codex | `--agent codex` | `.agents/skills/` |
| Claude Code | `--agent claude-code` | `.claude/skills/` |

Other [supported agents](https://github.com/vercel-labs/skills#supported-agents) have their own identifiers and locations. If a skill does not appear, start a new agent session in the website's folder.

Installation is local to the current project. Add `--global` to make the skills available across projects. For unattended installation, supply `--agent` and append `--yes`; the `--yes` before `skills@1.7.1` in the npm command only skips npm's download confirmation.

## Local or manual installation

To install from a downloaded release or checkout, replace the GitHub URL with its local directory path.

For manual installation, copy the complete `skills/modern-typescript-web-stack/` and `skills/modern-typescript-web-stack-kickoff/` directories into your agent's skill directory, such as those listed above. Keep both together and preserve their supporting files.

## Updates and removal

To update a pinned installation, choose a new [release](https://github.com/rayan6ms/modern-typescript-web-stack/releases), replace `v0.1.7` with its tag, and rerun the install command. Updating a skill does not automatically update instructions already copied into a website project.

To remove these skills, use your preferred runner:

```sh
bun x --bun skills@1.7.1 remove modern-typescript-web-stack modern-typescript-web-stack-kickoff
```

```sh
npx --yes skills@1.7.1 remove modern-typescript-web-stack modern-typescript-web-stack-kickoff
```

```sh
pnpm dlx skills@1.7.1 remove modern-typescript-web-stack modern-typescript-web-stack-kickoff
```

This removes this product's named skills across agents in the current project. Include `--global` if you installed globally.

## Plugins

The included `plugin.json` can be used with compatible plugin hosts. See the [local plugin installation guide](https://developers.openai.com/plugins/build/plugins).
