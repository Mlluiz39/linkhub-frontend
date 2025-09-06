import axios from 'axios'

const api = axios.create({
  baseURL: 'http://64.181.163.223:8080',
})

export default api
