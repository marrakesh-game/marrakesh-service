import { Request, Response } from 'express'
import * as Joi from 'joi'

const startNewGameSchema = Joi.object().keys({
  numberOfPlayers: Joi.number().min(2).max(2)
})

const getGames = (req: Request, res: Response) => {
  res.sendStatus(200)
}

const startNewGame = (req: Request, res: Response) => {
  const validationResult = startNewGameSchema.validate(req.body)
  if (validationResult.error) {
    return res.sendStatus(400)
  }
  res.status(200).send(validationResult.value)
}

export {
  getGames,
  startNewGame
}