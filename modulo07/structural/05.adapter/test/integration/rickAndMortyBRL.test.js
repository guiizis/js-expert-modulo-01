import { expect, test, describe, jest, beforeEach } from '@jest/globals'
import RickAndMortyBRL from '../../src/business/integration/rickAndMortyBRL.js';
import fs from 'fs/promises'
import Character from '../../src/entities/character.js';
import axios from 'axios';

describe('RickAndMortyBRL', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test.todo('getCharacterJson should return a list of Character List')
  test.todo('getCharacterJson should return an empty list if API returns nothing')

  it('getCharacterJson should return a list of Character List', async() => {
    const response = JSON.parse(await fs.readFile('./test/mocks/characters.json'))
    const expected = response.results.map(char => new Character(char))
    
    jest.spyOn(axios, 'get').mockReturnValueOnce({data: response})

    const result = await RickAndMortyBRL.getCharactersFromJson()

    expect(result).toStrictEqual(expected)
  });

  it('getCharacterJson should return an empty list if API returns nothing', async() => {
    const response = JSON.parse(await fs.readFile('./test/mocks/characters-empty.json'))
    const expected = response.results
    
    jest.spyOn(axios, 'get').mockReturnValueOnce({data: response})

    const result = await RickAndMortyBRL.getCharactersFromJson()

    expect(result).toStrictEqual(expected)
  });
})