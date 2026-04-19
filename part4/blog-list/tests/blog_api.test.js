const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const helper = require('./test_helper')
const Blog = require('../models/blog')
const { title } = require('node:process')

const api = supertest(app)

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  describe('testing GET requests', () => {
    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
    
    test('all blogs are returned', async () => {
      const response = await api.get('/api/blogs')
    
      assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })
    
    test('a specific blog is within the returned blogs', async () => {
      const response = await api.get('/api/blogs')
    
      const titles = response.body.map(e => e.title)
      assert(titles.includes('React patterns'))
    })
  })

  describe('verifying that the unique identifier is named id', () => {
    test('all blogs have an id property', async () => {
      const response = await api.get('/api/blogs')

      const isIdProperty = response.body.every(e => e.hasOwnProperty('id'))
      assert.strictEqual(isIdProperty, true)
    })

    test('no blogs have _id property', async () => {
      const response = await api.get('/api/blogs')

      const is_idProperty = response.body.some(e => '_id' in e)
      assert.strictEqual(is_idProperty, false)
    })
  })

  describe('testing post requests', () => {
    test('succeeds with valid data', async () => {
      const newBlog = {
        title: "Test Title",
        author: "Test the Author",
        url: "https://test.com/",
        likes: 0
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

      const titles = blogsAtEnd.map(e => e.title)
      assert(titles.includes('Test Title'))
    })

    test('fails with status code 400 if data invalid', async () => {
      const newBlog = { likes: 10 }

      await api.post('/api/blogs').send(newBlog).expect(400)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
  })

  describe('verifying that the likes property defaults to zero', () => {
    test('new blog defaulted to zero', async () => {
      const newBlog = {
        title: "Test Title",
        author: "Test the Author",
        url: "https://test.com/",
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

      const result = blogsAtEnd.find(e => {
        return (e.title === 'Test Title' && e.author === 'Test the Author' && e.url === 'https://test.com/' && e.likes === 0)
      })
      assert.strictEqual(result.likes, 0)
    })
  })

  describe('verifying that if title or url property are missing, returns 400 Bad Request', () => {
    test('new blog missing author', async () => {
      const newBlog = {
        title: "Test Title",
        url: "https://test.com/",
        likes: 0
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })

    test('new blog missing url', async () => {
      const newBlog = {
        title: "Test Title",
        author: "Test the Author",
        likes: 0
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })

    test('new blog missing author and url', async () => {
      const newBlog = {
        title: "Test Title",
        likes: 0
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
  })

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      const ids = blogsAtEnd.map(n => n.id)
      assert(!ids.includes(blogToDelete.id))

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
    })

    test('fails with statuscode 404 if blog does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      await api.delete(`/api/blogs/${validNonexistingId}`).expect(404)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
  })

  describe('updating a blog', () => {
    test('succeeds with status code 200 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const valuesToUpdate = { author: 'Updated Author', likes: 5}
      const blogToUpdate = { ...blogsAtStart[0], ...valuesToUpdate }

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()

      const ids = blogsAtEnd.map(n => n.id)
      assert(ids.includes(blogToUpdate.id))

      assert.deepStrictEqual(blogsAtEnd[0], { ...blogToUpdate, ...valuesToUpdate})
    })

    test('fails with statuscode 404 if blog does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()
      const blogsAtStart = await helper.blogsInDb()
      const valuesToUpdate = { author: 'Updated Author', likes: 5}
      const blogToUpdate = { ...blogsAtStart[0], ...valuesToUpdate }

      await api
        .put(`/api/blogs/${validNonexistingId}`)
        .send(blogToUpdate)
        .expect(404)

      const blogsAtEnd = await helper.blogsInDb()
      assert.deepStrictEqual(blogsAtEnd[0], blogsAtStart[0])
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})