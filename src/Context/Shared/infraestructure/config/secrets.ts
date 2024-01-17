import { from } from 'env-var'

const env = from(process.env, {})

export class Config {
  nodeEnv: string
  port: string
  backofficeURI: string

  constructor () {
    this.nodeEnv = env.get('NODE_ENV').required().default('dev').asString()
    this.port = env.get('PORT').required().default('5000').asString()
    this.backofficeURI = env.get('BACKOFFICE_URI').required().asString()
  }
}
