exports.getDomain = function getDomain (url) {
  const matches = url.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i)
  const domain = matches && matches[1]
  return domain
}
