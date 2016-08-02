const h = require('choo/html')
const approx = require('approximate-time')

const InfoBar = state => {
  const item = state.item

  function timeAgo () {
    return h`<span>${approx(item.time * 1000)} ago</span>`
  }
  if (item.type !== 'story' && item.type !== 'poll') {
    return h`<div class="f6">${timeAgo()}</div>`
  }

  return h`<div class="f6">
    ${item.score} points by
    <a class="link" href="/user/${item.by}">
      ${item.by}
    </a>
    ${timeAgo()}
    | <a class="link" href="/item/${item.id}">${item.descendants} comments</a>
  </div>`
}

module.exports = InfoBar
