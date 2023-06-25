'use strict'

const { readFile } = require('fs').promises
const { resolve } = require('path')

module.exports = Promise.all([
  readFile(resolve(__dirname, './templates/template.hbs'), 'utf-8'),
  readFile(resolve(__dirname, './templates/header.hbs'), 'utf-8'),
  readFile(resolve(__dirname, './templates/commit.hbs'), 'utf-8')
])
  .then(([template, header, commit]) => {
    const writerOpts = getWriterOpts()

    writerOpts.mainTemplate = template
    writerOpts.headerPartial = header
    writerOpts.commitPartial = commit

    return writerOpts
  })

function getWriterOpts() {
  return {
    transform: (commit) => {
      if (!commit.type || typeof commit.type !== 'string') {
        return
      }

      if (commit.type === 'feat') {
        commit.type = 'Features'
      } else if (commit.type === 'fix') {
        commit.type = 'Bug Fixes'
      } else if (commit.type === 'perf') {
        commit.type = 'Performance Improvements'
      } else if (commit.type === 'chore') {
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

      return commit
    },
    groupBy: 'type',
    commitGroupsSort: 'title',
    commitsSort: (a, b) => {
      return new Date(b.committerDate) - new Date(a.committerDate)
    }
  }
}
