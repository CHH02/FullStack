import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
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
  const [message, setMessage] = useState(null)
  const [typeOfMessage, setTypeOfMessage] = useState('')

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
      setTypeOfMessage('success')
      setMessage('Logged in!')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch {
      setTypeOfMessage('error')
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem(`loggedBlogappUser`)
    setUser(null)
    setTypeOfMessage('success')
    setMessage('Logged out!')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
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
      setTypeOfMessage('error')
      setMessage(`${newBlog.title} is already added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000);
    } else {
      try {   
        const returnedBlog = await blogService.create(newBlog)
        setBlogs(blogs.concat(returnedBlog))
        setTitle('')
        setAuthor('')
        setUrl('')
        setTypeOfMessage('success')
        setMessage(`Added ${returnedBlog.title}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000);
      } catch (error) {
        setTypeOfMessage('error')
        setMessage(error.response.data.error)
        setTimeout(() => {
          setMessage(null)
        }, 5000);
      }
    }

  }

  if (user === null) {
    return (
      <div>
        <h2>Login</h2>
        <Notification message={message} type={typeOfMessage} />
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
      <Notification message={message} type={typeOfMessage} />
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