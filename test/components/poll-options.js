const Test = require('tape')
const PollOptions = require('../../src/components/item/poll-options')
const pollOptionsFixture = require('../fixtures/poll-options')

Test('PollOptions Component', (t) => {
  const test = t.test
  t.plan(4)

  test('returns a UL element', (t) => {
    t.plan(1)
    const pollEl = PollOptions({ pollOptions: pollOptionsFixture() })
    t.equal(pollEl.tagName, 'UL')
  })

  test('displays correct number of options', (t) => {
    t.plan(2)
    const pollElOne = PollOptions({ pollOptions: pollOptionsFixture() })
    const pollElTwo = PollOptions({ pollOptions: [ pollOptionsFixture().shift() ] })
    t.equal(pollElOne.children.length, 2)
    t.equal(pollElTwo.children.length, 1)
  })

  test('displays option text', (t) => {
    t.plan(1)
    const pollEl = PollOptions({ pollOptions: pollOptionsFixture() })
    t.equal(pollEl.children[0].children[0].textContent, 'Foo')
  })

  test('displays option score', (t) => {
    t.plan(1)
    const pollEl = PollOptions({ pollOptions: pollOptionsFixture() })
    t.equal(pollEl.children[0].children[1].textContent, '1 points')
  })
})
