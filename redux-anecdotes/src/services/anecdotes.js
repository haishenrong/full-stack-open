import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const vote = async (id) => {
  const idUrl = baseUrl+'/'+id
  const object = await axios.get(idUrl)
  const modifiedObject = {
    content: object.data.content,
    votes: object.data.votes+1,
    id: object.data.id
  }
  const response = await axios.put(idUrl, modifiedObject)
  return response.data
}
  

export default { getAll, createNew, vote }