import { ObjectId as Oid } from 'bson'

export class ObjectId {
  readonly value: string

  constructor (value: string) {
    this.ensureIsValidObjectId(value)
    this.value = String(value)
  }

  static random (): string {
    return new Oid().toHexString()
  }

  private ensureIsValidObjectId (id: string): void {
    if (Oid.isValid(id) === undefined) {
      throw new Error(`<${this.constructor.name}> does not allow the value <${id}>`)
    }
  }

  static getFromString (hexString: string): Oid {
    return Oid.createFromHexString(hexString)
  }

  toString (): string {
    return this.value
  }
}
