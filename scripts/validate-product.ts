import { createHash } from "node:crypto";
import { existsSync, lstatSync, readdirSync, readFileSync } from "node:fs";
import { isAbsolute, join, relative, resolve, sep } from "node:path";

function check(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}
function inside(root: string, file: string) {
  const path = relative(root, file);
  return path === "" || (!isAbsolute(path) && path !== ".." && !path.startsWith(`..${sep}`));
}
function unfenced(text: string) {
  return text.replace(/^```[^\n]*\n[\s\S]*?^```\s*$/gm, "");
}
function headings(text: string) {
  const counts = new Map<string, number>();
  return new Set(
    [...unfenced(text).matchAll(/^#{1,6}\s+(.+)$/gm)].map((match) => {
      const slug = (match[1] ?? "")
        .toLowerCase()
        .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
        .replace(/[^\p{L}\p{N}_ -]/gu, "")
        .replaceAll(" ", "-");
      const count = counts.get(slug) ?? 0;
      counts.set(slug, count + 1);
      return count ? `${slug}-${count}` : slug;
    }),
  );
}
export function validate(rootArg: string) {
  const root = resolve(rootArg);
  const json = (path: string) => JSON.parse(readFileSync(resolve(root, path), "utf8"));
  const manifest = json("plugin.json");
  check(
    typeof manifest.name === "string" && /^[a-z][a-z0-9-]{0,55}$/.test(manifest.name),
    "Invalid product name",
  );
  check(
    manifest.license === "MIT" && /^\d+\.\d+\.\d+$/.test(manifest.version),
    "Invalid product version/license",
  );
  const name: string = manifest.name;
  const kickoff = `${name}-kickoff`;
  const skillNames = readdirSync(resolve(root, "skills")).sort();
  check(
    JSON.stringify(skillNames) === JSON.stringify([name, kickoff].sort()),
    "Product must contain exactly its profile and kickoff skills",
  );
  const onboarding = manifest.extensions?.["com.openai"]?.onboardingSkill;
  check(
    onboarding === `./skills/${kickoff}/SKILL.md` && existsSync(resolve(root, onboarding)),
    "Invalid onboarding path",
  );
  for (const file of [
    "README.md",
    "LICENSE",
    "CHANGELOG.md",
    "SOURCE.json",
    "docs/installation.md",
    "examples/README.md",
    "assessment/REPORT.md",
    "assessment/RUBRIC.md",
    ".github/workflows/check.yml",
  ]) {
    check(existsSync(resolve(root, file)), `Missing ${file}`);
  }
  check(
    readFileSync(resolve(root, "LICENSE"), "utf8").includes("MIT License"),
    "Missing MIT license text",
  );
  const origin = json("SOURCE.json");
  check(
    origin.schemaVersion === 1 &&
      origin.package === name &&
      /^[a-f0-9]{40,64}$/.test(origin.revision) &&
      typeof origin.localModifications === "boolean",
    "Invalid source provenance",
  );
  for (const skill of skillNames) {
    check(existsSync(resolve(root, "skills", skill, "LICENSE")), `Missing ${skill} license`);
    const text = readFileSync(resolve(root, "skills", skill, "SKILL.md"), "utf8");
    const match = /^---\n([\s\S]*?)\n---\n/.exec(text);
    check(match?.[1], `Invalid ${skill} frontmatter`);
    const metadata = Bun.YAML.parse(match[1]) as { name?: string; description?: string };
    check(
      metadata.name === skill &&
        typeof metadata.description === "string" &&
        metadata.description.length > 0 &&
        metadata.description.length <= 1024,
      `Invalid ${skill} metadata`,
    );
    const marker = json(`skills/${skill}/SOURCE.json`);
    check(
      marker.schemaVersion === 1 &&
        marker.package === skill &&
        marker.revision === origin.revision &&
        marker.localModifications === origin.localModifications,
      `Inconsistent ${skill} provenance`,
    );
  }
  let links = 0;
  const files: string[] = [];
  function walk(path: string) {
    const stat = lstatSync(path);
    check(!stat.isSymbolicLink(), `Unexpected symlink: ${path}`);
    if (stat.isDirectory()) {
      for (const entry of readdirSync(path)) {
        if (
          [
            ".git",
            "node_modules",
            ".output",
            "dist",
            "target",
            ".astro",
            ".tanstack",
            ".agents",
            ".claude",
            ".codex",
          ].includes(entry)
        )
          continue;
        walk(join(path, entry));
      }
    } else if (stat.isFile()) files.push(path);
  }
  walk(root);
  for (const file of files) {
    const path = relative(root, file).split(sep).join("/");
    check(
      !/(^|\/)\.env(?:$|\.(?!example$))/.test(path) && !path.split("/").includes(".local"),
      `Private runtime file: ${path}`,
    );
    if (!file.endsWith(".md") || path.includes("/assets/")) continue;
    const text = readFileSync(file, "utf8");
    check(
      !text.includes("/home/rayan/") && !text.includes("/tmp/web-stack"),
      `Nonportable host path: ${path}`,
    );
    if (!path.startsWith("examples/"))
      check(!/\{\{[^}]+\}\}/.test(text), `Unfilled template: ${path}`);
    for (const match of unfenced(text).matchAll(/!?\[[^\]]*\]\(([^\s)]+)(?:\s+"[^"]*")?\)/g)) {
      const target = match[1];
      if (!target || /^[a-z][a-z0-9+.-]*:/i.test(target) || target.startsWith("//")) continue;
      // Content routes resolve against the running website, not the repository.
      if (target.startsWith("/") && /^examples\/[^/]+\/(src|public)\//.test(path)) continue;
      const [pathPart = "", anchor] = target.split("#");
      const linked = pathPart ? resolve(file, "..", decodeURIComponent(pathPart)) : file;
      check(
        inside(root, linked) && existsSync(linked),
        `Broken/outside link in ${path}: ${target}`,
      );
      if (anchor && linked.endsWith(".md"))
        check(
          headings(readFileSync(linked, "utf8")).has(decodeURIComponent(anchor)),
          `Missing anchor in ${path}: ${target}`,
        );
      links++;
    }
  }
  const demos = json("assessment/demo-provenance.json") as Array<{
    id: string;
    original_commit: string;
    original_tracked_sha256: Record<string, string>;
    publication_edits: Array<{ file: string; reason: string }>;
  }>;
  const demoIds = new Set<string>();
  const fileSet = new Set(files);
  for (const demo of demos) {
    check(/^[a-z0-9-]+$/.test(demo.id) && !demoIds.has(demo.id), "Invalid/duplicate demo ID");
    demoIds.add(demo.id);
    check(/^[a-f0-9]{40}$/.test(demo.original_commit), `Invalid ${demo.id} provenance`);
    const demoRoot = resolve(root, "examples", demo.id);
    for (const entry of demo.publication_edits) {
      const file = resolve(demoRoot, entry.file);
      check(
        inside(demoRoot, file) && fileSet.has(file),
        `Missing publication edit: ${demo.id}/${entry.file}`,
      );
      check(
        typeof entry.reason === "string" && entry.reason.trim().length > 0,
        `Missing publication edit reason: ${demo.id}/${entry.file}`,
      );
    }
    const edited = new Set(demo.publication_edits.map((entry) => entry.file));
    const originalFiles = Object.keys(demo.original_tracked_sha256);
    check(originalFiles.length > 0, `Empty ${demo.id} provenance`);
    for (const [path, expected] of Object.entries(demo.original_tracked_sha256)) {
      const file = resolve(demoRoot, path);
      check(inside(demoRoot, file) && fileSet.has(file), `Missing demo file ${demo.id}/${path}`);
      check(/^[a-f0-9]{64}$/.test(expected), `Invalid demo digest: ${demo.id}/${path}`);
      if (!edited.has(path))
        check(
          createHash("sha256").update(readFileSync(file)).digest("hex") === expected,
          `Undocumented demo change: ${demo.id}/${path}`,
        );
    }
    const allowed = new Set([...originalFiles, ...edited]);
    for (const file of files) {
      if (!inside(demoRoot, file)) continue;
      const path = relative(demoRoot, file).split(sep).join("/");
      check(allowed.has(path), `Undocumented demo addition: ${demo.id}/${path}`);
    }
    const pkg = json(`examples/${demo.id}/package.json`);
    check(
      pkg.packageManager === "bun@1.4.0" &&
        pkg.scripts?.build &&
        existsSync(resolve(root, "examples", demo.id, "bun.lock")),
      `Incomplete demo ${demo.id}`,
    );
  }
  const checks = json("assessment/check-summary.json") as Array<{ passed: boolean; case: string }>;
  check(
    checks.every((entry) => entry.passed && demos.some((demo) => demo.id === entry.case)),
    "Invalid scoped historical checks",
  );
  const scores = json("assessment/scores.json");
  check(
    scores.scenario_count === demos.length && scores.cases.length === demos.length,
    "Assessment/demo count mismatch",
  );
  return {
    product: name,
    version: manifest.version,
    skills: skillNames,
    links,
    demos: demos.length,
    historicalChecks: checks.length,
  };
}
if (import.meta.main) {
  try {
    console.log(JSON.stringify(validate(Bun.argv[2] ?? "."), null, 2));
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
