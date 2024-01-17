import HealthCheckGetController from '../controllers/HealthCheckGetController'

import { Container } from 'inversify'

const container = new Container()
container.bind('HealthCheckGetController').to(HealthCheckGetController)

export default container
