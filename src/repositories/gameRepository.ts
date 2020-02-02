import { Db, Collection } from 'mongodb'
import Game from '../models/game'

class GameRepository {
  constructor (readonly collection: Collection) {}

  findGameById (id: string) {
    return this.collection.findOne({ id })
  }

  storeGame (game: Game) {
    this.collection.insertOne(game)
  }

  findAllGames (): Promise<Game[]> {
    return this.collection.findOne({})
  }

  static newGameRepository (db: Db) {
    console.log('in the real thing')
    const collection = db.collection('games')

    return new GameRepository(collection)
  }
}

export default GameRepository
