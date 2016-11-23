import * as _ from 'lodash'
import * as express from 'express'

export const respondWithResult = (res: express.Response, statusCode: number = 200) =>
  (entity: any) =>
    (entity) ? res.status(statusCode).json(entity) : null

export const saveUpdates = (updates: any) =>
  (entity: any) => {
    const updated = _.merge(entity, updates)
    return updated.save()
      .then((updated: any) => updated)
  }

export const removeEntity = (res: express.Response) =>
  (entity: any) => (entity)
      ? entity.remove().then(() => res.status(204).end()) : null 

export const handleEntityNotFound = (res: express.Response) =>
  (entity: any) => {
    if (!entity) {
      res.status(404).end()
      return null
    }
    return entity
  }

export const handleError = (res: express.Response, statusCode: number = 500) =>
  (err: any) => res.status(statusCode).send(err)