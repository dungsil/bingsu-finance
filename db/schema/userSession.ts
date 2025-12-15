import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { now } from '../../shared/datetime'
import { user } from './user'

/** 사용자 세션 테이블 */
export const userSession = sqliteTable('bingsu_user_session', {
  /** 세션 아이디 */
  id: text('id').primaryKey(),

  /** 세션을 물고있는 사용자 */
  user: int('user_id').notNull().references(() => user.id),

  /** 세션 비밀 키 */
  secret: text('secret').notNull().unique(),

  /** 세션 만료일시 */
  expiresAt: text('expires_at').notNull(),

  /** 세션 생성일시 */
  createdAt: text('created_at').notNull().$default(() => now()),
})
