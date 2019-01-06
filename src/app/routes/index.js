const express = require('express')

const router = express.Router()

const UserController = require('../controllers/UserController')
const SessionController = require('../controllers/SessionController')

router.get('/', (req, res) => res.send('API Only!'))

router.post('/users', UserController.store)
router.post('/sessions', SessionController.store)

module.exports = router
