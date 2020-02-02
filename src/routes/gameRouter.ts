import { Router, json } from 'express'
import * as gameController from '../controllers/gameController'
import { withDb } from '../lib/mongo'

const jsonBodyParser = json({ limit: '100kb' })

const games = Router()

games.use(withDb)
games
  .route('/')
  .get(gameController.getGames)
  .post(jsonBodyParser, withDb, gameController.startNewGame)

games
  .route('/:id')
  .get(gameController.getGameById)

export default games
