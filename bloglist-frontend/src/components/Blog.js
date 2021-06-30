import { connect } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import React, { useState } from 'react'

const Blog = (props) => {
  const [isDisplayed, setIsDisplayed] = useState(false)
  const handleDisplayChange = (event) => {
    setIsDisplayed(!isDisplayed)
  }

  const incrementLikes = async (id, title) => {
    props.likeBlog(id)
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

  return (
    <div>
      {
        props.blogs.map(blog =>
          <div style = {blogStyle} key={blog.id}>
            <div className='title'>
              {blog.title}
              <button id = 'view-blog' onClick={handleDisplayChange}>
                {
                  isDisplayed
                    ? 'hide'
                    : 'view'
                }
              </button>
            </div>
            {isDisplayed ?
              <div>
                <div className = 'url'>
                  {blog.url}
                </div>
                <div className = 'likes'>
                  {`Likes: ${blog.likes}`}
                  <button id = 'increment-likes' onClick={() => {
                    incrementLikes(blog.id, blog.title)
                  }}>
                  like
                  </button>
                </div>
                <div className = 'author'>
                  {`Author: ${blog.author}`}
                </div>
              </div> :
              <div>
              </div>}
            {
              props.username === blog.user.username && isDisplayed?
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
        )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return{
    blogs: state.blogs,
    username: state.username
  }
}

const mapDispatchToProps = {
  likeBlog,
  deleteBlog,
  setNotification
}
const ConnectedBlog = connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)


export default ConnectedBlog