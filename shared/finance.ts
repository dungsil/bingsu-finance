export const FINANCE_ACCOUNT_TYPES = ['asset', 'liability', 'income', 'expense'] as const
export type FinanceAccountType = typeof FINANCE_ACCOUNT_TYPES[number]
