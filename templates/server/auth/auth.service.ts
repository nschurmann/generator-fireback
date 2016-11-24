import * as express from 'express'
const passport = require('passport')
import config from '../config/environment'
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const compose = require('composable-middleware')
import User from '../api/user/user.model'

const validateJwt = expressJwt({
  secret: config.secrets.session
})

export function isAuthenticated() {
  return compose()
    .use(function(req: express.Request & {query: any}, res: express.Response, next: Function) {
      if (req.query && req.query.hasOwnProperty('access_token')) {
        (<any>req.headers).authorization = 'Bearer ' + req.query.access_token
      }
      validateJwt(req, res, next)
    })
    .use(function(req: express.Request & {user: any, query: any}, res: express.Response, next: Function) {
      User.findById(req.user._id).exec()
        .then(user => {
          if (!user) {
            return res.status(401).end()
          }
          req.user = user
          delete req.query.access_token
          next()
        })
        .catch((err: any) => next(err))
    })
}

export function hasRole(roleRequired: string) {
  if (!roleRequired) {
    throw new Error('Required role needs to be set')
  }

  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req: express.Request & {user: any}, res: express.Response, next: Function) {
      if (config.userRoles.indexOf(req.user.role) >=
        config.userRoles.indexOf(roleRequired)) {
        next()
      } else {
        res.status(403).send('Forbidden')
      }
    })
}

export const signToken = (id: string, role: string) =>
  jwt.sign({ _id: id, role: role }, config.secrets.session, { expiresIn: 60 * 60 * 5 })

export function setTokenCookie(req: express.Request & {user: any}, res: express.Response) {
  if (!req.user) {
    return res.status(404).send('It looks like you aren\'t logged in, please try again.')
  }
  var token = signToken(req.user._id, req.user.role)
  res.cookie('token', token)
  res.redirect('/')
}
