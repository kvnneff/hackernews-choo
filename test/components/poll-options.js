const Test = require('tape')
const PollOptions = require('../../src/components/item/poll-options')

const optionsFixture = () => {
  return [{
    text: 'Foo',
    score: 1
  }, {
    text: 'Bar',
    score: 2
  }]
}

Test('PollOptions Component', (t) => {
  const test = t.test
  t.plan(4)

  test('returns a UL element', (t) => {
    t.plan(1)
    const pollEl = PollOptions({ pollOptions: optionsFixture() })
    t.equal(pollEl.tagName, 'UL')
  })

  test('displays correct number of options', (t) => {
    t.plan(2)
    const pollElOne = PollOptions({ pollOptions: optionsFixture() })
    const pollElTwo = PollOptions({ pollOptions: [ optionsFixture().shift() ] })
    t.equal(pollElOne.children.length, 2)
    t.equal(pollElTwo.children.length, 1)
  })

  test('displays option text', (t) => {
    t.plan(1)
    const pollEl = PollOptions({ pollOptions: optionsFixture() })
    t.equal(pollEl.children[0].children[0].textContent, 'Foo')
  })

  test('displays option score', (t) => {
    t.plan(1)
    const pollEl = PollOptions({ pollOptions: optionsFixture() })
    t.equal(pollEl.children[0].children[1].textContent, '1 points')
  })
})
