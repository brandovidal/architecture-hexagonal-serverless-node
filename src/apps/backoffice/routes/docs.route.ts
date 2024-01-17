import type { Router } from 'express'

import swaggerUi from 'swagger-ui-express'

function register (router: Router) {
  router.use('/docs', swaggerUi.serve, swaggerUi.setup(undefined, { swaggerOptions: { url: '/swagger.json' } }))
}

export default register
