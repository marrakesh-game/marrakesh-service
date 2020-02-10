import { Configuration, DisconnectFunction, Handlers } from '../../src/lib/sigTermHandlers'
import { any, stringContaining } from 'expect'
import Logger from 'bunyan'

jest.mock('bunyan')

describe('the sig term handler lib', () => {
  let mockLogger: Logger, init: (configuration: Configuration) => Handlers

  beforeEach(() => {
    mockLogger = {
      info: jest.fn(),
      warn: jest.fn()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any as Logger

    jest.mock('../../src/lib/logger', () => () => mockLogger)

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const sigTermHandlers = require('../../src/lib/sigTermHandlers')
    init = sigTermHandlers.default
  })

  it('should return the handlers when calling init', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const handlers = init({ disconnect: async () => { } })

    expect(handlers.onSignal).toEqual(any(Function))
    expect(handlers.onShutdown).toEqual(any(Function))
  })

  describe('when calling the init function', () => {
    let onShutdown: () => Promise<void>, onSignal: () => Promise<void>, mockDisconnect: DisconnectFunction, mockDisconnectExceptionHandler

    beforeEach(() => {
      mockDisconnectExceptionHandler = jest.fn()
      mockDisconnect = jest.fn().mockReturnValue({ catch: mockDisconnectExceptionHandler })
      const handlers = init({ disconnect: mockDisconnect })
      onShutdown = handlers.onShutdown
      onSignal = handlers.onSignal
    })

    describe('when calling sigint', () => {
      it('should disconnect', async () => {
        await onSignal()

        expect(mockDisconnect).toHaveBeenCalled()
      })

      it('should ignore disconnect errors', async () => {
        const error = new Error('boom');
        (mockDisconnect as jest.Mock).mockRejectedValue(error)

        await onSignal()

        expect(mockLogger.warn).toHaveBeenCalledWith(stringContaining('boom'))
      })
    })

    describe('when calling shutdown', () => {
      it('should log an information', async () => {
        await onShutdown()

        expect(mockLogger.info).toHaveBeenCalledWith('Shutting down')
      })
    })
  })
})
