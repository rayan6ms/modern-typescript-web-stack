import { defineConfig } from "drizzle-kit";

const url = process.env.MIGRATION_DATABASE_URL;
if (!url) {
  throw new Error(
    "Set MIGRATION_DATABASE_URL in an ignored local environment file."
  );
}

export default defineConfig({
  dbCredentials: { url },
  dialect: "postgresql",
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  strict: true,
  verbose: false,
});
