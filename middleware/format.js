const formatter = require('../helpers/format')
const _ = require('lodash')

module.exports = (req, res, next) => {
  let url = req.url.split('?')[0]
  // may need to merge query, and body
  if (!_.get(formatter, url)) {
    return next()
  }

  _.each(req.query, (param, i) => {
    req.query[i] = formatter[url][i](param)
  })

  return next()
}
