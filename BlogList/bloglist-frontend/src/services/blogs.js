import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const elimina = (id) => {
  const config = {
    headers: { Authorization: token },
  }
  return axios.delete(`${baseUrl}/${id}`, config)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const Update = async (id, object) => {
  object.likes++
  const request = await axios.put(`${baseUrl}/${id}`, object)
  return request.data
}

const AddComment = async (id, object,comment) => {
  object = { ...object, comments: object.comments.concat(comment) }
  const request = await axios.put(`${baseUrl}/${id}`, object)
  return request.data
}

export default { getAll, create, setToken, Update, elimina, AddComment }
