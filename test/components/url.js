const Test = require('tape')
const URL = require('../../components/url')

Test('URL Component', (t) => {
  const test = t.test
  t.plan(4)

  test('returns a span element when a url is passed in', (t) => {
    t.plan(1)
    const url = URL({ url: 'https://foo.com' })
    t.equal(url.tagName, 'SPAN')
  })

  test('returns a properly formatted url', (t) => {
    t.plan(1)
    const url = URL({ url: 'https://foo.com' })
    t.equal(url.innerText, '(foo.com)')
  })

  test('returns an empty string if no url is passed in', (t) => {
    t.plan(1)
    const url = URL()
    t.equal(url, '')
  })

  test('returns an empty string if url is self-referential', (t) => {
    t.plan(1)
    const url = URL({ url: '/item/12345' })
    t.equal(url, '')
  })
})
