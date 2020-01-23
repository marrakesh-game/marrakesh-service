import { Router } from 'express'
import HealthController from '../controllers/healthController'

const controller = new HealthController()
const health = Router()

health.route('/').get(controller.healthStatus)

export default health
