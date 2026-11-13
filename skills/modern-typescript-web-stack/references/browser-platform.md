# Browser platform guidance

Use for browser API/support decisions, native HTML/CSS interactions, text scaling, rendering/scheduling, navigation, or page lifecycle. Apply the [core policy](../AGENTS.md). Framework state and image pipelines use [frontend](frontend.md); diagnostics and measurements use [website quality checks](quality.md).

## Preferred maintained source

Obtain and load the `modern-web-guidance` companion through the [on-demand catalog](agent-skills.md) for applicable browser work; installation and guide lookup are separate steps.

Use Google's official [Modern Web Guidance](https://github.com/GoogleChrome/modern-web-guidance) as a preferred source for current web-platform patterns and pitfalls. For substantive platform choices, unfamiliar APIs, or compatibility questions, consult the relevant guides through its catalog or `modern-web-guidance search` and `retrieve` commands. Retrieve only applicable guides; routine edits need no repeated search or catalog-wide scan. Use `legacy-scan` for requested broad modernization reviews and verify its findings; it covers only part of the catalog.

Use a verified, pinned CLI version with the project's package-manager preferences when adding the tool; it is development guidance, not an application runtime dependency or required global installation. Direct guide URLs remain usable without the CLI. Check current MDN/Baseline data and matching framework documentation for the actual target. Adapt examples to the selected framework and strict types; newer APIs do not justify weakening types, raising the build target blindly, or replacing compatible libraries.

## Browser support and native behavior

- Record required browsers/devices, embedded webviews, and material accessibility constraints in the existing project decisions. Preserve established support; if unspecified, record a provisional current-major-browser policy and clarify only when a product requirement or feature choice makes it material. Baseline summarizes availability, not complete audience or assistive-technology coverage.
- Prefer suitable native HTML/CSS before adding custom JavaScript: semantic controls, `<details>`, dialogs/popovers, container queries, `:has()`, and supported CSS transitions. Retain established accessible components when their behavior/integration is useful. Native features still need labels, correct keyboard/focus behavior, and testing.
- Feature-detect required capabilities; provide a working fallback for essential behavior. Decorative enhancements may degrade to a usable static state. Use View Transitions or scroll-driven effects when useful, honoring reduced motion; persistent automatic motion also needs an appropriate pause/stop control. Missing animation must not leave content hidden.

## Forms and text

- Preserve native form submission and server validation. Use suitable labels, input types, `autocomplete`, and `inputmode`; identifiers such as postal codes and OTPs are strings, not quantities. Allow paste/password managers. A `<datalist>` offers suggestions, not a restricted set of valid choices.
- For custom Enter shortcuts, preserve IME composition and verify affected browser behavior rather than submitting an unfinished conversion. Keep an explicit submit path. Show actionable validation after relevant interaction/submission; associate errors with fields and avoid announcing errors on every keystroke. Native constraints and `:user-invalid` complement framework validation; do not introduce competing form state or password-composition rules.
- Use relative text sizes, unitless line heights, and layouts that accommodate enlarged text. Fluid typography needs a font-relative contribution, not viewport-only scaling. Check 200% text resizing and 320 CSS-pixel reflow, including increased text spacing; avoid fixed text-container heights and clipped focus indicators.
- For downloaded fonts, prefer WOFF2, useful subsets with complete required language/user-content coverage, and readable fallbacks. Select `font-display` deliberately and tune fallback metrics where needed to reduce layout shifts. Preload only genuinely critical font files; excessive preloads can bypass useful selection and compete with LCP resources.

## Rendering and responsive interactions

- Profile blocking work before choosing chunking, workers, or scheduling. `scheduler.yield()` needs support detection and a task-yielding fallback; a resolved promise only yields to microtasks. Choose work slices from responsiveness measurements, not a universal 50 ms allowance. Keep worker transfer/startup costs and cancellation relevant to the task.
- Consider `content-visibility: auto` with an appropriate intrinsic-size estimate for heavy off-screen sections; it defers rendering, not arbitrary JavaScript or network work. Avoid measurements that force skipped subtrees to render. Virtualize only for a measured benefit, preserving keyboard navigation, reading order, find-in-page, and relevant printing; pagination or containment may fit better.
- Pause optional visual work or unnecessary polling when hidden/off-screen where safe, and resynchronize on return. Do not pause authoritative work or discard required updates merely because a component is invisible.

## Loading, navigation, and lifecycle

- Keep LCP resources discoverable in initial HTML and never lazy-load the LCP image. Use high fetch priority selectively for likely LCP candidates; priority hints do not defer script execution. Align preloads with responsive/format selection to avoid duplicate downloads. For off-screen video/audio, choose preload/poster/loading behavior supported by the target, reserve layout space, and preserve controls and reduced-motion behavior.
- Reuse router prefetching for client navigation. Consider bounded Speculation Rules for useful document navigations, with ordinary navigation preserved. Exclude mutation/logout URLs and account for server cost, privacy, and prerender activation side effects; avoid overlapping prefetch systems.
- Preserve back/forward cache eligibility. Avoid `unload`; use `visibilitychange`/`pagehide` for suitable lifecycle work, and `pageshow` to handle restoration where stale state matters. Attach `beforeunload` only for actual unsaved changes and remove it when unnecessary.
- Reuse existing analytics/RUM transport, with bounded payloads and collection. Where custom telemetry is needed, use suitable lifecycle-aware best-effort delivery such as `sendBeacon`/keepalive fetch; consider `fetchLater` only with verified support and fallback. None replaces a durable transaction or guarantees delivery. Revalidate authorization-sensitive state after restoration when needed; backend authorization remains authoritative.

## Sources

- [Modern Web Guidance guides](https://github.com/GoogleChrome/modern-web-guidance/tree/main/skills/modern-web-guidance/guides)
- [Baseline scope](https://developer.mozilla.org/en-US/docs/Glossary/Baseline/Compatibility)
- [Font loading](https://web.dev/articles/font-best-practices) and [content visibility](https://web.dev/articles/content-visibility)
- [Page lifecycle](https://developer.chrome.com/docs/web-platform/page-lifecycle-api) and [back/forward cache](https://web.dev/articles/bfcache)
