import { Request, Response } from 'express'
import os from 'os'

export default class HealthController {
  healthStatus = async (req: Request, res: Response) => {
    res.status(200).send({
      hostname: os.hostname(),
      upForSeconds: Math.floor(process.uptime())
    })
  }
}
