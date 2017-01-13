const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

function localAuthenticate(User, email, password, done) {
  User.findOne({
    email: email.toLowerCase().trim()
  })
    .exec(function(err, user) {
      if(err)
        return done(err)

      if (!user) {
        return done(null, false, {
          message: 'This email is not registered.'
        })
      }
      user.authenticate(password, function(authError, authenticated) {
        if (authError) {
          return done(authError)
        }
        if (!authenticated) {
          return done(null, false, {
            message: 'This password is not correct.'
          })
        } else {
          return done(null, user)
        }
      })
    })
}

export const setup = function(User, config) {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password' // this is the virtual field on the model
  }, function(email, password, done) {
    return localAuthenticate(User, email, password, done)
  }))
}
