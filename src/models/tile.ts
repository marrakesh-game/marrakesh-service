import TileColor from './tileColor'

/**
 * Represents a single colored piece of stone, that can be placed on a tileplan.
 */
class Tile {
  constructor(readonly tileColor: TileColor | null) {
  }

  static ofColour(tileColor: TileColor) {
    return new Tile(tileColor)
  }

  static startMarker() {
    return new Tile(null)
  }

  toString = () => this.tileColor
}

export default Tile