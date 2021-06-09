import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data/*request.then(response => response.data)*/
}

const like = async alteredObject => {
  const urlId = `${baseUrl}/${alteredObject.id}`
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

export default { getAll,create, setToken, like, deleteBlog }