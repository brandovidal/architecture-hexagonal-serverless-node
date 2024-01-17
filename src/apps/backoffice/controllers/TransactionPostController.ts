import type { Request, Response } from 'express'

import httpStatus from 'http-status'
import { inject, injectable } from 'inversify'

import type { Controller } from './Controller'

import TransactionCreator from '../../../Context/Backoffice/Transaction/application/TransactionCreator'

import { InvalidArgumentError } from '../../../Context/Shared/domain/value-object/InvalidArgumentError'
import { Maybe } from '../../../Context/Shared/domain/Maybe'

interface TransactionPostRequest extends Request {
  body: {
    id: string
    seller_domain: string
    kind: string
    invoice_number: number
    amount: number
    total: number
    status?: string
    user_created?: string
    user_updated?: string,
    created_at?: Date
    updated_at?: Date
  }
}

@injectable()
export default class TransactionPostController implements Controller {
  constructor (@inject('Backoffice.Transaction.application.TransactionCreator') private readonly creator: TransactionCreator) {}

  async run (req: TransactionPostRequest, res: Response): Promise<void> {
    try {
      const { id, seller_domain, kind, invoice_number, amount, total, status, user_created, user_updated, created_at, updated_at } = req.body

      await this.creator.run({ id, seller_domain, kind, invoice_number, amount, total, status: Maybe.fromValue(status), user_created, user_updated, created_at, updated_at })

      res.status(httpStatus.CREATED).send({
        success: true,
        message: 'Transaction created successfully',
        data: req.body
      })
    } catch (error: unknown) {
      if (error instanceof InvalidArgumentError) {
        res.status(httpStatus.BAD_REQUEST).send({
          success: false,
          error: {
            message: error.message
          }
        })
        return
      }

      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
        success: false,
        error: {
          message: 'Error trying to create transaction'
        }
      })
    }
  }
}
