const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const databaseConfig = require('../config/database')

const routes = require('../app/routes/index')

class App {
  constructor () {
    this.express = express()

    this.isDEV = process.env.NODE_ENV !== 'production'

    this.middlewares()

    this.database()

    this.routes()
  }

  middlewares () {
    this.express.use(bodyParser.json())

    this.express.use(bodyParser.urlencoded({ extended: true }))
  }

  database () {
    mongoose.connect(
      databaseConfig.mongo.uri,
      {
        useCreateIndex: true,
        useNewUrlParser: true
      }
    )
  }

  routes () {
    this.express.use(routes)
  }
}

module.exports = new App().express
