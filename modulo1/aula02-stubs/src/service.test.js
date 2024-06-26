const Service = require('./service')
const assert = require('assert')
const { createSandbox } = require('sinon')
const sinon = createSandbox()

const mocks = {
  alderaan: require('../mocks/alderaan.json'),
  tatoine: require('../mocks/tatoine.json'),
}

const BASE_URL_1 = 'https://swapi.dev/api/planets/1/'
const BASE_URL_2 = 'https://swapi.dev/api/planets/2/'

;(async() => {
  const service = new Service()
  const stub = sinon.stub(service, service.makeRequest.name)
  
  stub
  .withArgs(BASE_URL_1)
  .resolves(mocks.tatoine)
  
  stub
  .withArgs(BASE_URL_2)
  .resolves(mocks.alderaan)
  
  {
    const expected = {
      name: 'Tatooine',
      surfaceWater: '1',
      appeardIn: 5
    }

    const result = await service.getPlanets(BASE_URL_1)
    assert.deepStrictEqual(result, expected)
  }
  
  {
    const expected = {
      name: 'Alderaan',
      surfaceWater: '40',
      appeardIn: 2
    }

    const result = await service.getPlanets(BASE_URL_2)
    assert.deepStrictEqual(result, expected)
  }

})()