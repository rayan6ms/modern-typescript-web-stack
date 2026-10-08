# Installation

With Bun and Git installed, run from your project workspace:

```sh
bun x --bun skills@1.7.1 add https://github.com/rayan6ms/modern-typescript-web-stack/tree/v0.1.0 --skill modern-typescript-web-stack modern-typescript-web-stack-kickoff --agent codex --copy
```

This installs the stack and kickoff skills. Your agent installs the website dependencies when you run kickoff.

## Other agents and installation options

Replace `--agent codex` with `--agent claude-code` or another [supported agent](https://github.com/vercel-labs/skills). Omit `--agent` to use the picker.

Installation is local to the current project. Add `--global` to make the skills available across projects, or `--yes` to skip confirmation prompts.

## Local or manual installation

To install from a downloaded release or checkout, replace the GitHub URL with its local directory path.

For manual installation, copy the complete `skills/modern-typescript-web-stack/` and `skills/modern-typescript-web-stack-kickoff/` directories into your agent’s skill directory. Keep both together and preserve their supporting files.

## Updates and removal

To update a pinned installation, choose a new [release](https://github.com/rayan6ms/modern-typescript-web-stack/releases), replace `v0.1.0` with its tag, and rerun the install command. Updating a skill does not automatically update instructions already copied into a website project.

To remove these skills:

```sh
bun x --bun skills@1.7.1 remove modern-typescript-web-stack modern-typescript-web-stack-kickoff --agent codex
```

Include `--global` if you installed globally.

## Plugins

The included `plugin.json` can be used with compatible plugin hosts. See the [local plugin installation guide](https://developers.openai.com/plugins/build/plugins).
