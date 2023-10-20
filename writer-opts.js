import { readFile } from 'fs/promises'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const dirname = fileURLToPath(new URL('.', import.meta.url))

export async function createWriterOpts() {
  const [template, header, commit] = await Promise.all([
    readFile(resolve(dirname, './templates/template.hbs'), 'utf-8'),
    readFile(resolve(dirname, './templates/header.hbs'), 'utf-8'),
    readFile(resolve(dirname, './templates/commit.hbs'), 'utf-8')
  ])

  const writerOpts = getWriterOpts()

  writerOpts.mainTemplate = template
  writerOpts.headerPartial = header
  writerOpts.commitPartial = commit

  return writerOpts
}

function getWriterOpts() {
  return {
    transform: (commit, context) => {
      const issues = []
      if (!commit.type || typeof commit.type !== 'string') {
        return commit
      }

      if (commit.type === 'feat') {
        commit.type = 'Features'
      } else if (commit.type === 'fix') {
        commit.type = 'Bug Fixes'
      } else if (commit.type === 'perf') {
        commit.type = 'Performance Improvements'
      } else if (commit.type === 'chore') {
        if (commit.scope === 'release') {
          return commit
        }
        commit.type = 'Chores'
      } else if (commit.type === 'style') {
        commit.type = 'Styles'
      } else if (commit.type === 'docs') {
        commit.type = 'Documentation'
      } else if (commit.type === 'refactor') {
        commit.type = 'Refactor'
      } else if (commit.type === 'test') {
        commit.type = 'Test'
      }

      commit.shortHash = commit.hash.slice(0, 8)

      if (typeof commit.subject === 'string') {
        let url = context.repository
          ? `${context.host}/${context.owner}/${context.repository}`
          : context.repoUrl
        if (url) {
          url = `${url}/issues/`
          // Issue URLs.
          commit.subject = commit.subject.replace(/#([0-9]+)/g, (_, issue) => {
            issues.push(issue)
            return `[#${issue}](${url}${issue})`
          })
        }
        if (context.host) {
          // User URLs.
          commit.subject = commit.subject.replace(
            /\B@([a-z0-9](?:-?[a-z0-9/]){0,38})/g,
            (_, username) => {
              if (username.includes('/')) {
                return `@${username}`
              }

              return `[@${username}](${context.host}/${username})`
            }
          )
        }
      }

      // remove references that already appear in the subject
      commit.references = commit.references.filter((reference) => {
        if (issues.indexOf(reference.issue) === -1) {
          return true
        }

        return false
      })

      return commit
    },
    groupBy: 'type',
    commitGroupsSort: (a, b) => {
      const commitGroupOrder = [
        'Features',
        'Bug Fixes',
        'Styles',
        'Refactor',
        'Performance Improvements',
        'Documentation',
        'Test',
        'Chores'
      ]
      const gRankA = commitGroupOrder.indexOf(a.title)
      const gRankB = commitGroupOrder.indexOf(b.title)
      if (gRankA < gRankB) {
        return -1
      } else {
        return 1
      }
    },
    commitsSort: (a, b) => {
      return new Date(b.committerDate) - new Date(a.committerDate)
    }
  }
}
