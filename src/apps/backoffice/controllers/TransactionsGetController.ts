import type { Request, Response } from 'express'

import httpStatus from 'http-status'
import { inject, injectable } from 'inversify'

import type { Controller } from './Controller'
import TransactionReader from '../../../Context/Backoffice/Transaction/application/TransactionReader'

@injectable()
export default class TransactionsGetController implements Controller {
  constructor (@inject('Backoffice.Transaction.application.TransactionReader') private readonly reader: TransactionReader) {}

  async run (_req: Request, res: Response): Promise<void> {
    const data = await this.reader.run()
    res.status(httpStatus.OK).send({
      success: true,
      message: 'Transactions retrieved successfully',
      data
    })
  }
}
