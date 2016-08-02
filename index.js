const choo = require('choo')
const sheetify = require('sheetify')
const storage = require('./storage')
const StoryList = require('./pages/home')
const Item = require('./pages/item')
const User = require('./pages/user')
const hooks = {}

sheetify('tachyons')
sheetify('loaders.css')

hooks.onStateChange = (action, state) => {
  storage.save(state)
}

hooks.onError = (err) => {
  console.error(err)
}

const app = choo(hooks)

app.model(require('./model'))

app.router(route => [
  route('/', StoryList),
  route('/page/:pageNumber', StoryList),
  route('/item/:itemId', Item),
  route('/user/:userId', User)
])

const tree = app.start()
document.getElementsByTagName('main')[0].appendChild(tree)
