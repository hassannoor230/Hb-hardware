import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import FloatingWhatsApp from '../../ui/FloatingWhatsApp'
import StickyContactBar from '../../ui/StickyContactBar'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
      <FloatingWhatsApp />
      <StickyContactBar />
    </div>
  )
}

export default Layout