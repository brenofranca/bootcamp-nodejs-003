const express = require('express')
const validate = require('express-validation')

const router = express.Router()

const controllers = require('../controllers')
const validators = require('../validators')
const middlewares = require('../middlewares')

router.get('/', (req, res) => res.send('API Only!'))

router.post(
  '/users',
  validate(validators.User),
  controllers.UserController.store
)
router.post(
  '/sessions',
  validate(validators.Session),
  controllers.SessionController.store
)

router.use(middlewares.Auth)

/**
 *  Post REST API
 */
router.get('/posts', controllers.PostController.index)
router.get('/posts/:id', controllers.PostController.show)
router.post(
  '/posts',
  validate(validators.Post),
  controllers.PostController.store
)
router.put(
  '/posts/:id',
  validate(validators.Post),
  controllers.PostController.update
)
router.delete('/posts/:id', controllers.PostController.destroy)

/**
 *  Purchase Post REST API
 */
router.post(
  '/purchases',
  validate(validators.Purchase),
  controllers.PurchaseController.store
)

module.exports = router
