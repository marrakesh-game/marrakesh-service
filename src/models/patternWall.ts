class PatternWallRow {
  // 5 slots, belegt und nicht belegt

  isComplete() {
    return false
  }
}

class PatternWall {
  // 5 PatternWallRows

  // one of the rows is complete
  isFinished() {
    return false
  }
}

export default PatternWall