# Convex boundary

This directory is reserved for future Convex functions. No schema, domain tables, generated API, auth provider, or functions have been created or deployed.

Read [D03–D05 in the decision record](../docs/stack-decisions.md) before provisioning or private board implementation. Convex will own board data, atomic mutations, validators, and resource/membership authorization. Its runtime is separate from the Bun application runtime.

Only after explicit provisioning authorization and the recorded decisions are settled, use the installed CLI (`bun --bun convex dev`) to configure a real development deployment and generate its API. That command can create resources and deploy functions: it is not needed to run this shell and was not run during kickoff. Store its deployment selector in ignored `.env.local`; put only the public deployment URL in `VITE_CONVEX_URL`. Configure supported browser/server identity before private calls. Then verify authenticated subscriptions, reconnect, denial and cross-team behavior using isolated development data.
