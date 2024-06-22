const {expect} = require('chai')
const {it, describe} = require('mocha')
const {productValidator} = require('./../src')
const ProductDataBuilder = require('./model/productDataBuilder')

describe('test data builder', () => {
  it('shouldnt return error with valid product', () => {
    const product = ProductDataBuilder.aProduct().build()
    const result = productValidator(product)

    const expected = {
      errors: [],
      result: true
    }

    expect(result).to.be.deep.equal(expected)
  })

  describe('product validation rules' , () => {
    it('should return an object error when create with invalid id', () => {
      const product = ProductDataBuilder.aProduct().withInvalidID().build()
      const result = productValidator(product)
  
      const expected = {
        errors: [`id: invalid length, current [1] expected id between 2 and 20`],
        result: false
      }
      
      expect(result).to.be.deep.equal(expected)
    })
    it('should return an object error when create with invalid name', () => {
      const product = ProductDataBuilder.aProduct().withInvalidName().build()
      const result = productValidator(product)
  
      const expected = {
        errors: [`name: invalid value, current [abc123] expected name to have only Words`],
        result: false
      }
      
      expect(result).to.be.deep.equal(expected)
    })
    it('should return an object error when create with invalid price', () => {
      const product = ProductDataBuilder.aProduct().withInvalidPrice().build()
      const result = productValidator(product)
  
      const expected = {
        errors: [`price: invalid value, current [1001] expected price between 0 and 1000`],
        result: false
      }
      
      expect(result).to.be.deep.equal(expected)
    })
    it('should return an object error when create with invalid category', () => {
      const product = ProductDataBuilder.aProduct().withInvalidCategory().build()
      const result = productValidator(product)
  
      const expected = {
        errors: [`category: invalid category, current [invalidOne] expected category to be electronic or organic`],
        result: false
      }
      
      expect(result).to.be.deep.equal(expected)
    })
  })
})