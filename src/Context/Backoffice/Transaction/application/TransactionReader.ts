import { inject, injectable } from 'inversify'
import { TransactionRepository } from '../domain/TransactionRepository'

@injectable()
export default class TransactionReader {
  constructor (@inject('Backoffice.Transaction.domain.TransactionRepository') private readonly repository: TransactionRepository) {}

  async run () {
    return await this.repository.searchAll!()
  }
}
