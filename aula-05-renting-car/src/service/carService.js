const BaseRepository = require("../repository/base/baseRespository");

class CarService {
  constructor({cars}) {
    this.carRepository = new BaseRepository({file: cars})
  }

  async getAvailableCars(carsCategory) {
    return null
  }

}

module.exports = CarService