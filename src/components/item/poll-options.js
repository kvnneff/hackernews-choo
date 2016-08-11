const h = require('choo/html')
const sanitizeHTML = require('sanitize-html')
const decode = require('ent/decode')

const PollOptions = state => {
  const pollOptions = state.pollOptions

  const options = pollOptions
    .filter(option => { if (!option.deleted) return true })
    .map(option => {
      const optionText = h`<span></span>`
      optionText.innerHTML = sanitizeHTML(decode(option.text))
      return h`<li class="mv3">
        ${optionText}<br>
        <span class="f6 near-black">${option.score} points</span>
      </li>`
    })

  return h`<ul class="list pl0">
    ${options}
  </ul>`
}

module.exports = PollOptions
