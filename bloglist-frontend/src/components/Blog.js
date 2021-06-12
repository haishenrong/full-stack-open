import React, { useState } from 'react'
//import blogService from '../services/blogs'

const Blog = ({ blog, username, addLikes, removeBlog }) => {
  const [isDisplayed, setIsDisplayed] = useState(false)

  const handleDisplayChange = (event) => {
    setIsDisplayed(!isDisplayed)
  }

  const incrementLikes = (event) => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      likes: blog.likes+1,
      url: blog.url,
      id: blog.id
    }
    addLikes(updatedBlog)
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
  console.log(username)
  return (
    <div style = {blogStyle}>
      <div className='title'>
        {blog.title}
        <button onClick={handleDisplayChange}>
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
            <button onClick={incrementLikes}>
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
        username === blog.user.username && isDisplayed?
          <div>
            <button onClick={() => {
              removeBlog(blog)
            }}>
            remove blog
            </button>
          </div> :
          ''
      }

    </div>
  )
}

export default Blog