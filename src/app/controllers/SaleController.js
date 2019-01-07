const Purchase = require('../models/Purchase')
const SaleMail = require('../jobs/SaleMail')
const Queue = require('../services/Queue')

class SaleController {
  async update (req, res) {
    const { id } = req.params

    const { post, author } = await Purchase.findById(id).populate([
      'post',
      'author'
    ])

    if (!post.author._id.equals(req.userId)) {
      return res.status(401).json({
        error: "You're not the ad author"
      })
    }

    if (post.purchasedBy) {
      return res
        .status(400)
        .json({ error: 'This ad had already been purchased' })
    }

    post.purchasedBy = id

    await post.save()

    Queue.create(SaleMail.key, {
      post: post,
      author: author
    }).save()

    return res.json(post)
  }
}

module.exports = new SaleController()
