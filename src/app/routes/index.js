const express = require('express')

const router = express.Router()

const controllers = require('../controllers')
const authMiddleware = require('../middlewares/auth')

router.get('/', (req, res) => res.send('API Only!'))

router.post('/users', controllers.UserController.store)
router.post('/sessions', controllers.SessionController.store)

router.use(authMiddleware)

/**
 *  Post REST API
 */
router.get('/posts', controllers.PostController.index)
router.get('/posts/:id', controllers.PostController.show)
router.post('/posts', controllers.PostController.store)
router.put('/posts/:id', controllers.PostController.update)
router.delete('/posts/:id', controllers.PostController.destroy)

/**
 *  Purchase Post REST API
 */
router.post('/purchases', controllers.PurchaseController.store)

module.exports = router
