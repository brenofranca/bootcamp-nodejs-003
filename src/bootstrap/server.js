require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Youch = require('youch')
const Sentry = require('@sentry/node')
const validate = require('express-validation')
const sentryConfig = require('../config/sentry')
const databaseConfig = require('../config/database')

const routes = require('../app/routes/index')

class App {
  constructor () {
    this.express = express()

    this.isDEV = process.env.NODE_ENV !== 'production'

    this.sentry()

    this.middlewares()

    this.database()

    this.routes()

    this.exceptions()
  }

  sentry () {
    Sentry.init({ dsn: sentryConfig.dsn })
  }

  middlewares () {
    this.express.use(Sentry.Handlers.requestHandler())

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

  exceptions () {
    if (process.env.NODE_ENV === 'production') {
      this.express.use(Sentry.Handlers.errorHandler())
    }

    this.express.use(async (err, req, res, next) => {
      if (err instanceof validate.ValidationError) {
        return res.status(err.status).json(err)
      }

      if (process.env.NODE_ENV !== 'production') {
        const youch = new Youch(err, req)

        return res.json(await youch.toJSON())
      }

      return res
        .status(err.status || 500)
        .json({ error: 'Internal server Error.' })
    })
  }
}

module.exports = new App().express
