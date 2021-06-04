const Blog = require('../models/blog')
const User = require('../models/user')


const initialBlogs = [
  {
    title: 'Dreams of the Awake',
    author: 'Alan Watts',
    url: 'livingdreams.org',
    likes: 42
  },
  {
    title: 'Bobs Emporium',
    author: 'Bob the builder',
    url: 'canwedoit.org',
    likes: 364
  },
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'temp blog',
    author: 'temp author',
    url: 'tempurl.temp',
    likes: 2
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb, nonExistingId, usersInDb
}