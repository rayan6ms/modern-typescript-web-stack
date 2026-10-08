# Demonstration websites

These 3 local foundations were created using this profile and the kickoff workflow. They are initial surfaces rather than complete products or recommended starter templates. Each includes its frozen local policy and durable decisions so you can inspect what the agent delivered.

| Demo | Delivered scope | Historical local score |
| --- | --- | --- |
| [Cedar Journal](01-cedar-journal/README.md) | Static Astro journal, local responsive images | 10/10 |
| [DeskLedger](02-deskledger/README.md) | React/Start public shell and real PostgreSQL development tooling | 10/10 |
| [LiveBoard](03-liveboard/README.md) | React/Start shell and inactive Convex configuration | 10/10 |

Scores cover the authorized minimal foundation on the trial host. A 10 is not production readiness, optimal-stack evidence, or a promise of no defects. See [assessment](../assessment/REPORT.md) and [provenance/publication edits](../assessment/demo-provenance.json).

Copy a demo to a new directory before experimenting, then follow its README. Install with its frozen lockfile, run its actual checks, build, and exercise its production artifact. No hosted accounts are required for the independent shells. DeskLedger database checks need rootless Podman; FieldStock needs Rust. Existing ports/services must be respected.

GitHub Actions checks/builds these demos without provisioning providers, starting databases, or running load tests. Browser/provider/DB/recovery behavior described in the assessment is historical independent evidence, not a claim that CI retested those boundaries.
