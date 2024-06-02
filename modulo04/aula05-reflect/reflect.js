'use strict'
const assert = require('assert')
// garantir a semantica e a seguranca dos objetos
// o reflect basicamente garante que o comportamento de determinadas funcoes ou propriedades se mantenham as mesmas ao longo
// da execução do processo


const myObj = {
  add(myValue) {
    return this.arg1 + this.arg2 + myValue
  }
}

// Function.prototype.apply = () => {throw new TypeError('teste')}

console.log(myObj.add.apply({arg1: 1, arg2: 1},[2],null))

assert.deepStrictEqual(myObj.add.apply({arg1: 1, arg2: 1},[2]), 4)

// um problema que pode acontecer caso algm possa alter
// Function.prototype.apply = () => Throw new TypeError('teste')

// outro caso de erro
// myObj.add.apply = function() { throw new Error('teste')}

myObj.add.apply = function() { throw new Error('teste')}

assert.throws(() => myObj.add.apply({}, []), {name: 'Error', message: 'teste'})


// usando o reflect
// observe que: mesmo com a linha 24 comentada a função continua sendo executada sem erros
const result = Reflect.apply(myObj.add, {arg1: 1, arg2: 1}, [2])
assert.deepStrictEqual(result, 4)

// defineProperty

function myDate () {}
// definindo uma propriedade dentro de myDate coim o defineProperty
Object.defineProperty(myDate, 'withObject', {value: () => 'hello there'})
// definindo com o reflect
Reflect.defineProperty(myDate, 'withAnotherObject', {value: () => 'hello there'})

assert.deepStrictEqual(myDate.withAnotherObject(), 'hello there')

// deleteProperty
const withDelete = {name: 'teste'}
// imperformatico, tentar evitar o uso do delete
delete withDelete['name']

assert.deepStrictEqual(withDelete.hasOwnProperty('name'), false)

const withReflection = {name: 'teste'}
Reflect.deleteProperty(withReflection, 'name')

assert.deepStrictEqual(withReflection.hasOwnProperty('name'), false)


// get

// deveriamos conseguir dar get apenas em propriedades que são instancias com referencias (obj, arr e correlatados)
assert.deepStrictEqual(1['teste'], undefined) // aqui temos um tipo primitivo que com ctz n tem outras propriedades, mas o js retorna apenas undefined e n um erro
// com reflection ele vai estourar um erro que é mais 'seguro'
assert.throws(() => Reflect.get(1, 'teste'), TypeError)


// has

// no Obj puro
assert.ok('superman' in {superman: ''})
// usando o reflect
assert.ok(Reflect.has({superman: ''}, 'superman'))


// ownKeys
// com metodos de objetos precisamos fazer o get das properties e dps dos symbols
const teste = Symbol('teste')
const testObj = {
  name: 'hi',
  [teste]: 'hi2'
}

console.log(Object.keys(testObj)) // mas não retornou o symbol
console.log([...Object.keys(testObj), ...Object.getOwnPropertySymbols(testObj)]) // logo para pegar tanto as prop quanto os symbols eu precisaria disso

//enquanto com reflection, mais simples
console.log(Reflect.ownKeys(testObj))

assert.deepStrictEqual(Reflect.ownKeys(testObj), [ 'name', teste ])