const Test = require('tape')
const InfoBar = require('../../components/info-bar')

const itemFixture = () => {
  return {
    time: new Date().getTime() / 1000,
    type: 'story',
    score: 10,
    by: 'Foo',
    id: 1,
    descendants: 1
  }
}

Test('InfoBar Component', (t) => {
  const test = t.test
  t.plan(5)

  test('returns a div element', (t) => {
    t.plan(1)
    const info = InfoBar({ item: itemFixture() })
    t.equal(info.tagName, 'DIV')
  })

  test('displays only time posted if item.type is not story or poll', (t) => {
    t.plan(1)
    const item = itemFixture()
    item.type = 'job'

    const info = InfoBar({ item })
    t.equal(info.innerText, 'just now')
  })

  test('displays item info', (t) => {
    t.plan(1)
    const item = itemFixture()
    const info = InfoBar({ item })
    const expectedText = '10 points by Foo just now'

    const actualText = info
      .children[0]
      .textContent.replace(/\s\s+/g, ' ')
      .trim()

    t.equal(actualText, expectedText)
  })

  test('displays link to author', (t) => {
    t.plan(1)
    const item = itemFixture()
    const info = InfoBar({ item })
    const linkEl = info.children[0].children[0]
    t.equal(linkEl.getAttribute('href'), '/user/Foo')
  })

  test('displays link to comments', (t) => {
    t.plan(2)
    const item = itemFixture()
    const info = InfoBar({ item })
    const linkEl = info.children[1]
    t.equal(linkEl.innerText, `${item.descendants} comments`)
    t.equal(linkEl.getAttribute('href'), `/item/${item.id}`)
  })
})
