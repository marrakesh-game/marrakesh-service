import { TileRow } from '../../src/models/tilePlan'
import Tile from '../../src/models/tile'
import TileColor from '../../src/models/tileColor'

describe('the tilerow', () => {
  it('should initially be empty', () => {
    const row = TileRow.newTileRow(5)

    expect(row.isEmpty()).toBeTruthy()
  })

  it('should not be complete', () => {
    const row = TileRow.newTileRow(5)

    expect(row.isComplete()).toBeFalsy()
  })

  it('should accept any color', () => {
    const row = TileRow.newTileRow(5)

    expect(row.canPlaceTile(Tile.ofColour(TileColor.Black))).toBeTruthy()
  })

  describe('when placing tiles', () => {
    it('should add the tiles', () => {
      const row = TileRow.newTileRow(5)

      row.appendTiles(Tile.ofColour(TileColor.Black), Tile.ofColour(TileColor.Black))

      expect(row.isEmpty()).toBeFalsy()
      expect(row.isComplete()).toBeFalsy()
    })

    it('should accept tiles of the same color', () => {
      const row = TileRow.newTileRow(5)

      row.appendTiles(Tile.ofColour(TileColor.Black), Tile.ofColour(TileColor.Black))

      expect(row.canPlaceTile(Tile.ofColour(TileColor.Black))).toBeTruthy()
    })

    it('should reject tiles of other color', () => {
      const row = TileRow.newTileRow(5)

      row.appendTiles(Tile.ofColour(TileColor.Black), Tile.ofColour(TileColor.Black))

      expect(row.canPlaceTile(Tile.ofColour(TileColor.Blue))).toBeFalsy()
    })

    it('should return leftover tiles', () => {
      const row = TileRow.newTileRow(2)

      const leftovers = row.appendTiles(Tile.ofColour(TileColor.Black), Tile.ofColour(TileColor.Black), Tile.ofColour(TileColor.Black), Tile.ofColour(TileColor.Black))
      expect(leftovers).toHaveLength(2)
      leftovers.forEach((tile) => expect(tile.tileColor).toEqual(TileColor.Black))
    })

    it('should mark a row as complete', () => {
      const row = TileRow.newTileRow(2)

      row.appendTiles(Tile.ofColour(TileColor.Black), Tile.ofColour(TileColor.Black), Tile.ofColour(TileColor.Black), Tile.ofColour(TileColor.Black))

      expect(row.isComplete()).toBeTruthy()
    })
  })


})
