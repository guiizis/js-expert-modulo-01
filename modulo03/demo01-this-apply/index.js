'use strict'

const {watch, promises: {readFile}} = require('fs')

// watch(__filename, async (event, filename) => {
//   console.log(((await readFile(filename)).toString()))
// })

class File {
  watch(event, filename) {
    console.log('arguments', Array.prototype.slice.call(arguments))
    this.showContent(filename)
  }

  async showContent(filename) {
    console.log(((await readFile(filename)).toString()))
  }
}

const file = new File()
// dessa maneira nao vai rolar, o this do watch vai ser chamado e nao do File, funções normais não preservam escopo
// watch(__filename, file.watch)

// ja funcoes arrow preservam o this
// watch(__filename, (event, filename) => file.watch(event, filename))

// podemos deixar explicito o contexto
// watch(__filename, file.watch.bind(file))

//outra maneira é com o .call, ele meio que moca a função com o que é passado no call
file.watch.call({showContent: () => console.log('teste')}, null, __filename)
// o apply é identico ao call, só muda que consigo passar os parametros via array
// file.watch.apply({showContent: () => console.log('teste')}, [null,__filename])
