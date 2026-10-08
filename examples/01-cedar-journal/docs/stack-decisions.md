# Cedar Journal — stack decisions

Updated: 2026-10-08

## Project brief and constraints

Public photography journal/portfolio for visitors to read articles and view images. Author writes English Markdown in Git; content changes weekly. Initial scope is one genuine homepage and one small sample article with a shareable URL, plus responsive imported images. Search discovery, fast delivery and low maintenance guide the foundation. No personalized response, accounts, comments, database, uploads, realtime or external search at launch. A larger gallery and print sales are future possibilities, not initial implementation.

Static CDN hosting is intended; provider undecided, budget about US$10/month. Estimated 5,000 monthly visits and occasional article spikes are planning context, not benchmark acceptance criteria. Assumptions: a small content collection; all authored content is trusted and reviewed in Git; no visitor submissions. A sample image/content is demonstration material, not a claim about the author's work. Production domain, real photographs, author identity and branding are not supplied.

Local install/scaffolding/checks and a local commit are authorized. No push, deployment, paid resources, remote provisioning or production migrations. Use Bun, rootless Podman only if needed, and uv for Python. Bound resource use; no stress tests or shared-runtime replacement. Stop task-owned services. Never ask for credentials in product intake or commit them.

## Profile snapshot

- Selected package: modern-typescript-web-stack, supplied frozen profile.
- Source: `frozen modern-typescript-web-stack input (source revision unknown to the original agent)` (provenance only; never needed for continuation).
- Source revision: unknown; no package revision supplied. Core SHA-256: `5f07e66c1ea61306b6b5cbcb2e2f0ad2e1b70683ba0e4c4c7bcbb9fe445e6ae4`. All 11 snapshot files were compared byte-for-byte against the selected package.
- Snapshot date: 2026-10-08.
- Local complete policy: [core](stack/AGENTS.md), [references](stack/references/). Core and references copied intact. Copying a reference does not select its technology.

## Current foundation and minimal scope

Chosen: Astro static output with framework-supported Vite, strict TypeScript, local content collection, native CSS and system fonts, Astro Image/Sharp build-time variants, Bun tooling, Ultracite core and Astro presets with Biome, Renovate configuration. One deployable, no server adapter or database. No departure from applicable profile defaults.

Create only manifests/lockfile, framework/type/lint configs, content collection, shared document layout/styles, homepage, article route/sample Markdown, one local image, robot policy, maintenance/check workflow and local guidance. No speculative services, domain schemas, providers, monorepo, interactive UI library, or test framework.

## Setup state and commands

Implemented: package.json and bun.lock, .bun-version, static Astro config, strict tsconfig, biome.jsonc extending Ultracite core/Astro, content collection and sample Markdown, homepage and article route, shared layout/native CSS, one locally committed JPEG, robots.txt, Renovate config, .github/workflows/check.yml, README and this handoff. No generator starter template was copied. Ultracite 7.12.4's local documented init was invoked with `--quiet --linter biome --pm bun --frameworks astro --skip-install`; generated config and scripts were reviewed and merged to explicit Bun execution. No global editor/agent hooks or extra skill installed.

Pinned versions: Bun 1.4.0; Astro 7.3.7; @astrojs/check 0.9.10; TypeScript 6.0.3; Ultracite 7.12.4; Biome 2.5.15; Sharp 0.35.5. Lockfile resolves Astro's supported Vite to 8.3.4; native libvips is 8.18.7. Checker peer metadata accepts TypeScript 5/6, so version 7 was not selected. Bun executed the CLIs successfully; Node metadata alone was not used to justify a runtime switch.

All commands run from this repository (currently `.`). Prerequisites: Bun 1.4.0 and network for initial dependency installation; no secrets, provider access, database, container or production account required. Python was used only via uv for bounded ad hoc verification, not as an application dependency.

```sh
bun install --frozen-lockfile --concurrent-scripts 2 --network-concurrency 4
bun run dev                         # optional --port <free-port>
bun run dev:status
bun run dev:stop
bun run typecheck                   # supported Astro checker, separate from build
bun run lint                        # non-mutating Ultracite/Biome check
bun run format                      # mutating fixes; review changes
bun run check                       # typecheck, then lint
bun run build                       # produces provider-neutral dist/
bun run preview --port 44321        # serves built output locally
bun run preview:status
bun run preview:stop
```

Build bounds: two prerender jobs, Sharp concurrency 2, libuv/Rayon thread settings 2. Lint/fix also bound Rayon to 2. Only three image widths (480/960/1440) for a 1440×960 imported sample. Image credit/license/source are in [image credit](image-credit.md); no runtime/build download from an image provider is required.

Astro used background mode in this agent environment. A CLI exit did not stop its server. Use the repository-specific status/stop scripts above; Ctrl+C applies only to a foreground server. Do not displace occupied ports, use ignore-lock to bypass an owned running service, or stop a different project's process. Restart with the dev/preview commands and the loopback URL Astro reports.

## Verification and readiness

Tested on 2026-10-08, Linux with Bun 1.4.0, against the final application/configuration files committed with this record. Application checks were rerun after fixes; later edits only finalized handoff text. The initial repository was empty/unborn; no existing application or user files were overwritten.

- **PASS — install:** initial bounded `bun install --concurrent-scripts 2 --network-concurrency 4`; final `bun install --frozen-lockfile --concurrent-scripts 2 --network-concurrency 4` completed with no changes. `bun pm untrusted` reported zero untrusted lifecycle dependencies. Sharp's native import and transformations worked under Bun.
- **PASS — types:** `bun run typecheck` through `astro check`: six files, zero errors, warnings or hints. This is the supported framework typecheck including Astro templates; production bundling is not used as type evidence.
- **PASS — lint/format:** `bun run lint` checked ten supported source/config files, no fixes. Ultracite's core/Astro presets cover TS/JS, JSON/JSONC, CSS and experimental full Astro template/frontmatter handling. Astro support remains experimental; this is not comprehensive accessibility proof. Markdown, YAML, robot text and binary assets are outside Biome lint/format coverage and were reviewed directly; Markdown additionally passed content-schema/build rendering. No extra formatter/linter suite installed just for those files. Initial filename/shadow diagnostics were corrected, then checks rerun without disabling rules.
- **PASS — production build:** `bun run build` created two HTML routes and three optimized WebP assets (480×320, 960×640, 1440×960), no client JavaScript files/scripts or hydration. Both routes share the same generated image variants; Sharp cold transformation and later cache reuse were observed. No field speed/SLO benchmark was performed.
- **PASS — built HTTP/artifact smoke:** `bun run preview --port 44321` served `dist/`. Bounded ad hoc HTTP/parser assertions requested `/`, `/journal/first-light/`, each srcset asset, robots.txt and a missing article. Checked HTML/content type, title/description, one h1, rendered Markdown headings/lists, homepage-to-article link, descriptive alt, intrinsic 1440×960 dimensions, three widths/sizes, eager/high-priority image loading and absence of client scripts. Pages/images returned 200; missing article returned 404. Rechecked final HTML/assets after the caption-space fix. Reproduction spot checks while preview runs: `curl --fail http://127.0.0.1:44321/` and `curl --fail http://127.0.0.1:44321/journal/first-light/`.
- **PASS — browser:** T3 collaborative browser inspected both built pages at 1280×800 and 375×812. Native links/headings/content rendered; images loaded, layout had no horizontal overflow, article prose width was 672px desktop/327px phone. Snapshots had no console errors or failed requests. Tab exposed the visible skip link with a 3px outline; Enter focused main. Tab/Enter on the article title navigated to its URL. Final article caption spacing was rechecked. No animation, forms or island hydration require extra behavioral tests.
- **PASS — development startup:** `bun run dev --port 44322` served both routes with HTTP 200. This is separate from production-output verification.
- **PASS — handoff:** complete selected core/reference snapshot byte-identical to source; root/record/policy relative Markdown links resolve; no unfilled template tokens; continuation does not require the kickoff skill or external source checkout.
- **PASS — task-owned cleanup:** preview PID 107201 and dev PID 108904 were tracked and stopped through their scoped Astro stop commands. Status reported no servers running, and connection checks confirmed ports 44321/44322 closed. The task-owned browser tab was closed. No unrelated processes/containers touched.
- **NOT RUN — remote CI/Renovate/deployment:** workflow and update config are prepared only. No repository was pushed, hosted services enabled, accounts provisioned or site published. CDN HTTPS/direct paths/cache headers/compression/invalidation and absolute SEO metadata remain D04. No browser accessibility audit, field Core Web Vitals or load/stress test is claimed.

Locally verified initial **static public-content foundation**, ready for further Git-authored content work. It is not a complete portfolio/product or a verified production deployment. Replace sample copy/photo with the author's supplied material before publication; configure the selected origin/canonical/share URLs and sitemap once D04 is resolved. Maintenance automation needs host/repository access later. Payments D05 and larger gallery/budgets D06 do not block the delivered public pages; their dependent features remain absent.

## Chosen decisions

### D01 — Content framework and rendering

- Status: chosen. Supported profile content branch: Astro prerenders all pages to dist; Vite is supplied by Astro. No runtime server/database. Weekly public Markdown needs build-time HTML and stable URLs.
- Scope: homepage and `/journal/first-light/`; getStaticPaths/content rendering. Validate generated HTML and direct URL requests. No field performance claim from local checks.

### D02 — Authoring and responsive images

- Status: chosen. Explicit user context: trusted Markdown and imported local JPEG/WebP in Git. Astro content collection with its supported Zod schema; Astro Image with default Sharp service for build-time WebP widths, intrinsic dimensions and descriptive alt text.
- Scope: one sample article and one local demonstration image. No paid provider, remote runtime transformation or image generation. Bound widths and image processing; test generated variants and browser loading.

### D03 — Local tooling and repository maintenance

- Status: chosen. Profile defaults: Bun, strict TypeScript, Ultracite/Biome core plus applicable Astro preset, one Bun lockfile, project-local exact versions, Renovate config. Native CSS/system fonts are the supported Astro UI choice.
- Keep Astro templates covered deliberately if the lint engine has partial support. No global hooks/editor mutations. Add a non-mutating CI check definition without enabling a remote service.
- TypeScript version must satisfy @astrojs/check's supported peer range; registry latest alone is not sufficient.

## Deferred decisions

### D04 — Hosting, domain and publication

- Status: deferred.
- Question: Which static CDN host and production domain/base path should be used within the approximate US$10/month budget?
- Reason: deliberately undecided, no account/access or deployment authorization.
- Provisional behavior: build provider-neutral dist with root-relative routes; no invented production origin/canonical URL. Optional site origin may be configured only once known.
- Blocked: remote provisioning/publication, host headers/invalidation/redirects, production absolute metadata and sitemap.
- Can proceed: all local public-page work and static artifact checks.
- Trigger: before host-specific configuration or publication.
- Next action: ask host/domain/base path and confirm publishing authorization; set Astro site, complete canonical/absolute share metadata and sitemap, test HTTPS, direct article URLs, 404 handling, compression, cache rules and content refresh on the selected CDN. Hashed assets can use long immutable caching; HTML must refresh after weekly builds. No host behavior is currently verified.

### D05 — Print sales

- Status: deferred.
- Question: Which billing/selling countries, currency, fulfillment/tax requirements and payment provider should print sales support?
- Reason: future possibility and deliberately undecided provider/countries.
- Provisional behavior: none for payments; leave checkout absent.
- Blocked: checkout, payment SDK/webhooks, sales models or speculative payment abstraction.
- Can proceed: public content and images.
- Trigger: before any commerce implementation.
- Next action: ask the recorded billing/provider questions and apply the local integrations policy only to the selected boundary.

### D06 — Larger gallery and performance budgets

- Status: deferred.
- Question: What gallery behavior, image volume/source dimensions, interactions and route byte budgets are required?
- Reason: gallery is only a future possibility; traffic figures are estimates.
- Provisional behavior: one responsive image; no interactive gallery or performance infrastructure.
- Blocked: gallery interactions/extra frameworks/services and performance guarantees.
- Can proceed: minimal journal pages and local image pipeline.
- Trigger: before building a gallery or making performance/SLO claims.
- Next action: clarify required interactions and image inventory; establish route budgets, then measure representative lab output and field behavior where available. Retain the content branch unless requirements/evidence reopen only the affected boundary.

## Superseded decisions

None.

## Official setup evidence

Read on 2026-10-08: [Astro manual setup](https://docs.astro.build/en/install-and-setup/), [Bun recipe](https://docs.astro.build/en/recipes/bun/), [content collections](https://docs.astro.build/en/guides/content-collections/), [image guide](https://docs.astro.build/en/guides/images/), [assets API](https://docs.astro.build/en/reference/modules/astro-assets/), [build concurrency](https://docs.astro.build/en/reference/configuration-reference/#buildconcurrency), [Ultracite setup](https://www.ultracite.ai/docs/setup), [Biome provider](https://www.ultracite.ai/docs/provider/biome), [language support](https://www.ultracite.ai/docs/languages), [Sharp concurrency](https://sharp.pixelplumbing.com/api-utility/#concurrency). Registry metadata and installed source/types provide exact-version compatibility evidence; docs are rolling, not proof that every version works.
