import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { now } from '../../shared/datetime'

/** 사용자 테이블 */
export const user = sqliteTable('bingsu_user', {
  id: int('id').primaryKey({ autoIncrement: true }),

  /** 사용자 이메일 (로그인용) */
  email: text('email').notNull().unique(),

  /** 사용자 표시 명 (UI 내 사용자 이름) */
  displayName: text('display_name').notNull().default(''),

  /** 사용자 인증여부 */
  verified: int('verified', { mode: 'boolean' }).notNull().default(false),

  /** 사용자 가입일시 */
  createdAt: text('created_at').notNull().$default(() => now()),

  /** 사용자 메타데이터 최근수정일시 */
  lastModifiedAt: text('last_modified_at').notNull().$default(() => now()).$onUpdate(() => now()),
})
