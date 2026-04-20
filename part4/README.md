# FullStack-Part4
This is for the submission of exercises 4.1-4.23 of the FullStack Open's course. See Full Stack open part 4 [here](https://fullstackopen.com/en/part4)

## Objective
- Ex 4.12
  - ex 4.1-4.2 are exercises to start a backend api server to save blogs to a MongoDB Atlas database and practice project structure best practacies.
  - ex 4.3-7 are exercises to introduce writing helper functions and unit tests for those functions to the blog list app from ex 4.2.
  - ex 4.8-4.12 are exercises to introduce using async/await code instead and to write API-level integration tests for our server application.
  - ex 4.13-4.14 are exercises to expand our blog list application by implementing various api functionality like deleting and updating blog entries.
  - ex 4.15-4.23 are exercises to implement the basics of user management (e.g., using token-based authentication) and updating our unit and integration tests for the newly implemented functionality.

## My Apps

### Apps 4.1-4.22
#### Ex 4.1
- Created a npm project for a backend api server that saves blogs to a MongoDB Atlas database.

- Here are some screenshots from Postman to verify that the api endpoints and MongoDB Atlas database are working:
<br>![PNG of CHH02's Ex 4.1 using Postman to test POST api requests](./public/Ex4-1_Screenshot-1.png)
<br>
<br>![PNG of CHH02's Ex 4.1 using Postman to test GET api requests](./public/Ex4-1_Screenshot-2.png)
<br>

#### Ex 4.2
- Refactored the application into separate modules as shown in [this](https://fullstackopen.com/en/part4/structure_of_backend_application_introduction_to_testing#project-structure) part of the course material. For example:

```
├── controllers
│   └── notes.js
├── dist
│   └── ...
├── models
│   └── note.js
├── utils
│   ├── config.js
│   ├── logger.js
│   └── middleware.js  
├── app.js
├── index.js
├── package-lock.json
├── package.json
```

#### Ex 4.3
- Defined a dummy function that receives an array of blog posts as a parameter and always returns the value 1. Then, Verified that your test configuration works with the following test:

```JS
const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})
```
- Here is a screenshot from the terminal to verify that the helper function passed the unit test:
<br>![PNG of CHH02's Ex 4.3 passing unit tests as seen from terminal output](./public/Ex4-3_Screenshot.png)
<br>

#### Ex 4.4
- Defined a new totalLikes function that receives a list of blog posts as a parameter. The function returns the total sum of likes in all of the blog posts. Wrote appropriate tests for the function.

```JS
### utils/list_helper.js ###

... // beginning of file

const totalLikes = (blogs) => {
  return blogs.reduce((sum, item) => {
    return sum + item.likes
  }, 0)
}

... // rest of file
```

```JS
### totalLikes.test.js ###

const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  const blogs = [...] // see the note below for list

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('when list has many blogs', () => {
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 36)
  })

  test('when list has no blogs', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })
})
```
note: blogs testing input list can be found [here](https://github.com/fullstack-hy2020/misc/blob/master/blogs_for_test.md).

#### Ex 4.5
- Defined a new favoriteBlog function that receives a list of blogs as a parameter. The function returns the blog with the most likes. If there are multiple favorites, it returns the first one of them. Wrote the tests for this exercise inside of a new describe block.

```JS
### utils/list_helper.js ###

... // beginning of file

const favoriteBlog = (blogs) => {
  return blogs.reduce((lastItem, currentItem) => (lastItem.likes > currentItem.likes)
  ? lastItem : currentItem, {})
}

... // rest of file
```

```JS
### favoriteBlog.test.js ###

const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('favorite blog', () => {
  const listWithOneBlog = [...]

  const blogs = [...]

  test('when list has only one blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    assert.deepStrictEqual(result, listWithOneBlog[0])
  })

  test('when list has many blogs', () => {
    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, blogs[2])
  })

  test('when list has no blogs', () => {
    const result = listHelper.favoriteBlog([])
    assert.deepStrictEqual(result, {})
  })
})
```

#### Ex 4.6
- Defined a function called mostBlogs that receives an array of blogs as a parameter. The function returns the author who has the largest amount of blogs. The return value also contains the number of blogs the top author has. If there are many top bloggers, then it is enough to return any one of them.

```JS
### utils/list_helper.js ###

... // beginning of file

const mostBlogs = (blogs) => {
  if (blogs.length === 0)
    return {}
  
  const freq = {}

  for (const item of blogs) {
    freq[item.author] = (freq[item.author] || 0) + 1
  }

  result = Object.entries(freq).reduce((lastItem, currentItem) => {
    return currentItem[1] > lastItem[1] ? currentItem : lastItem
  })

  return {
    author: result[0],
    blogs: result[1]
  }
}

... // rest of file
```

```JS
### mostBlogs.test.js ###

const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('most blogs', () => {
  const listWithOneBlog = [...]

  const blogs = [...]

  test('when list has only one blog', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    assert.deepStrictEqual(result,
      {
        author: "Edsger W. Dijkstra",
        blogs: 1
      }
    )
  })

  test('when list has many blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    assert.deepStrictEqual(result, 
      {
        author: "Robert C. Martin",
        blogs: 3
      }
    )
  })

  test('when list has no blogs', () => {
    const result = listHelper.mostBlogs([])
    assert.deepStrictEqual(result, {})
  })
})
```

#### Ex 4.7
- Defined a function called mostLikes that receives an array of blogs as its parameter. The function returns the author whose blog posts have the largest amount of likes. The return value also contains the total number of likes that the author has received. If there are many top bloggers, then it is enough to show any one of them.

```JS
### utils/list_helper.js ###

... // beginning of file

const mostLikes = (blogs) => {
  if (blogs.length === 0)
    return {}
  
  const freq = {}

  for (const item of blogs) {
    freq[item.author] = (freq[item.author] || 0) + item.likes
  }

  result = Object.entries(freq).reduce((lastItem, currentItem) => {
    return currentItem[1] > lastItem[1] ? currentItem : lastItem
  })

  return {
    author: result[0],
    likes: result[1]
  }
}

... // rest of file
```

```JS
### mostBlogs.test.js ###

const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('most likes', () => {
  const listWithOneBlog = [...]

  const blogs = [...]

  test('when list has only one blog', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    assert.deepStrictEqual(result,
      {
        author: "Edsger W. Dijkstra",
        likes: 5
      }
    )
  })

  test('when list has many blogs', () => {
    const result = listHelper.mostLikes(blogs)
    assert.deepStrictEqual(result, 
      {
        author: "Edsger W. Dijkstra",
        likes: 17
      }
    )
  })

  test('when list has no blogs', () => {
    const result = listHelper.mostLikes([])
    assert.deepStrictEqual(result, {})
  })
})
```

#### Ex 4.8
- Used the [SuperTest](https://github.com/forwardemail/supertest) library for writing a test that makes an HTTP GET request to the /api/blogs URL. Verified that the blog list application returns the correct amount of blog posts in the JSON format. Once the test is finished, refactored the route handler to use the async/await syntax instead of promises.

```JS
### tests/test_helper.js ###

// created this file for helper functions of commonly used code in the tests

const Blog = require('../models/blog')

const initialBlogs = [...]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const notes = await Blog.find({})
  return notes.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}
```

```JS
### blog_api.test.js ###

// created this file to write api-level integration tests for Fullstack Open's course exercises

const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const helper = require('./test_helper')
const Blog = require('../models/blog')

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
})

after(async () => {
  await mongoose.connection.close()
})
```

```JS
### controllers/blogs.js ###

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// refactored route handler for get requests to use async/await instead
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

... // rest of file
```

#### Ex 4.9
- Wrote a test that verifies that the unique identifier property of the blog posts is named id, by default the database names the property _id.

```JS
### blog_api.test.js ###

... // beginning setup of file

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  ... // previous code for testing GET requests

  // new code to verify that the unique identifier is named id
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
})

after(async () => {
  await mongoose.connection.close()
})
```

#### Ex 4.10
- Wrote a test that verifies that making an HTTP POST request to the /api/blogs URL successfully creates a new blog post. Verified that the total number of blogs in the system is increased by one. Once the test is finished, refactored the operation to use async/await instead of promises.

```JS
### blog_api.test.js ###

// created this file to write api-level integration tests for Fullstack Open's course exercises

... // beginning setup of file

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  ... // previous tests

  // code to test post requests
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
})

after(async () => {
  await mongoose.connection.close()
})
```

```JS
### controllers/blogs.js ###

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

... // route handler for get requests

  // refactored route handler for post requests to use async/await instead
blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const blog = new Blog(body)

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

module.exports = blogsRouter
```

#### Ex 4.11
- Wrote a test that verified that if the likes property is missing from the request, it will default to the value 0. Made the required changes to the code so that it passed the test.

```JS
### blog_api.test.js ###

// created this file to write api-level integration tests for Fullstack Open's course exercises

... // beginning setup of file

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  ... // previous tests

  // code to verify that the likes property defaults to zero
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
})

after(async () => {
  await mongoose.connection.close()
})
```

```JS
### blog.js ###

... // beginning of model file

// changed the blog schema's likes property to default to zero
const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    required: true,
    default: 0
  },
})

... // rest of model file
```

#### Ex 4.12
- Wrote tests related to creating new blogs via the /api/blogs endpoint, that verify that if the title or url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request.

```JS
### blog_api.test.js ###

// created this file to write api-level integration tests for Fullstack Open's course exercises

... // beginning setup of file

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  ... // previous tests

  // code to verify that the backend resonds with 400 Bad Request if missing the url or title
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

    test('new blog missing athor and url', async () => {
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
})

after(async () => {
  await mongoose.connection.close()
})
```

#### Ex 4.13
- Implemented functionality for deleting a single blog post resource. Used the async/await syntax. Implemented tests to test for the correct functionality.

```JS
### controllers/blogs.js ###

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

... // route handler for get and post requests

// route handler for delete requests that use async/await
blogsRouter.delete('/:id', async (request, response) => {
  deletedBlog = await Blog.findByIdAndDelete(request.params.id)
  if (!deletedBlog) {
    response.status(404).end()
  } else {
    response.status(204).end()
  }
})

module.exports = blogsRouter
```

```JS
### blog_api.test.js ###

// created this file to write api-level integration tests for Fullstack Open's course exercises

... // beginning setup of file

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  ... // previous tests

  // code to verify delete request functionality
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
})

after(async () => {
  await mongoose.connection.close()
})
```

#### Ex 4.14
- Implemented functionality for updating the information of an individual blog post. Used async/await. Implemented tests to test for the proper functionality.

```JS
### controllers/blogs.js ###

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

... // route handler for get, post, and delete requests

// route handler for put/update requests that use async/await
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
```

```JS
### blog_api.test.js ###

// created this file to write api-level integration tests for Fullstack Open's course exercises

... // beginning setup of file

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  ... // previous tests

  // code to verify delete request functionality
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
```

#### Ex 4.15
- Implemented a way to create new users by doing an HTTP POST request to address api/users. Users have a username, password and name. Did not save passwords to the database as clear text, but used the bcrypt library. Implemented a way to see the details of all users by doing a suitable HTTP request.

```JS
### user.js ###

// new file to store mongoose model on a user

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
```

```JS
### users.js ###

// new file to route API requests to our user collection in the DB

const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

module.exports = usersRouter
```

```JS
### app.js ###

... // other import code

// import our user route handler 
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')

... // other server code

// use our user route handler
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

... // rest of app.js file
```

#### Ex 4.16
- Added a features which adds the following restrictions to creating new users: Both username and password must be given and both must be at least 3 characters long. The username must be unique. Also, implemented tests that ensure invalid users are not created and that an invalid add user operation returns a suitable status code and error message.

For validation:
```JS
### user.js ###

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  // modified schema to be required, unique, and a minimum length of 3
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3
  },
  name: String,
  passwordHash: String,
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
```

```JS
### users.js ###

const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  // implemented password validation with if statement in controller
  if (!password || password.length < 3) {
    return response.status(400).json(
      {error: 'User validation failed: password: Path `password` is missing or shorter than the minimum allowed length (3).'}
    )
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

module.exports = usersRouter
```

```JS
### middleware.js ###

... // other middleware handlers

// updated error handler for when uniqueness validation fails which throws a MongoServerError
const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}
```

For testing:
```JS
### tests/test_helper.js ###

const Blog = require('../models/blog')
const User = require('../models/user')

... // test helper functions for blogs

// created a test helper function for users
const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}
```

```JS
### blog_api.test.js ###

... // other imports for tests

const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const User = require('../models/user')

... // other api tests

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if no username given', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('User validation failed: username: Path `username` is required.'))
    
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with proper statuscode and if username is too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'ro',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('is shorter than the minimum allowed length (3).'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if no password given', async () => {
    const usersAtStart = await helper.usersInDb()
  
    const newUser = {
      username: 'root',
      name: 'Superuser',
    }
  
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  
    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('User validation failed: password: Path `password` is missing or shorter than the minimum allowed length (3).'))
  
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if password is too short', async () => {
    const usersAtStart = await helper.usersInDb()
  
    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'sa',
    }
  
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  
    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('User validation failed: password: Path `password` is missing or shorter than the minimum allowed length (3).'))
  
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})
```

#### Ex 4.17
- Expanded blogs so that each blog contains information on the creator of the blog. Modified adding new blogs so that when a new blog is created, any user from the database is designated as its creator (for example the one found first). Which user is designated as the creator will be implemented in later exercises. Modified listing all blogs so that the creator's user information is displayed with the blog and listing all users so that they also display the blogs created by each user.

```JS
### user.js ###

const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  // added blogs property to user schema
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ],
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3
  },
  name: String,
  passwordHash: String,
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
```

```JS
### blog.js ###

const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  // added user property to blog schema
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  likes: {
    type: Number,
    required: true,
    default: 0
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)
```

```JS
### users.js ###

... // beginning of users.js file and other code

// modified get handler to populate blogs property with their respective blogs for each user
usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
  response.json(users)
})

module.exports = usersRouter
```

```JS
### blogs.js ###

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
// imported user model
const User = require('../models/user')

// modified get handler to populate user property with their respective user for each blog
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  // added code to find first user to associate with the blog being created/posted
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

... // code to handle delete and put requests

module.exports = blogsRouter
```

#### Ex 4.18
- Implemented token-based authentication

```JS
### login.js ###

// created new login.js file to handle token-based authentication as a loginRouter

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(
    userForToken, 
    process.env.SECRET,
    { expiresIn: 60*60 }
  )

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
```

```JS
### app.js ###

... // other imports

// imported the loginRouter
const loginRouter = require('./controllers/login')

//... other server code

// use the loginRouter
app.use('/api/login', loginRouter)
```

#### Ex 4.19
- Modified adding new blogs so that it is only possible if a valid token is sent with the HTTP POST request. The user identified by the token is designated as the creator of the blog.

```JS
### blogs.js ###

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
// imported jwt
const jwt = require('jsonwebtoken')

// helper function to idolate the jwt from the authorization header
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

... // get request handler

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  // modified code to validate user jwt and associate that user as the creator of this blog entry
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if (!user) {
    return response.status(400).json({ error: 'no valid users exist to assign blog to' })
  }

  const blog = new Blog({...body, user: user._id})

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

... // delete and put handlers

module.exports = blogsRouter
```

```JS
### middleware.js ###

... // other middlewares

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({ error: 'expected `username` to be unique' })
  }
  // added code to check for jwt errors
  else if (error.name ===  'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalid' })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}
```

#### Ex 4.20
- Refactored taking the token to a middleware. The middleware takes the token from the Authorization header and assign it to the token field of the request object.

```JS
### middleware.js ###

... // other middlewares

// this is the refactored token extraction middleware
const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  } else {
    request.token = null
  }

  next()
}

... // other middlewares

module.exports = {
  requestLogger,
  tokenExtractor,
  unknownEndpoint,
  errorHandler
}
```

```JS
### app.js ###

... // other imports

const middleware = require('./utils/middleware')

... // other server code

// used token extractor middleware before route handlers
app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
```

#### Ex 4.21
- Changed the delete blog operation so that a blog can be deleted only by the user who added it. Therefore, deleting a blog is possible only if the token sent with the request is the same as that of the blog's creator. If deleting a blog is attempted without a token or by an invalid user, the operation returns a suitable status code.

```JS
### blogs.js ###

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

... // get and post request handlers

blogsRouter.delete('/:id', async (request, response) => {
  // added jwt verification
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  // identifies user in DB
  const user = await User.findById(decodedToken.id)

  const deletedBlog = await Blog.findByIdAndDelete(request.params.id)

  // find deleted blog in user's blog list and remove it there too
  const index = user.blogs.indexOf(deletedBlog._id)
  if (index > -1) {
    user.blogs.splice(index, 1)
    await user.save()
  }
  if (!deletedBlog) {
    response.status(404).end()
  } else {
    response.status(204).end()
  }
})

... // put request handler

module.exports = blogsRouter
```

#### Ex 4.22
- Created a new middleware called userExtractor that identifies the user related to the request and attaches it to the request object. After registering the middleware, the post and delete handlers should be able to access the user directly by referencing request.user

```JS
### middleware.js ###

const logger = require('./logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

... // other middleware handlers

// new userExtractore middleware that identifies and extracts a user into request.user
const userExtractor = async (request, response, next) => {
  if (!request.token) {
    return response.status(401).json({ error: 'no token' })
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  request.user = await User.findById(decodedToken.id)

  next()
}

... // other middleware handlers

module.exports = {
  requestLogger,
  tokenExtractor,
  userExtractor,
  unknownEndpoint,
  errorHandler
}
```

```JS
### blogs.js ###

const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')

... // get request handler

// modified post handler to rely on userExtractor instead
blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body

  const blog = new Blog({...body, user: request.user._id})

  const savedBlog = await blog.save()
  request.user.blogs = request.user.blogs.concat(savedBlog._id)
  await request.user.save()
  response.status(201).json(savedBlog)
})

// modified delete handler to rely on userExtractor instead
blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const deletedBlog = await Blog.findByIdAndDelete(request.params.id)
  const index = request.user.blogs.indexOf(deletedBlog._id)
  if (index > -1) {
    request.user.blogs.splice(index, 1)
    await request.user.save()
  }
  if (!deletedBlog) {
    response.status(404).end()
  } else {
    response.status(204).end()
  }
})

... // put request handler

module.exports = blogsRouter
```

```JS
### app.js ###

... // beginning of file and other server code

// registered middleware to the /api/blogs path routes
app.use('/api/blogs', middleware.userExtractor, blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
```