const express = require('express')
const handler = require('./user.handler')
const isAuthenticated = require('../../auth/auth.service').isAuthenticated

var router = express.Router()

router.get('/me', isAuthenticated(), handler.me)
router.put('/me', isAuthenticated(), handler.updateMe)
router.get('/', isAuthenticated(), handler.index)
router.get('/:id', isAuthenticated(), handler.show)
router.put('/:id', isAuthenticated(), handler.update)
router.delete('/:id', isAuthenticated(), handler.destroy)

module.exports = router
