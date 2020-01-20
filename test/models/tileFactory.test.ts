import TileFactory from '../../src/models/tileFactory'
import TileBag from '../../src/models/tileBag'

describe('the tilefactory', () => {
  it('should have 5 factories for 2 players', () => {
    const factories = TileFactory.forPlayers(2, TileBag.newTileBag())

    expect(factories).toHaveLength(5)
  })

  it('should have 7 factories for 3 players', () => {
    const factories = TileFactory.forPlayers(3, TileBag.newTileBag())

    expect(factories).toHaveLength(7)
  })

  it('should have 9 factories for 4 players', () => {
    const factories = TileFactory.forPlayers(4, TileBag.newTileBag())

    expect(factories).toHaveLength(9)
  })
})
