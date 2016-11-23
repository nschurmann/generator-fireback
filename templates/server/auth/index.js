const express = require('express')
var passport = require('passport')
var config = require('../config/environment')
const User = require('../api/user/user.model')
const local = require('./local')

// Passport Configuration
require('./local/passport').setup(User, config)

var router = express.Router()

router.use('/local', local)

module.exports = router
