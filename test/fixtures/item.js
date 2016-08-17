const itemFixture = () => {
  return {
    time: new Date().getTime() / 1000,
    by: 'Foo',
    title: 'Bar',
    id: 1,
    text: 'Baz',
    url: 'https://test.com',
    descendants: 2,
    type: 'story'
  }
}

module.exports = itemFixture
