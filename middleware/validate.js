const Joi = require('joi')

module.exports = (req, res, next) => {
  /**
   * return 404 if not exists
   */
  if (!req.validations(Joi, req.url.split('?')[0])) {
    return res.status(404).send({
      status: 404,
      error: true,
      message: 'resource not found',
      data: {}
    })
  }
  /**
   * may need to merge body and params together in order to ensure it works
   * with both post and get requests
   */
  const result = Joi.validate(req.query, req.validations(Joi, req.url.split('?')[0]))
  if (result.error) {
    return res.send({
      status: res.statusCode,
      error: true,
      message: 'An Error Occurred',
      data: result.error
    })
  }

  return next()
}
