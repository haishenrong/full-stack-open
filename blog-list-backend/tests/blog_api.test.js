const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
//const blogsRouter = require('../controllers/blogs')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Blog = require('../models/blog')

const api = supertest(app)

describe('blog testing is separate from user testing', () => {
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

  test('deleted blog returns 204', async () => {
    const initialBlogs = await helper.blogsInDb()
    const blogToDelete= initialBlogs[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const missingOneBlog = await helper.blogsInDb()
    expect(missingOneBlog).toHaveLength(initialBlogs.length-1)

    const titleCheck = missingOneBlog.map(blog => blog.title)
    expect(titleCheck).not.toContain(blogToDelete.title)
  })

  test('update blog likes sucessful', async () => {
    const updateBlog =  {
      title: 'Bobs Emporium',
      author: 'Bob the builder',
      url: 'canwedoit.org',
      likes: 392
    }
    const currBlogs = await helper.blogsInDb()
    const targetBlog = currBlogs.find(blog => blog.title === updateBlog.title)

    await api.
      put(`/api/blogs/${targetBlog.id}`)
      .send(updateBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const updatedDb = await helper.blogsInDb()
    expect(updatedDb).toHaveLength(currBlogs.length)

    const blogLikes = updatedDb.map(blog => blog.likes)

    expect(blogLikes).not.toContain(364)
    expect(blogLikes).toContain(392)
  })
})
///////// User Testing ////////////////

describe('when there is initially one user in db', () => {
// Clears db and adds a single user before each test
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('joebob', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'BobTheBuilder',
      name: 'Robert Thorndike',
      password: 'canwedoit',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('missing username or password fails', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      //username: 'BobTheBuilder',
      name: 'Robert Thorndike',
      //password: 'canwedoit',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username or password missing')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('short username / password fails', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Bo',
      name: 'Robert Thorndike',
      password: 'ca',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(result.body.error).toContain('is shorter than the minimum allowed length')

    //const usersAtEnd = await helper.usersInDb()
    //expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'roots',
      password: 'rootusbootus',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})