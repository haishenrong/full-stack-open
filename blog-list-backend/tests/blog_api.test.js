const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const blogsRouter = require('../controllers/blogs')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  const noteObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = noteObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('id exists as unique property identifier', async () => {
  const allBlogs = await Blog.find({})
  const mappedBlogs = allBlogs.map(blog => {
    blog.toJSON()
    expect(blog._id).toBeDefined()
  })
})

test('post works properly', async () => {
  const newBlog = {
    title: 'The next blog',
    author: 'The next author',
    url: 'thenexturl.com',
    likes: 1
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const dB = await helper.blogsInDb()
  expect(dB).toHaveLength(helper.initialBlogs.length+1)

  const blogsTitle = dB.map(blog => blog.title)
  expect(blogsTitle).toContain('The next blog')

  const blogsAuthors = dB.map(blog => blog.author)
  expect(blogsAuthors).toContain('The next author')

  const blogsUrls = dB.map(blog => blog.url)
  expect(blogsUrls).toContain('thenexturl.com')
})

test('blog devoid of likes set at 0', async () => {
  const newBlog = {
    title: 'The next blog',
    author: 'The next author',
    url: 'thenexturl.com',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const dB = await helper.blogsInDb()
  expect(dB).toHaveLength(helper.initialBlogs.length+1)

  const blogsTitle = dB.map(blog => blog.title)
  expect(blogsTitle).toContain('The next blog')

  const blogsAuthors = dB.map(blog => blog.author)
  expect(blogsAuthors).toContain('The next author')

  const blogsUrls = dB.map(blog => blog.url)
  expect(blogsUrls).toContain('thenexturl.com')

  const blogsLikes = dB.map(blog => blog.likes)
  expect(blogsLikes).toContain(0)
})

test('blog without name or url returns 400', async () => {
  const noTitleBlog = {
    author: 'The next author',
    url: 'thenexturl.com',
  }

  await api
    .post('/api/blogs')
    .send(noTitleBlog)
    .expect(400)

  const noUrlBlog = {
    title: 'The next blog',
    author: 'The next author',
  }

  await api
    .post('/api/blogs')
    .send(noUrlBlog)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})