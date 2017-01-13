import * as express from 'express'
import User from '../../api/user/user.model'
const jwt = require('jsonwebtoken')
const passport = require('passport')
import * as auth from '../auth.service'
import config from '../../config/environment'

const router = express.Router()

const validationError = (res, statusCode = 422) =>
  err => res.status(statusCode).json(err)

router.post('/', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    const error = err || info
    if (error) {
      return res.status(401).json(error)
    }
    if (!user) {
      return res.status(404).json({ message: 'Something went wrong, please try again.' })
    }

    const token = auth.signToken(user._id, user.role)
    res.json({ token: token })
  })(req, res, next)
})

router.post('/create', function create(req, res, next) {
  try {
    const newUser = new User(req.body)
    newUser.provider = 'local'
    newUser.role = 'user'
    newUser.save(function(err, user) {
      if (err)
        return validationError(res)
      var token = jwt.sign({ _id: user._id }, config.secrets.session, {
        expiresIn: 60 * 60 * 5
      })
      res.json({ token })
    })
  }catch(e) {
    console.log(e)
  }
})

export default router
