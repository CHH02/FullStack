# FullStack-Part4
This is for the submission of exercises 4.1-4.23 of the FullStack Open's course. See Full Stack open part 4 [here](https://fullstackopen.com/en/part4)

## Objective
- Ex 4.3
  - ex 4.1-4.2 are exercises to start a backend api server to save blogs to a MongoDB Atlas database and practice project structure best practacies.
  - ex 4.3-7 are exercises to introduce writing helper functions and unit tests for those functions to the blog list app from ex 4.2.

## My Apps

### Apps 4.1-4.4
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
### list_helper.js ###

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