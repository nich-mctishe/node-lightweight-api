/**
 * This object contains a list of params for each route
 * the route is used as the main index and the child indeces are the fields that will be formatted
 * each field will contain a function that will return the formatted object
 */
module.exports = {
  '/test': {
    value: (param) => {
      return param.split('')
    }
  }
}
