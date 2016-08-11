const h = require('choo/html')
const CommentItem = require('./item')

const CommentsList = state => {
  const comments = state.comments
  if (!comments || !comments.length) return ''
  return h`<ul class="comment-list list pl0 mt4">
    ${comments.map(comment => {
      return CommentItem({ item: comment })
    })}
  </ul>`
}

module.exports = CommentsList
