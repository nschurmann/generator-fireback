import * as express from 'express'
import User from './user.model'
import { respondWithResult, handleError, handleEntityNotFound, saveUpdates, removeEntity } from '../utils'

// Gets user profile
export const me = (req, res) =>
  respondWithResult(res, 200)(req.user)

export const updateMe = (req, res) => {
  if (req.body.role) delete req.body.role;
  req.params.id = req.user._id
  update(req, res)
}

// Gets a list of Users
export const index = (req, res) => {
  return User.find({}).exec()
    .then(respondWithResult(res, 200))
    .catch(handleError(res))
}

// Gets a single User from the DB
export function show(req, res) {
  return User.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res, 200))
    .catch(handleError(res))
}

// Updates an existing User in the DB
export function update(req, res) {
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
export function destroy(req, res) {
  return User.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res))
}