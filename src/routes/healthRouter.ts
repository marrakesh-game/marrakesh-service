import { Router } from 'express'
import os from 'os'

const health = Router()

health.route('/').get((req, res) =>
  res.status(200).send({
    hostname: os.hostname(),
    upForSeconds: Math.floor(process.uptime())
  })
)

export default health
