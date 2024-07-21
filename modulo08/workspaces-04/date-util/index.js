import StringUtil from '@guiziis/string-util'

const yymmdd = /(?<year>\d{4}).(?<month>\d{2}).(?<day>\d{2})/g
const ddmmyy = /(?<day>\d{2}).(?<month>\d{2}).(?<year>\d{4})/g


const availableFormats = {
  'dd-mm-yyyy': '$<day>-$<month>-$<year>',
  'yyyy-mm-dd': '$<year>-$<month>-$<day>',
  'dd/mm/yyyy': '$<day>/$<month>/$<year>',
}

const stringToDate = {
  'dd-mm-yyyy': ddmmyy,
  'yyyy-mm-dd': ddmmyy,
  'dd/mm/yyyy': yymmdd,
}

export default class DateUtil {
  static formatDate(date, format) {
    if (!Object.keys(availableFormats).includes(format)) {
      return {
        error: 'the format is not available yet'
      }
    }

    const exp = availableFormats[format]
    const [result] = date.toISOString().match(yymmdd)
    return result.replace(yymmdd, exp)
  }

  static formatString(date, currentFormat, expectedFormat) {
    if(StringUtil.isEmpty(date)) {
      return {
        error: 'your date is empty'
      }
    }
    if(!Object.keys(availableFormats).includes(currentFormat) || !Object.keys(availableFormats).includes(expectedFormat)) {
      return {
        error: 'the format is not available yet'
      }
    }

    const toDateExp = stringToDate[currentFormat]
    const dateStr = StringUtil
                    .removeEmptySpaces(date)
                    .replace(toDateExp, '$<year>-$<month>-$<day>')
    const dateFormatted = new Date(dateStr)

    return this.formatDate(dateFormatted, expectedFormat)
  }
}