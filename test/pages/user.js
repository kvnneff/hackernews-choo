const Test = require('tape')
const Emitter = require('component-emitter')
const UserPage = require('../../src/pages/user')
const emitter = new Emitter()

const userFixture = () => {
  return {
    created: new Date().getTime() / 1000,
    karma: 100,
    id: 'Foo',
    about: 'Baz'
  }
}

function dispatch (msg, data) {
  emitter.emit(msg, data)
}

Test('User Page', (t) => {
  const test = t.test
  t.plan(9)

  test('returns a div element', (t) => {
    t.plan(1)
    const params = { userId: 'Foo' }
    const user = userFixture()
    const page = UserPage({ user, params, dispatch })
    t.equal(page.tagName, 'DIV')
  })

  test('dispatches fetchUser if user is not supplied via state', (t) => {
    t.plan(1)

    emitter.on('fetchUser', (userId) => {
      emitter.off()
      t.equal(userId, 'Foo')
    })

    const params = { userId: 'Foo' }
    UserPage({ params }, {}, dispatch)
  })

  test('dispatches fetchUser if userId parameter does not match current user state', (t) => {
    t.plan(2)

    emitter.on('fetchUser', (userId) => {
      emitter.off()
      t.equal(userId, 'Bar')
    })

    const user = userFixture()
    const params = { userId: 'Bar' }
    t.equal(user.id, 'Foo')
    UserPage({ params, user }, {}, dispatch)
  })

  test('displays the user id', (t) => {
    t.plan(1)
    const params = { userId: 'Foo' }
    const user = userFixture()
    const page = UserPage({ user, params, dispatch })
    const el = page.querySelector('.User')
    t.equal(el.children[0].textContent, 'Foo')
  })

  test('displays link to user submissions', (t) => {
    t.plan(2)
    const params = { userId: 'Foo' }
    const user = userFixture()
    const page = UserPage({ user, params })
    const el = page.querySelector('.User')
    const submissionsLink = el.children[1].children[0]
    t.equal(submissionsLink.textContent.trim(), 'submissions')
    t.equal(submissionsLink.getAttribute('href'), `https://news.ycombinator.com/submitted?id=${user.id}`)
  })

  test('displays link to user comments', (t) => {
    t.plan(2)
    const params = { userId: 'Foo' }
    const user = userFixture()
    const page = UserPage({ user, params })
    const el = page.querySelector('.User')
    const commentsLink = el.children[1].children[1]
    t.equal(commentsLink.textContent.trim(), 'comments')
    t.equal(commentsLink.getAttribute('href'), `https://news.ycombinator.com/comments?id=${user.id}`)
  })

  test('displays user created date', (t) => {
    t.plan(1)
    const params = { userId: 'Foo' }
    const user = userFixture()
    const page = UserPage({ user, params })
    const el = page.querySelector('.User')
    const createdEl = el.children[2].children[0].children[1]
    t.equal(createdEl.textContent, 'just now')
  })

  test('displays user karma', (t) => {
    t.plan(1)
    const params = { userId: 'Foo' }
    const user = userFixture()
    const page = UserPage({ user, params })
    const el = page.querySelector('.User')
    const karmaEl = el.children[2].children[1].children[1]
    t.equal(karmaEl.textContent, '100')
  })

  test('displays about text', (t) => {
    t.plan(1)
    const params = { userId: 'Foo' }
    const user = userFixture()
    const page = UserPage({ user, params })
    const el = page.querySelector('.User')
    const aboutEl = el.children[3].children[1]
    t.equal(aboutEl.textContent, 'Baz')
  })
})
