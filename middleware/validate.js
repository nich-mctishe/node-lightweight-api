const Joi = require('joi')
const schema = require('../helpers/validate')

module.exports = (req, res, next) => {
  // for each criteria ensure they are there
  /**
   * may need to merge body and params together in order to ensure it works
   * with both post and get requests
   */
  const result = Joi.validate(req.query, schema(Joi, req.url.split('?')[0]))
  if (result.error) {
    return res.send(result.error)
  }

  return next()
}
