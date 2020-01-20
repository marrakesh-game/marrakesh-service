import TileColor from './tileColor'
import Tile from './tile'

/**
 * A row where a player can place tiles.
 */
class TileRow {
  headOffset = 0
  primaryColor: TileColor = undefined

  constructor(readonly tiles: boolean[]) {}

  isEmpty = () => this.headOffset === 0

  appendTiles(...newTiles: Tile[]): Tile[] {
    if (this.isEmpty()) {
      this.primaryColor = newTiles[0].tileColor
    }

    while (this.headOffset < this.tiles.length && this.headOffset < newTiles.length) {
      this.tiles[this.headOffset] = true
      this.headOffset ++
    }

    return newTiles.slice(this.headOffset)
  }

  canPlaceTile = (tile: Tile) => this.isEmpty() || this.primaryColor === tile.tileColor

  isComplete = () => this.headOffset === this.tiles.length

  static newTileRow(numberOfTiles: number) {
    const row = new Array<boolean>(numberOfTiles).fill(false)

    return new TileRow(row)
  }

  toString = () => `TileRow (head: ${this.headOffset}, color: ${this.primaryColor}, row: ${this.tiles})`
}

class BottomRow {

}

/**
 * Represents the plan where a player can place tiles.
 */
class TilePlan {
  constructor(readonly tileRows: TileRow[]) {}

  static newTilePlan() {
    return new TilePlan([
      TileRow.newTileRow(1),
      TileRow.newTileRow(2),
      TileRow.newTileRow(3),
      TileRow.newTileRow(4),
      TileRow.newTileRow(5),
    ])
  }

  rowToString = (row: TileRow) =>
    `(${row.primaryColor || 'n/a'}) ${row.tiles.map((t) => t ? 'X ' : 'O' ).join('-')}`

  toString = () => `
    TilePlan
    1] ${this.rowToString(this.tileRows[0])}
    2] ${this.rowToString(this.tileRows[1])}
    3] ${this.rowToString(this.tileRows[2])}
    4] ${this.rowToString(this.tileRows[3])}
    5] ${this.rowToString(this.tileRows[4])}
  `


}

export {
  TileRow,
  BottomRow
}
export default TilePlan
