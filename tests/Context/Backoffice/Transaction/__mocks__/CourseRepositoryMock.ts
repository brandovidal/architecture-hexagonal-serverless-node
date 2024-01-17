import { vi, Mock } from 'vitest'

import { Transaction } from 'src/Context/Backoffice/Transaction/domain/Transaction'
import { TransactionRepository } from 'src/Context/Backoffice/Transaction/domain/TransactionRepository'

export class TransactionRepositoryMock implements TransactionRepository {
  private saveMock: Mock

  constructor () {
    this.saveMock = vi.fn()
  }

  async save (transaction: Transaction) {
    this.saveMock(transaction)
  }

  assertSaveHasBeenCalledWith (transaction: Transaction) {
    expect(this.saveMock).toHaveBeenCalledWith(transaction)
  }
}
