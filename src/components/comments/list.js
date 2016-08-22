const h = require('choo/html')
const sf = require('sheetify')
const CommentItem = require('./item')

const prefix = sf`
  :host > li {
    padding: 1rem;
    margin: 2rem 0;
    background-color: #f4f4f4;
    border: 1px solid #ccc;
  }

  :host > li:nth-child(even) {
    background-color: #fefefe;
  }
`

const CommentsList = state => {
  const comments = state.comments

  if (!comments || !comments.length) return ''

  return h`<ul class="${prefix} CommentList list pl0 mt4">
    ${comments.map(comment => {
      return CommentItem({ item: comment })
    })}
  </ul>`
}

module.exports = CommentsList
