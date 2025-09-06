import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.mlluizdevtech.com.br',
})

export default api
