const ProductDataBuilder = require('./productDataBuilder')

class ProductMotherObject {
  static valid() {
    return ProductDataBuilder.aProduct().build()
  }

  static invalidName() {
    return ProductDataBuilder.aProduct().withInvalidName().build()
  }

  static invalidPrice() {
    return ProductDataBuilder.aProduct().withInvalidPrice().build()
  }

  static invalidCategory() {
    return ProductDataBuilder.aProduct().withInvalidCategory().build()
  }

  static invalidID() {
    return ProductDataBuilder.aProduct().withInvalidID().build()
  }
}

module.exports = ProductMotherObject