import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Home, SearchX } from 'lucide-react'

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found - HB Hardware</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <section className="min-h-[70vh] flex items-center justify-center section-padding bg-white">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 bg-accent/10 rounded-3xl flex items-center justify-center">
                <SearchX className="w-12 h-12 text-accent" />
              </div>
            </div>
            <h1 className="text-6xl md:text-7xl font-extrabold text-primary mb-4 tracking-tight">404</h1>
            <h2 className="text-2xl md:text-3xl font-bold text-text mb-4">Page Not Found</h2>
            <p className="text-muted mb-10 max-w-md mx-auto leading-relaxed">
              The page you're looking for doesn't exist or has been moved. Let's get you back on track.
            </p>
            <Link
              to="/"
              className="btn-primary-lg inline-flex items-center gap-2"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default NotFound
