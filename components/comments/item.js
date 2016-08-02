const h = require('choo/html')
const decode = require('ent/decode')
const sanitizeHTML = require('sanitize-html')
const approx = require('approximate-time')

const comment = state => {
  if (state.item && state.item.deleted) return ''
  const item = state.item
  const commentBody = h`<p class="lh-copy mt0"></p>`

  commentBody.innerHTML = sanitizeHTML(decode(item.text))

  return render(item)

  function render (item) {
    return h`<li class="comment pt3 navy">
      <span class="f6">
        <a href="/user/${item.by}" class="link">${item.by}</a>
        ${approx(item.time * 1000)} ago
      </span>
      ${commentBody}
      <ul class="list pl4">
        ${item.children ? item.children.map(child => {
          return comment({ item: child })
        }) : ''}
      </ul>
    </li>`
  }
}

module.exports = comment
