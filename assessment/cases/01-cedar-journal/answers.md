# Cedar Journal — prepared kickoff interview answers

## Product answers

**Who uses it and what is committed?** Visitors read public articles and look at image galleries; I author Markdown content in Git. Initially prepare one genuine homepage and one small sample article so routing/content rendering can be checked.

**SEO and rendering?** SEO and shareable article URLs matter. Content changes weekly; no personalized server response is needed.

**Interactions, accounts and data?** No accounts, comments, shared database, search service, uploads or realtime behavior at launch. A gallery may come later; do not install a whole interactive application for that possibility.

**Images?** Local imported JPEG/WebP assets will be used. Prepare the supported responsive image path if needed for the initial page; no paid image provider or runtime transformer service. No AI image generation is needed for this foundation.

**Hosting, language, traffic and budget?** Static hosting behind a CDN is the intended target; the exact provider is undecided. English UI. About 5,000 monthly visits, with occasional article spikes. Hosting budget about US$10/month; these are estimates, not benchmark requirements.

**Payments and other providers?** Print sales may be added later, but billing countries and provider are undecided. Public content can proceed; checkout must wait until those questions are answered.

## Setup scope and operating constraints

**What should be ready now?** Prepare the essential initial repository, compatible tools/dependencies/configuration, a minimal runnable surface and persistent agent instructions. This is project kickoff, not a request to build the complete product. Implement only the initial behavior explicitly requested below; later product features should guide selection without speculative schemas or directories.

**Can you install and verify locally?** Yes: install project dependencies, generate the essential files, and run proportionate local checks. You may pull a required official image and use task-owned rootless Podman containers or an isolated local service. Keep install/build concurrency modest (two build jobs where supported); no stress tests, shared-runtime replacement, host-wide cleanup or termination of unrelated processes. Stop your owned verification services on completion and document how to restart them.

**Can you deploy or use accounts?** No remote provisioning, publishing, paid resources or production migrations. No provider account or credentials are supplied for this trial. Missing external access should be documented honestly. Keep local credentials outside committed instructions and browser code.

**Package/runtime preferences?** Prefer Bun for JavaScript/TypeScript; use pnpm if unsuitable and npm only if both are unsuitable. Rootless Podman before Docker; uv for Python.

**Repository?** The target is a local Git repository in the supplied test directory. Preserve existing files/instructions, commit the finished foundation in that repository, and leave useful continuation instructions. No push is requested.
