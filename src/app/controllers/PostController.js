const Post = require('../models/Post')

class PostController {
  async index (req, res) {
    const posts = await Post.find()

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
