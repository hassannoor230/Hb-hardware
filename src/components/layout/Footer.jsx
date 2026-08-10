import React from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Youtube, Twitter } from 'lucide-react'
import Logo from '../common/Logo'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-primary text-surface" role="contentinfo">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/15 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Logo variant="light" />
            </div>
            <p className="text-surface/80 text-sm leading-relaxed mb-6">
              Your trusted hardware partner in Gujranwala. Quality products, expert advice, and exceptional service since our establishment.
            </p>
            <div className="flex items-center gap-3">
              {[
                { label: 'Facebook', icon: Facebook, href: '#' },
                { label: 'Instagram', icon: Instagram, href: '#' },
                { label: 'YouTube', icon: Youtube, href: '#' },
                { label: 'Twitter', icon: Twitter, href: '#' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-surface transition hover:bg-accent hover:text-white"
                >
                  <item.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-surface">Quick Links</h3>
            <ul className="space-y-3 text-sm text-surface/80">
              {['About', 'Products', 'Services', 'Gallery', 'Reviews', 'FAQ', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase()}`}
                    className="flex items-center gap-2 hover:text-accent transition-colors"
                  >
                    <span className="inline-block h-2 w-2 rounded-full bg-accent" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-surface">Contact Us</h3>
            <ul className="space-y-4 text-sm text-surface/80">
              <li className="flex gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                  <MapPin className="w-5 h-5" />
                </span>
                <span>Deen Market, Krishan Nagar<br />Gujranwala, Punjab, Pakistan</span>
              </li>
              <li className="flex gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                  <Phone className="w-5 h-5" />
                </span>
                <a href="tel:+923126314045" className="hover:text-white transition-colors">0312-6314045</a>
              </li>
              <li className="flex gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                  <Mail className="w-5 h-5" />
                </span>
                <a href="mailto:info@hbhardware.com" className="hover:text-white transition-colors">info@hbhardware.com</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-surface">Opening Hours</h3>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-surface/80 space-y-4">
              <div className="flex justify-between">
                <span>Monday - Friday</span>
                <span className="font-medium text-surface">9:00 AM - 8:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span className="font-medium text-surface">10:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span className="font-medium text-surface">Closed</span>
              </div>
              <a
                href="https://wa.me/923126314045"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white hover:bg-[#20BD5A] transition-colors"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-6 text-sm text-surface/70 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p>© {currentYear} HB Hardware. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-accent transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
