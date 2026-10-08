# Authentication and product integrations

Use for identity/session flows, authorization systems, webhooks, payments/mail, analytics, search, localization, or AI providers. Apply the [core policy](../AGENTS.md) and the sections relevant to the affected boundary.

## Product capabilities

Select these only for required product capabilities. Integrate them behind domain interfaces and validate runtime support, region, cost, limits, and data handling.

| Capability | Default / alternatives | Required implementation behavior |
| --- | --- | --- |
| Authentication | Better Auth; Auth.js, Clerk, WorkOS, or an OIDC provider for specific requirements | Verified runtime/database adapter, safe session lifecycle, secure cookies, recovery, resource authorization |
| Transactional email | Resend; Postmark or SES for delivery/volume/platform needs | Queue delivery, safe templates, suppression/bounce handling, retry/deduplication |
| Payments | Stripe; Paddle or Lemon Squeezy for a merchant-of-record requirement | Verify signatures on raw webhook bodies, deduplicate events, ordering-safe state transitions, idempotent fulfillment, reconciliation |
| Analytics / flags | PostHog or a suitable alternative | Consent/data policy where applicable, redaction, capture bounds, safe flag defaults, browser cost |
| Search | PostgreSQL FTS; Meilisearch, Algolia, OpenSearch/Elasticsearch for relevance/scale requirements | Relevance tests, index freshness, deletion propagation, rebuild/recovery |
| Internationalization | Paraglide.js; i18next or FormatJS for runtime/ICU requirements | SSR locale isolation, plural rules, localized routes, extraction, route-scoped locale data |
| AI | Vercel AI SDK; direct SDK, LangChain, or LlamaIndex for specific integration/retrieval requirements | Output validation, cancellation, usage/time limits, tool authorization, quality/latency/cost evaluation |

MUST NOT let a model, client-supplied user ID, feature flag, or UI visibility stand in for server-side authorization. For AI tools, authorize each action independently of model output and keep credentials outside prompts and browser code.

Provider events can be duplicated or arrive out of order. Protect state transitions from stale events and retrieve authoritative provider state when ordering cannot be established safely. Test reversed delivery as well as duplicate delivery for stateful webhook integrations.

## Sessions and untrusted content

- Authenticate the caller and authorize each action against the actual resource and tenant. Test cross-tenant and denial paths. Use mature identity flows; do not invent password storage or token protocols.
- Protect browser sessions with secure, httpOnly, appropriately scoped cookies; rotate identifiers after sign-in/privilege changes. Enforce CSRF defenses for cookie-authenticated writes and explicit CORS rules. Add request/body limits, rate limits, safe headers, and server-side secret storage.
- Treat uploads, HTML, outbound URLs, redirects, and provider content as untrusted; enforce appropriate escaping/access restrictions.
