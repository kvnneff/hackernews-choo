const h = require('choo/html')
const StoryItem = require('../components/item')
const Loading = require('../components/loading')
const CommentList = require('../components/comments/list')

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
  let Content = null

  if (!item) {
    dispatch('fetchItems', itemId)
    Content = Loading({ text: 'Loading story...' })
  }

  if (!Content && item.type === 'poll' && !pollOptions) {
    dispatch('fetchPollOptions', item.id)
    Content = Loading({ text: 'Loading poll...' })
  } else if (pollOptions) {
    pollOptions = Array.from(pollOptions.values())
  }

  if (!Content) {
    const Story = StoryItem({ item, pollOptions, onLoad: fetchComments })
    const Comments = comments ? CommentList(comments) : Loading({ text: 'Loading comments...' })
    Content = [ Story, Comments ]
  }

  function fetchComments () {
    if (!item) return
    dispatch('fetchComments', item.id)
  }

  return h`<div class="silver">
      <div class="ph2 ph4-m ph4-ns mt2 mt2-ns mt2-m mt2-l">
        ${Content}
      </div>
  </div>`
}
