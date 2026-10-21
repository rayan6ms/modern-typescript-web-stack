# Marko and HTMX rendering profiles

Use when selecting or implementing Marko or server templates with HTMX. Apply the [core policy](../AGENTS.md), [architecture criteria](architecture.md), and shared [frontend requirements](frontend.md). Read only the selected section. These profiles replace overlapping React-specific choices at the affected UI boundary.

## Marko: streaming and resumable applications

Recommend [Marko 6](https://markojs.com/docs/introduction/welcome-to-marko) when streaming dynamic HTML, reducing browser startup work, and fine-grained client updates suit the application. Storefronts and marketplaces are useful examples. Keep React/TanStack Start as the general default and Astro for mostly static content; choose Marko when its rendering model and available components fit the product.

- Start with supported Marko Run/Vite integration for routing and rendering. Pin compatible current Marko, Marko Run, Vite, and adapter releases; avoid mixing Marko 5 Class API examples with the Marko 6 Tags API. Verify the selected Bun production artifact or Workers adapter, including streaming through the actual proxy/CDN. Installing with Bun alone does not establish runtime compatibility.
- Use strict TypeScript and [`@marko/type-check`](https://markojs.com/docs/reference/typescript) for `.marko` templates. Retain official checks for other TypeScript entry points; `tsc`/tsrs alone do not cover Marko templates. Scope [Prettier with `prettier-plugin-marko`](https://markojs.com/docs/introduction/integrations) to files the selected Ultracite engine cannot format, with one formatter per file. Configure diagnostics for actual template/route entry points. Use `@marko/testing-library` when component behavior needs testing.
- Use Marko's own reactivity, forms, and compatible UI components. React shadcn/ui, TanStack React hooks, and React-only animation/image components are not native Marko integrations. Keep CSS/Tailwind where compatible and use native responsive markup or a supported image service. Avoid adding a second framework just to satisfy a default library recommendation.
- Route server rendering and mutations to the existing domain/data services. Direct server calls need no HTTP loopback; oRPC remains useful for actual TypeScript API consumers and OpenAPI for external clients. Authorize before sending protected HTML, and serialize only intended browser-visible state. Test loading/error boundaries, resumability, and the selected form behavior as well as the production build.

## HTMX: server-rendered pages and fragments

Recommend [HTMX](https://htmx.org/docs/) for forms, search, pagination, and similar server-owned interactions where HTML responses simplify the UI. Use existing framework routes or Hono with an escaping server-template renderer; another API process is unnecessary without an independent deployment need. Offline-heavy workflows and extensive local interaction may favor a client framework.

- Return HTML for UI updates, with working full-page URLs and native form actions/methods where possible. Keep JSON/oRPC/OpenAPI only for consumers that need those contracts. Reuse the same validation, authorization, and domain services across full-page and fragment handlers; `HX-*` headers are request hints, never credentials.
- Escape untrusted content, protect cookie-authenticated writes against CSRF, and keep sensitive pages out of HTMX's browser history snapshots using its supported history controls. Preserve the application's private-cache policy; HTMX headers do not make a response safe for shared caches.
- When one URL varies between a full page and a fragment using `HX-Request`, send `Vary: HX-Request`, use distinct validators/cache variants, and configure history restoration to request full documents (`historyRestoreAsHxRequest: false` where supported). Separate fragment URLs are another option. Verify direct visits, refresh, and Back/Forward navigation.
- Handle validation statuses, expired sessions, failed requests, pending submissions, and stale responses deliberately. Test the selected error-response swap behavior, retained input, keyboard/focus, and announcements after swaps. Keep client-framework and HTMX ownership on separate DOM regions when coexistence is needed.
- Pin the HTMX release and only required extensions. Compare actual transferred HTML, round trips, server load, and interaction latency before claiming an improvement; less custom JavaScript does not guarantee faster interactions.

## Official documentation

- [Marko Run adapters](https://markojs.com/docs/marko-run/adapters)
- [HTMX caching, security, history, and response handling](https://htmx.org/docs/)
