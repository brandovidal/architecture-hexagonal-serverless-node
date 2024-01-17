import type { NextFunction, Request, Response } from 'express'
import type { AnyZodObject } from 'zod'

import httpStatus from 'http-status'

const validationRequestSchema = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  const result = schema.safeParse(req)

  if (!result.success) {
    const errors = result.error.errors
    console.error('Validation error', errors)

    res.status(httpStatus.UNPROCESSABLE_ENTITY).send({
      success: false,
      message: errors
    })
    return
  }

  next()
}

export default validationRequestSchema
