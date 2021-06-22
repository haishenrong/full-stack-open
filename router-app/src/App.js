import Notes from './components/Notes'
import Users from './components/Users'
import Home from './components/Home'
import { useState } from 'react'

import {
  BrowserRouter as Router,
  Switch, Route, Link, useHistory, useRouteMatch, Redirect
} from "react-router-dom"

const Note = ({ note }) => {
  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <div><strong>{note.important ? 'important' : ''}</strong></div>
    </div>
  )
}

const Login = (props) => {
  const history = useHistory()

  const onSubmit = (event) => {
    event.preventDefault()
    props.onLogin('mluukkai')
    history.push('/')
  }

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={onSubmit}>
        <div>
          username: <input />
        </div>
        <div>
          password: <input type='password' />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

const App = () => {
  const [user, setUser] = useState(null)
  const [notes, setNotes] = useState([
    {
      content: 'Hello There',
      user: 'Elroy Patashnik',
      id: 1
    },
    {
      content: 'GoodBye',
      user: 'Eli Whitney',
      id: 2
    }
  ])

  const match = useRouteMatch('/notes/:id')
  const note = match 
    ? notes.find(note => note.id === Number(match.params.id))
    : null
  
  const login = (user) => {
    setUser(user)
  }

  const padding = {
    padding: 5
  }

  return (
    <div>
    <Router>
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/notes">notes</Link>
        <Link style={padding} to="/users">users</Link>
        {user
          ? <em>{user} logged in</em>
          : <Link style={padding} to="/login">login</Link>
        }
      </div>

      <Switch>
        <Route path="/notes/:id">
          <Note note={note} />
        </Route>
        <Route path="/notes">
          <Notes notes={notes}/>
        </Route>
        <Route path="/users">
          {user ? <Users /> : <Redirect to ="/login" />}
        </Route>
        <Route path="/login">
          <Login onLogin={login} />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
      <div>
        <i>Note app, Department of Computer Science 2021</i>
      </div>
    </div>
  )
}

export default App;
