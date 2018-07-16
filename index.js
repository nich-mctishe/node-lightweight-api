const _ = require('lodash')

let config = {
  middleware: {
    validate: require('./middleware/validate'),
    send: require('./middleware/send'),
    cache: require('./middleware/cache'),
    formatter: require('./middleware/format')
  },
  methods: {
    parseRoutes: parseRoutes
  },
  default: {
    routes: require('./routes')
  },
  locations: {
    controllers: './controllers/'
  }
}

const parseRoutes = (routes, router) => {
  _.each(routes, (request, url) => {
    router[request.method || 'get'](url, require(config.locations.controllers + request.controller))
  })
}

const updateConfig = (custom) => {
  _.each(custom, (block, name) => {
    _.each(block, (field, index) => {
      if (!config[name]) {
        config[name] = {}
      }

      config[name][index] = field
    })
  })
}

module.exports = (express, configeration, operation) => {
  // passed in express app.
  let router = express.Router()

  // add conf to base
  updateConfig(configeration)

  if (operation) {
    return operation(config, router)
  }

  // run middleware
  router.use(config.middleware.cache)
  router.use(config.middleware.validate)
  router.use(config.middleware.formatter)
  // run all in the routes.js and connect to express
  config.methods.parseRoutes(config.default.routes, router)
  router.use(config.middleware.cache)
  router.use(config.middleware.send)
  // return result
  return router
}
