# Modern TypeScript Web Stack

[![Release](https://img.shields.io/github/v/release/rayan6ms/modern-typescript-web-stack)](https://github.com/rayan6ms/modern-typescript-web-stack/releases/latest)
[![CI](https://github.com/rayan6ms/modern-typescript-web-stack/actions/workflows/check.yml/badge.svg)](https://github.com/rayan6ms/modern-typescript-web-stack/actions/workflows/check.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A TypeScript stack for building websites with fast development, end-to-end type safety, and reliable operation—bundled with modular coding-agent skills that scaffold new projects and guide ongoing development.

A good fit for SaaS products, dashboards, marketplaces, AI applications, and internal tools.

## The stack

| Layer | Recommendation |
| --- | --- |
| Framework | [React](https://react.dev/) + [TanStack Start](https://tanstack.com/start/latest/docs/framework/react/overview) |
| UI | [shadcn/ui](https://ui.shadcn.com/) (Base UI / Radix) + [Tailwind CSS](https://tailwindcss.com/) |
| Server state | [TanStack Query](https://tanstack.com/query/latest) |
| API & validation | TanStack Start server functions or [oRPC](https://orpc.dev/), with [Zod](https://zod.dev/) |
| Database | [PostgreSQL](https://www.postgresql.org/) + [Drizzle](https://orm.drizzle.team/) |
| Authentication | [Better Auth](https://www.better-auth.com/) |
| Complex async workflows | [Effect](https://effect.website/docs/v4/getting-started/why-effect) |
| Tooling | [Bun](https://bun.com/), [Vite](https://vite.dev/), [Ultracite](https://www.ultracite.ai/docs) with [Oxlint + Oxfmt](https://oxc.rs/) |
| Hosting | [Cloudflare Workers](https://developers.cloudflare.com/workers/) or a regional Bun server |

Also includes dedicated profiles for **Astro** (content sites), **Convex** (reactive shared data), **Turso** (embedded data & sync), **Marko** (streaming/resumability), and **HTMX** (HTML-driven UI). The [stack guide](docs/stack.md) explains these choices and covers images, payments, monorepos, supply-chain hardening, quality checks, and scaling.

## How the skills work

- **Project kickoff (`modern-typescript-web-stack-kickoff`):** Interviews you on requirements, scaffolds only what you need, verifies the build, and writes a durable decision record (`docs/stack-decisions.md`) plus a local policy snapshot (`docs/stack/`).
- **Modular ongoing guidance (`modern-typescript-web-stack`):** Uses a compact core `AGENTS.md` that routes to task-specific references (database, frontend, browser platform, hosting, quality) instead of loading the entire catalog into context.
- **On-demand companion skills:** Routes design (`impeccable`, `frontend-design`), browser platform (`modern-web-guidance`), component (`shadcn`, `ui-sdk`), and security (`security-audit`) tasks through `modern-stack skill`—installed only when needed.
- **Offline-capable CLI:** Bundles both skills, guards local customizations on updates, supports global or `--local` installs, and removes cleanly.

## Use with your agent

With [Bun](https://bun.com/docs/installation) and [Git](https://git-scm.com/downloads), run:

```sh
bun x --bun github:rayan6ms/modern-typescript-web-stack#v0.1.19
```

<details>
<summary>curl, npm or pnpm</summary>

With curl and either Bun or Node.js 22+ (Linux/macOS):

```sh
curl -fsSL https://raw.githubusercontent.com/rayan6ms/modern-typescript-web-stack/v0.1.19/install.sh | sh
```

With Node.js 22+ and Git:

```sh
npx --yes github:rayan6ms/modern-typescript-web-stack#v0.1.19
```

With pnpm, Node.js 22+ and Git:

```sh
pnpm dlx github:rayan6ms/modern-typescript-web-stack#v0.1.19
```

</details>

Setup installs the CLI and both skills globally. Works with **Claude Code, Codex, Cursor, GitHub Copilot, OpenCode, Windsurf, Gemini CLI, Antigravity**, and 70+ other agents (pass `--agent <id>` to skip the picker, or run `modern-stack init --local` for project-local skills).

Then open your website directory in your agent and ask:

```text
Use the modern-typescript-web-stack-kickoff skill to set up this directory.
It will be [describe your website and its main features].
```

Use `modern-typescript-web-stack` for ongoing development once the foundation is ready.

## Documentation

[Stack guide](docs/stack.md) · [Installation and updates](docs/installation.md) · [Example projects](examples/README.md) · [Assessment](assessment/REPORT.md) · [Changelog](CHANGELOG.md)

## License

[MIT](LICENSE). Example media has its own [attribution](THIRD_PARTY_NOTICES.md).
