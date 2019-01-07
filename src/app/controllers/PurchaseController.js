const User = require('../models/User')
const Post = require('../models/Post')
const Purchase = require('../models/Purchase')
const PurchaseMail = require('../jobs/PurchaseMail')
const Queue = require('../services/Queue')

class PurchaseController {
  async store (req, res) {
    const { post: postId, content } = req.body

    const post = await Post.findById(postId).populate('author')
    const user = await User.findById(req.userId)

    const purchase = await Purchase.create({
      content,
      author: user.id,
      post: post.id
    })

    Queue.create(PurchaseMail.key, {
      post,
      user,
      content
    }).save()

    return res.json(purchase)
  }
}

module.exports = new PurchaseController()
