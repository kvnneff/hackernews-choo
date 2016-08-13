const h = require('choo/html')
const approx = require('approximate-time')

const InfoBar = state => {
  const item = state.item

  if (item.type !== 'story' && item.type !== 'poll') {
    return h`<div class="InfoBar f6">${timeAgo(item)}</div>`
  }

  return h`<div class="InfoBar f6">
    ${score(item)} | ${commentsLink(item)}
  </div>`
}

const timeAgo = item => {
  let posted = approx(item.time * 1000)
  if (posted !== 'just now') posted = `${posted} ago`
  return h`<span>${posted}</span>`
}

const score = item => {
  return h`<span>
    ${item.score} points by
    <a class="link" href="/user/${item.by}">
      ${item.by}
    </a>
    ${timeAgo(item)}
  </span>`
}

const commentsLink = item => {
  return h`<a class="link" href="/item/${item.id}">${item.descendants} comments</a>`
}

module.exports = InfoBar
