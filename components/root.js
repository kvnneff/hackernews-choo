const h = require('choo/html')
const sheetify = require('sheetify')

const Root = content => {
  return h`<div>
    <header class="bg-dark-green white pv2 w-100 ph3 ph4-m ph4-ns">
      <h1 class="f5 f3-m f2-l mv0"><a href="/" class="link white hover-white">Hacker News</a></h1>
    </header>
    <div>
      ${content}
    </div>
    ${footer()}
  </div>`
}

const footerPrefix = sheetify`
  :host {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 1rem;
  }
`

function footer () {
  return h`<footer class="${footerPrefix} bg-near-white pv3 w-100 bt b--light-gray">
    <div class="tc f6 gray">
      Built with <a class="link" href="https://github.com/yoshuawuyts/choo">Choo</a>
      | <a class="link" href="https://github.com/kvnneff/hackernews-choo">Source</a>
    </div>
  </footer>`
}

module.exports = Root
