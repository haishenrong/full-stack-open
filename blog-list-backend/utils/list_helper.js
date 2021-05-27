const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const sum = (soFar, item) => {
    return soFar + item.likes
  }
  const likes = blogs.reduce(sum, 0)

  return blogs.length===0
    ? 0
    : likes
}

const favoriteBlog = (blogs) => {

  const mostLikes = (soFar, item) => {
    return item.likes>soFar.likes
      ? item
      : soFar
  }
  const initBlog = {
    likes: -1
  }
  const favBlog = blogs.reduce(mostLikes,initBlog)
  const reducedBlog = {
    title: favBlog.title,
    author: favBlog.author,
    likes: favBlog.likes
  }
  return blogs.length === 0
    ? 0
    : reducedBlog
}

const mostBlogs = (blogs) => {
  let numBlogs = new Map()
  let sol = {
    author:'The list is empty',
    blogs:-1
  }
  blogs.forEach(element => {
    if(numBlogs.has(element.author)){
      numBlogs.set(element.author, numBlogs.get(element.author)+1)
    }
    else{
      numBlogs.set(element.author,1)
    }
    if(numBlogs.get(element.author)>sol.blogs)
    {
      sol = {
        author: element.author,
        blogs: numBlogs.get(element.author)
      }
    }
  })
  return sol
}

const mostLikes = (blogs) => {
  let numBlogs = new Map()
  let sol = {
    author:'The list is empty',
    likes:-1
  }
  blogs.forEach(element => {
    if(numBlogs.has(element.author)){
      numBlogs.set(element.author, numBlogs.get(element.author)+element.likes)
    }
    else{
      numBlogs.set(element.author,element.likes)
    }
    if(numBlogs.get(element.author)>sol.likes)
    {
      sol = {
        author: element.author,
        likes: numBlogs.get(element.author)
      }
    }
  })
  return sol
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}