const h = require('choo/html')
const URL = require('../url')
const InfoBar = require('../info-bar')

module.exports = function StoryItem (state) {
  const { item, index } = state
  const url = item.url ? item.url : `/item/${item.id}`
  const domain = URL({ url })

  return h`<tr class="StoryList-item">
    <td class="v-top pv2 f6 tr pr2">${index}.</td>
    <td class="v-top pv2 f6 f5-ns">
      <a class="link" href="${url}">
        ${item.title.replace(/\s([^\s<]+)\s*$/, '\u00A0$1')}
      </a>
      <span>${domain}</span>
      <span>${InfoBar({ item })}</span>
    </td>
  </tr>`
}
