import * as express from 'express'
import * as handler from'./user.handler'
import { isAuthenticated } from '../../auth/auth.service'

var router = express.Router()

router.get('/me', isAuthenticated(), handler.me)
router.put('/me', isAuthenticated(), handler.updateMe)
router.get('/', isAuthenticated(), handler.index)
router.get('/:id', isAuthenticated(), handler.show)
router.put('/:id', isAuthenticated(), handler.update)
router.delete('/:id', isAuthenticated(), handler.destroy)

export default router
