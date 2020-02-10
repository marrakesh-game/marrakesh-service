import { MongoClient, Db } from 'mongodb'
import { Request, Response, NextFunction } from 'express'
import config from 'config'
import newLogger from '../lib/logger'

export interface MongoDbConfiguration {
  databaseName: string;
  connectionUrl: string;
}

const logger = newLogger(__filename)
const mongoDbConfig = config.get<MongoDbConfiguration>('mongoDb')

let db: Db
let client: MongoClient

const getDb = () => db

const getClient = () => client

const disconnect = async () => {
  if (client) {
    await client.close()
  }
}

const connect = async () => {
  const options = {
    useUnifiedTopology: true,
    connectTimeoutMS: 20000,
    socketTimeoutMS: 5000
  }

  logger.info('Connecting to mongo db ')

  client = new MongoClient(mongoDbConfig.connectionUrl, options)
  await client.connect()
  db = client.db(mongoDbConfig.databaseName)

  return db
}

const isReady: () => Promise<boolean> = async () => {
  try {
    if (!getClient() || !getClient().isConnected()) {
      return false
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (getDb().serverConfig as any).isConnected()
  } catch (e) {
    logger.error(e)

    return false
  }
}

const withDb = (req: Request, res: Response, next: NextFunction) => {
  req.db = getDb

  next()
}

export {
  isReady,
  connect,
  disconnect,
  getDb,
  getClient,
  withDb
}
