import { expect, test, describe, jest, beforeEach } from '@jest/globals'
import RickAndMortyBRL from '../../src/business/integration/rickAndMortyBRL.js';
import fs from 'fs/promises'
import Character from '../../src/entities/character.js';
import axios from 'axios';
import RickAndMortyUSA from '../../src/business/integration/rickAndMortyUSA.js';

describe('RickAndMortyBRL', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test.todo('getCharacterXML should return a list of Character List')
  test.todo('getCharacterXML should return an empty list if API returns nothing')

  it('getCharacterXML should return a list of Character List', async () => {
    const response = await fs.readFile('./test/mocks/characters.xml')
    const expected = [{
      "gender": "Male", "id": 10, "location": "Worldender's lair", "name": "Alan Rails", "origin": "unknown", "species": "Human", "status": "Dead", "type":
        "Superhuman (Ghost trains summoner)"
    }]

    jest.spyOn(axios, 'get').mockReturnValueOnce({ data: response })

    const result = await RickAndMortyUSA.getCharactersFromXML()

    expect(result).toMatchObject(expected)
  });

  it('getCharacterXML should return an empty list if API returns nothing', async () => {
    const response = await fs.readFile('./test/mocks/characters-empty.xml')
    const expected = []

    jest.spyOn(axios, 'get').mockReturnValueOnce({ data: response })

    const result = await RickAndMortyUSA.getCharactersFromXML()

    expect(result).toStrictEqual(expected)
  });
})