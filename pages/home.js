const h = require('choo/html')
const ItemList = require('../components/item-list/list')
const Loading = require('../components/loading')
const Root = require('../components/root')

module.exports = function Home (state, prevState, dispatch) {
  const {
    currentItems,
    storyCollection,
    params,
    storiesPerPage
  } = state
  const collection = []
  const prevParams = prevState.params
  const pageNumber = parseInt(params.pageNumber, 10) || 1
  const prevPageNumber = prevParams
    ? parseInt(prevState.params.pageNumber, 10) || 1
    : 1
  let isLoadingItems = state.isLoadingItems

  if (prevPageNumber !== parseInt(pageNumber, 10)) {
    loadStories()
  }

  function loadStories () {
    dispatch('fetchItemsByPage', pageNumber)
    isLoadingItems = true
    window.scrollTo(0, 0)
    return
  }

  function moreLink () {
    return h`<div class="w-100">
      <div class="pv3 ph3 ph5-m ph5-ns">
        ${pageNumber > 1 ? previousLink() : ''}
        ${pageNumber > 1 ? h` | ` : ''}
      <a href="/page/${ pageNumber + 1 }">More </a>
      </div>`
  }

  function previousLink () {
    return h`<a href="/page/${ pageNumber - 1 }">Previous</a>`
  }

  function footer () {
    return h`<footer class="bg-near-white pv3 w-100 bt b--light-gray">
      <div class="tc f6 gray">
        Built with <a class="link" href="https://github.com/yoshuawuyts/choo">Choo</a>
        | <a class="link" href="https://github.com/kvnneff/hackernews-choo">Source</a>
      </div>
    </footer>`
  }

  if (currentItems.length > 0) {
    currentItems.forEach(key => {
      collection.push(storyCollection.get(key))
    })
  }

  return Root(h`<div class="silver" onload=${loadStories}>
    <section class="ph3 ph4-ns">
      <div>
        ${isLoadingItems
          ? Loading({ text: 'Fetching Stories...' })
          : ItemList({ collection, storiesPerPage, pageNumber })}
      </div>
    </section>
    ${isLoadingItems ? '' : moreLink()}
    ${isLoadingItems ? '' : footer()}
  </div>`)
}
