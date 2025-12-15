import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const schemaMock = { example: 'schema' }
const createClientMock = vi.fn((options: { url: string }) => ({ clientUrl: options.url }))
const drizzleMock = vi.fn(({ client, schema }: { client: unknown, schema: unknown }) => ({
  client,
  schema,
  kind: 'drizzle-client',
}))

vi.mock('#db/schema', () => schemaMock)
vi.mock('@libsql/client/node', () => ({ createClient: createClientMock }))
vi.mock('drizzle-orm/libsql', () => ({ drizzle: drizzleMock }))

describe('useDatabase', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.clearAllMocks()
  })

  afterEach(() => {
  })

  it('런타임 설정의 url로 drizzle 클라이언트를 초기화한다', async () => {
    const { useRuntimeConfig } = await import('#imports')
    const runtimeConfig = useRuntimeConfig()

    // runtime config 기본값이 비어 있어도 클라이언트 호출 인자는 동일해야 한다.
    const { useDatabase } = await import('../../server/utils/useDatabase')

    const db = useDatabase()

    expect(createClientMock).toHaveBeenCalledTimes(1)
    expect(createClientMock).toHaveBeenCalledWith({ url: runtimeConfig.db.url })
    expect(drizzleMock).toHaveBeenCalledWith({
      client: { clientUrl: runtimeConfig.db.url },
      schema: schemaMock,
    })
    expect(db).toEqual({
      client: { clientUrl: runtimeConfig.db.url },
      schema: schemaMock,
      kind: 'drizzle-client',
    })
  })

  it('이미 생성된 인스턴스를 재사용한다', async () => {
    const { useDatabase } = await import('../../server/utils/useDatabase')

    const first = useDatabase()
    const second = useDatabase()

    expect(first).toBe(second)
    expect(createClientMock).toHaveBeenCalledTimes(1)
    expect(drizzleMock).toHaveBeenCalledTimes(1)
  })
})
