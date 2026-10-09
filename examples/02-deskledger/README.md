# DeskLedger

## Existing project notes

This project is for Brazilian agencies. Future export amounts must use BRL; support for other currencies is undecided. Do not turn this note into a billing integration during kickoff.

## Local foundation

The pt-BR public shell and isolated PostgreSQL development toolchain are prepared. Login, organization authorization and project workflows remain future work.

From this repository, with Bun 1.4.x and rootless Podman available:

```sh
bun install --frozen-lockfile --network-concurrency 2
bun run db:start
bun run db:check
bun run dev
```

Open `http://127.0.0.1:43102`. The public shell also runs with the database stopped. Stop the foreground web server with Ctrl+C, then run `bun run db:stop`; local data and private credentials are retained for restart.

Read [project instructions](AGENTS.md) before changes and [stack decisions](docs/stack-decisions.md) for production-artifact commands, check results, database lifecycle and deferred decisions. Local verification does not establish production readiness.

## Published demo scope

This began as a portable copy of trial `cfffdd7`, assessed using source guidance `ff254aa`. It retains that historical policy; current guidance is distributed separately. Later [tooling corrections](../../assessment/REPORT.md#tooling-corrections) make migrations runnable and protect credential diagnostics. Original trial records and scores remain unchanged. See [prepared requirements](../../assessment/cases/02-deskledger/brief.md) and [answers](../../assessment/cases/02-deskledger/answers.md).

No secrets, dependency caches, build output, database volumes, or Git history are included. Historical results apply to the original host/state. Run the documented checks again on your environment. The interactive adapter is a pinned prerelease; review support before production use.

Demo code is MIT licensed; see [LICENSE](LICENSE). Dependencies and credited media retain their own terms.
The copied UI component retains the [shadcn/ui MIT notice](docs/shadcn-ui-MIT.txt).
