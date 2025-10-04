// lib/api.js
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080', // ou seu backend em produção
})

// Interceptor para adicionar JWT automaticamente
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token') // JWT salvo após login
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
