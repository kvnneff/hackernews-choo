const api = require('./hackernews-api')

const fetchUser = (userId, state, dispatch, done) => {
  api.fetchUser(userId, (err, user) => {
    if (err) return done(err)
    dispatch('updateUser', user, done)
  })
}

const fetchAllTopStoryIds = (action, state, dispatch, done) => {
  api.fetchAllTopStoryIds((err, ids) => {
    if (err) return done(err)
    return dispatch('updateIds', ids, () => {
      return done(null, ids)
    })
  })
}

const fetchItems = (itemIds, state, dispatch, done) => {
  if (!Array.isArray(itemIds)) itemIds = [itemIds]
  api.fetchItems(itemIds, (err, collection) => {
    if (err) return done(err)
    dispatch('updateCollection', { payload: collection }, done)
  })
}

const fetchItemsByPage = (action, state, dispatch, done) => {
  const pageNumber = action
  const start = (pageNumber - 1) * state.storiesPerPage
  const end = pageNumber * state.storiesPerPage
  const cache = state.storyCollection

  const run = (err, topStoryIds) => {
    if (err) throw err
    const ids = topStoryIds.slice(start, end)

    const idsToFetch = ids.filter(id => {
      if (!cache.get(id)) return true
    })

    if (!idsToFetch.length) {
      return dispatch('updateCurrentItems', ids, () => {
        return dispatch('isLoadingItems', false, done)
      })
    }

    api.fetchItems(idsToFetch, (err, collection) => {
      if (err) return done(err)
      dispatch('updateCollection', { payload: collection }, () => {
        dispatch('updateCurrentItems', ids, () => {
          return dispatch('isLoadingItems', false, done)
        })
      })
    })
  }

  dispatch('isLoadingItems', true, () => {
    if (!state.topStoryIds.length) {
      return dispatch('fetchAllTopStoryIds', {}, run)
    }
    return run(null, state.topStoryIds)
  })
}

const fetchPollOptions = (action, state, dispatch, done) => {
  const cache = state.storyCollection
  const itemId = action
  const item = cache.get(itemId)

  dispatch('isLoadingPollOptions', true, () => {
    api.fetchItems(item.parts, collection => {
      dispatch('updatePollOptions', { collection, itemId }, () => {
        dispatch('isLoadingPollOptions', false, done)
      })
    })
  })
}

const fetchComments = (itemId, state, dispatch, done) => {
  const storyCollection = state.storyCollection
  const item = storyCollection.get(itemId)
  dispatch('isLoadingComments', true, () => {
    api.fetchChildren(item, (err, newItem) => {
      if (err) return done(err)
      const payload = newItem.children.slice()
      dispatch('updateComments', { payload, itemId }, () => {
        dispatch('isLoadingComments', false, done)
      })
    })
  })
}

module.exports = {
  fetchUser,
  fetchAllTopStoryIds,
  fetchItemsByPage,
  fetchPollOptions,
  fetchComments,
  fetchItems
}
