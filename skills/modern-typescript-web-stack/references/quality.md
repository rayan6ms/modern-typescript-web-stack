# Website quality checks

Use when configuring code diagnostics, accessibility tests, browser performance checks, or technical SEO audits. Apply the [core policy](../AGENTS.md) and [tooling compatibility rules](tooling.md). Preserve suitable existing checks during scoped work.

## Code and dependency diagnostics

- DEFAULT: use [Knip](https://knip.dev/) in JavaScript/TypeScript workspaces to find unused dependencies, exports, and files. Configure framework plugins, route entry points, generated code, and dynamic imports before enforcing findings in CI. Review reported usage before deleting code; removing unused source alone does not prove a smaller production bundle.
- DEFAULT for React applications: use [React Doctor](https://github.com/millionco/react-doctor) for React-specific state/effect, architecture, accessibility, and performance diagnostics. Run it for substantive React changes and focused reviews. Reconcile overlapping rules with Ultracite's selected engine. Use its runtime tracing when investigating interaction/rendering costs; static findings alone do not establish a speed improvement.
- For Astro, retain the official [`astro check`](https://docs.astro.build/en/guides/typescript/) for framework/TypeScript diagnostics. Use the community [`@santi020k/astro-doctor`](https://doctor.santi020k.com/) as a supplementary review tool for hydration, images, scripts, and Astro-specific safety. Verify compatibility and rule behavior before making it a required CI gate; adjust package-manager and version-specific rules to the accepted project choices.

Pin applicable project tools as development dependencies and expose non-mutating check scripts. Diagnose unsupported entry points or false positives rather than blanket-ignoring directories. Document narrow suppressions with their reason. These diagnostics complement separate type checks and behavior tests; use actionable findings rather than an aggregate health score as the acceptance criterion.

## Accessibility

DEFAULT when preparing Playwright journeys: integrate [`@axe-core/playwright`](https://playwright.dev/docs/accessibility-testing) into representative pages and interaction states, including open dialogs, validation errors, and loaded content. Keep manual keyboard, focus, zoom/reflow, and relevant screen-reader checks. Automated scans cover only part of accessibility and do not establish WCAG conformance. Small changes can use existing checks without adding a new browser-test framework.

## Browser performance

- DEFAULT automated lab tool: [Lighthouse CI](https://web.dev/articles/lighthouse-ci) against representative production output. Configure route-specific metric and asset budgets under a repeatable browser/device/network profile. Use repeated runs and account for variability when setting regression gates; avoid treating a perfect overall score as the product goal. Prepare the job once real routes and a production build make its results useful.
- Use [WebPageTest](https://www.webpagetest.org/) before launch and for material loading/delivery changes or unexplained regressions. Compare waterfalls, visual progress, rendering, and loading metrics under documented device, connection, location, and cache conditions. Repeat runs and report their variation; test the affected production routes rather than a development server. Keep private content and credentials out of public reports.
- For deployed sites, collect field LCP, INP, and CLS using [`web-vitals`](https://web.dev/articles/vitals-measurement-getting-started) or a compatible existing real-user monitoring provider. Reuse existing instrumentation, bound collection, and respect the project's data/privacy requirements. Report field percentiles separately from lab results; an initial-load lab test does not establish field INP or Core Web Vitals compliance.

Keep builds, server-starting lab jobs, and hosted audits explicit or in a separate CI job; the local `verify` umbrella stays non-mutating and independent of external service access. Record relevant routes, artifact/release, conditions, results, and remaining limits in the existing project record.

## Public-site SEO

For public indexable sites, use [Sitebulb](https://sitebulb.com/) when a site-wide crawl is useful, especially content sites and stores. Review indexability, canonical URLs, robots directives, sitemaps, status codes, internal links, and rendered pages around launch or substantial URL/template changes. Respect crawl scope and rate limits. Sitebulb is a commercial desktop/cloud audit tool; use an existing suitable crawler where available and defer license/access needs explicitly. Private applications need no SEO crawl. Crawl findings complement page-level checks and do not guarantee search rankings.
