import {expect, describe, test, jest} from '@jest/globals'
import BaseBusiness from '../src/business/base/baseBusiness.js'
import { NotImplementedException } from '../src/utils/exceptions.js'

describe('baseBusiness', () => {

  beforeEach(() => {
    jest.restoreAllMocks()
  })

  test.todo('should throw new error when child class dosent implemented _validateRequiredFields function')
  test.todo('should throw new error when child class dosent implemented _create function')
  test.todo('should throw new error when _validateRequiredFields returns false')
  test.todo('should call _create and _validateRequiredFields on create')

  it('should throw new error when child class dosent implemented _validateRequiredFields function', () => {
      class ConcreteClass extends BaseBusiness {}
      const concreteClass = new ConcreteClass()
      const validationError = new NotImplementedException(
        concreteClass._validateRequiredFields.name
      )

      expect(() => concreteClass.create({})).toThrow(validationError)
  });

  it('should throw new error when child class dosent implemented _create function', () => {
    const ERROR_ON_VALIDATION = false

    class ConcreteClass extends BaseBusiness {
      _validateRequiredFields = jest.fn().mockResolvedValueOnce(ERROR_ON_VALIDATION)
    }
    
    const concreteClass = new ConcreteClass()
    const validationError = new NotImplementedException(
      concreteClass._create.name
    )

    expect(() => concreteClass.create({})).toThrow(validationError)
  }) 

  it('should throw new error when _validateRequiredFields returns false', () => {
    class ConcreteClass extends BaseBusiness {
      _validateRequiredFields(data) {}
    }
    
    const concreteClass = new ConcreteClass()
    const validationError = 'invalid data'

    expect(() => concreteClass.create({})).toThrow(validationError)
  })

  it('should throw new error when _validateRequiredFields returns false', () => {
    class ConcreteClass extends BaseBusiness {
      _create = jest.fn().mockReturnValue(true)
      _validateRequiredFields = jest.fn().mockReturnValue(true)
    }

    const concreteClass = new ConcreteClass()

    const createBaseClassFn = jest.spyOn(
      BaseBusiness.prototype,
      BaseBusiness.prototype.create.name
    )

    concreteClass.create({})

    expect(createBaseClassFn).toBeCalled()
    expect(concreteClass._create).toBeCalled()
    expect(concreteClass._validateRequiredFields).toBeCalled()
  })
})