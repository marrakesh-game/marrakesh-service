import TileBag from '../../src/models/tileBag'

describe('the tilebag', () => {
  it('should have 100 tiles after construction', () => {
    const bag = TileBag.newTileBag()

    expect(bag.tiles).toHaveLength(100)
  })
})
