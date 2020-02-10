import newLogger from '../../src/lib/logger'
import uuid from 'uuid/v4'

describe('the ', () => {
  afterEach(() => {
    delete process.env.REVISON
  })

  it('should return a logger with the given name', () => {
    const logger = newLogger('aName')

    expect(logger.fields.name).toEqual('aName')
  })

  it('should set the revision field from the environment', () => {
    process.env.REVISON = uuid()

    const logger = newLogger('aName')

    expect(logger.fields.revision).toEqual(process.env.REVISON)
  })

  it('should set the revision field to n/a per default', () => {
    const logger = newLogger('aName')

    expect(logger.fields.revision).toEqual('n/a')
  })
})
