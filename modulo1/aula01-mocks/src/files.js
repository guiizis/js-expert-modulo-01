const { readFile } = require('fs/promises')
const { error } = require('./constants')
const DEFAULT_OPTION = {
  maxLines: 3,
  fields: ["id", "name", "profession", "age"]
}

class file {
  static async csvToJson(filePath) {
    const content = await readFile(filePath, 'utf-8')
    const validation = this.isValid(content)

    if (!validation.valid) {
      throw new Error(validation.error)
    }

    return this.parseCSVToJson(content)
  }

  static isValid(csvString, options = DEFAULT_OPTION) {
    const [headers, ...fileWithoutHeader] = csvString.split(/\r?\n/)

    if (!fileWithoutHeader.length || fileWithoutHeader.length > options.maxLines) {
      return {
        error: error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false
      }
    }

    if (headers !== options.fields.join(',')) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false
      }
    }

    return {
      valid: true
    }
  }

  static parseCSVToJson(csv) {
    const lines = csv.split(/\r?\n/)
    const firstLine = lines.shift()
    const header = firstLine.split(',')

    const users = lines.map((line) => {
      const columns = line.split(',')
      const user = {}

      for(const colum in columns) {
        user[header[colum]] = columns[colum]
      }

      return user
    })

    return users
  }
}

module.exports = file