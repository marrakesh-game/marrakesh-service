import v4 from 'uuid/v4'
import TileBag from './tileBag'
import Player from './player'
import TileFactory from './tileFactory'

export enum GameState {
  NotStarted = 'Not started',
  Ongoing = 'Ongoing',
  Finished = 'Finished'
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class GameRound {
  constructor (readonly players: Player[], readonly tileFactories: TileFactory[], readonly tileBag: TileBag) {
  }

  setupTilePlates () {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const plates = this.tileFactories.forEach((factory) => factory.produce())
  }

  play () {
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
  gameState = GameState.NotStarted

  constructor (readonly id: string, readonly tileBag: TileBag) {
  }

  gameOver () {
    // one of the player's pattern wall is in a finished state
    return false
  }

  winner (): Player[] {
    return null
  }

  playRound () {
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

  static newGame () {
    const tileBag = TileBag.newTileBag()
    // const factories = TileFactory.forPlayers(numberOfPlayers, tileBag)
    // const players = new Array(numberOfPlayers)//.fill(1).map(() => Player.newPlayer(uuid()))

    return new Game(v4(), tileBag)
  }
}

export default Game
