const api = require('./hackernews-api')

const topStories = (dispatch, done) => {
  api.subscribe((err, ids) => {
    if (err) return done(err)
    dispatch('updateIds', { payload: ids }, done)
  })
}

module.exports = [
  topStories
]
