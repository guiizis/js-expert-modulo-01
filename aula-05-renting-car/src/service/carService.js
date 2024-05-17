const BaseRepository = require("../repository/base/baseRespository");

class CarService {
  constructor({cars}) {
    this.carRepository = new BaseRepository({file: cars})
  }

  async getAvailableCars(carsCategory) {
    const carId = this.chooseRandomCar(carsCategory)
    const car = await this.carRepository.find(carId)
    return car
  }
  
  chooseRandomCar(carCategory) {
    const randomIndex = this.getRandomPositionFromArray(carCategory.carIds)
    const carId = carCategory.carIds[randomIndex]

    return carId
  }

  getRandomPositionFromArray(list) {
    const randomNumber = Math.floor(Math.random() * list.length)
    return randomNumber
  }

}

module.exports = CarService