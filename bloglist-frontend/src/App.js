import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import loginService from './services/login'
import blogService from './services/blogs'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { initializeBlogs } from './reducers/blogReducer'
import { setCurrentUser } from './reducers/usernameReducer'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  //const [order, setOrder] = useState('most likes')
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

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
      setCurrentUser(username)
      setUser(user)
      setUsername('')
      setPassword('')
      setCurrentUser(username)
      dispatch(setNotification('Login Sucessful',5))
    } catch (exception) {
      console.log('login error')
      dispatch(setNotification('Wrong credentials',5))
    }
  }


  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username:
        <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password:
        <input
          id = 'password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )
  const blogFormRef = useRef()
  const blogForm = () => {
    dispatch(setCurrentUser(user.username))
    return(
      <div>
        <p>
          {user.name} logged in
          <button id='logout' onClick={() => {
            setUser(null)
            window.localStorage.removeItem('loggedBlogappUser')
          }}>
          logout
          </button>
        </p>
        <Togglable buttonLabel = 'new blog' ref={blogFormRef}>
          <BlogForm />
        </Togglable>
        <Blog />
      </div>
    )
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />
      {
        user === null ?
          loginForm() :
          blogForm()
      }
    </div>
  )
}

export default App