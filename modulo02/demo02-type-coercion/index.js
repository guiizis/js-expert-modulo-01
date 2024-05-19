9999999999999999 //16 numeros 9 vai resultar para o js 100000000
true + 2 //vai resultar em 3
'21' + true //vai resultar 21true
'21' - true //vai resutar em 20 ç.ç
'21' - - 1 //vai resultar em 22
0.1 + 0.2 === 0.3 //vai dar false, pq o resultado vai ser 0.3000000004
3 > 2 > 1 //vai dar false
3 > 2 >= 1 //ai sim vai dar true

"B" + "a" + + "a" + "a" //BaNaNa

'1' == 1 //true
'1' === 1 //false

// ------

console.assert(String(123) === '123', 'deep equal equality')
console.assert(123 + '' === '123', 'implicit conversion to string')

if(null || 1) {
  console.log('teste')
}

// quando existem duas afirmações verdadeiras no OR, o js sempre retorna a primeira que deu true
if('teste' || 1) {
  console.log('teste 2')
}

console.assert('assert' || true === 'assert', '|| always returns the first true value')
console.assert('assert' && true === true, '&& always returns the last true value')

// ------

//alterando os prototypes das funções dos objetos
const item = {
  name: 'teste',
  age: 16,
  toString(){
    // string: chamada primeiro quando o valor da conversão não for primitivo (exemplo: quando o valor é chamado junto com um concat), 
    // se nao ele vai chamar o valueOf
    return `Name ${this.name}, Age ${this.age}`
  },
  valueOf() {
    // chamado primeiro quando o valor da conversão é primitivo (exemplo: uma função de soma)
    return 7
  },
  [Symbol.toPrimitive](coercionType) {
    console.log('trying to convert to ', coercionType)
    const types = {
      string: JSON.stringify(this),
      number: '007'
    }

    return types[coercionType] || types.string
  }
}

// o valor vai ser 7
// console.log(item + 0)
// console.log(Number(item))

// o valor vai ser 160
// console.log(''.concat(item) + '0')
// console.log(String(item))

// console.log('String', String(item))
// console.log('Number', Number(item))
// console.log('Date', new Date(item))

console.assert(Number(item) + 0 === 7, 'calls value of primitive type')
console.assert(item + 0 === `{"name":"teste","age":16}0`, 'calls value of default type')
console.assert(!!item)
console.assert('Ae'.concat(item) === 'Ae{"name":"teste","age":16}')
console.assert(item == String(item))
