import axios from 'axios'
import Character from '../../entities/character.js'
import API from '../../env.js'

const URL = API.json

export default class RickAndMortyBRL {
  static async getCharactersFromJson()  {
    const { data: {results = []} } = axios.get(URL)
    return results.map(data => new Character(data))
  }
}