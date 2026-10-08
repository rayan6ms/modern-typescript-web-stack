# Caches, object storage, and durable jobs

Use for cache behavior, uploads/file lifecycle, or queues/workflows. Apply the [core policy](../AGENTS.md) and the sections relevant to the affected boundary.

Use the [Convex profile](convex.md) for its native storage/scheduling and authorization model. Image processing or responsive delivery uses [frontend and images](frontend.md).

## Cache

Start with query optimization and HTTP/CDN caching. Add Redis or Valkey for a hot access path, distributed rate limits, or ephemeral coordination. Define key ownership, tenant isolation, serialization bounds, TTL, invalidation, maximum memory behavior, and an outage policy. Bound fallback load on the authoritative store. Security checks need a deliberate fail-open/fail-closed decision. Distributed leases need expiry and stale-writer protection; a cache is not the sole durable copy of business state.

## Object storage

Use R2/S3-compatible storage or native Convex storage in its profile when access/lifecycle requirements fit. Prefer short-lived direct-upload authorization; validate final object size/type and ownership, use safe names, quarantine or transform untrusted content, and serve with safe content headers. Keep metadata in the chosen transactional store and plan cleanup for failed uploads/deleted records.

## Durable jobs and workflows

Use native Convex scheduling for suitable jobs in its profile. Select Inngest for durable event-driven steps, Trigger.dev for its task execution model, or Cloudflare Queues/Workflows when those execution/delivery capabilities are needed. Verify runtime and provider restrictions. Define idempotency, deadline, concurrency, retry eligibility, backoff, failed-job inspection, and safe replay. Expect duplicates with at-least-once delivery. Use a transactional outbox or equivalent durable design when a database update must reliably emit an event.
