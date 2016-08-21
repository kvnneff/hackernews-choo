const Test = require('tape')
const CommentList = require('../../src/components/comments/list')
const commentFixture = require('../fixtures/comment')

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
