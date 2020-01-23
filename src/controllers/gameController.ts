import { Request, Response } from 'express'
import * as Joi from 'joi'
import Game from '../models/game'
import GameRepository from '../repositories/gameRepository'

const startNewGameSchema = Joi.object().keys({
  numberOfPlayers: Joi.number().min(2).max(2).required()
})

const getGames = async (req: Request, res: Response) => {
  const games = await GameRepository.newGameRepository(req.db()).findAllGames()

  res.status(200).send(games)
}

const startNewGame = async (req: Request, res: Response) => {
  const validationResult = startNewGameSchema.validate(req.body)
  if (validationResult.error) {
    return res.sendStatus(400)
  }

  const game = Game.newGame(validationResult.value)
  await GameRepository.newGameRepository(req.db()).storeGame(game)

  res.setHeader('Location', `${req.originalUrl}/${game.id}`)
  res.sendStatus(200)
}

const getGameById = async (req: Request, res: Response) => {
  // todo

}

export {
  getGames,
  startNewGame,
  getGameById
}