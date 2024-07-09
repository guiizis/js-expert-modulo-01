import { expect, test, describe, jest, beforeEach } from '@jest/globals'
import RickAndMortyBRL from '../../src/business/integration/rickAndMortyBRL.js'
import RickAndMortyBRLAdapter from '../../src/business/adapters/rickAndMortyBRLAdapter.js'

describe('RickAndMortyBRLAdapter', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test.todo('getCharacters should be an adapter to rickAndMortyBRL')

  it('getCharacters should be an adapter to rickAndMortyBRL', async() => {
        const brlIntegration = jest.spyOn(
          RickAndMortyBRL,
          'getCharactersFromJson'
        ).mockResolvedValueOnce([])

        const result = await RickAndMortyBRLAdapter.getCharacters()

        expect(result).toEqual([])
        expect(brlIntegration).toHaveBeenCalled()
  });
  
})