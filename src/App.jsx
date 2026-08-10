import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import AdminLayout from './pages/admin/AdminLayout'
import LoadingSpinner from './components/common/LoadingSpinner'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Products = lazy(() => import('./pages/Products'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Services = lazy(() => import('./pages/Services'))
const Gallery = lazy(() => import('./pages/Gallery'))
const Reviews = lazy(() => import('./pages/Reviews'))
const FAQ = lazy(() => import('./pages/FAQ'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'))
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'))
const AdminReview = lazy(() => import('./pages/admin/Review'))
const AdminProducts = lazy(() => import('./pages/admin/AdminProducts'))
const AdminServices = lazy(() => import('./pages/admin/AdminServices'))

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Suspense fallback={<LoadingSpinner />}><Home /></Suspense></Layout>} />
        <Route path="/about" element={<Layout><Suspense fallback={<LoadingSpinner />}><About /></Suspense></Layout>} />
        <Route path="/products" element={<Layout><Suspense fallback={<LoadingSpinner />}><Products /></Suspense></Layout>} />
        <Route path="/products/:id" element={<Layout><Suspense fallback={<LoadingSpinner />}><ProductDetail /></Suspense></Layout>} />
        <Route path="/services" element={<Layout><Suspense fallback={<LoadingSpinner />}><Services /></Suspense></Layout>} />
        <Route path="/gallery" element={<Layout><Suspense fallback={<LoadingSpinner />}><Gallery /></Suspense></Layout>} />
        <Route path="/reviews" element={<Layout><Suspense fallback={<LoadingSpinner />}><Reviews /></Suspense></Layout>} />
        <Route path="/faq" element={<Layout><Suspense fallback={<LoadingSpinner />}><FAQ /></Suspense></Layout>} />
        <Route path="/contact" element={<Layout><Suspense fallback={<LoadingSpinner />}><Contact /></Suspense></Layout>} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout><Suspense fallback={<LoadingSpinner />}><AdminDashboard /></Suspense></AdminLayout>} />
        <Route path="/admin/review" element={<AdminLayout><Suspense fallback={<LoadingSpinner />}><AdminReview /></Suspense></AdminLayout>} />
        <Route path="/admin/products" element={<AdminLayout><Suspense fallback={<LoadingSpinner />}><AdminProducts /></Suspense></AdminLayout>} />
        <Route path="/admin/services" element={<AdminLayout><Suspense fallback={<LoadingSpinner />}><AdminServices /></Suspense></AdminLayout>} />
        <Route path="*" element={<Layout><Suspense fallback={<LoadingSpinner />}><NotFound /></Suspense></Layout>} />
      </Routes>
    </Router>
  )
}

export default App
