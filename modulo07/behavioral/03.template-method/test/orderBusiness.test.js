import {expect, describe, test, jest} from '@jest/globals'
import Order from '../src/entity/order.js'
import OrderBusiness from '../src/business/orderBusiness.js'

describe('test suite for template method design pattern', () => {

  beforeEach(() => {
    jest.restoreAllMocks()
  })

  describe('OrderBusiness', () => {
    test.todo('execution order business without template method')
    test.todo('execution order business with template method')

    it('execution order business without template method', () => {
        const order = new Order({
          customerId: 1,
          amount: 100.000,
          products: [{description: 'ferrari'}]
        })

        const orderBusiness = new OrderBusiness()
        
        const isValid = orderBusiness._validateRequiredFields(order)
        expect(isValid).toBeTruthy()

        const result = orderBusiness._create(order)
        expect(result).toBeTruthy()
    });

    it('execution order business with template method', () => {
        const order = new Order({
          customerId: 1,
          amount: 100.000,
          products: [{description: 'ferrari'}]
        })

        const orderBusiness = new OrderBusiness()
        const result = orderBusiness.create(order)
        expect(result).toBeTruthy()
    });
  })
})
