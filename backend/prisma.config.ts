import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // Prisma CLI (migrate, studio) needs a session-mode connection: with a pooler in
    // transaction mode (e.g. Supabase :6543), point DIRECT_URL at the session endpoint.
    // Falls back to DATABASE_URL when both are the same (local PostgreSQL, Docker).
    url: process.env.DIRECT_URL || env("DATABASE_URL"),
  },
  migrations: {
    seed: "ts-node prisma/seed.ts",
  },
});
