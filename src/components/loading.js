const h = require('choo/html')
const sheetify = require('sheetify')

const prefix = sheetify`
  .ball-pulse > div {
    background-color: #006C71;
  }
`
const initialState = { text: null }

module.exports = function loading (state = initialState) {
  const { text } = state
  return h`<div class="Loading ${prefix} mv5 mw5 center tc pa3 bg-near-white ba b--light-gray">
    <div class="center dark-green">${text ? text : 'Loading...'}</div>
    <div class="loader-inner ball-pulse center">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>`
}
