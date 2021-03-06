const h = require('choo/html')

const URL = state => {
  if (!state || !state.url || state.url.substring(0, 6) === '/item/') return ''
  const matches = state.url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i)
  const domain = matches && matches[1]
  return h`<span class="domain f6">(${domain})</span>`
}

module.exports = URL
