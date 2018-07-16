const _ = require('lodash')

module.exports = (req, res, next) => {
  let url = req.url.split('?')[0]
  // may need to merge query, and body
  if (!_.get(req.formats, url)) {
    return next()
  }

  _.each(req.query, (param, i) => {
    req.query[i] = req.formats[url][i](param)
  })

  return next()
}
