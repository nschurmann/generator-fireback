const _ = require('lodash')

module.exports.respondWithResult = (res, statusCode = 200) =>
  (entity) =>
    (entity) ? res.status(statusCode).json(entity) : null

module.exports.saveUpdates = (updates) =>
  (entity) => {
    const updated = _.merge(entity, updates)
    return updated.save()
      .then((updated) => updated)
  }

module.exports.removeEntity = (res) =>
  (entity) => (entity)
      ? entity.remove().then(() => res.status(204).end()) : null 

module.exports.handleEntityNotFound = (res) =>
  (entity) => {
    if (!entity) {
      res.status(404).end()
      return null
    }
    return entity
  }

module.exports.handleError = (res, statusCode = 500) =>
  (err) => res.status(statusCode).send(err)