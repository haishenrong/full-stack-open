import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'LIKE': {
    const id = action.data.id
    const blogToChange = state.find(n => n.id === id)
    const changedBlog = {
      ...blogToChange,
      votes: blogToChange.votes+1
    }
    return state.map(blog =>
      blog.id !== id ? blog : changedBlog
    )}
  case 'ADD': {
    return [...state, action.data]
  }
  case 'INIT_BLOGS':
    return action.data
  case 'DELETE': {
    const id = action.data.id
    const changedState = state.map(blog =>
      blog.id === id ?
        null :
        blog
    )
    return changedState
  }
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = content => {
  return async dispatch => {
    const blog = await blogService.createNew(content)
    dispatch({
      type: 'ADD',
      data: blog
    })
  }
}

export const likeBlog = (id) => {
  return async dispatch => {
    await blogService.like(id)
    dispatch({
      type: 'LIKE',
      data: { id }
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.like(id)
    dispatch({
      type: 'DELETE',
      data: { id }
    })
  }
}
export default blogReducer