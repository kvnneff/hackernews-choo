const Test = require('tape')
const CommentList = require('../../src/components/comments/list')

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

Test('CommentList Component', (t) => {
  const test = t.test
  t.plan(3)

  test('returns a UL element', (t) => {
    t.plan(1)
    const comments = CommentList({ comments: [commentFixture()] })
    t.equal(comments.tagName, 'UL')
  })

  test('returns empty string if no comments are given', (t) => {
    t.plan(1)
    const comments = CommentList({ comments: [] })
    t.equal(comments, '')
  })

  test('displays comments', (t) => {
    t.plan(1)
    const comments = CommentList({ comments: [commentFixture()] })
    t.equal(comments.children.length, 1)
  })
})
