const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne()

  if (!user) {
    return response.status(400).json({ error: 'no valid users exist to assign blog to' })
  }

  const blog = new Blog({...body, user: user._id})

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const deletedBlog = await Blog.findByIdAndDelete(request.params.id)
  if (!deletedBlog) {
    response.status(404).end()
  } else {
    response.status(204).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const blogToUpdate = await Blog.findById(request.params.id)
  if (!blogToUpdate) {
    response.status(404).end()
  } else {
    blogToUpdate.set(request.body)
    const updatedBlog = await blogToUpdate.save()
    response.json(updatedBlog)
  }
})

module.exports = blogsRouter