const Blog = require('../models/blog')

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

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}