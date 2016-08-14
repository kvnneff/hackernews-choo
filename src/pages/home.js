const h = require('choo/html')
const ItemList = require('../components/item-list/list')
const Loading = require('../components/loading')
const Root = require('../components/root')

const Home = (state, prevState, dispatch) => {
  const {
    storyCollection,
    storiesPerPage,
    isLoadingItems,
    currentItems,
    params
  } = state
  const collection = []
  const prevParams = prevState.params
  const pageNumber = parseInt(params.pageNumber, 10) || 1
  const prevPageNumber = prevParams
    ? parseInt(prevState.params.pageNumber, 10) || 1
    : 1

  // Load stories if this is a new page
  if (prevPageNumber !== parseInt(pageNumber, 10)) {
    loadStories()
    return LoadingView()
  }

  function loadStories () {
    dispatch('fetchItemsByPage', pageNumber)
    window.scrollTo(0, 0)
  }

  if (currentItems.length > 0) {
    currentItems.forEach(key => {
      collection.push(storyCollection.get(key))
    })
  }

  return Root(h`<div class="silver" onload=${loadStories}>
    <div>
      ${isLoadingItems
        ? LoadingView()
        : ItemList({ collection, storiesPerPage, pageNumber })}
    </div>
    ${isLoadingItems ? '' : Navigation({ pageNumber })}
  </div>`)
}

const LoadingView = () => {
  return h`<div>${Loading({ text: 'Fetching Stories...' })}</div>`
}

const Navigation = (state) => {
  const pageNumber = state.pageNumber
  const moreEl = h`<a href="/page/${ pageNumber + 1 }">More</a>`
  let navEl = moreEl

  if (pageNumber > 1) navEl = h`<span><a href="/page/${ pageNumber - 1 }">Previous</a> | ${moreEl}</span>`

  return h`<div class="w-100">
    ${navEl}
  </div>`
}

module.exports = Home
