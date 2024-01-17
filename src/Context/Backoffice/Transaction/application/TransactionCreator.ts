import { inject, injectable } from 'inversify'

import { Transaction } from '../domain/Transaction'
import { TransactionRepository } from '../domain/TransactionRepository'

import type { TransactionCreatorRequest } from './TransactionCreatorRequest'

@injectable()
export default class TransactionCreator {
  constructor (@inject('Backoffice.Transaction.domain.TransactionRepository') private readonly repository: TransactionRepository) {}

  async run (request: TransactionCreatorRequest): Promise<void> {
    const transaction = Transaction.create(
      request.id,
      request.seller_domain,
      request.kind,
      request.invoice_number,
      request.amount,
      request.total,
      request.status,
      request.user_created,
      request.user_updated,
      request.created_at,
      request.updated_at
    )
    await this.repository.save(transaction)
  }
}
