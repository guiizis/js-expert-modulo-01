import { expect, test, describe, jest, beforeEach } from '@jest/globals'
import RickAndMortyUSA from '../../src/business/integration/rickAndMortyUSA.js'
import RickAndMortyUSAAdapter from '../../src/business/adapters/rickAndMortyUSAAdapter.js'

describe('RickAndMortyUSAAdapter', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test.todo('getCharacters should be an adapter to rickAndMortyUSA')

  it('getCharacters should be an adapter to rickAndMortyUSA', async() => {
        const usaIntegration = jest.spyOn(
          RickAndMortyUSA,
          'getCharactersFromXML'
        ).mockResolvedValueOnce([])

        const result = await RickAndMortyUSAAdapter.getCharacters()

        expect(result).toEqual([])
        expect(usaIntegration).toHaveBeenCalled()
  });
  
})