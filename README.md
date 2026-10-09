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

With Bun and Git installed, run from your project workspace:

```sh
bun x --bun skills@1.7.1 add https://github.com/rayan6ms/modern-typescript-web-stack/tree/v0.1.3 --skill modern-typescript-web-stack modern-typescript-web-stack-kickoff --agent codex --copy
```

Then ask your agent:

```text
Use $modern-typescript-web-stack-kickoff to set up ./my-site.
It will be [describe your website and its main features].
```

The agent asks about your website, installs the needed tools, and prepares a starting project. Use `$modern-typescript-web-stack` for ongoing development.

For other agents, manual installation, and updates, see [installation options](docs/installation.md). Browse the [example projects](examples/README.md) to see different uses of the stack.

## License

[MIT](LICENSE). Example media has its own [attribution](THIRD_PARTY_NOTICES.md).
