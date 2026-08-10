import React, { useState, useEffect } from 'react'
import { Link, Outlet, NavLink, useLocation, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LayoutDashboard, CheckCircle, Package, Wrench, Menu, X, Home, LogOut } from 'lucide-react'

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/review', icon: CheckCircle, label: 'Review' },
  { to: '/admin/products', icon: Package, label: 'Products' },
  { to: '/admin/services', icon: Wrench, label: 'Services' }
]

const AdminLayout = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('adminAuth') === 'true')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(localStorage.getItem('adminAuth') === 'true')
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    localStorage.removeItem('adminToken')
    setIsAuthenticated(false)
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-primary text-white transform transition-transform duration-300 lg:translate-x-0 lg:static lg:block ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-xl font-bold">Admin Panel</h1>
              <p className="text-xs text-gray-400">HB Hardware</p>
            </div>
            <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive || (item.end && location.pathname === '/admin') ? 'bg-accent text-white' : 'text-gray-300 hover:bg-white/10 hover:text-white'}`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
          <Link to="/" className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
            <Home className="w-4 h-4" />
            Back to Website
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-border px-6 py-4 flex items-center gap-4">
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
          <h2 className="text-lg font-semibold text-primary capitalize">
            {navItems.find((item) => item.end ? location.pathname === '/admin' : location.pathname.startsWith(item.to))?.label || 'Admin'}
          </h2>
        </header>
        <main className="flex-1 p-4 md:p-6">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
