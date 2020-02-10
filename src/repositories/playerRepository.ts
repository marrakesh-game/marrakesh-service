import { Db, Collection } from 'mongodb'
import Player from '../models/player'

class PlayerRepository {
  constructor (readonly collection: Collection) {}

  findPlayerById (id: string) {
    return this.collection.findOne({ id })
  }

  deletePlayerById (id: string) {
    return this.collection.deleteOne({ id })
  }

  storePlayer (game: Player) {
    this.collection.insertOne(game)
  }

  async findAllPlayers (): Promise<Player[]> {
    const cursor = this.collection.find({}, {
      limit: 100,
      projection: { id: true, name: true }
    })

    return cursor.toArray()
  }

  static newPlayerRepository (db: Db) {
    const collection = db.collection('players')

    return new PlayerRepository(collection)
  }
}

export default PlayerRepository
