# Frontend, accessibility, and images

Use for rendering/UI behavior, state, forms, accessibility, browser delivery, or image processing/delivery. Apply the [core policy](../AGENTS.md) and the sections relevant to the affected boundary.

For Convex subscriptions/SSR identity, also use the [selected backend policy](convex.md). File ownership/upload lifecycle is covered by [data services](data-services.md).

## UI, state, accessibility, and browser performance

- Deliver responsive UI suited to the product/brand, working controls, relevant loading/empty/error/success/denied states, and recoverable input. Add only needed shadcn/ui components in React; preserve suitable design systems.
- Use accessible primitives and aim for WCAG 2.2 AA, including semantic structure, labels, contrast, keyboard/focus behavior, and reduced motion. Check actual behavior beyond automated scans.
- Use route data, TanStack Query, or the selected Convex integration for remote state. Include relevant identity/tenant parameters in stable keys, invalidate deliberately, and scope SSR hydration correctly. Never share private query caches across users.
- Keep client-owned state in component state/Zustand without mirroring server state across stores.
- Use TanStack Form/native forms with runtime schemas and server validation for server-bound submissions; local interactions need no backend. Prefer supported native submission/progressive enhancement. Use TanStack Table for behavioral tables, accessible presentation, and virtualization when measured rendering cost requires it.
- Prefer Lucide for a consistent icon set and CSS for simple transitions. Add Motion only for interactions whose behavior needs it; honor reduced motion and route-level loading.
- Minimize critical-route bytes and execution: use appropriate pre-rendering/caching/streaming, route splitting, responsive images, stable dimensions, font subsets, and deferred optional libraries. Discover LCP resources promptly.
- Define route-specific budgets and measure compressed JavaScript, execution/hydration, TTFB, and field behavior. Core Web Vitals targets are LCP <= 2.5 s, INP <= 200 ms, CLS <= 0.1 at the 75th percentile of field data; verify current definitions before publishing them. Lab results do not establish field compliance.

## Images and delivery

- Use Astro `Image`/`Picture` with a compatible service; passthrough does not transform. Default to Unpic for provider-backed React/Solid images without a suitable framework component. Use Sharp-backed vite-imagetools when imported Vite assets need build-time variants. Avoid overlapping pipelines.
- Consider `Bun.Image` for supported transforms in Bun jobs/builds; use Sharp for broader formats/operations. Await async terminals to keep encoding off the JS thread. Verify codecs: Bun AVIF/HEIC currently lacks Linux support and depends on OS/hardware elsewhere. Bun Image provides no responsive markup or endpoint/cache; Next.js's standard optimizer requires Sharp.
- Reuse build/upload variants where practical. Choose Cloudflare Images for managed transforms/edge caching or imgproxy behind a CDN/cache for self-operated delivery. R2 only stores objects.
- Generate appropriate `srcset`/`sizes` with preserved aspect ratio/stable dimensions; load LCP images promptly and lazy-load off-screen images. Version source/transform cache keys and preserve private-file authorization for originals, variants, and caches.
- Bound source access, bytes/pixels, variants, and concurrency. Compare equivalent visual quality, output bytes, cold/cache-hit behavior, resources, and cost before performance claims.

## Official documentation

Use documentation matching the installed version.

- [Core Web Vitals](https://web.dev/articles/vitals)
