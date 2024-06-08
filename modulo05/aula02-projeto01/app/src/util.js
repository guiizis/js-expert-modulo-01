const safeRegex = require('safe-regex')

class InvalidRegexError extends Error{
  constructor(exp) {
    super(`this ${exp} is unsafe dude`)
    this.name = "InvalidRegexError"
  }
}

const evaluatedRegex = (exp) => {
  const isSafe = safeRegex(exp)
  if(isSafe) return exp

  throw new InvalidRegexError(exp)
}

module.exports = {InvalidRegexError, evaluatedRegex}