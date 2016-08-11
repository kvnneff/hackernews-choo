const h = require('choo/html')
const Item = require('./item')

module.exports = function StoryList (state) {
  const { collection, pageNumber, storiesPerPage } = state
  let index = (pageNumber - 1) * storiesPerPage

  return h`<div>
    <table class="collapse">
      <tbody>
        ${collection.map((item) => {
          index++
          return Item({ index, item })
        })}
      </tbody>
    </table>
  </div>`
}
