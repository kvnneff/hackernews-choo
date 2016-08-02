const updateCollection = (action, state) => {
  const newCollection = action.payload
  const oldCollection = state.storyCollection || new Map()
  const mergedCollection = new Map([...oldCollection, ...newCollection])
  return Object.assign({}, state, { storyCollection: mergedCollection })
}

const updateCurrentItems = (keys, state) => {
  return Object.assign({}, state, { currentItems: [...keys] })
}

const updateComments = ({ itemId, payload }, state) => {
  const commentCollection = state.commentCollection
  commentCollection.set(itemId, payload)
  return Object.assign({}, state, { commentCollection })
}

const updateIds = (topStoryIds, state) => {
  return Object.assign({}, state, { topStoryIds })
}

const updateUser = (user, state) => {
  return Object.assign({}, state, { user })
}

const updatePollOptions = ({ itemId, payload }, state) => {
  state.pollOptionCollection.set(itemId, payload)
  return Object.assign({}, state, { pollOptionCollection: state.pollOptionCollection })
}

const isLoadingItems = (boolean, state) => {
  return Object.assign({}, state, { isLoadingItems: boolean })
}

const isLoadingComments = (boolean, state) => {
  return Object.assign({}, state, { isLoadingComments: boolean })
}

const isLoadingPollOptions = (boolean, state) => {
  return Object.assign({}, state, { isLoadingPollOptions: boolean })
}

module.exports = {
  updateCollection,
  updateCurrentItems,
  updateComments,
  updateIds,
  updateUser,
  updatePollOptions,
  isLoadingItems,
  isLoadingComments,
  isLoadingPollOptions
}
