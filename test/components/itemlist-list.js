const Test = require('tape')
const ItemList = require('../../src/components/item-list/list')
const itemFixture = require('../fixtures/item')

const listFixture = () => {
  return [ itemFixture() ]
}

Test('ItemListList-List Component', (t) => {
  const test = t.test
  t.plan(3)

  test('returns a DIV element', (t) => {
    t.plan(1)
    const listEl = ItemList({
      collection: listFixture(),
      pageNumber: 1,
      storiesPerPage: 30
    })
    t.equal(listEl.tagName, 'DIV')
  })

  test('creates a table row for each list item', (t) => {
    t.plan(1)
    const listEl = ItemList({
      collection: listFixture(),
      pageNumber: 1,
      storiesPerPage: 30
    })
    t.equal(listEl.children[0].children[0].children.length, 1)
  })

  test('properly calculates item index', (t) => {
    t.plan(1)
    const listEl = ItemList({
      collection: listFixture(),
      pageNumber: 2,
      storiesPerPage: 30
    })
    const itemEl = listEl.querySelector('.StoryList-item')
    const index = itemEl.children[0].textContent
    t.equal(index, '31.')
  })
})
