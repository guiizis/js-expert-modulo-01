const assert = require('assert')

function* calculation(arg1, arg2) {
  yield arg1 * arg2
}

function* main() {
  yield 'hello'
  yield '-'
  yield 'world'
  yield* calculation(20, 10) // quando chamo uma função geradora com yield, eu perciso passar * junto, se n o js não vai executar e apenas adicionar ela na fila da memoria
}

const generator = main()
// console.log(generator.next())
// console.log(generator.next())
// console.log(generator.next())
// console.log(generator.next())

assert.deepStrictEqual(generator.next(), {value: 'hello', done: false})
assert.deepStrictEqual(generator.next(), {value: '-', done: false})
assert.deepStrictEqual(generator.next(), {value: 'world', done: false})
assert.deepStrictEqual(generator.next(), {value: 200, done: false})
assert.deepStrictEqual(generator.next(), {value: undefined, done: true})

console.log('Array.from', Array.from(main())) //como a funcao retorna uma lista, eu posso chamar o array.from e resolver todo os next's do generator
console.log('teste spread', [...main()])

assert.deepStrictEqual([...main()], ['hello', '-', 'world', 200])

// --- async operators

const {readFile, stat, readdir} = require('fs/promises')

function* promisified() {
  yield readFile(__filename)
  yield Promise.resolve('look at me')
}

// Promise.all([...promisified()]).then(data => {
//   console.log('promisified result', data)
// }) UMA DAS MANEIRAS DE RESOLVERMOS ESSE PROBLEMA DE QUANDO TEMOS FUNCOES GERADORAS COM ASYNC É USANDO AS PROMISES

// (async() => {
//   for await(const promise of promisified()) {
//     console.log(promise.toString())
//   }
// })()

async function* systemInfo() {
  const file = await readFile(__filename)
  yield {file: file.toString()}

  const { size } = await stat(__filename)
  yield  { size }

  const dir = await readdir(__filename)
  yield { dir }
}

(async() => {
  for await(const promise of systemInfo()) {
    console.log(promise)
  }
})()