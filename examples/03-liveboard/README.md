# LiveBoard

Initial public application shell. Shared boards, authentication and live collaboration await configuration and implementation. No account or backend service is required to render locally.

With Bun 1.4.0, from this repository:

```sh
bun install --frozen-lockfile --network-concurrency 4
bun run build
bun run typecheck
bun run check
bun run dev
```

Open `http://127.0.0.1:3000`; stop with Ctrl-C. For built SSR output, run `NITRO_HOST=127.0.0.1 PORT=43173 bun run start` after building and use that port.

Leave `VITE_CONVEX_URL` empty for this shell. The public URL can later go in ignored `.env.local`; never place credentials in `VITE_` variables. Do not run the Convex provisioning/deployment commands until the recorded decisions and authorization are settled.

Read [project instructions](AGENTS.md) and [decisions, verification and next actions](docs/stack-decisions.md) to continue. Local CI/Renovate files do not enable a hosted service.

## Published demo scope

This is a portable copy of frozen trial `d4cc4b1`, assessed using source guidance `ff254aa`. It retains that historical policy and dependency versions; current guidance is distributed separately. See [assessment](../../assessment/REPORT.md), [prepared requirements](../../assessment/cases/03-liveboard/brief.md), and [answers](../../assessment/cases/03-liveboard/answers.md).

No secrets, dependency caches, build output, database volumes, or Git history are included. Historical results apply to the original host/state. Run the documented checks again on your environment. The interactive adapter is a pinned prerelease; review support before production use.

Demo code is MIT licensed; see [LICENSE](LICENSE). Dependencies and credited media retain their own terms.
