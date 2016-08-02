const h = require('choo/html')
const Item = require('./item')

module.exports = function StoryList (state) {
  const { collection, pageNumber, storiesPerPage } = state
  let index = (pageNumber - 1) * storiesPerPage

  return h`<div>
    <ul class="list pl0">
      ${collection.map((item) => {
        index++
        return h`<li class="mv3 mv4-ns mv4-m mv4-l relative">
          ${Item({ index, item })}
        </li>`
      })}
    </ul>
  </div>`
}
