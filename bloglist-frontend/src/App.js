import React, { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import loginService from './services/login'
import blogService from './services/blogs'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Users from './components/Users'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { setCurrentUser } from './reducers/usernameReducer'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'

const App = () => {
  const [user, setUser] = useState(null)

  const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
      setValue(event.target.value)
    }

    return {
      type,
      value,
      onChange
    }
  }

  const username = useField('text')
  const password = useField('text')

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      dispatch(setCurrentUser(user.username))
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
        <input {...username} />
      </div>
      <div>
        password:
        <input {...password}/>
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )
  const blogFormRef = useRef()
  const padding = {
    padding: 5
  }

  return (
    <div className="container">
      <Router>
        <div>
          <Link style={padding} to="/">home</Link>
          <Link style={padding} to="/blogs">blogs</Link>
          <Link style={padding} to="/users">users</Link>
          {user ?
            <em>{user.name} logged in
              <button id='logout' onClick={() => {
                setUser(null)
                window.localStorage.removeItem('loggedBlogappUser')
              }}>
            logout
              </button>
            </em>
            : <Link style={padding} to="/login">login</Link>
          }
        </div>
        <Notification />

        <Switch>
          <Route path="/blogs/:id">
            <Blogs />
          </Route>
          <Route path="/blogs">
            <Blogs />
            <Togglable buttonLabel = 'new blog' ref={blogFormRef}>
              <BlogForm />
            </Togglable>
          </Route>
          <Route path="/users/:id">
            <Users />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/login">
            {loginForm()}
          </Route>
          <Route path="/">
            {'Loren ipsum'}
          </Route>
        </Switch>

        <div>
          <i>Bloglist app, Department of Computer Science 2021</i>
        </div>
      </Router>
    </div>
  )
}

export default App