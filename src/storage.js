/*global localStorage*/

const save = state => {
  state = Object.assign({}, state)
  state.fetchingComments = false
  state.storyCollection = Array.from(state.storyCollection.entries())
  state.commentCollection = Array.from(state.commentCollection.entries())
  state.pollOptionCollection = Array.from(state.pollOptionCollection.entries())
  localStorage.setItem('state', JSON.stringify(state))
}

const get = () => {
  let value = localStorage.getItem('state')
  if (value === null) return value
  value = JSON.parse(value)
  value.storyCollection = value.storyCollection.length ? new Map(value.storyCollection) : new Map()
  value.commentCollection = value.commentCollection.length ? new Map(value.commentCollection) : new Map()
  value.pollOptionCollection = value.pollOptionCollection.length ? new Map(value.pollOptionCollection) : new Map()
  return value
}

module.exports = { save, get }
