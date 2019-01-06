const express = require('express')

const router = express.Router()

const UserController = require('../controllers/UserController')

router.get('/', (req, res) => res.send('API Only!'))

router.post('/users', UserController.store)

module.exports = router
