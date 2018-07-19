module.exports = (req, res, next) => {
  res.result = {
    name: 'something to send'
  }

  next()
}
