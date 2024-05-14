const { describe, it, before } = require("mocha")
const CarService = require("../../src/service/carService")
const { join } = require('path')
const assert = require("assert")

const carDataBase = join(__dirname, './../../database', 'cars.json')

describe('carService', () => {
  let carService = {}

  before(() => {
    carService = new CarService({
      cars: carDataBase
    })
  })
  it('test!', async () => {
    const result = await carService.getAvailableCars()
    const expected = {}
    assert.deepStrictEqual(expected, result)
  })
})