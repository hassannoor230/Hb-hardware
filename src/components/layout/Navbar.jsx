import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'
import Logo from '../common/Logo'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Products', path: '/products' },
  { name: 'Services', path: '/services' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Reviews', path: '/reviews' },
  { name: 'FAQ', path: '/faq' },
  { name: 'Contact', path: '/contact' },
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${isScrolled
        ? 'bg-surface/95 backdrop-blur-xl shadow-sm border-b border-border'
        : 'bg-surface/90'
        }`}
      role="banner"
    >
      <nav className="container-custom px-4 sm:px-6 lg:px-8" role="navigation" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20 py-2">
          <Link to="/" className="flex items-center gap-3" aria-label="HB Hardware Home">
            <Logo />
          </Link>

          <ul className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${location.pathname === link.path
                    ? 'bg-accent/10 text-accent'
                    : 'text-muted hover:text-primary hover:bg-surface-muted'
                    }`}
                  aria-current={location.pathname === link.path ? 'page' : undefined}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-3 xl:gap-4">
            <a
              href="tel:+923126314045"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2.5 text-sm font-medium text-muted hover:text-primary transition-colors"
              aria-label="Call us"
            >
              <Phone className="w-4 h-4" />
              0312-6314045
            </a>
            <Link to="/contact" className="btn-primary !py-2.5 !px-5 !text-sm shadow-sm">
              Get Quote
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2.5 rounded-2xl border border-border bg-surface text-primary shadow-sm hover:shadow-md transition-shadow ml-2"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden mt-3 overflow-hidden rounded-3xl border border-border bg-surface shadow-card p-4 sm:p-5"
            >
              <ul className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`block rounded-2xl px-4 py-3 text-base font-medium transition-all duration-200 ${location.pathname === link.path
                        ? 'bg-accent/10 text-accent'
                        : 'text-muted hover:text-primary hover:bg-surface-muted'
                        }`}
                      aria-current={location.pathname === link.path ? 'page' : undefined}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-col gap-3">
                <a
                  href="tel:+923126314045"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-4 py-3 text-sm font-medium text-muted hover:text-primary transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call Us
                </a>
                <Link to="/contact" className="btn-primary w-full text-center">
                  Request Quote
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}

export default Navbar
