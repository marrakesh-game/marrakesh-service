import { Request, Response } from 'express'
import { isReady } from '../lib/mongo'
import { OK, INTERNAL_SERVER_ERROR } from 'http-status-codes'
export default class ReadinessController {
  isReady = async (req: Request, res: Response) => {
    const mongoReady = await isReady()
    res.status(mongoReady ? OK : INTERNAL_SERVER_ERROR).send({
      isReady: mongoReady
    })
  }
}
