import * as _ from 'lodash'
import * as express from 'express'
import { IUser } from './user/user.model'

export const respondWithResult = (res, statusCode = 200) =>
  entity =>
    (entity) ? res.status(statusCode).json(entity) : null

export const saveUpdates = (updates) =>
  entity => {
    const updated = _.merge(entity, updates)
    return updated.save()
      .then((updated) => updated)
  }

export const removeEntity = (res) =>
  entity => entity
      ? entity.remove().then(() => res.status(204).end()) : null 

export const handleEntityNotFound = (res) =>
  entity => {
    if (!entity) {
      res.status(404).end()
      return null
    }
    return entity
  }

export const handleError = (res, statusCode = 500) =>
  err => res.status(statusCode).send(err)