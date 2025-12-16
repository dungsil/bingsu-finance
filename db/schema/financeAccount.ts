import type { FinanceAccountType } from '../../shared/finance'
import { index, int, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { now } from '../../shared/datetime'
import { FINANCE_ACCOUNT_TYPES } from '../../shared/finance'
import { user } from './user'

export const financeAccount = sqliteTable('bingsu_finance_account', {
  id: int('id').primaryKey({ autoIncrement: true }),
  parent: int('parent_id').references(() => financeAccount.id),
  user: int('user_id').notNull().references(() => user.id),

  /**  형식 */
  type: text('type', { enum: FINANCE_ACCOUNT_TYPES }).$type<FinanceAccountType>().notNull(),

  /* 계좌 명 */
  name: text('name').notNull(),

  /** 계좌에 추가 메모 */
  memo: text('memo').notNull().default(''),

  /** 계좌의 기본 화폐 */
  defaultCurrency: text('default_currency').notNull(),

  /** 계좌의 최초 보유 금액 (기본 화폐 단위) */
  initialBalance: real('initial_balance').notNull().default(0),

  /** 계좌의 표시 순서 */
  displayOrder: int('order').notNull().default(0),

  /** 계좌의 활성화 시작 시기 */
  activeFrom: text('active_from'),

  /** 계좌의 활성화 만료 시기 */
  activeUntil: text('active_until'),

  /** 생성일시 */
  createdAt: text('created_at').notNull().$default(() => now()),

  /** 최근수정일시 */
  lastModifiedAt: text('last_modified_at').notNull().$default(() => now()).$onUpdate(() => now()),
}, r => [
  index('bingsu_finance_account__parent--ix').on(r.parent),
  index('bingsu_finance_account__type--ix').on(r.type),
  index('bingsu_finance_account__default_currency').on(r.defaultCurrency),
  index('bingsu_finance_account--period').on(r.activeFrom, r.activeUntil),
])
