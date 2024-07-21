import {deepStrictEqual} from 'assert'
import DateUtil from './index.js'

{
  const format = 'dd-M-Y'
  const expected = {error: 'the format is not available yet'}
  const date = new Date(1990, 2 , 1)
  const result = DateUtil.formatDate(date, format)
  deepStrictEqual(expected, result)
}

{
  const expected = '01-12-1990'
  const format = 'dd-mm-yyyy'
  const date = new Date('1990-12-01')
  const result = DateUtil.formatDate(date, format)
  deepStrictEqual(result, expected)
}

{
  const expected = '01/12/1990'
  const format = 'dd/mm/yyyy'
  const date = new Date('1990-12-01')
  const result = DateUtil.formatDate(date, format)
  deepStrictEqual(result, expected)
}

{
  const expected = '1990-12-01'
  const format = 'yyyy-mm-dd'
  const date = new Date('1990-12-01')
  const result = DateUtil.formatDate(date, format)
  deepStrictEqual(result, expected)
}

//format string


{
  const date = ''
  const result = {error: 'your date is empty'}
  const expected = DateUtil.formatString(date)
  deepStrictEqual(result, expected)
}

{
  const date = {
    value: '1990-april-01',
    format: 'yyyy-M-dd'
  }

  const result = DateUtil.formatString(date.value, date.format)
  const expected = {error: 'the format is not available yet'}
  deepStrictEqual(result, expected)
}

{
  const date = {
    value: '1990-01-01',
    format: 'yyyy-mm-dd'
  }

  const expectedFormat = 'dd/M/yyyy'

  const result = DateUtil.formatString(date.value, date.format, expectedFormat)
  const expected = {error: 'the format is not available yet'}
  deepStrictEqual(result, expected)
}

{
  const date = {
    value: '1990-01-01',
    format: 'yyyy-mm-dd'
  }

  const expectedFormat = 'dd-mm-yyyy'

  const result = DateUtil.formatString(date.value, date.format, expectedFormat)
  const expected = '01-01-1990'
  deepStrictEqual(result, expected)
}
