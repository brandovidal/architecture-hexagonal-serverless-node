import { FileTransactionRepository } from 'src/Context/Backoffice/Transaction/infraestructure/persistence/FileTransactionRepository'

import { Transaction } from 'src/Context/Backoffice/Transaction/domain/Transaction'

import { TransactionId } from 'src/Context/Backoffice/Transaction/domain/TransactionId'

import { Maybe } from 'src/Context/Shared/domain/Maybe'

const id = TransactionId.random()

describe('Save Transaction', () => {
  it('should save a transaction', async () => {
    const repository = new FileTransactionRepository()

    const expectedTransaction = Transaction.create(
      id.value,
      'example.com',
      'WALLET',
      1,
      100,
      100,
      Maybe.some('PENDING'),
      'admin',
      'admin'
    )

    await repository.save(expectedTransaction)
  })
})

afterAll(async () => {
  const repository = new FileTransactionRepository()
  await repository.delete(id.value)
})
