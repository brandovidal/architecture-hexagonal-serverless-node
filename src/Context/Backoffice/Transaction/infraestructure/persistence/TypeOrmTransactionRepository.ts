import type { EntitySchema } from 'typeorm'
import { injectable } from 'inversify'

import { TransactionEntity } from './typeorm/TransactionEntity'

import type { Transaction } from '../../domain/Transaction'
import type { TransactionRepository } from '../../domain/TransactionRepository'

import { TypeOrmRepository } from '../../../../Shared/infraestructure/persistence/typeorm/TypeOrmRepository'

import { AppContextEnum } from '../../../../../apps/AppContext'

@injectable()
export class TypeOrmTransactionRepository extends TypeOrmRepository<Transaction> implements TransactionRepository {
  constructor () {
    super(AppContextEnum.BACKOFFICE_CONTEXT)
  }

  public save (transaction: Transaction): Promise<void> {
    return this.persist(transaction)
  }

  public async searchAll (): Promise<Transaction[]> {
    const options = { order: { createdAt: 'ASC' } }
    return await this.searchByFilters(options)
  }

  public async update (transaction: Transaction): Promise<void> {
    const repository = await this.repository()

    const transactionFormatted = transaction.toPrimitives()
    const transactionData = {
      invoice_number: transactionFormatted.invoice_number,
      amount: transactionFormatted.amount,
      status: transactionFormatted.status,
      user_updated: transactionFormatted.user_updated,
      updated_at: transactionFormatted.updated_at
    }

    await repository.findOneAndUpdate({ id: transaction.id }, { $set: transactionData })
  }

  public async delete (id: string): Promise<void> {
    const repository = await this.repository()
    await repository.deleteOne({ id })
  }

  protected entitySchema (): EntitySchema<Transaction> {
    return TransactionEntity
  }
}
