import Tile from './tile'
import TileBag from './tileBag'

/**
 * A tile plate holds 4 tiles.
 */
class TilePlate {
  constructor(readonly tiles: Array<Tile>) {
  }

  static of(tiles: Array<Tile>): TilePlate {
    return new TilePlate(tiles)
  }
}

/**
 * A tilefactory selects four tiles from a tilebag.
 */
class TileFactory {
  constructor(readonly tileBag: TileBag) {}


  produce(): Tile[] {
    return []
  }

  static forPlayers(numberOfPlayers: number, tileBag: TileBag) {
    const factories = [
      new TileFactory(tileBag),
      new TileFactory(tileBag),
      new TileFactory(tileBag),
      new TileFactory(tileBag),
      new TileFactory(tileBag)
    ]

    if (numberOfPlayers > 2) {
      factories.push(
        new TileFactory(tileBag),
        new TileFactory(tileBag)
      )
    }

    if (numberOfPlayers > 3) {
      factories.push(
        new TileFactory(tileBag),
        new TileFactory(tileBag)
      )
    }

    return factories
  }
}

export default TileFactory