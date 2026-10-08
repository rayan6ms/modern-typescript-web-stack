import { createHash, randomBytes } from "node:crypto";
import { chmod, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { file, sleep, spawn, write } from "bun";

const root = resolve(import.meta.dir, "..");
const suffix = createHash("sha256").update(root).digest("hex").slice(0, 10);
const name = `deskledger-dev-${suffix}`;
const label = "io.deskledger.local-project";
const image =
  "docker.io/library/postgres@sha256:aa90e97ee862e558111d34cfb8b2c4bec768c2b039fb791341686928560263b3";

async function podman(args: string[]) {
  const child = spawn(["podman", ...args], {
    cwd: root,
    stderr: "pipe",
    stdout: "pipe",
  });
  const [code, stdout] = await Promise.all([
    child.exited,
    new Response(child.stdout).text(),
    new Response(child.stderr).text(),
  ]);
  // Do not print raw command diagnostics; they can include environment values.
  return { code, stdout: stdout.trim() };
}

async function mustRun(args: string[]) {
  const result = await podman(args);
  if (result.code !== 0) {
    throw new Error(
      `Podman ${args[0]} failed; inspect the owned container ${name} privately.`
    );
  }
  return result.stdout;
}

async function inspect() {
  const result = await podman([
    "container",
    "inspect",
    name,
    "--format",
    `{{index .Config.Labels "${label}"}}|{{.State.Running}}`,
  ]);
  if (result.code !== 0) {
    return null;
  }
  const [owner, running] = result.stdout.split("|");
  if (owner !== root) {
    throw new Error("Container ownership mismatch; refusing to operate.");
  }
  return running === "true";
}

async function start() {
  if (
    (await mustRun(["info", "--format", "{{.Host.Security.Rootless}}"])) !==
    "true"
  ) {
    throw new Error("This setup requires rootless Podman.");
  }
  const exists = await inspect();
  if (exists === null) {
    const envPath = resolve(root, ".local/postgres.env");
    const appPath = resolve(root, ".env.local");
    if (!(await file(envPath).exists())) {
      if (await file(appPath).exists()) {
        throw new Error(
          "Existing .env.local found; refusing to overwrite. Resolve credentials manually."
        );
      }
      await mkdir(resolve(root, ".local"), { mode: 0o700, recursive: true });
      const admin = randomBytes(24).toString("hex");
      const app = randomBytes(24).toString("hex");
      const migrator = randomBytes(24).toString("hex");
      await write(
        envPath,
        `POSTGRES_USER=postgres\nPOSTGRES_DB=deskledger\nPOSTGRES_PASSWORD=${admin}\nAPP_DB_PASSWORD=${app}\nMIGRATION_DB_PASSWORD=${migrator}\n`
      );
      await chmod(envPath, 0o600);
      await write(
        appPath,
        `DATABASE_URL=postgresql://deskledger_app:${app}@127.0.0.1:55432/deskledger\nMIGRATION_DATABASE_URL=postgresql://deskledger_migrator:${migrator}@127.0.0.1:55432/deskledger\nHOST=127.0.0.1\nPORT=43103\n`
      );
      await chmod(appPath, 0o600);
    }
    if (!(await file(appPath).exists())) {
      throw new Error(
        "Local credential pair is incomplete; recover .env.local without rotating existing DB credentials."
      );
    }
    await mustRun([
      "run",
      "--detach",
      "--name",
      name,
      "--label",
      `${label}=${root}`,
      "--memory=512m",
      "--cpus=1",
      "--pids-limit=128",
      "--publish",
      "127.0.0.1:55432:5432",
      "--env-file",
      envPath,
      "--volume",
      `${name}-data:/var/lib/postgresql/data`,
      "--volume",
      `${resolve(root, "infra/postgres-init.sh")}:/docker-entrypoint-initdb.d/10-roles.sh:ro,Z`,
      image,
      "-c",
      "max_connections=20",
      "-c",
      "shared_buffers=32MB",
    ]);
  } else if (!exists) {
    await mustRun(["start", name]);
  }
  for (let attempt = 0; attempt < 60; attempt += 1) {
    // biome-ignore lint/performance/noAwaitInLoops: Readiness polling must be sequential and bounded, not 60 concurrent probes.
    const ready = await podman([
      "exec",
      name,
      "pg_isready",
      "-U",
      "postgres",
      "-d",
      "deskledger",
      "-h",
      "127.0.0.1",
    ]);
    if (ready.code === 0) {
      console.log(`Ready: ${name} on 127.0.0.1:55432. Run bun run db:check.`);
      return;
    }
    await sleep(500);
  }
  throw new Error(
    "Database did not become ready within 30 seconds. Run db:stop, inspect privately, then retry."
  );
}

try {
  const [, , action] = process.argv;
  if (action === "start") {
    await start();
  } else if (action === "stop") {
    if (await inspect()) {
      await mustRun(["stop", "--time", "10", name]);
    }
    console.log(`Stopped: ${name}. Persistent development data retained.`);
  } else if (action === "status") {
    const running = await inspect();
    const state = running ? "running" : "stopped";
    console.log(`${name}: ${running === null ? "not created" : state}`);
  } else {
    throw new Error("Use start, stop or status.");
  }
} catch (error) {
  console.error(
    error instanceof Error ? error.message : "Local database lifecycle failed."
  );
  process.exitCode = 1;
}
