import newLogger from './logger'
const logger = newLogger(__filename)

export type DisconnectFunction = () => Promise<void>
export interface Configuration {
  disconnect: DisconnectFunction;
}

export interface Handlers {
  onSignal: () => Promise<void>;
  onShutdown: () => Promise<void>;
}

const onSignal = (disconnect: DisconnectFunction) => async () => {
  logger.info('SIGINT received. Cleaning up')
  await disconnect().catch((e) => logger.warn('Could not disconnect cleanly due to: ' + e.message))
}
const onShutdown = async () => {
  logger.info('Shutting down')
}

const init: (configuration: Configuration) => Handlers = (configuration) => ({
  onSignal: onSignal(configuration.disconnect),
  onShutdown
})

export default init
