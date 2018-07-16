# Node Lightweight API

This is a lightweight API for an express based node application built originally to work with a wercker based setup, but flexible enough to work with most express based configurations.

can get you a simple api set up within a short amount of time. especially when combined with the seeder.

## Contents

1. installation
2. setup
3. configuration
4. overriding the config
5. overriding the call stack
6. controllers
7. middleware

## Installation

Installation works simply by requiring the package as a dependency in the package.json file.

The file will need to be required in the index.js page

` const api = require('node-lightweight-api') `

in its simplest form, the package can be run out of the box like this:

` app.use('/api', api(express, {}, null), function (req, res) {
  res.sendStatus(401)
}) `

this, if placed before app.listen, will run a simple api that will route through to a test controller.

## Setup

The script on postinstall will create a modules/actions folder and fill it with the
following structure:

```
controllers/
  TestController.js
helpers/
  format.js
  validate.js
middleware
  format.js
  validate.js
models/
services/
routes.js
```

this structure is useful to overriding the default structure but not necessary so long as it is correctly linked to in the configuration (discussed later).

If any changes to the routes are required, or the controllers need to do specifc tasks, the code for those should reside in these folders.

## configuration

the default configuration object is as follows:

``` javascript
{
  middleware: {
    validate: require('./middleware/validate'),
    send: require('./middleware/send'),
    cache: require('./middleware/cache'),
    formatter: require('./middleware/format')
  },
  default: {
    routes: require('./routes'),
    formats: require('./helpers/format'),
    validations: require('./helpers/validate')
  },
  locations: {
    controllers: './controllers/'
  },
  methods = {
    parseRoutes: [function]
  }
}
```

the above is all local to the node_modules folder that actions will reside in.

## overriding the config
to override or add config, new rules can be provided on init of the api function.

``` javascript
app.use('/api', api(express, {
  locations: {
    controllers: '../../modules/actions/controllers/'
  },
  default: {
    validations: require('./modules/actions/helpers/validate'),
    formats: require('./modules/actions/helpers/format')
  }
}, null), function (req, res) {
  res.sendStatus(401)
})
```

these new configurations will then override the existing ones, meraning you can take control of the entire config yourself.

## overriding the call stack

if you would prefer to add or takeaway middleware or change what is processed, the last parameter of the function is for an override method.

```javascript
app.use('/api', api(express, {
  locations: {
    controllers: '../../modules/actions/controllers/'
  },
  default: {
    validations: require('./modules/actions/helpers/validate'),
    formats: require('./modules/actions/helpers/format')
  }
}, (config, router) => {

  // run middleware
  router.use(config.middleware.cache)
  router.use(config.middleware.validate)
  router.use(config.middleware.formatter)
  // run all in the routes.js and connect to express
  config.methods.parseRoutes(config.default.routes, router)
  router.use(config.middleware.cache)
  router.use(config.middleware.send)

  return router
}, function (req, res) {
  res.sendStatus(401)
})
```

## Middleware

Out of the box, there are 4 middleware components.

1. cache - this caches the request and retrieves it. it is the only one that is called twice.
2. format - this provides rules to enable the user to ensure the data is in the correct format
3. send - enables formatting of the request payload.
4. validate - runs validation based on JOI rules supplied in the helpers folder.

## Controllers

the controllers will run the functionality and their default location can be reset from locations.controllers in the config. postinstall provides a clean place to store them along with their affiliated helpers and services. The controller locatio will need to be updated in the config when you do that.
