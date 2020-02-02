import errorHandler from 'errorhandler'
import app from './app'
import { createTerminus } from '@godaddy/terminus'
import { connect, disconnect } from './lib/mongo'
import { hostname } from 'os'
import newLogger from './lib/logger'
import sigTermHandlers from './lib/sigTermHandlers'
const { onShutdown, onSignal } = sigTermHandlers({
  disconnect
})
const logger = newLogger(__filename)

const { MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_SERVER } = process.env

app.use(errorHandler())

connect(`mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_SERVER}`,
  {
    // reconnectInterval: 10000,
    useUnifiedTopology: true,
    connectTimeoutMS: 3000,
    socketTimeoutMS: 5000
  })
  .then(() => logger.info(`Connected to mongodb as ${MONGODB_USERNAME} on ${MONGODB_SERVER}`))
  .catch((e) => console.error(e))

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
