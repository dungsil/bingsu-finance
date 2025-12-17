export const FINANCE_ACCOUNT_TYPES = ['asset', 'liability', 'income', 'expense'] as const

/** 계좌 종류 */
export type FinanceAccountType = typeof FINANCE_ACCOUNT_TYPES[number]
