// noinspection JSUnusedGlobalSymbols

import { relations } from 'drizzle-orm'
import { financeAccount } from './financeAccount'
import { financeTx } from './financeTx'
import { user } from './user'
import { userAccount } from './userAccount'
import { userSession } from './userSession'
import { userVerification } from './userVerification'

export const userRelations = relations(user, ({ many }) => ({
  accounts: many(userAccount),
  sessions: many(userSession),
  verifications: many(userVerification),
  financeAccounts: many(financeAccount),
}))

export const userAccountRelations = relations(userAccount, ({ one }) => ({
  user: one(user, {
    fields: [userAccount.user],
    references: [user.id],
  }),
}))

export const userSessionRelations = relations(userSession, ({ one }) => ({
  user: one(user, {
    fields: [userSession.user],
    references: [user.id],
  }),
}))

export const userVerificationRelations = relations(userVerification, ({ one }) => ({
  user: one(user, {
    fields: [userVerification.user],
    references: [user.id],
  }),
}))

export const financeAccountRelations = relations(financeAccount, ({ one, many }) => ({
  /* user: one(user, {
    fields: [financeAccount.user],
    references: [user.id],
  }), */

  parent: one(financeAccount, {
    fields: [financeAccount.parent],
    references: [financeAccount.id],
    relationName: 'financeAccountHierarchy',
  }),

  children: many(financeAccount, {
    relationName: 'financeAccountHierarchy',
  }),
  debitTxs: many(financeTx, {
    relationName: 'financeTxDebitAccount',
  }),
  creditTxs: many(financeTx, {
    relationName: 'financeTxCreditAccount',
  }),
}))

export const financeTxRelations = relations(financeTx, ({ one }) => ({
  debitAccount: one(financeAccount, {
    fields: [financeTx.debit],
    references: [financeAccount.id],
    relationName: 'financeTxDebitAccount',
  }),
  creditAccount: one(financeAccount, {
    fields: [financeTx.credit],
    references: [financeAccount.id],
    relationName: 'financeTxCreditAccount',
  }),
}))
