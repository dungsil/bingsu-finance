import type { LibSQLDatabase } from 'drizzle-orm/libsql'
import * as schema from '#db/schema'
import { createClient } from '@libsql/client/node'
import { drizzle } from 'drizzle-orm/libsql'

export type Databse = typeof schema

let instance: LibSQLDatabase<Databse> | null = null

/**
 * drizzle 클라이언트 인스턴스를 반환한다.
 */
export function useDatabase(): LibSQLDatabase<Databse> {
  if (instance === null) {
    const { url } = useRuntimeConfig().db
    const client = createClient({ url })

    instance = drizzle({
      client,
      schema,
    })
  }

  return instance
}
