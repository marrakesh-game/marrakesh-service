import v4 from 'uuid/v4'
import TileBag from './tileBag'
import Player from './player'
import TileFactory from './tileFactory'
import uuid from 'uuid'

enum GameState {
  Ongoing,
  Finished
}

class GameRound {
  constructor(readonly players: Player[], readonly tileFactories: TileFactory[], readonly tileBag: TileBag) {
  }

  setupTilePlates() {
    const plates = this.tileFactories.forEach((factory) => factory.produce())
  }



  play() {
    // setup tile factories


    // while tile factories are not empty
      // each player picks tiles and places them on the tileplan

    // each player moves tiles from the completed tilerows to the tileplan

    // for each player compute the final score
  }
}

/**
 * Represents a game of Marrakesh.
 */
class Game {
  gameState = GameState.Ongoing

  constructor(readonly id: string, readonly players: Player[], readonly tileFactories: TileFactory[], readonly tileBag: TileBag) {
  }

  gameOver() {
    // one of the player's pattern wall is in a finished state
    return false
  }

  winner(): Player[]{
    return null
  }

  playRound() {
    if (this.gameOver()) {
      this.gameState = GameState.Finished
      return this.winner()
    }
    // while game is not over
      // setup tile factories
      // while tile factories are not empty
        // each player picks tiles and places them on the tileplan

      // each player moves tiles from the completed tilerows to the tileplan

      // for each player compute the final score
  }

  static newGame(numberOfPlayers: number) {
    const tileBag = TileBag.newTileBag()
    const factories = TileFactory.forPlayers(numberOfPlayers, tileBag)
    const players = new Array(numberOfPlayers).fill(1).map(() => Player.newPlayer(uuid()))

    return new Game(v4(), players, factories, tileBag)
  }
}

export default Game