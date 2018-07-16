const Cache = require('node-cache')
const cache = new Cache({ stdTTL: 500, checkperiod: 600 })

cache.on('expired', (key, value) => {
  console.log('Api Cache: route ' + key + ' cache has expired')
})

cache.on('set', (key, value) => {
  console.log('Api Cache: route ' + key + ' cache has been set')
})

module.exports = (req, res, next) => {
  let key = req.method + ':' + req.url
  // check if teh cache has been set
  if (req.cache === undefined) {
    // nothing has been set so
    // check if there is a cache
    let result = cache.get(key)
    // return cache or set the cache value
    if (result) {
      // format perhaps or just move on
      res.send(result)
    } else {
      req.cache = false
    }
  }

  if (req.cache === false) {
    // set the cache with the result, check to make sure no double set
    let result = cache.get(key)
    if (!result) {
      cache.set(key, res.result)
    }

    next()
  }
}
