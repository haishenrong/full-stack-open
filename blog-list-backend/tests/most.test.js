const listHelper = require('../utils/list_helper')

// Tests most blogs and most Likes
describe('most blogs', () => {
  const listWithManyBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234e17f8',
      title: 'Bobby',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 32,
      __v: 1
    },
    {
      _id: '5a422aa71b54a676234f17f8',
      title: 'A comprehensive guide to my traversal algorithm',
      author: 'JD Salinger',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 1000,
      __v: 2
    }
  ]

  test('most blogs to Dijkstras Alg', () => {
    const result = listHelper.mostBlogs(listWithManyBlogs)
    expect(result).toEqual(
      {
        author: 'Edsger W. Dijkstra',
        blogs: 2
      }
    )
  })

  test('most likes to Dijkstras Alg', () => {
    const result = listHelper.mostLikes(listWithManyBlogs)
    expect(result).toEqual(
      {
        author: 'JD Salinger',
        likes: 1000
      }
    )
  })
})