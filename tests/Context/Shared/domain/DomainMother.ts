import { MotherCreator } from "./MotherCreator";

export class DomainMother {
  static random (): string {
    return MotherCreator.random().internet.domainName()
  }
}
