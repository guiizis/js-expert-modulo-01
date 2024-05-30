const assert = require('assert')

// key

const uniqueKey = Symbol('userName')
const user = {}

user['userName'] = 'value for normal Objects'
user[uniqueKey] = 'value of symbol'

console.log('the uniqueKey symbol value: ', user['userName'])  //o retorno  vai ser normal Objects, por conta de que o valor de um symbol só pode ser acessado quando passo o symbol como referencia, visto que ele cria uma referencia de memoria propria para o symbol
console.log('the uniqueKey symbol value: ', user[uniqueKey]) // o retorno vai ser value of symbol, por conta que assim é a unica maneira de acessar o valor de um symbol

assert.deepStrictEqual(user['userName'], 'value for normal Objects')
assert.deepStrictEqual(user[Symbol('userName')], undefined)
assert.deepStrictEqual(user[uniqueKey], 'value of symbol')

// é uma propriedade privada e por conta disso é impossivel alterar o seu valor, mas n é impossivel de verificar o seu valor
console.log('symbols', Object.getOwnPropertySymbols(user)) //aqui podemos ver o symbol dentro do objeto pq definimos na linha 5

assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey)

//byPass, uma má pratica
user[Symbol.for('password')] = 123
assert.deepStrictEqual(user[Symbol.for('password')], 123) //isso n daria certo se estivessemos usando o symbol da maneira correta, visto que o symbol cria uma referencia de memoria unica para uma propriedade

const items = [0,0,0,0]

const obj = {
  [Symbol.iterator]: () => ({
    items: [1,2,3,4,5],
    next() {
      return {
        done: this.items.length === 0,
        value: this.items.pop()
      }
    } 
  })
}

for(let value of obj) {
  console.log(value)
}

assert.deepStrictEqual([...obj].toString(), [5,4,3,2,1].toString())

const kItems = Symbol('kItems')

class MyDate {
  constructor(...args) {
    this[kItems] = args.map(arg => new Date(...arg))
  }
  get [Symbol.toStringTag]() { // para alterar um symbol de dentro do node.js precisamos acessar via get
    return 'hii'
  }
  [Symbol.toPrimitive](coercionType) {
    console.log('entrou no coercionType ', coercionType)
    if(coercionType !== 'string') throw new TypeError()
      
    const items = this[kItems].map(item => new Intl.DateTimeFormat('pt-BR', {month: 'long', day: '2-digit', year: 'numeric'}).format(item))
    return new Intl.ListFormat('pt-BR', {style: 'long', type: 'conjunction'}).format(items)
  }
}

const myDate = new MyDate(
  [2020,3, 1],
  [2018,2,2]
)

const expectedDates = [
  new Date(2020,3, 1),
  new Date(2018,2,2)
]

console.assert(myDate[kItems].toString() === expectedDates.toString())

assert.deepStrictEqual(Object.prototype.toString.call((myDate), null), '[object hii]') //troquei na linha 53 o comportamento
assert.throws(() => myDate + 1 , TypeError)
assert.deepStrictEqual(String(myDate), '01 de abril de 2020 e 02 de março de 2018')