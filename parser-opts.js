export function createParserOpts() {
  return {
    headerPattern: /^(\w+)(?:\((.*)\))?: ?(.*)$/,
    headerCorrespondence: ['type', 'scope', 'message'],
    noteKeywords: ['BREAKING CHANGE', 'Dependencies Changes'],
    notesPattern: function (noteKeywordsSelection) {
      return new RegExp('^[\\s|*]*(' + noteKeywordsSelection + ')[:\\s]*(.*)', 'i')
    }
  }
}
