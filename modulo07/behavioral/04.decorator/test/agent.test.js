import { jest, test, beforeEach, describe } from '@jest/globals'
import { InjectHttpInterceptor } from '../src/agent.js'
import { Server } from 'http'

const originalHttp = jest.createMockFromModule('http')

describe('Http Interceptor Agent', () => {
  const eventName = 'request'
  const request = null

  beforeEach(() => jest.clearAllMocks())

  test.todo('should not change header')
  test.todo('should activate header interceptor')

  it('should not change header', () => {
    const response = {
      setHeader: jest.fn().mockReturnThis()
    }

    const serverInstance = new originalHttp.Server()
    serverInstance.emit(eventName, request, response)

    expect(response.setHeader).not.toHaveBeenCalled()
  });

  it('should activate header interceptor', async () => {
    await InjectHttpInterceptor()

    const response = {
      setHeader: jest.fn().mockReturnThis()
    }

    const serverInstance = new Server()
    serverInstance.emit(eventName, request, response)

    expect(response.setHeader).toHaveBeenCalledWith('x-made-by', 'test')
  });
  
  
})