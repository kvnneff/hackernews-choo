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

module.exports = commentFixture
