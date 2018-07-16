/**
 * Using the JOI validation library, this function returns a list of the validation options
 * the route is used as the main index and the child indeces are the fields that will be validated
 * with the Joi instruction as its value
 *
 * @param {Joi} Joi
 * @param {String} index = the string being passed in
 *
 * @returns {Object|null}
 */
module.exports = (Joi, index) => {
  let schema = {
    '/test': Joi.object().keys({
      value: Joi.string().required()
    })
  }

  return schema[index] || null
}
