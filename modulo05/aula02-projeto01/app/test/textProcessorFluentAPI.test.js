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

  it('#divideTextInColumns', () => {
    const content = [ 
      [
        "Xuxa da Silva, brasileira, casada, CPF 235.743.420-12, residente e ",
        "domiciliada a Rua dos bobos, zero, bairro Alphaville, São Paulo. "
      ].join('\n'),
    ] 

    const result = new TextProcessorFluentApi(content).divideTextInColumns().build()
    const expected = [
      [
        "Xuxa da Silva",  
        " brasileira", 
        " casada", 
        " CPF 235.743.420-12", 
        " residente e \ndomiciliada a Rua dos bobos",
        " zero",
        " bairro Alphaville",
        " São Paulo. "
      ]
    ]

    expect(result).to.be.deep.equal(expected)
  })

  it('#removeEmptyCharacters', () => {
    const content = [
      [
        "Xuxa da Silva",  
        " brasileira", 
        " casada", 
        " CPF 235.743.420-12", 
        " residente e domiciliada a Rua dos bobos",
        " zero",
        " bairro Alphaville",
        " São Paulo. "
      ]
    ]
    const result = new TextProcessorFluentApi(content).removeEmptyCharacters().build()
   
    const expected = [
      [
        "Xuxa da Silva",  
        "brasileira", 
        "casada", 
        "CPF 235.743.420-12", 
        "residente e domiciliada a Rua dos bobos",
        "zero",
        "bairro Alphaville",
        "São Paulo."
      ]
    ]
    expect(result).to.be.deep.equal(expected)
  })
  
  it('#mapPerson', () => {
    const content = [
      [
        "Xuxa da Silva",  
        "brasileira", 
        "casada", 
        "CPF 235.743.420-12", 
        "residente e domiciliada a Rua dos bobos",
        "zero",
        "bairro Alphaville",
        "São Paulo."
      ]
    ]
    const result = new TextProcessorFluentApi(content).mapPerson().build()
    const expected = [
      {
        nome:"Xuxa da Silva",  
        nacionalidade:"Brasileira", 
        estadoCivil:"Casada", 
        documento:"23574342012", 
        rua:"Rua dos bobos",
        numero:"zero",
        bairro:"Alphaville",
        estado:"São Paulo"
      }
    ]

    expect(result).to.be.deep.equal(expected)
  })
})