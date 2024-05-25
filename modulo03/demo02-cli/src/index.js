import database from '../database.json' assert { type: 'json' }
import Person from './person.js'
import TerminalController from './terminalController.js'

const STOP_TERM = ':q'
const DEFAULT_LANGUAGE = 'pt-BR'

const terminalController = new TerminalController()
terminalController.initializeTerminal(database, DEFAULT_LANGUAGE)

async function mainLoop() {
  try {
    const answer = await terminalController.question('[adicione os valores para: id, veiculos, kms viajados, quando começou e quando temrinou]')
    if (answer === STOP_TERM) {
      terminalController.closeTerminal()
      console.log('process finished')
      return
    }

    const person = Person.generateInstanceFromString(answer)
    return mainLoop()
  
  }catch(e) {
    console.error('an Error ocurred ', e)
    return mainLoop()
  }
}

await mainLoop()