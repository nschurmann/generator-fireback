import * as express from 'express'
import User, { IUser } from '../../api/user/user.model'
const jwt = require('jsonwebtoken')
const passport = require('passport')
import * as auth from '../auth.service'
import config from '../../config/environment'

const router = express.Router()

const validationError = (res: express.Response, statusCode: number = 422) =>
  (err: any) => res.status(statusCode).json(err)
  

router.post('/', function(req: express.Request, res: express.Response, next: Function) {
  passport.authenticate('local', function(err: any, user: IUser, info: any) {
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

router.post('/create', function create(req: express.Request, res: express.Response, next: Function) {
  try {
    const newUser = new User(req.body)
    newUser.provider = 'local'
    newUser.role = 'user'
    newUser.save(function(err: any, user: any) {
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
