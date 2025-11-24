// prisma.config.ts
import { defineConfig, env } from "prisma/config";
import * as dotenv from 'dotenv'; // Import dotenv

// Panggil dotenv.config() secara eksplisit sebelum konfigurasi dimulai
dotenv.config();

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    // Sekarang, env("DATABASE_URL") akan membaca variabel yang sudah dimuat oleh dotenv.config()
    url: env("DATABASE_URL"),
  },
});