/* eslint-disable @typescript-eslint/no-explicit-any */
import { ParamsDictionary } from 'express-serve-static-core'
import { Request, Response } from 'express'
import GameRepository from '../../src/repositories/gameRepository'
import { getGameById } from '../../src/controllers/gameController'
import { Db, Collection } from 'mongodb'
import { OK, NOT_FOUND } from 'http-status'
import Game from '../../src/models/game'
import TileBag from '../../src/models/tileBag'

import uuid from 'uuid/v4'
import { objectContaining } from 'expect'
jest.mock('../../src/repositories/gameRepository')

describe('the controller', () => {
  let mockGameRepository: GameRepository, mockDb: Db, mockCollection: Collection, request: Request, response: Response

  beforeEach(() => {
    const params = {
      id: null
    } as ParamsDictionary
    request = {
      params,
      db: () => mockDb
    } as any as Request
    response = {
      status: jest.fn().mockReturnThis(),
      sendStatus: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    } as any as Response

    mockCollection = {
    } as any as Collection

    mockDb = {
      collection: () => mockCollection
    } as any as Db

    mockGameRepository = new GameRepository(mockCollection);
    (GameRepository.newGameRepository as jest.Mock).mockReturnValue(mockGameRepository)
  })

  describe('when looking up a game by id', () => {
    describe('and the game is found', () => {
      let game: Game, gameId: string

      beforeEach(() => {
        gameId = uuid()
        request.params.id = gameId
        game = new Game(gameId, new TileBag([]));
        (mockGameRepository.findGameById as jest.Mock).mockResolvedValue(game)
      })

      it('should return the game', async () => {
        await getGameById(request, response)

        expect(response.send).toHaveBeenCalledWith(objectContaining({
          gameId: game.id
        }))
      })
      it('should send a status of 200', async () => {
        await getGameById(request, response)

        expect(response.status).toHaveBeenCalledWith(OK)
      })
    })
    describe('and the game is not found', () => {
      it('should send a status of 404', async () => {
        request.params.id = uuid();
        (mockGameRepository.findGameById as jest.Mock).mockResolvedValue(null)

        await getGameById(request, response)

        expect(response.sendStatus).toHaveBeenCalledWith(NOT_FOUND)
      })
    })
  })
})
