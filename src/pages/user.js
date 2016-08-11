const h = require('choo/html')
const sanitizeHTML = require('sanitize-html')
const approx = require('approximate-time')
const Loading = require('../components/loading')
const Root = require('../components/root')

const User = (state, prevState, dispatch) => {
  const { userId } = state.params
  const { user } = state
  const aboutEl = h`<span></span>`

  if (!user || userId !== user.id) {
    dispatch('fetchUser', userId)
    return Loading()
  }

  if (user.about) aboutEl.innerHTML = sanitizeHTML(user.about)

  return Root(h`<div class="helvetica ph3 ph4-ns center cf">
    <article class="">
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
          <dd class="f4 f3-ns b ml0">${approx(user.created * 1000)} ago</dt>
        </dl>
        <dl class="dib mr5">
          <dd class="f6 f5-ns b ml0">Karma</dt>
          <dd class="f4 f3-ns b ml0">${user.karma}</dt>
        </dl>
      </div>
      ${user.about ? h`<div>
        <div class="bg-near-white pa3">
        <h3 class="mt0">About</h3>
        ${aboutEl}</div>
      </div>` : ''}
    </article>
  </div>`)
}

module.exports = User
