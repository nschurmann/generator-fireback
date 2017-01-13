const express = require('express')
const favicon = require('serve-favicon')
const morgan = require('morgan')
const compression = require('compression')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const errorHandler = require('errorhandler')
const path = require('path')
const open = require('open')
import config from './environment'
const passport = require('passport')

export default function (app) {
  var env = app.get('env')

  app.use(compression())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(methodOverride())
  app.use(cookieParser())
  app.use(passport.initialize())

  app.set('appPath', path.join(config.root, '../public'))

  if ('production' === env) {
    app.use(favicon(path.join(config.root, 'client', 'favicon.ico')))
    app.use(express.static(app.get('appPath')))
    app.use(morgan('dev'))
  }

  if ('development' === env || 'test' === env) {
    app.use(express.static(path.join(config.root, '.tmp')))
    app.use(express.static(app.get('appPath')))
    app.use(morgan('dev'))
    app.use(errorHandler()) // Error handler - has to be last
    open('http://localhost:9000')
  }
}
