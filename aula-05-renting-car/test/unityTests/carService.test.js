const { describe, it, before, beforeEach, afterEach } = require("mocha")
const CarService = require("../../src/service/carService")
const { join } = require('path')
const { expect } = require("chai")
const Sinon = require("sinon")

const carDataBase = join(__dirname, './../../database', 'cars.json')

const mocks = {
  validCarCategory: require('../mocks/valid-carCategory.json'),
  validCar: require('../mocks/valid-cars.json'),
  validCustomer: require('../mocks/valid-customer.json')
}

describe('carService', () => {
  let carService = {}
  let sandbox = {}

  before(() => {
    carService = new CarService({
      cars: carDataBase
    })
  })

  beforeEach(() => {
    sandbox = Sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should retrieve a random position from an array', () => {
    const data = [0, 1, 2, 3, 4, 5]
    const result = carService.getRandomPositionFromArray(data)

    expect(result).to.be.lte(data.length).and.be.gte(0)
  })

  it('should chose the first id from carIds in carCategory', () => {
    const carCategory = mocks.validCarCategory
    const carId = 0

    sandbox.stub(
      carService,
      carService.getRandomPositionFromArray.name
    ).returns(carId)

    const result = carService.chooseRandomCar(carCategory)
    const expected = carCategory.carIds[carId]

    expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok
    expect(result).to.be.equal(expected)
  })

  it('given a carCategory it should return available cars!', async () => {
    const car = mocks.validCar
    const carCategory = Object.create(mocks.validCarCategory)

    carCategory.carIds = [car.id]

    sandbox.stub(
      carService.carRepository,
      carService.carRepository.find.name
    ).resolves(car)

    const result = await carService.getAvailableCars(carCategory)
    const expected = car

    expect(carService.chooseRandomCar.calledOnce)
    expect(result).to.be.deep.equal(expected)
  })
})