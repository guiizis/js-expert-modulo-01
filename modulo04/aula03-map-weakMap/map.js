const assert = require('assert')
const myMap = new Map()

myMap
  .set(1, 'one')
  .set('Teste', {text: 'two'})
  .set(true, () => 'three')

  const myMapConstructor = new Map([
    ['1', 'num1'],
    ['2', 'num2'],
    [true, 'num3'],
  ])


  assert.deepStrictEqual(myMap.get(1), 'one')
  assert.deepStrictEqual(myMap.get('Teste'), {text: 'two'})
  assert.deepStrictEqual(myMap.get(true)(), 'three')
 

  // Em objects a chave só pode ser string ou symbol (number é coergido para string)
const onlyReferencesWorks = {id: 1}
myMap.set(onlyReferencesWorks,  {name: 'teste'}) //aqui estamos atribuindo o obj como chave, ou seja....estamos passando a referencia da memoria do objeto

console.log('test', myMap.get({id: 1})) //vai voltar undefined
console.log('test', myMap.get(onlyReferencesWorks)) //vai voltar por conta de ele procurar por referencia

assert.deepStrictEqual(myMap.get({id: 1}), undefined)
assert.deepStrictEqual(myMap.get(onlyReferencesWorks), {name: 'teste'})

//utilitarios
// no object para retornar o tamanho usamos o Object.keys.length
assert.deepStrictEqual(myMap.size, 4)

// no object para validarmos se uma propriedade existe precisamos utilizar o hasOwnProperty
assert.deepStrictEqual(myMap.has(onlyReferencesWorks),  true)

// para remover um item do objeto usamos o delete
assert.ok(myMap.delete(onlyReferencesWorks))

// nao da para iterar um object diretamente
assert.deepStrictEqual([...myMap].toString(), [[ 1, 'one' ],[ 'Teste', { text: 'two' } ],[ true, [() => 'three'] ]].toString())

for ([key, value] of myMap) {
  console.log('value', value)
}

// o object pode ser inseguro visto que podemos alterar o comportamento padrao
// exemplo
// o object pode ter suas funcionalidades sobrescritas por exemplo o toString
// ({}).toString => [object Object] comportamento default
// mas se tivermos uma funcao toString dentro desse object? ela sera sobreEscrita
// ({toStrig: () => 'heyyy'}) => [object heyyy]

const actor = {
  name: 'teste',
  toString: 'hii test'
}

myMap.set(actor) //setando o objeto como a chave para um valor
assert.ok(myMap.has(actor))
assert.throws(() => myMap.get(actor).toString, TypeError)

// no Objeto para limparmos ele, precisamos passar prop por prop e dar undefined
myMap.clear() // limpei todas as chaves
assert.deepStrictEqual([...myMap.keys()], []) 