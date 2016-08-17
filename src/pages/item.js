const h = require('choo/html')
const StoryItem = require('../components/item')
const Loading = require('../components/loading')
const CommentList = require('../components/comments/list')
const Root = require('../components/root')

module.exports = function Item (state, prevState, dispatch) {
  const {
    storyCollection,
    commentCollection,
    pollOptionCollection,
    params
  } = state

  const itemId = parseInt(params.itemId, 10)
  const item = storyCollection.get(itemId)
  const comments = commentCollection.get(itemId)
  let pollOptions = pollOptionCollection.get(itemId)

  if (!item) {
    dispatch('fetchItems', itemId)
    return Root(Loading({ text: 'Loading story...' }))
  }

  if (item.type === 'poll' && !pollOptions) {
    dispatch('fetchPollOptions', item.id)
    return Root(Loading({ text: 'Loading poll...' }))
  } else if (item.type === 'poll' && pollOptions) {
    pollOptions = Array.from(pollOptions.values())
  }

  function fetchComments () {
    if (!item) return
    dispatch('fetchComments', item.id)
  }

  const Story = StoryItem({ item, pollOptions, onLoad: fetchComments })
  const Comments = comments
    ? CommentList({ comments })
    : Loading({ text: 'Loading comments...' })

  return Root(h`<div class="ItemPage">${[ Story, Comments ]}</div>`)
}
