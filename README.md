# Modern TypeScript Web Stack

A TypeScript stack for building websites with fast development, type safety, and reliable operation. Includes skills that help your coding agent set up a project and follow the stack as it grows.

A good fit for SaaS, dashboards, marketplaces, and internal tools.

## The stack

| Layer | Recommendation |
| --- | --- |
| Framework | [React + TanStack Start](https://tanstack.com/start/latest/docs/framework/react/overview) |
| UI | [shadcn/ui](https://ui.shadcn.com/) + Tailwind CSS |
| Server state | [TanStack Query](https://tanstack.com/query/latest) |
| API and validation | oRPC + Zod |
| Database | PostgreSQL + Drizzle |
| Authentication | Better Auth |
| Complex async workflows | [Effect](https://effect.website/docs/v4/getting-started/why-effect) |
| Tooling | Bun, Vite, Ultracite with Biome |
| Hosting | Cloudflare Workers or a regional Bun server |

Use Astro for content sites, Convex for reactive shared data, or Turso for embedded data and sync. The [stack guide](docs/stack.md) explains these choices and covers images, payments, monorepos, deployment, and scaling.

## Use with your agent

With [Bun](https://bun.com/docs/installation) and [Git](https://git-scm.com/downloads), run:

```sh
bun x --bun github:rayan6ms/modern-typescript-web-stack#v0.1.9
```

<details>
<summary>curl, npm or pnpm</summary>

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

</details>

Setup installs the CLI and both skills globally. Choose your agents from a sorted, searchable list; additional agents are offered separately, with No as the default.

Then open your website in your agent and ask:

```text
Use the modern-typescript-web-stack-kickoff skill to set up this directory.
It will be [describe your website and its main features].
```

The agent asks about your website and prepares a starting project. For project-local skills, run `modern-stack init --local`. Use `modern-typescript-web-stack` for ongoing development.

[Installation options](docs/installation.md) · [Example projects](examples/README.md)

## License

[MIT](LICENSE). Example media has its own [attribution](THIRD_PARTY_NOTICES.md).
