const Joi = require('joi')

module.exports = {
  body: {
    post: Joi.string().required(),
    content: Joi.string().required()
  }
}
