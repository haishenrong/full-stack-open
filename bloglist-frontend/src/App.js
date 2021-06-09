import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

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
  const [order, setOrder] = useState('most likes')

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

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
    .create(blogObject)
    .then(nextBlog => {
      setBlogs(blogs.concat(nextBlog))
      setConfirm(`a new blog ${nextBlog.title} by ${nextBlog.author}`)
      setTimeout(() => {
      setConfirm(null)
    }, 5000)
    })
    
  }

  const removeBlog = (blogObject) => {
    if(window.confirm(`Are you sure you want to remove ${blogObject.title} by ${blogObject.author}`)) {
      blogService
      .deleteBlog(blogObject.id)
      .then(deletedId => {
        setBlogs(blogs.filter(blog => deletedId !== blog.id))
      })
      window.location.reload(false);
    }
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

  const addLikes = (blogObject) => {
    blogService
    .like(blogObject)
    .then(updatedBlog => {
      setBlogs(blogs.map(blog =>
        updatedBlog.id === blog.id ?
        updatedBlog :
        blog
      ))
    })
  }

  const blogFormRef = useRef()
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
      <Togglable buttonLabel = 'new blog' ref={blogFormRef}> 
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <button onClick={() => {
          order === ('least likes')  ?
          setOrder('most likes') :
          setOrder('least likes')
        }}>
        {`Currently sorting blogs by ${order}`}
      </button>
      {
        order === 'least likes' ?
        blogs.sort((a, b) => a.likes-b.likes).map(blog =>
        <Blog key={blog.id} blog={blog} username={user.username} addLikes = {addLikes} removeBlog = {removeBlog}/>) :
        blogs.sort((a, b) => b.likes-a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} username={user.username} addLikes = {addLikes} removeBlog = {removeBlog}/>)
      }
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