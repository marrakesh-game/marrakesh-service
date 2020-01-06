import { Router } from 'express'
import * as gameController from '../controllers/gameController'
import bodyParser from 'body-parser'

const jsonBodyParser = bodyParser.json({ limit: '100kb' })

const games = Router()

games.route('/')
  .get(gameController.getGames)
  .post(jsonBodyParser, gameController.startNewGame)

export default games