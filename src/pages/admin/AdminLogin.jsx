import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, AlertCircle } from 'lucide-react'
import API from '../../components/utils/api'

const AdminLogin = () => {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(() => (
    localStorage.getItem('adminAuth') === 'true' && Boolean(localStorage.getItem('adminToken'))
  ))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const res = await API.post('/admin/login', { password })

      const data = res.data

      if (data.success && data.token) {
        localStorage.setItem('adminAuth', 'true')
        localStorage.setItem('adminToken', data.token)
        setIsAuthenticated(true)
      } else if (data.success) {
        setError('Login succeeded but the server did not return an access token. Check JWT_SECRET in Vercel environment variables.')
      } else if (res.status === 500 && data.message && data.message.includes('ADMIN_PASSWORD')) {
        setError('Admin password is not configured on the server. Set ADMIN_PASSWORD in Vercel env variables.')
      } else {
        setError(data.message || 'Invalid password')
      }
    } catch (err) {
      setError('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="card p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Lock className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-primary text-center mb-2">Admin Access</h1>
          <p className="text-muted text-center text-sm mb-6">Enter the admin password to continue</p>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-xl text-error text-sm mb-4">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text mb-2">
                Admin Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="input-field"
                autoFocus
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !password}
              className="btn-primary w-full disabled:opacity-60"
            >
              {isLoading ? 'Verifying...' : 'Login'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

export default AdminLogin
