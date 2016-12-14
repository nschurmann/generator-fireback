import * as express from 'express'
import <%= modelCapitalized %> from './<%= model %>.model'
import { respondWithResult, handleError, handleEntityNotFound, saveUpdates, removeEntity, IRequest } from '../utils'

// Gets a list of <%= modelCapitalized %>s
export const index = (req: IRequest, res: express.Response) =>
  <%= modelCapitalized %>.find({}).exec()
    .then(respondWithResult(res, 200))
    .catch(handleError(res))

// Create a <%= modelCapitalized %>
export const create = (req: IRequest, res: express.Response) =>
  <%= modelCapitalized %>.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res))

// Gets a single <%= modelCapitalized %> from the DB
export const show = (req: IRequest, res: express.Response) =>
  <%= modelCapitalized %>.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res, 200))
    .catch(handleError(res))

// Updates an existing <%= modelCapitalized %> in the DB
export const update = (req: IRequest, res: express.Response) => {
  if (req.body._id) {
    delete req.body._id
  }
  return <%= modelCapitalized %>.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res, 204))
    .catch(handleError(res))
}

// Deletes a <%= modelCapitalized %> from the DB
export const destroy = (req: IRequest, res: express.Response) =>
  <%= modelCapitalized %>.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res))
