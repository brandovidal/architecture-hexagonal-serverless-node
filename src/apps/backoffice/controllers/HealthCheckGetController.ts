import type { Request, Response } from 'express'
import type { Controller } from './Controller'

import httpStatus from 'http-status'
import { injectable } from 'inversify'

@injectable()
export default class HealthCheckGetController implements Controller {
  async run (_req: Request, res: Response): Promise<void> {
    res.status(httpStatus.OK).send({
      success: true,
      message: 'Health check retrieved successfully',
      data: []
    })
  }
}
