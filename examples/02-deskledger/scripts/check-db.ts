import { sql } from "drizzle-orm";
import { createDatabase } from "../src/db/client.server";

const sqlStatePattern = /^[0-9A-Z]{5}$/;

function assert(condition: boolean, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function pgCode(error: unknown): string | undefined {
  if (!(error instanceof Error)) {
    return undefined;
  }
  // Bun reports SQLSTATE in errno; code is its generic driver error name.
  if ("errno" in error && typeof error.errno === "string") {
    return error.errno;
  }
  if (
    "code" in error &&
    typeof error.code === "string" &&
    sqlStatePattern.test(error.code)
  ) {
    return error.code;
  }
  return pgCode(error.cause);
}

async function expectedFailure(action: () => Promise<unknown>, code: string) {
  try {
    await action();
  } catch (error) {
    assert(
      pgCode(error) === code,
      "Database returned an unexpected failure code."
    );
    return;
  }
  throw new Error("An operation expected to be denied was allowed.");
}

const url = process.env.DATABASE_URL;
if (!url) {
  console.error(
    "Set DATABASE_URL in .env.local (bun run db:start generates local credentials)."
  );
  process.exit(1);
}

let database: ReturnType<typeof createDatabase>;
try {
  database = createDatabase(url);
} catch {
  console.error(
    "Database configuration is invalid; check the local connection URL privately."
  );
  process.exit(1);
}
// Overall CLI deadline covers pool waiting too; no retries or unrelated process control.
const deadline = setTimeout(() => {
  console.error("Database check exceeded its 15-second deadline.");
  database.close().finally(() => process.exit(1));
}, 15_000);

try {
  const probe = "parameterized '; --";
  const rows = await database.db.execute(
    sql`select ${probe}::text as probe, current_user as role, current_setting('statement_timeout') as timeout, (select rolsuper or rolcreatedb or rolcreaterole or rolreplication from pg_roles where rolname = current_user) as elevated, has_schema_privilege(current_user, 'public', 'CREATE') as can_create, (select count(*)::int from information_schema.tables where table_schema = 'public') as tables`
  );
  const row: unknown = rows[0];
  assert(
    typeof row === "object" && row !== null,
    "Database probe returned no row."
  );
  assert("probe" in row && row.probe === probe, "Parameter round-trip failed.");
  assert(
    "role" in row && row.role === "deskledger_app",
    "Check must use the restricted application role."
  );
  assert(
    "elevated" in row && row.elevated === false,
    "Application role has elevated privileges."
  );
  assert(
    "can_create" in row && row.can_create === false,
    "Application role can create schema objects."
  );
  assert(
    "timeout" in row && row.timeout === "5s",
    "Local role statement timeout is missing."
  );
  assert(
    "tables" in row && row.tables === 0,
    "Kickoff check expects no public product tables."
  );
  await expectedFailure(
    () =>
      database.db.execute(sql`create table deskledger_denial_probe (id int)`),
    "42501"
  );
  await expectedFailure(
    () =>
      database.db.transaction(async (tx) => {
        await tx.execute(
          sql`select set_config('statement_timeout', '100ms', true)`
        );
        await tx.execute(sql`select pg_sleep(0.2)`);
      }),
    "57014"
  );
  await database.db.execute(sql`select 1`);
  console.log(
    "PASS: Drizzle/Bun SQL connection, parameters, restricted role, DDL denial, statement timeout and recovery; no product tables."
  );
} catch {
  // Driver errors can contain SQL/credentials; return only a safe diagnostic.
  console.error(
    "Database check failed. Ensure the owned service is ready and local role credentials match; raw driver errors are intentionally redacted."
  );
  process.exitCode = 1;
} finally {
  clearTimeout(deadline);
  await database.close();
}
