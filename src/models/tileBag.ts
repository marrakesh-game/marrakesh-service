import Tile from './tile'
import TileColor from './tileColor'

/**
 * Holds all available tiles for a game.
 */
export default class TileBag {
  constructor(readonly tiles: Tile[]) {
  }

  take(numberOfTiles: number): Tile[] {
    return []
  }

  putBack(tiles: Tile[]) {
    tiles.push(...tiles)
  }

  private static generateTiles(tileColor: TileColor) {
    const tiles = new Array(20).fill(1)
    return tiles.map(() => Tile.ofColour(tileColor))
  }

  static newTileBag() {
    const colors = [
      TileColor.Red,
      TileColor.Black,
      TileColor.Blue,
      TileColor.Yellow,
      TileColor.Turquis
    ]

    const tiles = colors.reduce((acc, color) => acc.concat(this.generateTiles(color)), [])
    return new TileBag(tiles)
  }

  public toString() {
    return `TileBag [${this.tiles}]`
  }

}