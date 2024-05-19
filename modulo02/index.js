const {deepStrictEqual} = require('assert')

let counter = 0
let counter2 = counter
counter2++
// counter2 sera 1 e counter vai permanecer 0
// isso se deve por conta de ser um tipo primitivio então os valores serão alocados na callStack

const item = { counter: 0 }
const item2 = item
item2.counter++
// aqui como o tipo já não é primitivo, a alocação ocorreu na memory Heap, que usa o endereço de memoria como parametro
// logo se eu alterar item2 item tbm sera alterado

deepStrictEqual(counter, 0)
deepStrictEqual(counter2, 1)

deepStrictEqual(item, {counter: 1})
deepStrictEqual(item2, {counter: 1})