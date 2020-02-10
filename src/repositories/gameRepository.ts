import { Db, Collection } from 'mongodb'
import Game from '../models/game'

class GameRepository {
  constructor (readonly collection: Collection) {}

  findGameById (id: string) {
    return this.collection.findOne({ id })
  }

  deleteGameById (id: string) {
    return this.collection.deleteOne({ id })
  }

  storeGame (game: Game) {
    this.collection.insertOne(game)
  }

  async findAllGames (): Promise<Game[]> {
    const cursor = this.collection.find({}, {
      limit: 100,
      projection: { id: true, gameState: true }
    })

    return cursor.toArray()
  }

  static newGameRepository (db: Db) {
    const collection = db.collection('games')

    return new GameRepository(collection)
  }
}

export default GameRepository
