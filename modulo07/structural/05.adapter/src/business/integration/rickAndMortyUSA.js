import axios from "axios"
import { parseStringPromise } from 'xml2js'
import Character from "../../entities/character.js"
import API from '../../env.js'

const URL = API.xml

export default class RickAndMortyUSA {
  static async getCharactersFromXML()  {
    const { data } = await axios.get(URL)
    const options = {
      explicitRoot: false,
      explicitArray: false
    }

    const {results: {element: results = []}} = await parseStringPromise(data, options)
    const defaultFormat = Array.isArray(results) ? results : [results]
    return defaultFormat.map(char => new Character(char))
  }
}