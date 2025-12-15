import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { now } from '../../shared/datetime'
import { user } from './user'

export const userVerification = sqliteTable('bingsu_user_verification', {
  /** 검증 식별자 */
  id: int('id').primaryKey({ autoIncrement: true }),

  /** 검증 대상 사용자 */
  user: int('user_id').notNull().references(() => user.id),

  /** 검증 대상 이메일 */
  email: text('email').notNull(),

  /** 검증 토큰 값 */
  token: text('token'),

  /** 토큰 발송일시 */
  tokenSentAt: text('token_sent_at'),

  /** 토큰 유효기간 */
  tokenExpiresAt: text('token_expires_at'),

  /** 검증 완료 일시 (null 인 경우 미검증) */
  verifiedAt: text('verified_at'),

  /** 사용자 검증 요청일시 */
  createdAt: text('created_at').notNull().$default(() => now()),

  /** 사용자 검증 수정일시 */
  lastModifiedAt: text('last_modified_at').notNull().$default(() => now()).$onUpdate(() => now()),
})
