export function createConventionalRecommendedBumpOpts(parserOpts) {
  return {
    parserOpts,
    whatBump: (commits) => {
      let level = 2
      let breakings = 0
      let features = 0

      commits.forEach((commit) => {
        const breakingLength = commit.notes.filter(
          (item) => item.title !== 'Dependencies Changes'
        ).length
        if (breakingLength > 0) {
          breakings += breakingLength
          level = 0
        } else if (commit.type === 'feat') {
          features += 1
          if (level === 2) {
            level = 1
          }
        }
      })

      return {
        level,
        reason: `There are ${breakings} breaking changes and ${features} features`
      }
    }
  }
}
