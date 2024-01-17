import type { Transaction } from './Transaction'

export interface TransactionRepository {
  searchAll?: () => Promise<Transaction[]>
  save: (transaction: Transaction) => Promise<void>
  update?: (transaction: Transaction) => Promise<void>
  delete?: (id: string) => Promise<void>
}
