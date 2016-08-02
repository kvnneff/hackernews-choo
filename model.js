const storage = require('./storage')
const reducers = require('./reducers')
const effects = require('./effects')
const subscriptions = require('./subscriptions')

const initialState = {
  storyCollection: new Map(),
  commentCollection: new Map(),
  pollOptionCollection: new Map(),
  currentItems: [],
  topStoryIds: [],
  storiesPerPage: 30,
  currentPage: 1,
  user: null,
  fetchingComments: false,
  selectedItem: 0,
  isLoadingStories: false
}

module.exports = {
  state: storage.get() || initialState,
  effects,
  reducers,
  subscriptions
}
