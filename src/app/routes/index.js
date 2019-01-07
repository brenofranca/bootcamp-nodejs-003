const express = require('express')
const validate = require('express-validation')
const handle = require('express-async-handler')
const router = express.Router()

const controllers = require('../controllers')
const validators = require('../validators')
const middlewares = require('../middlewares')

router.get('/', (req, res) => res.send('API Only!'))

router.post(
  '/users',
  validate(validators.User),
  handle(controllers.UserController.store)
)
router.post(
  '/sessions',
  validate(validators.Session),
  handle(controllers.SessionController.store)
)

router.use(middlewares.Auth)

/**
 *  Post REST API
 */
router.get('/posts', handle(controllers.PostController.index))
router.get('/posts/:id', handle(controllers.PostController.show))
router.post(
  '/posts',
  validate(validators.Post),
  handle(controllers.PostController.store)
)
router.put(
  '/posts/:id',
  validate(validators.Post),
  handle(controllers.PostController.update)
)
router.delete('/posts/:id', handle(controllers.PostController.destroy))

/**
 *  Purchase Post REST API
 */
router.post(
  '/purchases',
  validate(validators.Purchase),
  handle(controllers.PurchaseController.store)
)

router.put('/purchases/:id', handle(controllers.SaleController.update))

module.exports = router
