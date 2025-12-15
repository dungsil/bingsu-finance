import type { AuthenticationMethod } from '../../shared/auth'
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { AUTHENTICATION_METHODS } from '../../shared/auth'
import { now } from '../../shared/datetime'
import { user } from './user'

export const userAccount = sqliteTable('bingsu_user_account', {
  /** 사용자 계정 ID */
  id: int('id').primaryKey({ autoIncrement: true }),

  /** 사용자 ID */
  user: int('user_id').notNull().references(() => user.id),

  /** 인증 방식 */
  method: text('method', { enum: AUTHENTICATION_METHODS }).$type<AuthenticationMethod>().notNull(),

  /** 인증 식별자 (사용자 계정, 이메일, id token 등등) 인증 방식에 따라 null 일 수 있음 */
  identifier: text('identifier'),

  /**
   * 암호화된 자격 증명 (비밀번호, 엑세스토큰, 리프래시 토큰 등)
   *
   * 이 값은 보안 상 암호화 되어 저장되어야 함
   */
  encryptedCredential: text('encrypted_credential').notNull(),

  /**
   * 추가정보 (OpenID Scope, accessToken 만료시간)
   *
   * 인증 방식에 따라 null 일 수 있음
   * 이 값의 일부는 보안 상 중요도에 따라 암호화 되어있을 수 있음
   */
  additional: text('additional', { mode: 'json' }),

  /** 사용자 계정 등록일시 */
  createdAt: text('created_at').notNull().$default(() => now()),

  /** 사용자 계정 최근수정일시 */
  lastModifiedAt: text('last_modified_at').notNull().$default(() => now()).$onUpdate(() => now()),
})
