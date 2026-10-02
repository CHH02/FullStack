import { useState } from 'react'

const Blog = ({ blog, updateBlog, removeBlog, user }) => {
  const [view, setView] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideWhenViewing = { display: view ? 'none' : '' }
  const showWhenViewing = { display: view ? '' : 'none' }

  const changeView = () => {
    setView(!view)
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenViewing}>
        {blog.title} {blog.author} <button onClick={changeView}>view</button>
      </div>
      <div style={showWhenViewing}>
        {blog.title} {blog.author} <button onClick={changeView}>hide</button> <br />
        {blog.url} <br />
        likes {blog.likes} <button onClick={() => updateBlog({ ...blog, user: blog.user.id, likes: blog.likes+1 })}>like</button> <br />
        {blog.user.name} <br />
        <button
          style={{ display: (user.name === blog.user.name ? '' : 'none') }}
          onClick={() => removeBlog(blog)}>remove</button>
      </div>
    </div>
  )
}

export default Blog