import { Router } from 'express'
import ReadinessController from '../controllers/readinessController'
const controller = new ReadinessController()
const ready = Router()

ready.route('/').get(controller.isReady)

export default ready
