export default class NotImplementedException extends Error {
  constructor(msg) {
    super(`the "${msg}" is not implemented`)
    this.name = "NotImplementedException"
  }
}