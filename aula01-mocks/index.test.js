const { error } = require("./src/constants")
const File = require("./src/files")
const assert = require("assert")

;(async () => {
  {
    const filePath = './mocks/emptyFile-invalid.csv'
    const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await assert.rejects(result, expected)
  }

  {
    const filePath = './mocks/emptyHeader-invalid.csv'
    const expected = new Error(error.FILE_FIELDS_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await assert.rejects(result, expected)
  }

  {
    const filePath = './mocks/fiveItems-invalid.csv'
    const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await assert.rejects(result, expected)
  }

  {
    const filePath = './mocks/threeItems-valid.csv'
    const expected = [
      {
        id:1,
        name: 'teste',
        profession: 'teste',
        age: 25
      },
      {
        id:2,
        name: 'teste',
        profession: 'teste',
        age: 30
      }
    ]
    const result = await File.csvToJson(filePath)
    assert.deepEqual(expected, result)
  }

})()
