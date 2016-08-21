const Test = require('tape')
const Item = require('../../src/components/item/index')
const itemFixture = require('../fixtures/item')
const pollOptionsFixture = require('../fixtures/poll-options')

Test('Item Component', (t) => {
  const test = t.test
  t.plan(6)

  test('returns a DIV element', (t) => {
    t.plan(1)
    const item = Item({ item: itemFixture() })
    t.equal(item.tagName, 'DIV')
  })

  test('links the title to the item url', (t) => {
    t.plan(2)
    const item = itemFixture()
    const itemEl = Item({ item })
    t.equal(itemEl.children[0].textContent, 'Bar')
    t.equal(itemEl.children[0].getAttribute('href'), 'https://test.com')
  })

  test('displays the URL component', (t) => {
    t.plan(1)
    const item = itemFixture()
    const itemEl = Item({ item })
    t.ok(itemEl.querySelector('.domain'))
  })

  test('displays the InfoBar component', (t) => {
    t.plan(1)
    const item = itemFixture()
    const itemEl = Item({ item })
    t.ok(itemEl.querySelector('.InfoBar'))
  })

  test('displays the item text', (t) => {
    t.plan(1)
    const item = itemFixture()
    const itemEl = Item({ item })
    const textEl = itemEl.children[3]
    t.equal(textEl.textContent, 'Baz')
  })

  test('displays poll options if item type is poll', (t) => {
    t.plan(1)
    const item = itemFixture()
    const pollOptions = pollOptionsFixture()
    item.type = 'poll'
    const itemEl = Item({ item, pollOptions })
    const pollOptionsEl = itemEl.children[4]
    t.equal(pollOptionsEl.children.length, 2)
  })
})
