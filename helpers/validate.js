module.exports = (Joi, index) => {
  let schema = {
    '/test': Joi.object().keys({
      value: Joi.string().required()
    })
  }

  return schema[index] || null
}
