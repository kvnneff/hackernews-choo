const Test = require('tape')
const Comment = require('../../src/components/comments/item')
const commentFixture = require('../fixtures/comment')

Test('CommentItem Component', (t) => {
  const test = t.test
  t.plan(6)

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

  test('displays link to comment author', (t) => {
    t.plan(1)
    const item = commentFixture()
    const comment = Comment({ item })
    const authorLink = comment.children[0].children[0]

    t.equal(authorLink.getAttribute('href'), '/user/Foo')
  })

  test('displays time comment was posted', (t) => {
    t.plan(1)
    const item = commentFixture()
    const comment = Comment({ item })
    const postedDate = comment.children[0].children[1]

    t.equal(postedDate.textContent, 'just now')
  })

  test('displays comment body', (t) => {
    t.plan(1)
    const item = commentFixture()
    const comment = Comment({ item })
    const commentBody = comment.children[1].textContent.replace(/\s\s+/g, '')

    t.equal(commentBody, 'Baz')
  })

  test('displays child comments', (t) => {
    t.plan(2)
    const item = commentFixture()
    const comment = Comment({ item })
    const childComment = comment.children[2].children[0]

    t.ok(childComment)
    t.equal(childComment.tagName, 'LI')
  })
})
