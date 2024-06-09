const TextProcessorFluentApi = require("./textProcessorFluentAPI")

class TextProcessorFacade {
  #textProcessorFluentAPI
  
  constructor(text) {
    this.#textProcessorFluentAPI = new TextProcessorFluentApi(text)
  }
  
  getPeopleFromPDF() {
    return this.#textProcessorFluentAPI
    .extractPeopleData()
    .divideTextInColumns()
    .removeEmptyCharacters()
    .mapPerson()
    .build()
  }
}

module.exports = TextProcessorFacade