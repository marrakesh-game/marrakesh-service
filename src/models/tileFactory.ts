import Tile from './tile'
import TileBag from './tileBag'

/**
 * A tile plate holds 4 tiles.
 */
class TilePlate {
  constructor(readonly tiles: Tile[]) {
  }

  static of(tiles: Tile[]): TilePlate {
    return new TilePlate(tiles)
  }
}

/**
 * A tilefactory selects four tiles from a tilebag.
 */
class TileFactory {
  constructor(readonly tileBag: TileBag) {}

  produce(): TilePlate {
    return TilePlate.of(this.tileBag.take(4))
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

export {
  TilePlate
}
export default TileFactory