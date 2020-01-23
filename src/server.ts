import errorHandler from 'errorhandler'
import app from './app'
import { createTerminus } from '@godaddy/terminus'
import {
    connect, disconnect
} from './lib/mongo'
import { hostname } from 'os'
import newLogger from './lib/logger'

const logger = newLogger(__filename)

const { MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_SERVER } = process.env

app.use(errorHandler())

connect(`mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_SERVER}`,
    {
        useUnifiedTopology: true,
        connectTimeoutMS: 3000,
        socketTimeoutMS: 5000,
        logger
    })
    .then(() => logger.info(`Connected to mongodb as ${MONGODB_USERNAME} on ${MONGODB_SERVER}`))

const onSignal = async () => {
    logger.info('SIGINT received. Cleaning up')
    await disconnect()
}
const onShutdown = async () => {
    logger.info('Shutting down')
}

const server = app.listen(app.get('port'))
logger.info(`Server running on ${hostname()}:${app.get('port')} in mode "${app.get('env')}"`)
createTerminus(server, {
    signal: 'SIGINT',
    timeout: 5000,
    onSignal,
    onShutdown
})

export default server
