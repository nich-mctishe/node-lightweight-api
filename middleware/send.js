module.exports = (req, res) => {
  // could ensure it is all formatted here

  res.send({
    error: false,
    status: res.statusCode,
    data: res.result
  })
}
