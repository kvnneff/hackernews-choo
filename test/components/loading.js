const Test = require('tape')
const Loading = require('../../src/components/loading')

Test('Loading Component', (t) => {
  const test = t.test
  t.plan(3)

  test('returns a div element', (t) => {
    t.plan(1)
    const loading = Loading()
    t.equal(loading.tagName, 'DIV')
  })

  test('displays Loading... as default text', (t) => {
    t.plan(1)
    const loading = Loading()
    t.equal(loading.children[0].innerText, 'Loading...')
  })

  test('displays custom text', (t) => {
    t.plan(1)
    const loading = Loading({ text: 'Foo' })
    t.equal(loading.children[0].innerText, 'Foo')
  })
})
