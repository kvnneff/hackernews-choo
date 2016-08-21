const Test = require('tape')
const Emitter = require('component-emitter')
const HomePage = require('../../src/pages/home')
const itemFixture = require('../fixtures/item')
const commentFixture = require('../fixtures/comment')
const pollOptionsFixture = require('../fixtures/poll-options')

const emitter = new Emitter()

const dispatch = (msg, data) => {
  emitter.emit(msg, data)
}

const homePageState = () => {
  const item = itemFixture()
  const storyCollection = new Map().set(item.id, item)
  const commentCollection = new Map().set(item.id, [ commentFixture() ])
  const pollOptionCollection = new Map().set(item.id, pollOptionsFixture)
  const currentItems = []
  const params = { itemId: item.id }

  return {
    storyCollection,
    commentCollection,
    pollOptionCollection,
    currentItems,
    params,
    item
  }
}

Test('Home Page', (t) => {
  const test = t.test
  t.plan(3)

  test('returns a div element with class HomePage', (t) => {
    t.plan(1)
    const state = homePageState()
    const prevState = {}
    const page = HomePage(state, prevState, dispatch)
    const itemEl = page.querySelector('.HomePage')
    t.equal(itemEl.tagName, 'DIV')
  })

  test('dispatches fetchItemsByPage on load', (t) => {
    t.plan(1)
    let el

    emitter.on('fetchItemsByPage', (pageNumber) => {
      emitter.off()
      setTimeout(() => {
        el.parentElement.removeChild(el)
      })
      t.ok(true)
    })

    const state = homePageState()
    const prevState = {}
    state.storyCollection = new Map()
    el = HomePage(state, prevState, dispatch)
    document.body.appendChild(el)
  })

  test('dispatches fetchItemsByPage on load with correct page number', (t) => {
    t.plan(1)
    let el

    emitter.on('fetchItemsByPage', (pageNumber) => {
      emitter.off()
      setTimeout(() => {
        el.parentElement.removeChild(el)
        t.equal(pageNumber, 2)
      })
    })

    const state = homePageState()
    const prevState = {}
    state.storyCollection = new Map()
    state.params = { pageNumber: '2' }
    el = HomePage(state, prevState, dispatch)
    document.body.appendChild(el)
  })
})
