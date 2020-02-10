import { Request, Response } from 'express'
import * as Joi from 'joi'
import { OK, CREATED, NOT_FOUND, BAD_REQUEST } from 'http-status-codes'
import Game, { GameState } from '../models/game'
import GameRepository from '../repositories/gameRepository'
import { builder, selfLink, deleteLink, Method } from './link'

const getGameByIdSchema = Joi.object().keys({
  id: Joi.string()
    .uuid()
    .required()
})

const deleteGameByIdSchema = Joi.object().keys({
  id: Joi.string()
    .uuid()
    .required()
})

const halGame = (game: Game, baseUrl: string) => {
  const self = `${baseUrl}/${game.id}`
  const links = [
    selfLink(self),
    deleteLink(self)
  ]
  if (game.gameState === GameState.NotStarted) {
    links.push(builder('addPlayer')(Method.Post)(`${self}/players`))
  }

  const result = {
    gameId: game.id,
    gameState: game.gameState,
    players: new Array<string>(),
    links
  }

  return result
}

const halGames = (games: Game[], baseUrl: string) => {
  const links = [
    selfLink(baseUrl)
  ]
  const result = {
    games: games.map(({ id, gameState }) => ({ id, gameState })),
    links
  }

  return result
}

const getGames = async (req: Request, res: Response) => {
  const games = await GameRepository.newGameRepository(req.db()).findAllGames()

  res.status(OK).send(halGames(games, req.baseUrl))
}

const startNewGame = async (req: Request, res: Response) => {
  const game = Game.newGame()
  await GameRepository.newGameRepository(req.db()).storeGame(game)

  const location = `${req.originalUrl}/${game.id}`
  res.setHeader('Location', location)

  res.status(CREATED).send(halGame(game, req.originalUrl))
}

const getGameById = async (req: Request, res: Response) => {
  const validationResult = getGameByIdSchema.validate(req.params)
  if (validationResult.error) {
    return res.sendStatus(BAD_REQUEST)
  }
  const { id } = validationResult.value

  const repo = GameRepository.newGameRepository(req.db())

  const game = await repo.findGameById(id)
  if (!game) {
    return res.sendStatus(NOT_FOUND)
  }

  res.status(OK).send(halGame(game, req.baseUrl))
}

const deleteGameById = async (req: Request, res: Response) => {
  const validationResult = deleteGameByIdSchema.validate(req.params)
  if (validationResult.error) {
    return res.sendStatus(BAD_REQUEST)
  }
  const { id } = validationResult.value

  const repo = GameRepository.newGameRepository(req.db())

  const game = await repo.findGameById(id)
  if (!game) {
    return res.sendStatus(NOT_FOUND)
  }
  await repo.deleteGameById(game.id)
  res.sendStatus(OK)
}

export { getGames, startNewGame, getGameById, deleteGameById }
