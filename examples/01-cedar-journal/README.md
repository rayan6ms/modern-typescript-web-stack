# Cedar Journal

A static photography journal foundation: a homepage and a Git-authored sample article at `/journal/first-light/`.

Use Bun 1.4.0 from this repository:

```sh
bun install --frozen-lockfile --concurrent-scripts 2 --network-concurrency 4
bun run dev
```

Open the loopback URL Astro reports. For a foreground server use Ctrl+C; if Astro starts in background mode, use `bun run dev:status` and `bun run dev:stop` from this repository. Choose another free port with `bun run dev --port 4322` if necessary; do not displace another service.

```sh
bun run check
bun run build
bun run preview
```

Preview serves built `dist/` locally. Astro ran the verified preview in background mode in this agent environment; use `bun run preview:status` and `bun run preview:stop` from this repository. Use Ctrl+C only for a foreground server. No database, containers, credentials, accounts or remote services are required. Publishing is not part of setup.

For a new article, add Markdown to `src/content/journal/` with `title`, `description` and `published` frontmatter; its filename determines the `/journal/<id>/` URL. Nested filenames work. The homepage lists the collection by date; rebuild after content changes. Keep content trusted and reviewed in Git. The sample article route currently uses one shared sample image; choose an article/gallery image model only when needed.

Use imported JPEG/WebP assets from `src/assets/` with Astro Image and explicit bounded widths/sizes. Avoid `public/` for photographs needing transforms. [Sample photo credit](docs/image-credit.md).

Read [AGENTS.md](AGENTS.md) and the authoritative [decision record](docs/stack-decisions.md) for stack policy, verification evidence, readiness limits, and questions required before hosting, commerce or gallery work. The complete selected policy lives locally under `docs/stack/`; no original kickoff package is needed.

## Published demo scope

This is a portable copy of frozen trial `166ba75`, assessed using source guidance `ff254aa`. It retains that historical policy and dependency versions; current guidance is distributed separately. See [assessment](../../assessment/REPORT.md), [prepared requirements](../../assessment/cases/01-cedar-journal/brief.md), and [answers](../../assessment/cases/01-cedar-journal/answers.md).

No secrets, dependency caches, build output, database volumes, or Git history are included. Historical results apply to the original host/state. Run the documented checks again on your environment. The interactive adapter is a pinned prerelease; review support before production use.

Demo code is MIT licensed; see [LICENSE](LICENSE). Dependencies and credited media retain their own terms.
