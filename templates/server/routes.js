const auth = require('./auth')
const user = require('./api/user')

const errors = require('./components/errors')
const path = require('path')

module.exports = (app) => {

  // Insert routes below
  app.use('/api/users', user)

  app.use('/auth', auth)

  // don't explode if no user token is provided.
  app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') { res.sendStatus(401) }
  })

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(errors[404])

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'))
    })
}
