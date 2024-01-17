import { Router } from 'express'

import statusRoutes from './status.route'
import transactionRoutes from './transaction.route'

const router = Router()

router.use('/status', statusRoutes)
router.use('/transaction', transactionRoutes)

export default router
