const User = require('./user.model')
const { respondWithResult, handleError, handleEntityNotFound, saveUpdates, removeEntity } = require('../utils')

// Gets user profile
module.exports.me = (req, res) =>
  respondWithResult(res, 200)(req.user)

module.exports.updateMe = (req, res) => {
  if (req.body.role) delete req.body.role;
  req.params.id = req.user._id
  update(req, res)
}

// Gets a list of Users
module.exports.index = (req, res) => {
  return User.find({}).exec()
    .then(respondWithResult(res, 200))
    .catch(handleError(res))
}

// Gets a single User from the DB
module.exports.show = (req, res) => {
  return User.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res, 200))
    .catch(handleError(res))
}

// Updates an existing User in the DB
module.exports.update = (req, res) => {
  if (req.body._id) {
    delete req.body._id
  }
  return User.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res, 204))
    .catch(handleError(res))
}

// Deletes a User from the DB
module.exports.destroy = (req, res) => {
  return User.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res))
}