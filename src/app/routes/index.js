const express = require('express')

const router = express.Router()

const controllers = require('../controllers')
const middlewares = require('../middlewares')

router.get('/', (req, res) => res.send('API Only!'))

router.post('/users', controllers.UserController.store)
router.post('/sessions', controllers.SessionController.store)

module.exports = router
