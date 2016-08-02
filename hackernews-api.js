const Firebase = require('firebase')
const hn = new Firebase('https://hacker-news.firebaseio.com/v0/')

const subscribe = (cb) => {
  hn.child('topstories').on('value', snapshot => {
    const ids = snapshot.val()
    return cb(null, ids)
  })
}

const fetchItems = (itemIds, cb) => {
  const newCollection = new Map()
  itemIds.forEach(itemId => fetchItem(itemId, (err, item) => {
    if (err) throw err
    newCollection.set(itemId, item)
    if (newCollection.size >= itemIds.length) {
      return cb(null, newCollection)
    }
  }))
}

const fetchUser = (userId, cb) => {
  hn.child('user/' + userId).once('value', snapshot => {
    return cb(null, snapshot.val())
  })
}

const fetchAllTopStoryIds = (cb) => {
  hn.child('topstories').once('value', snapshot => {
    return cb(null, snapshot.val())
  })
}

const fetchItem = (itemId, cb) => {
  hn.child(`item/${itemId}`).once('value', snapshot => {
    const item = snapshot.val()
    return cb(null, item)
  })
}

const fetchChildren = (story, cb) => {
  story.children = []
  let count = 0

  const trace = item => {
    if (item.kids) {
      item.kids.forEach(id => {
        count++
        hn.child(`item/${id}`)
          .once('value', snapshot => {
            const fetchedItem = snapshot.val()
            fetchedItem.children = []
            item.children.push(fetchedItem)
            if (fetchedItem.kids) {
              trace(fetchedItem)
            }
            count--
            if (count === 0) return done()
          })
      })
    }
  }

  function done () {
    return cb(null, story)
  }

  trace(story)
}

module.exports = {
  fetchItems,
  fetchItem,
  fetchChildren,
  subscribe,
  fetchAllTopStoryIds,
  fetchUser
}
