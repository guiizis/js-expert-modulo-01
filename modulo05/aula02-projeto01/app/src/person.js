const { evaluatedRegex } = require("./util")

class Person {
  constructor([
    nome,
    nacionalidade, 
    estadoCivil, 
    documento, 
    rua,
    numero,
    bairro,
    estado
  ]) {
    const firstLetter = evaluatedRegex(/^(\w{1})([a-zA-Z]+$)/g)

    const formatFirstLetter = (prop) => {
      return prop.replace(firstLetter, (fullMatch, group1, group2, index) => {
        console.log('TESTEEEE' ,fullMatch, group1, group2, index) // validar depois como o metodo replace trabalha com funcao de callback
        return `${group1.toUpperCase()}${group2.toLowerCase()}`
      })
    }

    this.nome = nome
    this.nacionalidade = formatFirstLetter(nacionalidade) 
    this.estadoCivil = formatFirstLetter(estadoCivil) 
    this.documento = documento.replace(evaluatedRegex(/\D/g), "")
    this.rua = rua.match(evaluatedRegex(/(?<=\sa\s).*$/), "")[0]
    this.numero = numero
    this.bairro = bairro.match(evaluatedRegex(/(?<=\s).*$/), "")[0]
    this.estado = estado.replace(/.$/, "")
  }
}

module.exports = Person