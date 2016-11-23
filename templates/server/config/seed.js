/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.ts, and set `seedDB: false`
 */

const User = require('../api/user/user.model')
const { users } = require('./seeddb')

/**
 * Load users: normal user, supervisor and admin
 */
function loadUsers () {
  return User.find({}).remove()
    .then(() => User.create(users))
}

loadUsers()