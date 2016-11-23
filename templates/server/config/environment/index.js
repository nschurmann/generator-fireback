const path = require('path')
const _ = require('lodash')

let all = {
  // Server port
  port: process.env.PORT || 9000,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  root: path.normalize(__dirname + '/../../..'),

  secrets: {
    session: 'smartpark-secret'
  },

  seedDB: false,
}
// Export the config object based on the NODE_ENV
// ==============================================

module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV) || {})