import v4 from 'uuid/v4'
import TileBag from './tileBag'
import Player from './player'
import TileFactory from './tileFactory'
import uuid from 'uuid'

/**
 * Represents a game of Marrakesh.
 */
class Game {
  constructor(readonly gameId: string, readonly players: Player[], readonly tileFactories: TileFactory[], readonly tileBag: TileBag) {
  }

  static newGame(numberOfPlayers: number) {
    const tileBag = TileBag.newTileBag()
    const factories = TileFactory.forPlayers(numberOfPlayers, tileBag)
    const players = new Array(numberOfPlayers).fill(1).map(() => Player.newPlayer(uuid()))

    return new Game(v4(), players, factories, tileBag)
  }
}

export default Game