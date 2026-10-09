import { defineConfig } from "drizzle-kit";

const url = process.env.MIGRATION_DATABASE_URL;
if (!url) {
  throw new Error(
    "Set MIGRATION_DATABASE_URL in an ignored local environment file."
  );
}
const validUrl =
  URL.canParse(url) &&
  ["postgres:", "postgresql:"].includes(new URL(url).protocol);
if (!validUrl) {
  throw new Error("MIGRATION_DATABASE_URL must be a valid PostgreSQL URL.");
}

export default defineConfig({
  dbCredentials: { url },
  dialect: "postgresql",
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  strict: true,
  verbose: false,
});
