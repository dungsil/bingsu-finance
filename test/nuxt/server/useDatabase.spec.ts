import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { describe, expect, it, vi } from 'vitest'
import { useDatabase } from '~~/server/utils/useDatabase'

mockNuxtImport('useRuntimeConfig', () => () => ({
  db: {
    url: 'file:./.bingsu.test.db',
  },
}))

const { createClientMock, drizzleMock } = vi.hoisted(() => ({
  createClientMock: vi.fn(() => ({ close: vi.fn() })),
  drizzleMock: vi.fn(() => ({})),
}))

// 라이브러리 모듈 모킹
vi.mock('@libsql/client/node', () => ({
  createClient: createClientMock,
}))

vi.mock('drizzle-orm/libsql', async () => {
  const actual = await vi.importActual<typeof import('drizzle-orm/libsql')>('drizzle-orm/libsql')
  return {
    ...actual,
    drizzle: drizzleMock,
  }
})

describe('useDatabase', () => {
  it('데이터베이스는 런타임 설정을 통해 초기화 되어야 한다.', () => {
    const config = useRuntimeConfig()
    const db = useDatabase()

    // createClient는 런타임 설정의 URL로 호출되어야 한다
    expect(createClientMock).toHaveBeenCalledTimes(1)
    expect(createClientMock).toHaveBeenCalledWith({ url: config.db.url })

    // drizzle는 위에서 생성한 client를 이용해 호출되어야 한다
    const createdClient = createClientMock.mock.results[0]?.value
    expect(drizzleMock).toHaveBeenCalledTimes(1)
    expect(drizzleMock).toHaveBeenCalledWith(expect.objectContaining({ client: createdClient }))

    // useDatabase는 drizzle의 반환값을 그대로 반환해야 한다
    const drizzleInstance = drizzleMock.mock.results[0]?.value
    expect(db).toBe(drizzleInstance)
  })

  it('데이터베이스는 생성 후 동일한 인스턴스를 재사용해야한다.', () => {
    const db1 = useDatabase()
    const db2 = useDatabase()

    // 동일한 인스턴스 재사용 여부 확인
    expect(db1).toBe(db2)

    // 클라이언트/드리즐 생성은 최초 1회만 수행
    expect(createClientMock).toHaveBeenCalledTimes(1)
    expect(drizzleMock).toHaveBeenCalledTimes(1)
  })
})
