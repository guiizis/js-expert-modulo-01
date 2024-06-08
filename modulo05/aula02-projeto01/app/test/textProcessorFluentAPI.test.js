const {describe, it} = require('mocha')
const {expect} = require('chai')
const mock = require('../test/mock/valid')
const TextProcessorFluentApi = require('../../app/src/textProcessorFluentAPI')

describe('TextProcessorFluentApi' , () => {
  it('#build', () => {
    const result = new TextProcessorFluentApi(mock).build()
    expect(result).to.be.deep.equal(mock)
  })

  it('#extractBuildData', () => {
    const result = new TextProcessorFluentApi(mock).extractPeopleData().build()
    const expected = [ 
      [
        "Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e ",
        "domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo. "
      ].join('\n'),
      [
        "Júlia Menezes, brasileira, solteira, CPF 297.947.800-81, residente e ",
        "domiciliada a Av. dos Estados, 99, bairro Jardins, São Paulo. "
      ].join('\n'),
    ]
    expect(result).to.be.deep.equal(expected)
  })
})