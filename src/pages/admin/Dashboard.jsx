import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Package, Wrench, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react'
import API from '../../components/utils/api'

const Dashboard = () => {
  const [stats, setStats] = useState({ pendingProducts: 0, pendingServices: 0, approvedProducts: 0, approvedServices: 0 })
  const [recentProducts, setRecentProducts] = useState([])
  const [recentServices, setRecentServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, productsRes, servicesRes] = await Promise.all([
          API.get('/admin/dashboard-stats').catch(() => ({ data: { data: {} } })),
          API.get('/products?limit=5').catch(() => ({ data: { data: [] } })),
          API.get('/services?limit=5').catch(() => ({ data: { data: [] } }))
        ])
        setStats(statsRes.data.data || {})
        setRecentProducts(productsRes.data.data || [])
        setRecentServices(servicesRes.data.data || [])
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary mb-1">Dashboard</h1>
        <p className="text-muted">Overview of your products and services.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-accent/10">
              <Package className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted">Total Products</p>
              <p className="text-2xl font-bold text-primary">{stats.approvedProducts || 0}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary/10">
              <Wrench className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted">Total Services</p>
              <p className="text-2xl font-bold text-primary">{stats.approvedServices || 0}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-warning/10">
              <CheckCircle className="w-6 h-6 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted">Pending Products</p>
              <p className="text-2xl font-bold text-primary">{stats.pendingProducts || 0}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-warning/10">
              <CheckCircle className="w-6 h-6 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted">Pending Services</p>
              <p className="text-2xl font-bold text-primary">{stats.pendingServices || 0}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-primary">Recent Products</h2>
            <a href="/admin/products" className="text-sm text-accent hover:text-accent-hover flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="space-y-3">
            {recentProducts.length === 0 ? (
              <p className="text-muted text-sm">No products yet. Add your first product from the Products page.</p>
            ) : (
              recentProducts.map((product) => (
                <div key={product._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium text-primary text-sm">{product.name}</p>
                    <p className="text-xs text-muted">{product.category}</p>
                  </div>
                  <span className="text-sm font-semibold text-primary">{product.currency || 'PKR'} {product.price ? product.price.toLocaleString() : 'N/A'}</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-primary">Recent Services</h2>
            <a href="/admin/services" className="text-sm text-accent hover:text-accent-hover flex items-center gap-1">
              View All <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="space-y-3">
            {recentServices.length === 0 ? (
              <p className="text-muted text-sm">No services yet. Add your first service from the Services page.</p>
            ) : (
              recentServices.map((service) => (
                <div key={service._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <p className="font-medium text-primary text-sm">{service.name}</p>
                    <p className="text-xs text-muted">{service.category}</p>
                  </div>
                  <span className="text-sm font-semibold text-primary">{service.currency || 'PKR'} {service.price ? service.price.toLocaleString() : 'N/A'}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Dashboard
