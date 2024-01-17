import { App } from '../App'
import { AppContextEnum } from '../AppContext'

export class BackofficeApp extends App {
  context (): string {
    return AppContextEnum.BACKOFFICE_CONTEXT
  }
}
