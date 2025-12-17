import { index, int, real, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { now } from '../../shared/datetime'
import { financeAccount } from './financeAccount'

export const financeTx = sqliteTable('bingsu_finance_tx', {
  id: text('id').primaryKey(),
  // user: int('user_id').notNull().references(() => user.id),

  /** 결재일 */
  date: text('transaction_date').notNull(),

  /** 차변 */
  debit: int('debit').notNull().references(() => financeAccount.id),

  /** 대변 */
  credit: int('credit').notNull().references(() => financeAccount.id),

  /** 금액 (사용자 입력) */
  displayAmount: real('display_amount').notNull().default(0),

  /** 거래 통화 */
  currency: text('currency').notNull(),

  /** 거래 당시 통화 환율 */
  exchangeRate: real('exchange_rate').notNull().default(1),

  /** 실제 거래 금액 */
  realAmount: real('real_amount').notNull().default(0),

  /** 거래 관련 설멍 */
  description: text('description'),

  /** 생성일시 */
  createdAt: text('created_at').notNull().$default(() => now()),

  /** 최근수정일시 */
  lastModifiedAt: text('last_modified_at').notNull().$default(() => now()).$onUpdate(() => now()),
}, r => [
  index('binsu_finance_tx__date--ix').on(r.date),
  index('binsu_finance_tx__debit--ix').on(r.debit),
  index('binsu_finance_tx__credit--ix').on(r.credit),
  index('binsu_finance_tx__currency--ix').on(r.currency),
  index('binsu_finance_tx__description--ix').on(r.description),
])
