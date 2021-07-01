import { connect } from 'react-redux'
import { initializeUsers } from '../reducers/userReducer'
import React from 'react'
import { Table } from 'react-bootstrap'
import {
  Link,
  useParams
} from 'react-router-dom'

const Users = (props) => {
  const blogStyle = {
    color: 'rgb(0, 92, 128)',
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const id = useParams().id
  if(id)
  {
    const user = this.props.users.find(n => n.id === id)
    if(!user) return null
    return (
      <div>
        <h1>User</h1>
        <h2>{user.username}</h2>
        <div>{user.name}</div>
        <p> </p>
        <div>added blogs</div>
        <div>
          {user.blogs.map(blog =>
            <li key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          )}
        </div>
      </div>
    )
  }
  if(!props.users) return null
  return (
    <div>
      <h1>Users</h1>
      <Table striped>
        <tbody>
          <tr>
            <th>
            User
            </th>
            <th>
            blogs created
            </th>
          </tr>
          {
            this.props.users.map(user =>
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.username}</Link>
                </td>
                <td>
                  {user.blogs.length}
                </td>
              </tr>
            )
          }
        </tbody>
      </Table>

    </div>
  )
}

const mapStateToProps = (state) => {
  return{
    users: state.users
  }
}

const mapDispatchToProps = {
  initializeUsers
}
const ConnectedUsers = connect(
  mapStateToProps,
  mapDispatchToProps
)(Users)


export default ConnectedUsers