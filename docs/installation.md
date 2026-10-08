# Installation and updates

Install both skills, then invoke kickoff in the target website workspace. Skill installation does not run generators, install a site's dependencies, or create services; the agent performs that work after gathering the project requirements.

## From a local checkout or release

With Bun and Git installed, run from your website workspace, replacing the source path with the unpacked product directory:

```sh
bunx --bun skills@1.7.1 add /path/to/modern-typescript-web-stack --skill modern-typescript-web-stack modern-typescript-web-stack-kickoff --agent codex --copy
```

To inspect discovery first, append `--list` instead of the selected skill/agent options. Add `--yes` for unattended installation after choosing the source and scope. Project installation is the default; `--global` makes skills available across projects. Replace `codex` with another agent supported by the CLI, or omit `--agent` for its picker. The documented CLI version runs under Bun; the package does not require Node merely because the CLI's metadata mentions it.

## From GitHub

Run from your website workspace to install the tagged release:

```sh
bunx --bun skills@1.7.1 add https://github.com/rayan6ms/modern-typescript-web-stack/tree/v0.1.0 --skill modern-typescript-web-stack modern-typescript-web-stack-kickoff --agent codex --copy
```

The [repository](https://github.com/rayan6ms/modern-typescript-web-stack) and [releases](https://github.com/rayan6ms/modern-typescript-web-stack/releases) provide the guide, downloads, and changelog. Keep the CLI version pinned separately from the product version. To follow development instead, use the repository URL without `/tree/v0.1.0`.

Codex users can alternatively ask `$skill-installer` to install both skill directories from the repository. Agent skill discovery and invocation vary; check your agent's documentation and loaded skill list. See [the Skills CLI](https://github.com/vercel-labs/skills) and [Codex skills](https://learn.chatgpt.com/docs/build-skills).

## Manual installation

Copy the complete `skills/modern-typescript-web-stack/` and `skills/modern-typescript-web-stack-kickoff/` directories into your agent's configured skill directory, preserving their names, references, assets, and `SOURCE.json`. Copy both into the same parent directory so kickoff's relative link reaches its selected profile. No symlink or source checkout is required for continued use. Agents without skill discovery can read the kickoff `SKILL.md` directly.

The root `plugin.json` is a skills-only portable plugin manifest; its onboarding path selects kickoff. Use a compatible plugin host's documented local installation flow. Plugin UI/onboarding has not been exercised here; standalone Skills CLI installation is the tested route.

## Start a website

```text
Use $modern-typescript-web-stack-kickoff to initialize ./my-site.
The website is [purpose], for [users], with [initial capabilities].
Known constraints: [hosting, budget, region, existing services, or undecided].
Prepare and verify a minimal foundation and document pending decisions.
```

Your agent needs filesystem/command access and network access for required dependency registries. Bun is preferred; a Rust backend requires a suitable Rust toolchain, and local container services require a supported container engine. Kickoff checks available tools and obtains only missing prerequisites required by the selected scope. Host restrictions or absent service credentials can leave an explicitly documented partial foundation. No agent, model access, hosted account, secret, or production deployment is included.

## Updates and removal

Review a release before updating. Keep accepted application decisions and local policy edits; refreshing an installed skill does not automatically replace the policy snapshot inside an existing website. Apply policy changes there as scoped reviewed work.

For a pinned installation, review the next release, replace `v0.1.0` with its tag, and rerun the install command. `bunx --bun skills@1.7.1 update` checks tracked sources; it does not select a newer release tag for you. Retain the source/version information written by the installer. For a local archive, reinstall from the chosen new release according to the CLI's current overwrite behavior, preserving local customizations first. Remove just this product with:

```sh
bunx --bun skills@1.7.1 remove modern-typescript-web-stack modern-typescript-web-stack-kickoff --agent codex
```

Use `--global` when removing a global installation. Do not use `--all` to remove one product.

## Supported environments and validation

Package assembly, independent discovery, and project-local copy installation are tested on Linux with Bun 1.4.0 and Skills CLI 1.7.1. Codex and Claude Code installation layouts are checked; the five historical implementation scenarios used GPT 6.1 Sol with high reasoning in T3 Code. Other agents and operating systems remain unverified.

Run `bun scripts/validate-product.ts .` from this product to check skill metadata, local links, plugin/onboarding paths, and demo manifests/provenance. GitHub Actions runs that validation and each demo's explicit checks/builds with bounded resources. These are package/application checks; they do not run a model or prove production readiness. The [assessment](../assessment/REPORT.md) records the original trial's narrower evidence and limits.
