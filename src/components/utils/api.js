import axios from 'axios'

const rawBase = (import.meta.env.VITE_API_URL || '').trim()
const apiBaseUrl = rawBase ? rawBase.split(',')[0].trim() : ''

const API = axios.create({
  baseURL: apiBaseUrl ? `${apiBaseUrl}/api` : '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('API Error:', error.response.data)
    } else if (error.request) {
      console.error('No response from server')
    } else {
      console.error('Error:', error.message)
    }
    return Promise.reject(error)
  }
)

export default API