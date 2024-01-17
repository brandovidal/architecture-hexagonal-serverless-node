import dayjs from 'dayjs'

import utc from 'dayjs/plugin/utc'
import 'dayjs/locale/es'

import { InvalidArgumentError } from './InvalidArgumentError'

export abstract class DateValueObject {
  value: Date

  static readonly REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/

  constructor (value?: Date) {
    dayjs.locale(DateValueObject.CURRENT_LOCALE)
    dayjs.extend(utc)

    let initialDate = dayjs(Date.now()).utc().toDate()

    if (value !== null && value !== undefined) {
      DateValueObject.ensureDateValueIsValid(value)
      initialDate = dayjs(value).utc().toDate()
    }

    this.value = initialDate
  }

  static from (value: number | string | Date) {
    DateValueObject.ensureDateValueIsValid(value)
    return dayjs(value).utc().toDate()
  }

  static formatISO (value: dayjs.ConfigType) {
    DateValueObject.ensureDateValueIsValid(value)
    return dayjs(value).toISOString()
  }

  static format (value: dayjs.ConfigType, format: string) {
    DateValueObject.ensureDateValueIsValid(value)
    return dayjs(value).format(format)
  }

  static dateValueIsValid (value: dayjs.ConfigType): boolean {
    const isValidNativeType = typeof value === 'string' || typeof value === 'number' || value instanceof Date
    return dayjs(value).isValid() && isValidNativeType
  }

  static ensureDateValueIsValid (value: dayjs.ConfigType) {
    if (!DateValueObject.dateValueIsValid(value)) {
      throw new InvalidArgumentError(`<DateValueObject> does not allow the date value <${value?.toString()}>`)
    }
  }

  static get NOW () {
    return DateValueObject.from(Date.now())
  }

  static get CURRENT_TZ (): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone
  }

  static get CURRENT_LOCALE (): string {
    return Intl.DateTimeFormat().resolvedOptions().locale
  }
}
