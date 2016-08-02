const h = require('choo/html')
const URL = require('../url')
const InfoBar = require('../info-bar')

module.exports = function StoryItem (state) {
  const { item, index } = state
  const url = item.url ? item.url : `/item/${item.id}`
  const domain = URL({ url })

  return h`<div class="w-100">
      <div class="fl no-wrap w-100 mb3 mb4-ns">
        ${index}.
        <a class="link" href="${url}">
          ${item.title.replace(/\s([^\s<]+)\s*$/, '\u00A0$1')}
        </a>
        ${domain}
        ${InfoBar({ item })}
      </div>
  </div>`
}
