const h = require('choo/html')
const decode = require('ent/decode')
const sanitizeHTML = require('sanitize-html')
const approx = require('approximate-time')

const Comment = state => {
  if (state.item && state.item.deleted) return ''
  const item = state.item
  const commentBody = h`<p class="lh-copy mt0"></p>`

  commentBody.innerHTML = sanitizeHTML(decode(item.text))

  return h`<li class="comment pt3 navy">
    <span class="f6">
      <a href="/user/${item.by}" class="link">${item.by}</a>
      ${timeAgo(item)}
    </span>
    ${commentBody}
    <ul class="list pl4">
      ${item.children ? item.children.map(child => {
        return Comment({ item: child })
      }) : ''}
    </ul>
  </li>`
}

const timeAgo = item => {
  let posted = approx(item.time * 1000)
  if (posted !== 'just now') posted = `${posted} ago`
  return h`<span>${posted}</span>`
}

module.exports = Comment
