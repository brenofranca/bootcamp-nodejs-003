const express = require("express");
const bodyParser = require("body-parser");

const routes = require("../app/routes/index");

class App {
  constructor() {
    this.express = express();

    this.isDEV = process.env.NODE_ENV !== "production";

    this.middlewares();

    this.routes();
  }

  middlewares() {
    this.express.use(bodyParser.json());
  }

  routes() {
    this.express.use(routes);
  }
}

module.exports = new App().express;
