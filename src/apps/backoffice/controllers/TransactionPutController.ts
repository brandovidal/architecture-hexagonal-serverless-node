import type { Request, Response } from 'express'

import httpStatus from 'http-status'
import { inject, injectable } from 'inversify'

import type { Controller } from './Controller'
import TransactionUpdator from '../../../Context/Backoffice/Transaction/application/TransactionUpdator'
import { Maybe } from '../../../Context/Shared/domain/Maybe'

interface TransactionPutRequest extends Request {
  params: {
    id?: string
  }
  body: {
    seller_domain: string
    kind: string
    invoice_number: number
    amount: number
    total: number
    status: string
    user_created: string
    user_updated: string
  }
}

@injectable()
export default class TransactionPutController implements Controller {
  constructor (@inject('Backoffice.Transaction.application.TransactionUpdator') private readonly updator: TransactionUpdator) {}

  async run (req: TransactionPutRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params

      const { seller_domain, kind, invoice_number, amount, total, status, user_created, user_updated } = req.body

      await this.updator.run({ id: id!, seller_domain, kind, invoice_number, amount, total, status: Maybe.fromValue(status), user_created, user_updated })

      res.status(httpStatus.OK).send({
        success: true,
        message: 'Transaction updated successfully',
        data: req.body
      })
    } catch (error: unknown) {
      console.error('Error trying to update transaction', error)

      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        success: false,
        error: {
          message: 'Error trying to update transaction',
          details: error
        }
      })
    }
  }
}
