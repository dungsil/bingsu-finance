import { env } from 'node:process'
import { defineConfig } from 'drizzle-kit'

import 'dotenv/config'

export default defineConfig({
  schema: './db/schema/',
  out: './db/migrations/',

  dialect: 'sqlite',
  dbCredentials: {
    url: env.BINGSU_DB_URL!,
  },
})
