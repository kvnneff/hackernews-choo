const Test = require('tape')
const Item = require('../../src/components/item-list/item')

const itemFixture = () => {
  return {
    time: new Date().getTime() / 1000,
    by: 'Foo',
    title: 'Bar',
    id: 1,
    text: 'Baz',
    url: 'https://test.com',
    descendants: 2
  }
}

Test('ItemList-Item Component', (t) => {
  const test = t.test
  t.plan(5)

  test('returns a TR element', (t) => {
    t.plan(1)
    const item = Item({ item: itemFixture(), index: 1 })
    t.equal(item.tagName, 'TR')
  })

  test('displays the given index', (t) => {
    t.plan(1)
    const item = itemFixture()
    const itemEl = Item({ item, index: 1 })
    t.equal(itemEl.children[0].textContent, '1.')
  })

  test('displays title as link to article source', (t) => {
    t.plan(2)
    const item = itemFixture()
    const itemEl = Item({ item })
    const titleEl = itemEl.children[1].children[0]

    t.equal(titleEl.getAttribute('href'), 'https://test.com')
    t.equal(titleEl.textContent.replace(/\s\s+/g, ' ').trim(), 'Bar')
  })

  test('displays URL component', (t) => {
    t.plan(1)
    const item = itemFixture()
    const itemEl = Item({ item })
    const urlEl = itemEl.children[1].children[1].children[0]
    t.equal(urlEl.classList[0], 'domain')
  })

  test('displays InfoBar component', (t) => {
    t.plan(1)
    const item = itemFixture()
    const itemEl = Item({ item })
    const infoEl = itemEl.children[1].children[2].children[0]

    t.equal(infoEl.classList[0], 'InfoBar')
  })
})
