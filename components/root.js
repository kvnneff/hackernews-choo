const h = require('choo/html')

const Root = content => {
  return h`<div>
    <header class="bg-dark-green white pv2 w-100 ph3 ph4-m ph4-ns">
      <h1 class="f5 f3-m f2-l mv0"><a href="/" class="link white hover-white">Hacker News</a></h1>
    </header>
    <div>
      ${content}
    </div>
  </div>`
}

module.exports = Root
