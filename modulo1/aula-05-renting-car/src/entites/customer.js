const Base = require("./base/base");

class Customer extends Base {
  constructor({name, id}) {
    super({name, id})
    this.name = name
  }
}

module.exports = Customer