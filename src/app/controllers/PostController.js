const Post = require('../models/Post')

class PostController {
  async index (req, res) {
    const filters = {
      purchasedBy: null
    }

    if (req.query.price_min || req.query.price_max) {
      filters.price = {}

      if (req.query.price_min) {
        filters.price.$gte = req.query.price_min
      }
      if (req.query.price_max) {
        filters.price.$lte = req.query.price_max
      }
    }

    if (req.query.title) {
      filters.title = new RegExp(req.query.title, 'i')
    }

    const posts = await Post.paginate(filters, {
      page: req.query.page || 1,
      limit: 10,
      populate: ['author'],
      sort: '-createdAt'
    })

    return res.json(posts)
  }

  async show (req, res) {
    const post = await Post.findById(req.params.id)

    return res.json(post)
  }

  async store (req, res) {
    const post = await Post.create({ ...req.body, author: req.userId })

    return res.json(post)
  }

  async update (req, res) {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })

    return res.json(post)
  }

  async destroy (req, res) {
    await Post.findByIdAndDelete(req.params.id)

    return res.send()
  }
}

module.exports = new PostController()
