import TilePlan from './tilePlan'
import PatternWall from './patternWall'

/**
 * Represents an active player.
 */
class Player {
  score: number

  constructor(readonly name: string, readonly tilePlan: TilePlan, readonly patternWall: PatternWall) {
    this.score = 0
  }

  static newPlayer(name: string) {
    return new Player(name, TilePlan.newTilePlan(), new PatternWall())
  }

  toString = () => `Player ${this.name}, Score: ${this.score}`
}

export default Player