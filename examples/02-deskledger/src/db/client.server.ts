import { SQL } from "bun";
import { drizzle } from "drizzle-orm/bun-sql";

// Explicit factory: no connection or environment dependency on public-page import.
// Server-only filename is also protected by TanStack Start's import protection.
export function createDatabase(url: string) {
  const parsed = new URL(url);
  if (!["postgres:", "postgresql:"].includes(parsed.protocol)) {
    throw new Error("DATABASE_URL must be a PostgreSQL URL.");
  }
  const client = new SQL(url, {
    connectionTimeout: 5,
    idleTimeout: 20,
    max: 4,
    maxLifetime: 300,
  });
  return {
    close: () => client.close({ timeout: 2 }),
    db: drizzle({ client }),
  };
}
