import { createParserOpts } from './parser-opts.js'
import { createWriterOpts } from './writer-opts.js'
import { createConventionalChangelogOpts } from './conventional-changelog.js'
import { createConventionalRecommendedBumpOpts } from './conventional-recommended-bump.js'

export default async function () {
  const parserOpts = createParserOpts()
  const writerOpts = await createWriterOpts()
  const recommendedBumpOpts = createConventionalRecommendedBumpOpts(parserOpts)
  const conventionalChangelog = createConventionalChangelogOpts(parserOpts, writerOpts)

  return {
    parserOpts,
    writerOpts,
    recommendedBumpOpts,
    conventionalChangelog
  }
}
