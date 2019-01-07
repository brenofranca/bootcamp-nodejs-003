const Mail = require('../services/Mail')

class PurchaseMail {
  get key () {
    return 'PurchaseMail'
  }

  async handle (job, done) {
    const { post, user, content } = job.data

    await Mail.sendMail({
      from: 'Breno França <franciscobreno.si@gmail.com>',
      to: post.author.email,
      subject: `Solicitação de Compra: ${post.title}`,
      template: `purchases/create`,
      context: {
        user,
        content,
        post
      }
    })

    return done()
  }
}

module.exports = new PurchaseMail()
