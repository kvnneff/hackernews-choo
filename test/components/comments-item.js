const Test = require('tape')
const Comment = require('../../components/comments/item')

const commentFixture = () => {
  return {
    time: new Date().getTime() / 1000,
    by: 'Foo',
    id: 1,
    text: 'Baz',
    children: [
      {
        time: new Date().getTime() / 1000,
        by: 'Bar',
        text: 'Qux',
        id: 2
      }
    ]
  }
}

Test('CommentItem Component', (t) => {
  const test = t.test
  t.plan(2)

  test('returns an li element with class name comment', (t) => {
    t.plan(2)
    const comment = Comment({ item: commentFixture() })
    t.equal(comment.tagName, 'LI')
    t.equal(comment.classList[0], 'comment')
  })

  test('returns empty string if comment has been deleted', (t) => {
    t.plan(1)
    const item = commentFixture()
    item.deleted = true

    const comment = Comment({ item })
    t.equal(comment, '')
  })
})
