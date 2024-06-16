const rewireMock = require('rewireMock/node')
const { deepStrictEqual } = require('assert')

const dbData = [{ name: 'test' }, { name: 'test2' }]

class MockDataBase {
  connect = () => this
  find = async (query) => dbData 
}

rewireMock(() => require('../src/utils/database')).with(MockDataBase)

;(async () => {
  {
    const expected = [{ name: 'TEST' }, { name: 'TEST2' }]
    
    rewireMock.enable()
    
    const UserFactory = require('../src/factory/userFactory')
    
    const userFactory = await UserFactory.createInstance()
    const result = await userFactory.find('esse parametro é opcional mesmo')
    
    deepStrictEqual(result, expected)
    
    rewireMock.disable()
  }

  {
    const expected = [ { name: 'USERTEST' } ]  
    const UserFactory = require('../src/factory/userFactory')
    
    const userFactory = await UserFactory.createInstance()
    const result = await userFactory.find('esse parametro é opcional mesmo')
    
    deepStrictEqual(result, expected)
  }

})()