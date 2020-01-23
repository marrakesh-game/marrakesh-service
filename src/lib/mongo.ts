import { MongoClient, MongoClientOptions, Db } from 'mongodb'
import newLogger from '../lib/logger'
import { Request, Response, NextFunction } from 'express'
const logger = newLogger(__filename)

let db: Db
let client: MongoClient

const getDb = () => db
const getClient = () => client

const disconnect = async () => {
  if (client) {
    await client.close()
  }
}

const connect = async (url: string, options?: MongoClientOptions) => {
  logger.info('Connecting to ' + url)
  client = new MongoClient(url, options)
  await client.connect()
  db = client.db('marrakesh')
}

const isHealthy: () => Promise<boolean> = async () => {
  try {
    if (!getClient() || !getClient().isConnected()) {
      return false
    }

    const cursor = getClient().db('local').collection('startup_log').find({})
    return null !== await cursor.next()
  }
  catch (e) {
    logger.error(e.message)
    return false
  }
}

const withDb = (req: Request, res: Response, next: NextFunction) => {
  req.db = getDb

  next()
}

export {
  isHealthy,
  connect,
  disconnect,
  getDb,
  getClient,
  withDb
}