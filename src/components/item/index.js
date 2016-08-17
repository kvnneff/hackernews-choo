const h = require('choo/html')
const URL = require('../url')
const InfoBar = require('../info-bar')
const PollOptions = require('./poll-options')

const Item = state => {
  const { item, pollOptions, onLoad } = state
  return h`<div class="Item" onload=${onLoad}>
    <a href="${item.url}" class="link">${item.title}</a>
    ${URL(item)}
    ${InfoBar({ item })}
    ${item.text ? itemText(item.text) : ''}
    ${item.type === 'poll' ? PollOptions({ pollOptions }) : ''}
  </div>`
}

function itemText (text) {
  const itemText = h`<p></p>`
  itemText.innerHTML = text
  return itemText
}

module.exports = Item
