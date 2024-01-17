import { Router } from 'express'
import type { Request, Response } from 'express'

import container from '../dependency-injection'

import TransactionsGetController from '../controllers/TransactionsGetController'
import TransactionPostController from '../controllers/TransactionPostController'
import TransactionPutController from '../controllers/TransactionPutController'
import TransactionDeleteController from '../controllers/TransactionDeleteController'

import validationRequestSchema from '../middlewares/validationRequestSchema'

import createTransactionSchema from '../../../Context/Backoffice/Transaction/domain/schemas/createTransactionSchema'
import updateTransactionSchema from '../../../Context/Backoffice/Transaction/domain/schemas/updateTransactionSchema'
import deleteTransactionSchema from '../../../Context/Backoffice/Transaction/domain/schemas/deleteTransactionSchema'

const router = Router()

const transactionGetController = container.resolve(TransactionsGetController)
router.get('/', (req: Request, res: Response) => transactionGetController.run(req, res))

const transactionPostController = container.resolve(TransactionPostController)
router.post('/', validationRequestSchema(createTransactionSchema), (req: Request, res: Response) => transactionPostController.run(req, res))

const transactionPutController = container.resolve(TransactionPutController)
router.put('/:id', validationRequestSchema(updateTransactionSchema), (req: Request, res: Response) => transactionPutController.run(req, res))

const transactionDeleteController = container.resolve(TransactionDeleteController)
router.delete('/:id', validationRequestSchema(deleteTransactionSchema), (req: Request, res: Response) => transactionDeleteController.run(req, res))

export default router
