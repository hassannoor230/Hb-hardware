import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Edit, Trash2, AlertCircle, X } from 'lucide-react'
import axios from 'axios'

const demoProducts = [
  { _id: 'demo-1', name: 'Premium Door Hinges', category: 'Door Hardware', description: 'Heavy-duty stainless steel door hinges.', price: 1200, currency: 'PKR', images: ['/images/door-hardware.jpg'], status: 'approved' },
  { _id: 'demo-2', name: 'Cabinet Handles Set', category: 'Cabinet Hardware', description: 'Elegant cabinet handle set.', price: 2500, currency: 'PKR', images: ['/images/cabinet-hardware.jpg'], status: 'approved' },
  { _id: 'demo-3', name: 'Bathroom Faucet', category: 'Bathroom Hardware', description: 'Premium single-handle bathroom faucet.', price: 4500, currency: 'PKR', images: ['/images/bathroom-hardware.jpg'], status: 'approved' },
  { _id: 'demo-4', name: 'Kitchen Cabinet Pulls', category: 'Kitchen Hardware', description: 'Stylish kitchen cabinet pulls.', price: 3200, currency: 'PKR', images: ['/images/kitchen-hardware.jpg'], status: 'approved' },
  { _id: 'demo-5', name: 'Construction Grade Steel', category: 'Construction Hardware', description: 'High-grade construction steel bars.', price: 8500, currency: 'PKR', images: ['/images/construction-hardware.jpg'], status: 'approved' },
  { _id: 'demo-6', name: 'Heavy Duty Drill Machine', category: 'Tools & Equipment', description: 'Professional-grade heavy duty drill machine.', price: 12000, currency: 'PKR', images: ['/images/hardware-shelves.jpg'], status: 'approved' }
]

const AdminProducts = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [form, setForm] = useState({ name: '', category: '', description: '', price: '', currency: 'PKR', images: '', status: 'approved' })
  const [dbError, setDbError] = useState(false)

  const fetchItems = async () => {
    setLoading(true)
    setDbError(false)
    try {
      const res = await axios.get('/api/v1/products')
      let data = res.data.data || []
      if (search) data = data.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()) || item.category.toLowerCase().includes(search.toLowerCase()))
      setItems(data)
    } catch (error) {
      console.error('Failed to fetch products:', error)
      setDbError(true)
      setItems(demoProducts)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [search])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (dbError) {
      alert('Database is not connected. Cannot save. Please fix MongoDB connection first.')
      return
    }
    try {
      const payload = {
        ...form,
        price: form.price ? parseFloat(form.price) : null,
        images: form.images ? form.images.split(',').map((s) => s.trim()).filter(Boolean) : []
      }
      if (editingItem) {
        await axios.put(`/api/v1/products/${editingItem._id}`, payload)
      } else {
        await axios.post('/api/v1/products', payload)
      }
      setShowForm(false)
      setEditingItem(null)
      setForm({ name: '', category: '', description: '', price: '', currency: 'PKR', images: '', status: 'approved' })
      fetchItems()
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to save product')
    }
  }

  const handleEdit = (item) => {
    if (dbError) {
      alert('Database is not connected. Cannot edit. Please fix MongoDB connection first.')
      return
    }
    setEditingItem(item)
    setForm({
      name: item.name || '',
      category: item.category || '',
      description: item.description || '',
      price: item.price || '',
      currency: item.currency || 'PKR',
      images: (item.images || []).join(', '),
      status: item.status || 'approved'
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (dbError) {
      alert('Database is not connected. Cannot delete. Please fix MongoDB connection first.')
      return
    }
    if (!window.confirm('Delete this product?')) return
    try {
      await axios.delete(`/api/v1/products/${id}`)
      fetchItems()
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete product')
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary mb-1">Products</h1>
          <p className="text-muted">Manage website products.</p>
        </div>
        <button onClick={() => { if (!dbError) { setShowForm(true); setEditingItem(null); setForm({ name: '', category: '', description: '', price: '', currency: 'PKR', images: '', status: 'approved' }) } else { alert('Database is not connected. Cannot add. Please fix MongoDB connection first.') } }} className="btn-primary gap-2">
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {dbError && (
        <div className="flex items-start gap-3 p-4 bg-accent/5 border border-accent/20 rounded-xl">
          <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-primary mb-1">Database Offline</p>
            <p className="text-sm text-muted">Showing demo products. To manage real products, fix MongoDB connection and run <code className="bg-gray-100 px-2 py-1 rounded text-xs">npm run seed</code>.</p>
          </div>
        </div>
      )}

      <div className="card">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className="input-field pl-10" />
        </div>
        <div className="space-y-3">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted mb-2">No products found.</p>
              <p className="text-xs text-muted">Make sure MongoDB is connected and data is seeded. Run: <code className="bg-gray-100 px-2 py-1 rounded">npm run seed</code></p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                    {item.images?.[0] ? (
                      <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" onError={(e) => { e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23e2e8f0"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%2394a3b8" font-family="sans-serif"%3ENo Image%3C/text%3E%3C/svg%3E'; e.target.onerror = null; }} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-muted">No img</div>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-primary">{item.name}</p>
                    <p className="text-xs text-muted">{item.category} • {item.status}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleEdit(item)} className="p-2 rounded-lg hover:bg-white text-primary"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(item._id)} className="p-2 rounded-lg hover:bg-white text-error"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full max-w-lg max-h-[90vh] flex flex-col m-0 sm:m-4">
            <div className="p-4 sm:p-6 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
              <h2 className="text-lg sm:text-xl font-bold text-primary">{editingItem ? 'Edit Product' : 'Add Product'}</h2>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-text mb-1">Name</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1">Category</label>
                <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input-field" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1">Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows="3" className="input-field resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-1">Price</label>
                  <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-1">Currency</label>
                  <input value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value })} className="input-field" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1">Images (comma separated)</label>
                <input value={form.images} onChange={(e) => setForm({ ...form, images: e.target.value })} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1">Status</label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="input-field">
                  <option value="draft">Draft</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </form>
            <div className="p-4 sm:p-6 border-t border-gray-100 flex flex-col-reverse sm:flex-row justify-end gap-3 flex-shrink-0">
              <button type="button" onClick={() => setShowForm(false)} className="btn-secondary w-full sm:w-auto">
                Cancel
              </button>
              <button type="submit" onClick={handleSubmit} className="btn-primary w-full sm:w-auto">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default AdminProducts
