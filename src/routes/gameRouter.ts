import { Router, json } from 'express'
import * as gameController from '../controllers/gameController'

const jsonBodyParser = json({ limit: '100kb' })

const games = Router()

games
  .route('/')
  .get(gameController.getGames)
  .post(jsonBodyParser, gameController.startNewGame)

export default games
