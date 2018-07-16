const _ = require('lodash')

let config = {
  middleware: {
    validate: require('./middleware/validate'),
    send: require('./middleware/send'),
    cache: require('./middleware/cache'),
    formatter: require('./middleware/format')
  },
  default: {
    routes: require('./routes'),
    formats: require('../helpers/format'),
    validations: require('../helpers/validate')
  },
  locations: {
    controllers: './controllers/'
  }
}

/**
 * Parse Routes
 * ensures the controller is able to be required
 * @param {Object} Routes = a list of routes
 * @param {Express.Router} Router = the router object
 *
 * @returns {Void}
 */
const parseRoutes = (routes, router) => {
  _.each(routes, (request, url) => {
    router[request.method || 'get'](url, require(config.locations.controllers + request.controller))
  })
}

config.methods = {
  parseRoutes: parseRoutes
}

/**
 * Update Config
 * amends the config object with the users custom config
 * @param {Object} custom
 *
 * @returns {Void}
 */
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

/**
 * @param {Express} express
 * @param {Object} configeration
 * @param {Function} operation
 *
 * @returns {Express.Router}
 */
module.exports = (express, configeration, operation) => {
  // passed in express app.
  let router = express.Router()

  // add conf to base
  updateConfig(configeration)
  req.formats = config.default.formats
  req.validations = config.default.validations

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
