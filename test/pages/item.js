const Test = require('tape')
const Emitter = require('component-emitter')
const ItemPage = require('../../src/pages/item')
const itemFixture = require('../fixtures/item')
const commentFixture = require('../fixtures/comment')
const pollOptionsFixture = require('../fixtures/poll-options')

const emitter = new Emitter()

const dispatch = (msg, data) => {
  emitter.emit(msg, data)
}

const itemPageState = () => {
  const item = itemFixture()
  const storyCollection = new Map().set(item.id, item)
  const commentCollection = new Map().set(item.id, [ commentFixture() ])
  const pollOptionCollection = new Map().set(item.id, pollOptionsFixture)
  const params = { itemId: item.id }

  return {
    storyCollection,
    commentCollection,
    pollOptionCollection,
    params,
    item
  }
}

Test('Item Page', (t) => {
  const test = t.test
  t.plan(8)

  test('returns a div element with class Item', (t) => {
    t.plan(1)
    const state = itemPageState()
    const prevState = {}
    const page = ItemPage(state, prevState, dispatch)
    const itemEl = page.querySelector('.ItemPage')
    t.equal(itemEl.tagName, 'DIV')
  })

  test('dispatches fetchItems if item does not exist in the collection', (t) => {
    t.plan(1)

    emitter.on('fetchItems', (itemId) => {
      emitter.off()
      t.equal(itemId, 1)
    })

    const state = itemPageState()
    const prevState = {}
    state.storyCollection = new Map()

    ItemPage(state, prevState, dispatch)
  })

  test('displays Loading component if item does not exist in the collection', (t) => {
    t.plan(2)

    const state = itemPageState()
    const prevState = {}
    state.storyCollection = new Map()

    const page = ItemPage(state, prevState, dispatch)
    const loadingEl = page.querySelector('.Loading')

    t.ok(loadingEl)
    t.equal(loadingEl.children[0].innerText, 'Loading story...')
  })

  test('dispatches fetchPollOptions item type is poll & options do not exist in the collection', (t) => {
    t.plan(1)

    emitter.on('fetchPollOptions', (itemId) => {
      emitter.off()
      t.equal(itemId, 1)
    })

    const state = itemPageState()
    const prevState = {}
    state.item.type = 'poll'
    state.pollOptionCollection = new Map()

    ItemPage(state, prevState, dispatch)
  })

  test('displays Loading component if item type is poll & options do not exist in the collection', (t) => {
    t.plan(2)

    const state = itemPageState()
    const prevState = {}
    state.item.type = 'poll'
    state.pollOptionCollection = new Map()

    const page = ItemPage(state, prevState, dispatch)
    const loadingEl = page.querySelector('.Loading')

    t.ok(loadingEl)
    t.equal(loadingEl.children[0].innerText, 'Loading poll...')
  })

  test('displays Item component', (t) => {
    t.plan(1)

    const state = itemPageState()
    const prevState = {}
    const page = ItemPage(state, prevState, dispatch)
    const storyEl = page.querySelector('.Item')
    t.ok(storyEl)
  })

  test('displays Comments component', (t) => {
    t.plan(1)

    const state = itemPageState()
    const prevState = {}
    const page = ItemPage(state, prevState, dispatch)
    const commentEl = page.querySelector('.CommentList')

    t.ok(commentEl)
  })

  test('displays Loading component if comments do not exist in collection', (t) => {
    t.plan(2)

    const state = itemPageState()
    const prevState = {}
    state.commentCollection = new Map()

    const page = ItemPage(state, prevState, dispatch)
    const loadingEl = page.querySelector('.Loading')

    t.ok(loadingEl)
    t.equal(loadingEl.children[0].innerText, 'Loading comments...')
  })
})
