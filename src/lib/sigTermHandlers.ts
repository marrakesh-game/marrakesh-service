import newLogger from './logger'
const logger = newLogger(__filename)

type DisconnectFunction = () => Promise<void>
interface Configuration {
  disconnect: DisconnectFunction;
}

const onSignal = (disconnect: DisconnectFunction) => async () => {
  logger.info('SIGINT received. Cleaning up')
  await disconnect().catch((e) => logger.warn('Could not disconnect cleanly due to: ' + e.message))
}
const onShutdown = async () => {
  logger.info('Shutting down')
}

const init = (configuration: Configuration) => ({
  onSignal: onSignal(configuration.disconnect),
  onShutdown
})

export default init
