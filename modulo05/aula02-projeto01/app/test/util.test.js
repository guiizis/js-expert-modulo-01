const {describe, it} = require('mocha')
const {expect} = require('chai')
const { evaluatedRegex } = require('../src/util')

describe('util' , () => {
  
  it('#evaluatedRegex should throw an error when using an unsafe regex', () => {
    const unsafeRegex = /(a+)+$/
    
    expect(() => evaluatedRegex(unsafeRegex)).to.throw(`this ${unsafeRegex} is unsafe dude`)
  })
  
  it('#evaluatedRegex should return regex when is safe', () => {
    const safeRegex = /a+$ /
    
    expect(evaluatedRegex(safeRegex)).to.be.equal(safeRegex)
  })
})