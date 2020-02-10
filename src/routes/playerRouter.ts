import { Router, json } from 'express'
import * as playerController from '../controllers/playerController'
import { withDb } from '../lib/mongo'

const jsonBodyParser = json({ limit: '100kb' })

const players = Router()

players.use(withDb)
players
  .route('/')
  .get(playerController.getPlayers)
  .post(jsonBodyParser, withDb, playerController.createNewPlayer)

players
  .route('/:id')
  .get(playerController.getPlayerById)
  .delete(playerController.deletePlayerById)

export default players
