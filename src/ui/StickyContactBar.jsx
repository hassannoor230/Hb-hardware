import React from 'react'
import { Phone, MessageCircle, Mail } from 'lucide-react'

const StickyContactBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-border z-40 md:hidden">
      <div className="flex items-center justify-around py-2">
        <a
          href="tel:+923126314045"
          className="flex flex-col items-center text-secondary hover:text-accent transition-colors p-2"
          aria-label="Call us"
        >
          <Phone className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-0.5">Call</span>
        </a>
        <a
          href="https://wa.me/923126314045"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center text-[#25D366] hover:text-[#20BD5A] transition-colors p-2"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-0.5">WhatsApp</span>
        </a>
        <a
          href="mailto:info@hbhardware.com"
          className="flex flex-col items-center text-secondary hover:text-accent transition-colors p-2"
          aria-label="Email us"
        >
          <Mail className="w-5 h-5" />
          <span className="text-[10px] font-medium mt-0.5">Email</span>
        </a>
        <a
          href="/contact"
          className="bg-accent text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-accent-hover transition-colors"
        >
          Quote
        </a>
      </div>
    </div>
  )
}

export default StickyContactBar
