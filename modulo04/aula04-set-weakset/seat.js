const assert = require('assert')

// sets são usados na maioria das vzs para listas de valores unicos

const arr1 = ['1', '2', '3']
const arr2 = ['0', '1', '2']
const arr3 = arr1.concat(arr2)

console.log(arr3.sort())
// para nao termos duplicatas precisariamos de algo como
const arr4 = arr3.filter((element, index, array) => array.indexOf(element) === index);
console.log(arr4);

assert.deepStrictEqual(arr3.sort(), [ '0', '1', '1', '2', '2', '3' ])

// bem mais facil
const set = new Set([...arr3])
console.log('set', Array.from(set))

assert.deepStrictEqual(Array.from(new Set([...arr3])), [ '0', '1', '2', '3' ])

console.log('set.keys', set.keys())
console.log('set.values', set.values()) // retorna o mesmo resultado que a linha de cima, mas o ponto é, esse recurso existe apenas para manter uma compatibilidade com o map

assert.ok(set.has('0'))

// como saber se tem nos dois sets

const user01 = new Set(['teste01', 'teste', 'teste00'])
const user02 = new Set(['teste03', 'teste', 'teste04'])

const intersection = new Set([...user01].filter(el => user02.has(el)))
console.log(Array.from(intersection))

assert.deepStrictEqual(Array.from(intersection), ['teste'])

const deference = new Set([...user01, ...user02].filter(el => !user02.has(el) || !user01.has(el)))
assert.deepStrictEqual(Array.from(deference), ['teste01', 'teste00', 'teste03', 'teste04'])