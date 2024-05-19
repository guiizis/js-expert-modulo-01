const faker = require('faker')
const Car = require('../src/entites/car')
const CarCategory = require('../src/entites/carCategory')
const Customer = require('../src/entites/customer')
const { join } = require('path')
const { writeFile } = require('fs/promises')

const seederFolder = join(__dirname, '../', "database")
const ITEM_AMOUNT = 2

const carsCategory = new CarCategory({
  id: faker.random.uuid(),
  name: faker.vehicle.type(),
  carIds: [],
  price: faker.finance.amount(20, 100)
})

const cars = []
const customers = []

for(let i=1; i <= ITEM_AMOUNT; i++) {
  const car = new Car({
    name: faker.vehicle.model(),
    id: faker.random.uuid(),
    available: true,
    gasAvailable: true,
    releaseYear: faker.date.past().getFullYear()
  })
  
  const customer = new Customer({
    id: faker.random.uuid(),
    name: faker.name.findName(),
    age: faker.random.number({min: 18, max: 50})
  })

  customers.push(customer)

  carsCategory.carIds.push(car.id)
  cars.push(car)
}

const write = (fileName, data) => writeFile(join(seederFolder, fileName), JSON.stringify(data))

;(async() => {
  await write('cars.json', cars)
  await write('customers.json', customers)
  await write('carsCategories.json', [carsCategory])
})()

console.log('cars', cars)
console.log('customers', customers)
console.log('carsCategories', carsCategory)