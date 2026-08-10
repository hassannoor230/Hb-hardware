import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, CheckCircle, XCircle, Loader, RefreshCw, Clock, AlertCircle } from 'lucide-react'
import axios from 'axios'

const Import = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [googleUrl, setGoogleUrl] = useState('')
  const [googleLabel, setGoogleLabel] = useState('')
  const [fbContent, setFbContent] = useState('')
  const [fbUrl, setFbUrl] = useState('')
  const [fbLabel, setFbLabel] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [demoMode, setDemoMode] = useState(false)

  const fetchJobs = async () => {
    setLoading(true)
    try {
      const res = await axios.get('/api/v1/import/jobs')
      setJobs(res.data.data || [])
    } catch (error) {
      console.error('Failed to fetch import jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  const handleGoogleSubmit = async (e) => {
    e.preventDefault()
    if (!googleUrl) return
    setSubmitting(true)
    try {
      const res = await axios.post('/api/v1/import/google', { sourceUrl: googleUrl, label: googleLabel || 'Google Import' })
      if (res.data.data?.errorMessages?.length) {
        setDemoMode(true)
      }
      setGoogleUrl('')
      setGoogleLabel('')
      await fetchJobs()
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to start Google import')
    } finally {
      setSubmitting(false)
    }
  }

  const handleFacebookSubmit = async (e) => {
    e.preventDefault()
    if (!fbContent.trim()) return
    setSubmitting(true)
    try {
      const res = await axios.post('/api/v1/import/facebook', { sourceUrl: fbUrl || null, label: fbLabel || 'Facebook Import', manualContent: fbContent })
      if (res.data.data?.errorMessages?.length) {
        setDemoMode(true)
      }
      setFbContent('')
      setFbUrl('')
      setFbLabel('')
      await fetchJobs()
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to start Facebook import')
    } finally {
      setSubmitting(false)
    }
  }

  const getStatusBadge = (status) => {
    const map = {
      queued: 'bg-gray-100 text-gray-700',
      processing: 'bg-blue-50 text-blue-700',
      completed: 'bg-green-50 text-green-700',
      failed: 'bg-red-50 text-red-700',
      partial_success: 'bg-yellow-50 text-yellow-700'
    }
    return map[status] || 'bg-gray-100 text-gray-700'
  }

  const getStatusIcon = (status) => {
    const map = {
      queued: <Clock className="w-4 h-4" />,
      processing: <Loader className="w-4 h-4 animate-spin" />,
      completed: <CheckCircle className="w-4 h-4" />,
      failed: <XCircle className="w-4 h-4" />,
      partial_success: <CheckCircle className="w-4 h-4" />
    }
    return map[status] || <Clock className="w-4 h-4" />
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary mb-1">Import</h1>
        <p className="text-muted">Import business data from Google Maps or Facebook content.</p>
      </div>

      {demoMode && (
        <div className="flex items-start gap-3 p-4 bg-accent/5 border border-accent/20 rounded-xl">
          <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-primary mb-1">Demo Mode Active</p>
            <p className="text-sm text-muted">API keys are not configured. The system created sample records so you can test the review flow. To use real imports, add valid keys in <code className="bg-gray-100 px-2 py-1 rounded text-xs">server/.env</code>.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <form onSubmit={handleGoogleSubmit} className="card space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Upload className="w-5 h-5 text-accent" />
            <h2 className="text-lg font-bold text-primary">Google Maps / Business Profile</h2>
          </div>
          <p className="text-sm text-muted">Paste a Google Maps place URL. The system will fetch public business details and infer products/services via AI.</p>
          <div>
            <label className="block text-sm font-medium text-text mb-1">Google Maps URL</label>
            <input value={googleUrl} onChange={(e) => setGoogleUrl(e.target.value)} placeholder="https://maps.google.com/..." className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1">Label (optional)</label>
            <input value={googleLabel} onChange={(e) => setGoogleLabel(e.target.value)} placeholder="e.g. Main Store" className="input-field" />
          </div>
          <button type="submit" disabled={submitting || !googleUrl} className="btn-primary w-full disabled:opacity-60">
            {submitting ? 'Starting...' : 'Start Google Import'}
          </button>
        </form>

        <form onSubmit={handleFacebookSubmit} className="card space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Upload className="w-5 h-5 text-accent" />
            <h2 className="text-lg font-bold text-primary">Facebook Content Import</h2>
          </div>
          <p className="text-sm text-muted">Paste Facebook post text or content manually. The AI will extract products/services from the provided content.</p>
          <div>
            <label className="block text-sm font-medium text-text mb-1">Facebook Page URL (optional)</label>
            <input value={fbUrl} onChange={(e) => setFbUrl(e.target.value)} placeholder="https://www.facebook.com/..." className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1">Label (optional)</label>
            <input value={fbLabel} onChange={(e) => setFbLabel(e.target.value)} placeholder="e.g. Facebook Posts Q3" className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1">Content</label>
            <textarea value={fbContent} onChange={(e) => setFbContent(e.target.value)} rows="6" placeholder="Paste post captions, product mentions, or exported content..." className="input-field resize-none" />
          </div>
          <button type="submit" disabled={submitting || !fbContent.trim()} className="btn-primary w-full disabled:opacity-60">
            {submitting ? 'Starting...' : 'Start Facebook Import'}
          </button>
        </form>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-primary">Import Jobs</h2>
          <button onClick={fetchJobs} className="text-sm text-accent hover:text-accent-hover flex items-center gap-1">
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
        </div>
        <div className="space-y-3">
          {loading && <p className="text-muted text-sm">Loading jobs...</p>}
          {!loading && jobs.length === 0 && <p className="text-muted text-sm">No import jobs yet.</p>}
          {jobs.map((job) => (
            <div key={job._id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-gray-50 rounded-xl">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-primary capitalize">{job.source} Import</span>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(job.status)}`}>
                    {getStatusIcon(job.status)}
                    {job.status.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-xs text-muted mt-1">{job.sourceLabel || job.sourceUrl || 'No label'}</p>
                {job.errorMessages?.length > 0 && (
                  <div className="mt-2 p-2 bg-red-50 border border-red-100 rounded-lg">
                    <p className="text-xs text-error font-medium mb-1">Errors:</p>
                    {job.errorMessages.map((err, idx) => (
                      <p key={idx} className="text-xs text-error">{err}</p>
                    ))}
                  </div>
                )}
              </div>
              <div className="text-right text-sm text-muted">
                <p>Items: {job.itemsFound || 0} | Products: {job.productsFound || 0} | Services: {job.servicesFound || 0}</p>
                <p>{new Date(job.createdAt).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default Import
