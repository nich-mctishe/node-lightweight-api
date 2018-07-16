/**
 * This file is where the list of routes will be placed,
 *
 * currently, the route actual will be used as the index
 * (remember the master link (/api) will need to be removed from this link)
 * the contorller filed will specify (but not point to) the controller used
 * the method is optional and will default to get
 * the params may later be converted as the validation and formatting gateway
 */
module.exports = {
  '/test': {
    controller: 'TestController',
    method: 'get',
    params: {

    }
  }
}
