const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)

  if (blog.title === undefined || blog.url === undefined) {
    return response.status(400).json({
      error: 'title or url missing'
    })
  }
  /*const blog = new Blog({
    name: body.name,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })*/
  if(!blog.likes)
    blog.likes = 0

  const savedBlog = await blog.save()
  response.json(savedBlog)
  /*
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })*/
})

module.exports = blogsRouter