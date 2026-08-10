import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import Breadcrumb from '../components/common/Breadcrumb'
import { X, ChevronLeft, ChevronRight, Expand } from 'lucide-react'

const images = [
  { id: 1, src: '/images/store-placeholder.jpg', alt: 'HB Hardware Store', title: 'Our Showroom' },
  { id: 2, src: '/images/hardware-shelves.jpg', alt: 'Hardware Shelves', title: 'Product Range' },
  { id: 3, src: '/images/construction-hardware.jpg', alt: 'Construction Hardware', title: 'Construction Materials' },
  { id: 4, src: '/images/door-hardware.jpg', alt: 'Door Hardware', title: 'Door Hardware' },
  { id: 5, src: '/images/cabinet-hardware.jpg', alt: 'Cabinet Hardware', title: 'Cabinet Hardware' },
  { id: 6, src: '/images/bathroom-hardware.jpg', alt: 'Bathroom Hardware', title: 'Bathroom Hardware' },
  { id: 7, src: '/images/kitchen-hardware.jpg', alt: 'Kitchen Hardware', title: 'Kitchen Hardware' },
  { id: 8, src: '/images/hero-placeholder.jpg', alt: 'Hardware Showroom', title: 'Hardware Showroom' },
]

const Gallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)

  const openLightbox = (index) => {
    setCurrentImage(index)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = 'unset'
  }

  const navigateImage = (direction) => {
    setCurrentImage((prev) => {
      if (direction === 'prev') {
        return prev === 0 ? images.length - 1 : prev - 1
      } else {
        return prev === images.length - 1 ? 0 : prev + 1
      }
    })
  }

  return (
    <>
      <Helmet>
        <title>Gallery - HB Hardware | Photo Gallery Gujranwala</title>
        <meta name="description" content="View our gallery showcasing HB Hardware's showroom and product range in Gujranwala." />
        <link rel="canonical" href="/gallery" />
      </Helmet>

      <section className="section-padding bg-white" aria-labelledby="gallery-title">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-block badge-accent mb-4">Our Gallery</span>
            <h1 id="gallery-title" className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Photo Gallery
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
              Take a visual tour of our showroom and explore our extensive product range
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => openLightbox(index)}
                role="button"
                tabIndex={0}
                aria-label={`Open ${image.alt} in lightbox`}
                onKeyDown={(e) => e.key === 'Enter' && openLightbox(index)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  onError={(e) => { e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23e2e8f0"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%2394a3b8" font-family="sans-serif"%3ENo Image%3C/text%3E%3C/svg%3E'; e.target.onerror = null; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-end p-4">
                  <div className="flex items-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <Expand className="w-4 h-4" />
                    <span className="text-sm font-medium">{image.title}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-accent transition-colors p-2"
              aria-label="Close lightbox"
            >
              <X className="w-8 h-8" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); navigateImage('prev'); }}
              className="absolute left-4 text-white hover:text-accent transition-colors p-2"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); navigateImage('next'); }}
              className="absolute right-4 text-white hover:text-accent transition-colors p-2"
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <div 
              className="max-w-5xl max-h-[80vh] p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[currentImage].src}
                alt={images[currentImage].alt}
                className="w-full h-full object-contain max-h-[75vh]"
                onError={(e) => { e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23e2e8f0"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%2394a3b8" font-family="sans-serif"%3ENo Image%3C/text%3E%3C/svg%3E'; e.target.onerror = null; }}
              />
              <p className="text-white text-center mt-4 text-sm">
                {images[currentImage].title} ({currentImage + 1}/{images.length})
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Gallery
