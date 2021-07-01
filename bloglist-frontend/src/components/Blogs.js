import { connect } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import React from 'react'
import {
  Link,
  useParams
} from 'react-router-dom'

const Blogs = (props) => {
  const incrementLikes = async (id, title) => {
    props.likeBlog(id)
    console.log(props.blogs)
    props.setNotification(`you voted ${title}`,5)
  }

  const blogStyle = {
    color: 'rgb(0, 92, 128)',
    //background: 'lightseagreen',
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const id = useParams().id
  if(id)
  {
    const blog = props.blogs.find(n => n.id === id)
    if(!blog) return null
    return (
      <div>
        <h1>Blog</h1>
        <h2>{blog.title}</h2>
        <div>{`By: ${blog.author}`}</div>
        <div>{`URL: ${blog.url}`}</div>
        <div>
          {`Likes: ${blog.likes}`}
          <button id = 'increment-likes' onClick={() => {
            incrementLikes(blog.id, blog.title)
          }}>
          like
          </button>
        </div>
        {
          props.username === blog.user.username ?
            <div>
              <button id = 'remove-blog' onClick={() => {
                props.deleteBlog(blog.id)
                props.setNotification(`${blog.title} has been deleted`,5)
              }}>
                  remove blog
              </button>
            </div> :
            ''
        }
      </div>
    )
  }

  return (
    <div>
      <h1>Blogs</h1>
      {
        props.blogs.map(blog =>
          <div style = {blogStyle} key={blog.id}>
            <div className='title'>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </div>
          </div>
        )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return{
    blogs: state.blogs,
    username: state.username,
    notification: state.notification
  }
}

const mapDispatchToProps = {
  likeBlog,
  deleteBlog,
  setNotification
}
const ConnectedBlogs = connect(
  mapStateToProps,
  mapDispatchToProps
)(Blogs)


export default ConnectedBlogs