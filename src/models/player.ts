import TilePlan from './tilePlan'
import PatternWall from './patternWall'
import uuid from 'uuid/v4'
/**
 * Represents an active player.
 */
class Player {
  score: number

  constructor (readonly id: string, readonly name: string, readonly tilePlan: TilePlan, readonly patternWall: PatternWall) {
    this.score = 0
  }

  static newPlayer (name: string) {
    return new Player(uuid(), name, TilePlan.newTilePlan(), new PatternWall([]))
  }

  toString = () => `Player [${this.id}] ${this.name}, Score: ${this.score}`
}

export default Player
