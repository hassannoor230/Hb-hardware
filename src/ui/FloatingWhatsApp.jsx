import React from 'react'
import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

const FloatingWhatsApp = () => {
  return (
    <motion.a
      href="https://wa.me/923126314045"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-4 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </motion.a>
  )
}

export default FloatingWhatsApp
