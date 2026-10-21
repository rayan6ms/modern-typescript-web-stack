# Frontend, accessibility, and images

Use for rendering/UI behavior, state, forms, accessibility, browser delivery, or image processing/delivery. Apply the [core policy](../AGENTS.md) and the sections relevant to the affected boundary.

For Convex subscriptions/SSR identity, also use the [selected backend policy](convex.md). File ownership/upload lifecycle is covered by [data services](data-services.md).

For automated accessibility, browser performance, and public-site SEO audits, use [website quality checks](quality.md).

For selected Marko or HTMX, use its [rendering profile](rendering-profiles.md) for UI/state/form choices. React-specific libraries below apply to React UI; accessibility, security, image delivery, and browser budgets apply across profiles.

## UI, state, accessibility, and browser performance

- Deliver responsive UI suited to the product/brand, working controls, relevant loading/empty/error/success/denied states, and recoverable input. Add only needed shadcn/ui components in React; preserve suitable design systems.
- Use accessible primitives and aim for WCAG 2.2 AA, including semantic structure, labels, contrast, keyboard/focus behavior, and reduced motion. Check actual behavior beyond automated scans, including meaningful focus after loading, retry, and validation transitions complete. Preserve or deliberately move focus as the interaction requires; do not restore it over a user's move elsewhere.
- Use route data, TanStack Query, or the selected Convex integration for remote state. Include relevant identity/tenant parameters in stable keys, invalidate deliberately, and scope SSR hydration correctly. Never share private query caches across users.
- Keep client-owned state in component state/Zustand without mirroring server state across stores.
- Use TanStack Form/native forms with runtime schemas and server validation for server-bound submissions; local interactions need no backend. Prefer supported native submission/progressive enhancement. Use TanStack Table for behavioral tables, accessible presentation, and virtualization when measured rendering cost requires it.
- Verify server-rendered forms before hydration or when JavaScript does not load. Provide working native submission or a clear fallback that cannot submit. A client `preventDefault` alone leaves default GET submission available and can expose named fields in the URL.
- Prefer Lucide for a consistent icon set and CSS for simple transitions. Add Motion only for interactions whose behavior needs it; honor reduced motion and route-level loading.
- Minimize critical-route bytes and execution: use appropriate pre-rendering/caching/streaming, route splitting, responsive images, stable dimensions, font subsets, and deferred optional libraries. Discover LCP resources promptly.
- Define route-specific budgets and measure compressed JavaScript, execution/hydration, TTFB, and field behavior. Core Web Vitals targets are LCP <= 2.5 s, INP <= 200 ms, CLS <= 0.1 at the 75th percentile of field data; verify current definitions before publishing them. Lab results do not establish field compliance.

## Images and delivery

- Prefer the smallest output that meets the intended visual quality at the rendered size. Evaluate AVIF and JPEG XL (`.jxl`) for photographic images, including JXL for high-fidelity/lossless or progressive delivery; compare visual results rather than identical numeric quality settings. Account for encode/decode cost and retain only useful variants.
- Use native `<picture>` or a framework equivalent with typed `<source>` elements, the preferred format first, and a working JPEG/PNG `<img>` fallback; include WebP where useful. The browser uses the first supported matching source, not the smallest file. Verify target-browser support; JPEG XL coverage is still incomplete. `<figure>` groups media/captions and does not select formats. For `Accept`-negotiated delivery, separate format variants in CDN/cache keys and send `Vary: Accept` where the response depends on that header.
- Use Astro `Image`/`Picture` with a compatible service; passthrough does not transform. Default to Unpic for provider-backed React/Solid images without a suitable framework component. Use Sharp-backed vite-imagetools when imported Vite assets need build-time variants. Avoid overlapping pipelines.
- Prefer Sharp for portable resizing and AVIF/WebP output, and [libjxl's `cjxl`](https://github.com/libjxl/libjxl/blob/main/doc/man/cjxl.txt) for build/upload-time JPEG XL encoding. Preserve originals and derive variants without repeated lossy re-encoding. Sharp's [JXL output](https://sharp.pixelplumbing.com/api-output/#jxl) is experimental and absent from prebuilt binaries; do not rely on it or assume Sharp-backed integrations support JXL.
- Consider `Bun.Image` for supported transforms in Bun jobs/builds. Await async terminals to keep encoding off the JS thread. Verify codecs: Bun AVIF/HEIC currently lacks Linux support and depends on OS/hardware elsewhere; no JXL encoder is documented. Bun Image provides no responsive markup or endpoint/cache; Next.js's standard optimizer requires Sharp.
- Reuse build/upload variants where practical. Choose Cloudflare Images for managed transforms/edge caching or imgproxy behind a CDN/cache for self-operated delivery. Verify the chosen service/version's output formats; imgproxy supports still AVIF/JXL, but provider/framework format support is not interchangeable. R2 only stores objects.
- Generate appropriate `srcset`/`sizes` with preserved aspect ratio/stable dimensions; load LCP images promptly and lazy-load off-screen images. Version source/transform cache keys and preserve private-file authorization for originals, variants, and caches.
- Bound source access, bytes/pixels, variants, and concurrency. Compare equivalent visual quality, output bytes, cold/cache-hit behavior, resources, and cost before performance claims.

## Official documentation

Use documentation matching the installed version.

- [Core Web Vitals](https://web.dev/articles/vitals)
- [Native picture sources and format fallbacks](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/picture)
- [AVIF support](https://web-platform-dx.github.io/web-features-explorer/features/avif/) and [JPEG XL support](https://caniuse.com/jpegxl)
- [imgproxy image formats](https://docs.imgproxy.net/latest/image_formats_support) and [Bun.Image platform support](https://bun.com/docs/runtime/image#platform-backends)
