const User = require('../models/User')
const Purchase = require('../models/Purchase')
const SaleMail = require('../jobs/SaleMail')
const Queue = require('../services/Queue')

class SaleController {
  async store (req, res) {
    const { purchase: purchaseId } = req.body

    const purchase = await Purchase.findOneAndUpdate(
      purchaseId,
      { sold: true },
      { new: true }
    ).populate('post')

    const purchaseAuthor = await User.findById(purchase.author)

    Queue.create(SaleMail.key, {
      post: purchase.post,
      author: purchaseAuthor
    }).save()

    return res.json(purchase)
  }
}

module.exports = new SaleController()
