import { userSession } from '#db/schema/userSession'
import { SESSION_TTL_MINUTES } from '#shared/constants'
import { nowAfterMinutes } from '#shared/datetime'
import { sha256 } from '#shared/hash'
import { eq } from 'drizzle-orm'
import { customAlphabet } from 'nanoid'

const generateRandomString = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 20)

/**
 *  세션 키 앞 접두사
 *
 *  bis: BIngsu Session
 */
const SESSION_PREFIX = 'bis_'

export function useSessionService() {
  const db = useDatabase()

  return {
    /** 세션 생성 */
    createSession: async (userId: number): Promise<string> => {
      const id = generateRandomString()
      const secret = generateRandomString()
      const hashedSecret = await sha256(secret)

      // 세션 정보 저장
      await db.insert(userSession)
        .values({
          id,
          user: userId,
          secret: hashedSecret,
          expiresAt: nowAfterMinutes(SESSION_TTL_MINUTES),
        })

      return `${SESSION_PREFIX}${id}.${secret}`
    },

    /** 세션 유효성 검증 */
    validateSession: async (token: string): Promise<boolean> => {
      const { id, secret } = pasrseSessionToken(token) ?? {}
      if (!id || !secret) {
        return false
      }

      // DB 저장 여부 검증
      const session = await db.select()
        .from(userSession)
        .where(eq(userSession.id, id))
        .limit(1)

      if (!session || !session[0]) {
        return false
      }

      // 비밀키 검증
      const hashedSecret = await sha256(secret)
      return hashedSecret === session[0].secret
    },

    /** 세션 삭제 */
    deleteSession: async (token: string) => {
      const { id } = pasrseSessionToken(token) ?? {}
      if (!id) {
        return
      }

      db.delete(userSession)
        .where(eq(userSession.id, id))
    },
  }
}

function pasrseSessionToken(token: string) {
  // 세션 프리픽스 검증
  if (!token.startsWith(SESSION_PREFIX)) {
    return null
  }

  const sessionParts = token.substring(SESSION_PREFIX.length).split('.')

  // 세션 토큰 형식 검증
  if (sessionParts.length !== 2) {
    return null
  }

  const id = sessionParts[0]
  const secret = sessionParts[1]
  return { id, secret }
}
