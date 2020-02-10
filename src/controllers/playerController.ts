import { Request, Response } from 'express'
import * as Joi from 'joi'
import { OK, CREATED, NOT_FOUND, BAD_REQUEST } from 'http-status-codes'
import Player from '../models/player'
import PlayerRepository from '../repositories/playerRepository'
import { selfLink, deleteLink, newLink } from './link'

const getPlayerByIdSchema = Joi.object().keys({
  id: Joi.string()
    .uuid()
    .required()
})

const deletePlayerByIdSchema = Joi.object().keys({
  id: Joi.string()
    .uuid()
    .required()
})

const createPlayerSchema = Joi.object().keys({
  name: Joi.string()
    .min(5)
    .max(20)
    .required()
})

const halPlayer = (player: Player, baseUrl: string) => {
  const self = `${baseUrl}/${player.id}`
  const links = [
    selfLink(self),
    deleteLink(self)
  ]

  const result = {
    playerId: player.id,
    name: player.name,
    links
  }

  return result
}

const halPlayers = (players: Player[], baseUrl: string) => {
  const links = [
    selfLink(baseUrl),
    newLink(baseUrl)
  ]
  const result = {
    players: players.map(({ id, name }) => ({ id, name })),
    links
  }

  return result
}

const getPlayers = async (req: Request, res: Response) => {
  const players = await PlayerRepository.newPlayerRepository(req.db()).findAllPlayers()

  res.status(OK).send(halPlayers(players, req.baseUrl))
}

const createNewPlayer = async (req: Request, res: Response) => {
  const validationResult = createPlayerSchema.validate(req.body)
  if (validationResult.error) {
    return res.sendStatus(BAD_REQUEST)
  }
  const { name } = validationResult.value

  const player = Player.newPlayer(name)
  await PlayerRepository.newPlayerRepository(req.db()).storePlayer(player)

  const location = `${req.originalUrl}/${player.id}`
  res.setHeader('Location', location)

  res.status(CREATED).send(halPlayer(player, req.originalUrl))
}

const getPlayerById = async (req: Request, res: Response) => {
  const validationResult = getPlayerByIdSchema.validate(req.params)
  if (validationResult.error) {
    return res.sendStatus(BAD_REQUEST)
  }
  const { id } = validationResult.value

  const repo = PlayerRepository.newPlayerRepository(req.db())

  const player = await repo.findPlayerById(id)
  if (!player) {
    return res.sendStatus(NOT_FOUND)
  }

  res.status(OK).send(halPlayer(player, req.baseUrl))
}

const deletePlayerById = async (req: Request, res: Response) => {
  const validationResult = deletePlayerByIdSchema.validate(req.params)
  if (validationResult.error) {
    return res.sendStatus(BAD_REQUEST)
  }
  const { id } = validationResult.value

  const repo = PlayerRepository.newPlayerRepository(req.db())

  const player = await repo.findPlayerById(id)
  if (!player) {
    return res.sendStatus(NOT_FOUND)
  }
  await repo.deletePlayerById(player.id)
  res.sendStatus(OK)
}

export { getPlayers, createNewPlayer, getPlayerById, deletePlayerById }
