var passport = require('passport')
const config = require('../config/environment')
var jwt = require('jsonwebtoken')
var expressJwt = require('express-jwt')
var compose = require('composable-middleware')
const User = require('../api/user/user.model')

var validateJwt = expressJwt({
  secret: config.secrets.session
})

module.exports.isAuthenticated = function isAuthenticated() {
  return compose()
    .use(function(req, res, next) {
      if (req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.query.access_token
      }
      validateJwt(req, res, next)
    })
    .use(function(req, res, next) {
      User.findById(req.user._id).exec()
        .then(user => {
          if (!user) {
            return res.status(401).end()
          }
          req.user = user
          delete req.query.access_token
          next()
        })
        .catch((err) => next(err))
    })
}

module.exports.hasRole = function hasRole(roleRequired) {
  if (!roleRequired) {
    throw new Error('Required role needs to be set')
  }

  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      if (config.userRoles.indexOf(req.user.role) >=
        config.userRoles.indexOf(roleRequired)) {
        next()
      } else {
        res.status(403).send('Forbidden')
      }
    })
}

module.exports.signToken = (id, role) =>
  jwt.sign({ _id: id, role: role }, config.secrets.session, { expiresIn: 60 * 60 * 5 })

module.exports.setTokenCookie = function setTokenCookie(req, res) {
  if (!req.user) {
    return res.status(404).send('It looks like you aren\'t logged in, please try again.')
  }
  var token = signToken(req.user._id, req.user.role)
  res.cookie('token', token)
  res.redirect('/')
}
