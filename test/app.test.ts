/* eslint-disable @typescript-eslint/no-explicit-any */
import { Express } from 'express'
import gameRouter from '../src/routes/gameRouter'
import health from '../src/routes/healthRouter'
import ready from '../src/routes/readinessRouter'

describe('the app', () => {
  let mockExpress: Express
  const appFactory = require('../src/app').default

  beforeEach(() => {
    delete process.env.PORT

    mockExpress = {
      route: jest.fn(),
      use: jest.fn(),
      set: jest.fn()
    } as any as Express
  })

  it('should register the hello route', () => {
    appFactory(() => mockExpress)

    expect(mockExpress.use).toHaveBeenCalledWith('/games', gameRouter)
  })
  it('should register the health route', () => {
    appFactory(() => mockExpress)

    expect(mockExpress.use).toHaveBeenCalledWith('/probes/health', health)
  })

  it('should register the ready route', () => {
    appFactory(() => mockExpress)

    expect(mockExpress.use).toHaveBeenCalledWith('/probes/ready', ready)
  })

  it('should set the application port from the env', () => {
    process.env.PORT = '1234'

    appFactory(() => mockExpress)

    expect(mockExpress.set).toHaveBeenCalledWith('port', 1234)
  })

  it('should use a default port if none is specified', () => {
    appFactory(() => mockExpress)

    expect(mockExpress.set).toHaveBeenCalledWith('port', 3000)
  })

  it('should return the application', () => {
    const app = appFactory(() => mockExpress)

    expect(app).toBeDefined()
  })
})
