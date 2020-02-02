import TilePlan from '../../src/models/tilePlan'

describe('the tileplan', () => {
  it('should be an empty plan initially', () => {
    const plan = TilePlan.newTilePlan()

    console.log(plan + '')
  })
})
