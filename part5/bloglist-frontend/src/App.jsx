import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(`loggedBlogappUser`)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        `loggedBlogappUser`, JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      return
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem(`loggedBlogappUser`)
    setUser(null)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      url: url,
      title: title,
      author: author,
    }

    const sameBlog = blogs.find(blog => {
      return (blog.title === newBlog.title
        && blog.author === newBlog.author
        && blog.url === newBlog.url)
    })
    
    if (sameBlog !== undefined) {
      alert(`${newBlog.title} is already added`)
    } else {
      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
    }

  }

  if (user === null) {
    return (
      <div>
        <h2>Login</h2>
        <LoginForm
          handleLogin={handleLogin}
          username={username} setUsername={setUsername}
          password={password} setPassword={setPassword}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>
        {(user.name === null) ? user.username : user.name } logged in <button onClick={() => handleLogout()} >logout</button>
      </p>
      <h2>create new</h2>
      <CreateBlogForm
        addBlog={addBlog}
        title={title} setTitle={setTitle}
        author={author} setAuthor={setAuthor}
        url={url} setUrl={setUrl}
      />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App