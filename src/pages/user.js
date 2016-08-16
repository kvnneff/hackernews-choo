const h = require('choo/html')
const sanitizeHTML = require('sanitize-html')
const approx = require('approximate-time')
const Loading = require('../components/loading')
const Root = require('../components/root')

const User = (state, prevState, dispatch) => {
  const { userId } = state.params
  const { user } = state

  if (!user || userId !== user.id) {
    dispatch('fetchUser', userId)
    return Loading({ text: 'Fetching user...' })
  }

  return Root(h`<div class="User navy center cf">
    <h2 class="mb0">${user.id}</h2>
    <div class="f6">
      <a class="link" href="https://news.ycombinator.com/submitted?id=${user.id}">
        submissions
      </a>
      |
      <a class="link" href="https://news.ycombinator.com/comments?id=${user.id}">
        comments
      </a>
    </div>
    <div class="mv3">
      <dl class="dib mr5">
        <dd class="f6 f5-ns b ml0">Created</dt>
        <dd class="f4 f3-ns b ml0">${timeAgo(user.created)}</dt>
      </dl>
      <dl class="dib mr5">
        <dd class="f6 f5-ns b ml0">Karma</dt>
        <dd class="f4 f3-ns b ml0">${user.karma}</dt>
      </dl>
    </div>
    ${About(user.about)}
  </div>`)
}

const timeAgo = timestamp => {
  let posted = approx(timestamp * 1000)
  if (posted !== 'just now') posted = `${posted} ago`
  return h`<span>${posted}</span>`
}

const About = (text) => {
  if (!text) return ''
  const aboutEl = h`<p></p>`
  aboutEl.innerHTML = sanitizeHTML(text)

  return h`<div class="bg-near-white pa3">
    <h3 class="mt0">About</h3>
    ${aboutEl}
  </div>`
}

module.exports = User
