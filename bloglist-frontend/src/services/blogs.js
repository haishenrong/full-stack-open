import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async() => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const like = async id => {
  const urlId = `${baseUrl}/${id}`
  const object = await axios.get(urlId)
  const alteredObject = {
    title: object.data.title,
    author: object.data.author,
    url: object.data.url,
    likes: object.data.likes+1,
    id: object.data.id
  }
  const response = await axios.put(urlId, alteredObject)
  return response.data
}

const deleteBlog = async blogId => {
  const config = {
    headers: { Authorization: token },
  }
  const urlId = `${baseUrl}/${blogId}`
  const response = await axios.delete(urlId, config)
  return response.data
}

export default { getAll,createNew, setToken, like, deleteBlog }