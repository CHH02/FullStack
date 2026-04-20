const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body

  const blog = new Blog({...body, user: request.user._id})

  const savedBlog = await blog.save()
  request.user.blogs = request.user.blogs.concat(savedBlog._id)
  await request.user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const deletedBlog = await Blog.findByIdAndDelete(request.params.id)
  if (!deletedBlog) {
    response.status(404).end()
  } else {
    const index = request.user.blogs.indexOf(deletedBlog._id)
    if (index > -1) {
      request.user.blogs.splice(index, 1)
      await request.user.save()
    }
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