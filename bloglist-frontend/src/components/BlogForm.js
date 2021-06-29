import React from 'react'

import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = (props) => {

  const addBlog = async (event) => {
    event.preventDefault()
    props.createBlog({
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
      likes: 0
    })
    props.setNotification(`you created ${event.target.title.value}`, 5)
  }

  return (
    <div className="formDiv">
      <h1>
        create new blog
      </h1>
      <form onSubmit = {addBlog}>
        <div>
          title:
          <input
            type="text"
            id='title'
            name="title"
          />
        </div>
        <div>
          author:
          <input
            type="text"
            id='author'
            name="author"
          />
        </div>
        <div>
          url:
          <input
            type="text"
            id='url'
            name="url"
          />
        </div>
        <button id='add-blog' type="submit">add blog</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  createBlog,
  setNotification
}

const ConnectedBlogForm = connect(
  null,
  mapDispatchToProps
)(BlogForm)

export default ConnectedBlogForm