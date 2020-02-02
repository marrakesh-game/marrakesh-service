import { Request, Response } from 'express'
import { isHealthy } from '../lib/mongo'

export default class ReadinessController {
  isReady = async (req: Request, res: Response) => {
    res.status(200).send({
      isReady: await isHealthy()
    })
  }
}
