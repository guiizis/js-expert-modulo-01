class TextProcessorFluentApi {
  #content
  constructor(content) {
    this.#content = content
  }

  extractPeopleData() {
    const matchPerson = /(?<=[\bcontratante\b|\bcontratado\b|\bcontratada\b]:\s{1})(?!\s)(.*\n.*)$/gmi
    const onlyPeron = this.#content.match(matchPerson)
    this.#content = onlyPeron
    return this
  }

  build() {
    return this.#content
  }
}

module.exports = TextProcessorFluentApi