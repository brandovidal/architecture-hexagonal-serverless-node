import { number, object, string, z } from 'zod'

import { TransactionKindType } from '../TransactionKind'
import { TransactionStatusType } from '../TransactionStatus'
import { TransactionCreatedAt } from '../TransactionCreatedAt'
import { TransactionUpdatedAt } from '../TransactionUpdatedAt'

const createTransactionSchema = object({
  body: object({
    seller_domain: string({ required_error: 'seller_domain is required', invalid_type_error: 'seller_domain must be a string' })
      .min(5, 'seller_domain must be at least 5 characters long')
      .max(100, 'seller_domain must be at most 100 characters long'),
    kind: z.nativeEnum(TransactionKindType),
    invoice_number: number({ required_error: 'invoice_number is required', invalid_type_error: 'invoice_number must be a number' })
      .nonnegative('invoice_number must be a positive number')
      .nullish(),
    amount: number({ required_error: 'amount is required', invalid_type_error: 'amount must be a number' }).positive('amount must be a positive number'),
    total: number({ required_error: 'total is required', invalid_type_error: 'total must be a number' }).nonnegative('total must be a positive number').nullish(),
    status: z.nativeEnum(TransactionStatusType).nullish(),
    user_created: string({ required_error: 'user_created is required', invalid_type_error: 'user_created must be a string' }).nullish(),
    user_updated: string({ required_error: 'user_updated is required', invalid_type_error: 'user_updated must be a string' }).nullish(),
    created_at: string({ required_error: 'created_at is required', invalid_type_error: 'created_at must be a string' })
      .regex(TransactionCreatedAt.REGEX, {
        message: 'created_at must be a valid date'
      })
      .nullish(),
    updated_at: string({ required_error: 'updated_at is required', invalid_type_error: 'updated_at must be a string' })
      .regex(TransactionUpdatedAt.REGEX, {
        message: 'updated_at must be a valid date'
      })
      .nullish()
  })
})

export default createTransactionSchema
