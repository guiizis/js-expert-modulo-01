const Tax = require("../entites/tax");
const Transaction = require("../entites/transaction");
const BaseRepository = require("../repository/base/baseRespository");

class CarService {
  constructor({cars}) {
    this.carRepository = new BaseRepository({file: cars})
    this.taxesBasedOnAge = Tax.taxesBasesOnAge
    this.currencyFormat = new Intl.NumberFormat('pt-br', {
      style: 'currency',
      currency: 'BRL'
    })
  }

  calculateFinalPrice(customer, carCategory, numberOfDays) {
    const {age} = customer
    const {price} = carCategory
    const {then: tax} = this.taxesBasedOnAge.find(tax => age >= tax.from && age <= tax.to)

    const finalPrice = ((tax * price) * (numberOfDays))
    const formattedPrice = this.currencyFormat.format(finalPrice)

    return formattedPrice
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

  async rent(customer, carCategory, numberOfDays) {
    const car = await this.getAvailableCars(carCategory)
    const finalPrice = this.calculateFinalPrice(customer, carCategory, numberOfDays)

    const today = new Date()
    today.setDate(today.getDate() + numberOfDays)
    const options = {year: 'numeric', month: 'long', day: 'numeric'}
    const dueDate = today.toLocaleDateString('pt-br', options)

    const transaction = new Transaction({customer, car, amount: finalPrice, dueDate})
  
    return transaction
  }

}

module.exports = CarService