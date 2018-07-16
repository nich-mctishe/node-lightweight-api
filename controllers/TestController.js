module.exports = (req, res, next) => {
  res.result = {
    data: {
      name: 'something to send'
    }
  }

  next()
}
