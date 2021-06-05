import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'

const Notification = ({ confirm, message }) => {
  if (confirm === null && message === null) {
    return null
  }
  if(confirm === null) {
    return (
      <div className="error">
        {message}
      </div>
    )
  }
  else {
    return (
      <div className="notif">
        {confirm}
      </div>
    )
  }
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [confirm, setConfirm] = useState(null)
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
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setConfirm('Login Sucessful')
      setTimeout(() => {
        setConfirm(null)
      }, 5000)
    } catch (exception) {
      console.log("login error")
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
    }

    blogService
    .create(blogObject)
    .then(nextBlog => {
      setBlogs(blogs.concat(nextBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
    })
    setConfirm(`a new blog ${title} by ${author}`)
      setTimeout(() => {
        setConfirm(null)
      }, 5000)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username:
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password:
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
  const blogForm = () => (
    <div>
      <p>
        {user.name} logged in 
        <button onClick={() => {
          setUser(null)
          window.localStorage.removeItem('loggedBlogappUser')
          }}>
          logout
        </button>
      </p>
      <h1>
        create new
      </h1>
      <form onSubmit = {addBlog}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">add blog</button>
      </form>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      <h1>Blogs</h1>
      <Notification 
        confirm = {confirm} 
        message = {errorMessage} />
      {
        user === null ? 
        loginForm() : 
        blogForm()
      }
    </div>
  )
}

export default App