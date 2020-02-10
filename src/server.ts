import errorHandler from 'errorhandler'
import appFactory from './app'
import { createTerminus } from '@godaddy/terminus'
import { connect, disconnect } from './lib/mongo'
import { hostname } from 'os'
import newLogger from './lib/logger'
import sigTermHandlers from './lib/sigTermHandlers'
import express from 'express'
const { onShutdown, onSignal } = sigTermHandlers({
  disconnect
})
const logger = newLogger(__filename)

const app = appFactory(express)
app.use(errorHandler())

connect()
  .then((db) => logger.info(`Connected to mongodb '${db.databaseName}'`))
  .catch((e) => {
    logger.error(e)
    process.exit(1)
  })

const server = app.listen(app.get('port'))
logger.info(
  `Server running on ${hostname()}:${app.get('port')} in mode "${app.get(
    'env'
  )}"`
)
createTerminus(server, {
  signal: 'SIGINT',
  timeout: 5000,
  onSignal,
  onShutdown
})

export default server
