import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, Eye, AlertCircle } from 'lucide-react'
import axios from 'axios'

const demoPendingProducts = [
  { _id: 'demo-p1', name: 'Demo Steel Hinges', category: 'Door Hardware', description: 'Demo product created because API key is not configured.', price: 1200, currency: 'PKR', images: ['/images/door-hardware.jpg'], confidence: 0.5, status: 'pending' },
  { _id: 'demo-p2', name: 'Demo Cabinet Handle', category: 'Cabinet Hardware', description: 'Demo product created because API key is not configured.', price: 2500, currency: 'PKR', images: ['/images/cabinet-hardware.jpg'], confidence: 0.5, status: 'pending' }
]

const Review = () => {
  const [products, setProducts] = useState([])
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('products')
  const [error, setError] = useState(null)
  const [dbError, setDbError] = useState(false)

  const fetchPending = async () => {
    setLoading(true)
    setError(null)
    setDbError(false)
    try {
      const endpoint = tab === 'products' ? '/api/v1/admin/pending-products' : '/api/v1/admin/pending-services'
      const res = await axios.get(endpoint)
      if (tab === 'products') setProducts(res.data.data || [])
      else setServices(res.data.data || [])
    } catch (error) {
      console.error('Failed to fetch pending items:', error)
      setDbError(true)
      if (tab === 'products') setProducts(demoPendingProducts)
      else setServices([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPending()
  }, [tab])

  const handleStatus = async (id, status, notes = '') => {
    if (dbError) {
      alert('Database is not connected. Cannot update status. Please fix MongoDB connection first.')
      return
    }
    try {
      const endpoint = tab === 'products' ? `/api/v1/admin/products/${id}/${status}` : `/api/v1/admin/services/${id}/${status}`
      await axios.put(endpoint, { notes })
      await fetchPending()
    } catch (error) {
      alert(error.response?.data?.message || `Failed to ${status} item`)
    }
  }

  const renderItemCard = (item) => (
    <div key={item._id} className="card mb-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-48 h-48 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
          {item.images?.[0] || item.image ? (
            <img src={item.images?.[0] || item.image} alt={item.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted text-sm">No Image</div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-medium text-accent uppercase tracking-wider">{item.category}</span>
              <h3 className="text-lg font-bold text-primary mt-1">{item.name}</h3>
              <p className="text-sm text-muted mt-1 line-clamp-2">{item.description}</p>
              {item.price ? (
                <p className="text-lg font-bold text-primary mt-2">{item.currency || 'PKR'} {item.price.toLocaleString()}</p>
              ) : (
                <p className="text-sm text-muted mt-2">Price on request</p>
              )}
            </div>
            <div className="text-right">
              <span className="text-xs text-muted">Confidence</span>
              <p className="text-sm font-semibold text-primary">{Math.round((item.confidence || 0) * 100)}%</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <button onClick={() => handleStatus(item._id, 'approve')} className="btn-primary gap-2">
              <CheckCircle className="w-4 h-4" />
              Approve
            </button>
            <button onClick={() => handleStatus(item._id, 'reject', 'Rejected during review')} className="btn-outline gap-2">
              <XCircle className="w-4 h-4" />
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary mb-1">Review</h1>
        <p className="text-muted">Review and approve AI-imported products and services before publishing.</p>
      </div>

      {dbError && (
        <div className="flex items-start gap-3 p-4 bg-accent/5 border border-accent/20 rounded-xl">
          <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-primary mb-1">Database Offline</p>
            <p className="text-sm text-muted">Showing demo pending items. To review real imports, fix MongoDB connection and run <code className="bg-gray-100 px-2 py-1 rounded text-xs">npm run seed</code>.</p>
          </div>
        </div>
      )}

      {error && !dbError && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-xl text-error">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div className="flex items-center gap-2">
        <button onClick={() => setTab('products')} className={`px-4 py-2 rounded-xl font-medium transition-colors ${tab === 'products' ? 'bg-primary text-white' : 'bg-white text-primary border border-border'}`}>
          Products
        </button>
        <button onClick={() => setTab('services')} className={`px-4 py-2 rounded-xl font-medium transition-colors ${tab === 'services' ? 'bg-primary text-white' : 'bg-white text-primary border border-border'}`}>
          Services
        </button>
      </div>

      <div>
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {tab === 'products' && products.length === 0 && (
              <div className="text-center py-16">
                <Eye className="w-12 h-12 text-muted/30 mx-auto mb-3" />
                <p className="text-muted">No pending products to review.</p>
              </div>
            )}
            {tab === 'services' && services.length === 0 && (
              <div className="text-center py-16">
                <Eye className="w-12 h-12 text-muted/30 mx-auto mb-3" />
                <p className="text-muted">No pending services to review.</p>
              </div>
            )}
            {tab === 'products' && products.map(renderItemCard)}
            {tab === 'services' && services.map(renderItemCard)}
          </>
        )}
      </div>
    </motion.div>
  )
}

export default Review
