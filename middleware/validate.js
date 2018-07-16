const Joi = require('joi')

module.exports = (req, res, next) => {
  /**
   * may need to merge body and params together in order to ensure it works
   * with both post and get requests
   */
  const result = Joi.validate(req.query, req.validations(Joi, req.url.split('?')[0]))
  if (result.error) {
    return res.send(result.error)
  }

  return next()
}
