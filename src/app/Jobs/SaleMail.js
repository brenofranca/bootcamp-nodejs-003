const Mail = require('../services/Mail')

class SaleMail {
  get key () {
    return 'SaleMail'
  }

  async handle (job, done) {
    const { author, post } = job.data

    await Mail.sendMail({
      from: 'Breno França <franciscobreno.si@gmail.com>',
      to: author.email,
      subject: `Solicitação de Compra aceita: ${post.title}`,
      template: `sales/create`,
      context: {
        author,
        post
      }
    })

    return done()
  }
}

module.exports = new SaleMail()
