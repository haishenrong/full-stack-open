import Notes from './components/Notes'
import Users from './components/Users'
import Home from './components/Home'
import { useState } from 'react'
import { Form, Button, Navbar, Nav } from 'react-bootstrap'
import Container from '@material-ui/core/Container'
import { TextField, AppBar, Toolbar, IconButton } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

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
          <TextField label="username" />
        </div>
        <div>
          <TextField  label="password" type='password' />
        </div>
        <div>
          <Button variant="contained" color="primary" type="submit">
            login
          </Button>
        </div>
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
  const [message, setMessage] = useState(null)

  const match = useRouteMatch('/notes/:id')
  const note = match 
    ? notes.find(note => note.id === Number(match.params.id))
    : null
  
  const login = (user) => {
    setUser(user)
    setMessage(`welcome ${user}`)
    setTimeout(() => {
      setMessage(null)
    }, 10000)
  }

  const padding = {
    padding: 5
  }

  return (
    <Container>
    {(message &&
    <Alert variant="success">
      {message}
    </Alert>
    )}
    <Router>
    <AppBar position="static">
  <Toolbar>
    <Button color="inherit" component={Link} to="/">
      home
    </Button>
    <Button color="inherit" component={Link} to="/notes">
      notes
    </Button>
    <Button color="inherit" component={Link} to="/users">
      users
    </Button>   
    {user
      ? <em>{user} logged in</em>
      : <Button color="inherit" component={Link} to="/login">
          login
        </Button>
    }                              
  </Toolbar>
</AppBar>

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
    </Container>
  )
}

export default App;
