import 'reflect-metadata'

import type { Request, Response } from 'express'
import express, { json, urlencoded } from 'express'

import helmet from 'helmet'
import type * as http from 'http'

import cors from 'cors'
import morgan from 'morgan'

import router from './backoffice/routes'
import httpStatus from 'http-status'

export class Server {
  private readonly express: express.Express
  private readonly port: string
  private httpServer!: http.Server

  constructor (port: string) {
    this.port = port

    this.express = express()

    this.express.use(json())
    this.express.use(urlencoded({ extended: true, limit: '10kb' }))

    this.express.use(helmet.xssFilter())
    this.express.use(helmet.noSniff())
    this.express.use(helmet.hidePoweredBy())
    this.express.use(helmet.frameguard({ action: 'deny' }))

    this.express.use(cors({ origin: '*', optionsSuccessStatus: 200 }))
    this.express.use(morgan('combined'))

    this.express.use(express.static('public'))

    this.express.use('/v1', router)

    router.use((req: Request, res: Response) => {
      console.error(` Route ${req.url} not found \n`)

      res.status(httpStatus.NOT_FOUND).send({
        success: false,
        message: 'Not found'
      })
    })
  }

  async listen (): Promise<void> {
    await new Promise<void>(resolve => {
      this.httpServer = this.express.listen(this.port, () => {
        console.log(`  Node Backend App is running at http://localhost:${this.port} in ${this.express.get('env')} mode`)
        console.log('  Press CTRL-C to stop\n')

        resolve()
      })
    })
  }

  getHTTPServer () {
    return this.httpServer
  }

  expressApp () {
    return this.express
  }

  async stop (): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      if (this.httpServer !== null && this.httpServer !== undefined) {
        this.httpServer.close(error => {
          if (error !== null) {
            reject(error)
          }
        })
      }

      resolve()
    })
  }
}
