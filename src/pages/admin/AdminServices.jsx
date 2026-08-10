import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Edit, Trash2, AlertCircle, X } from 'lucide-react'
import API from '../../components/utils/api'

const demoServices = [
  { _id: 'demo-s1', name: 'Hardware Consultation', category: 'Consultation', description: 'Expert advice on hardware selection.', price: null, currency: 'PKR', status: 'approved' },
  { _id: 'demo-s2', name: 'Delivery Service', category: 'Logistics', description: 'Fast and reliable delivery across Gujranwala.', price: null, currency: 'PKR', status: 'approved' },
  { _id: 'demo-s3', name: 'Bulk Orders', category: 'Sales', description: 'Competitive wholesale pricing for bulk orders.', price: null, currency: 'PKR', status: 'approved' }
]

const AdminServices = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [form, setForm] = useState({ name: '', category: '', description: '', price: '', currency: 'PKR', image: '', status: 'approved' })
  const [dbError, setDbError] = useState(false)

  const fetchItems = async () => {
    setLoading(true)
    setDbError(false)
    try {
      const res = await API.get('/services')
      let data = res.data.data || []
      if (search) data = data.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()) || item.category.toLowerCase().includes(search.toLowerCase()))
      setItems(data)
    } catch (error) {
      console.error('Failed to fetch services:', error)
      setDbError(true)
      setItems(demoServices)
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
        image: form.image || null
      }
      if (editingItem) {
        await API.put(`/services/${editingItem._id}`, payload)
      } else {
        await API.post('/services', payload)
      }
      setShowForm(false)
      setEditingItem(null)
      setForm({ name: '', category: '', description: '', price: '', currency: 'PKR', image: '', status: 'approved' })
      fetchItems()
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to save service')
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
      image: item.image || '',
      status: item.status || 'approved'
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (dbError) {
      alert('Database is not connected. Cannot delete. Please fix MongoDB connection first.')
      return
    }
    if (!window.confirm('Delete this service?')) return
    try {
        await API.delete(`/services/${id}`)
      fetchItems()
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete service')
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary mb-1">Services</h1>
          <p className="text-muted">Manage website services.</p>
        </div>
        <button onClick={() => { if (!dbError) { setShowForm(true); setEditingItem(null); setForm({ name: '', category: '', description: '', price: '', currency: 'PKR', image: '', status: 'approved' }) } else { alert('Database is not connected. Cannot add. Please fix MongoDB connection first.') } }} className="btn-primary gap-2">
          <Plus className="w-4 h-4" />
          Add Service
        </button>
      </div>

      {dbError && (
        <div className="flex items-start gap-3 p-4 bg-accent/5 border border-accent/20 rounded-xl">
          <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-primary mb-1">Database Offline</p>
            <p className="text-sm text-muted">Showing demo services. To manage real services, fix MongoDB connection and run <code className="bg-gray-100 px-2 py-1 rounded text-xs">npm run seed</code>.</p>
          </div>
        </div>
      )}

      <div className="card">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search services..." className="input-field pl-10" />
        </div>
        <div className="space-y-3">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted mb-2">No services found.</p>
              <p className="text-xs text-muted">Make sure MongoDB is connected and data is seeded. Run: <code className="bg-gray-100 px-2 py-1 rounded">npm run seed</code></p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-semibold text-primary">{item.name}</p>
                  <p className="text-xs text-muted">{item.category} • {item.status}</p>
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
              <h2 className="text-lg sm:text-xl font-bold text-primary">{editingItem ? 'Edit Service' : 'Add Service'}</h2>
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
                <label className="block text-sm font-medium text-text mb-1">Image URL</label>
                <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="input-field" />
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

export default AdminServices
