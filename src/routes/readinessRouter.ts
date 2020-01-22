import { Router } from 'express'

const ready = Router()

ready.route('/').get((req, res) => res.sendStatus(200))

export default ready
