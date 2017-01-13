/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.ts, and set `seedDB: false`
 */

import User from '../api/user/user.model'
import { users } from './seeddb'

/**
 * Load users: normal user, supervisor and admin
 */
function loadUsers () {
  return User.find({}).remove()
    .then(() => User.create(users))
}

loadUsers()