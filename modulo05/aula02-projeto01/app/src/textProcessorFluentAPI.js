const Person = require("./person")
const { evaluatedRegex } = require("./util")

class TextProcessorFluentApi {
  #content
  constructor(content) {
    this.#content = content
  }

  extractPeopleData() {
    const matchPerson = evaluatedRegex(/(?<=[\bcontratante\b|\bcontratado\b|\bcontratada\b]:\s{1})(?!\s)(.*\n.*)$/gmi)
    //g => global, vai procurar no arquivo todo
    //m => multiline
    //i => insensitive
    const onlyPeron = this.#content.match(matchPerson)
    this.#content = onlyPeron
    return this
  }

  divideTextInColumns() {
    const splitRegex = evaluatedRegex(/,/)
    this.#content = this.#content.map(line => line.split(splitRegex))
    return this
  }
  removeEmptyCharacters() {
    const trimRegex = evaluatedRegex(/^\s+|\s+$|\n/g)
    this.#content = this.#content.map(line => line.map(item => item.replace(trimRegex, "")))
    return this
  }

  mapPerson() {
    this.#content = this.#content.map(line => new Person(line))
    return this
  }

  build() {
    return this.#content
  }
}

module.exports = TextProcessorFluentApi