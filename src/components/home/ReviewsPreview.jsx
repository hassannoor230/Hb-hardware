import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Star, Quote } from 'lucide-react'

const previewReviews = [
  {
    id: 1,
    name: 'Ahmed Khan',
    location: 'Gujranwala',
    rating: 5,
    comment: 'Excellent quality products and very helpful staff. They helped me find exactly what I needed for my construction project.',
  },
  {
    id: 2,
    name: 'Fatima Ali',
    location: 'Gujranwala',
    rating: 5,
    comment: 'Great selection of hardware. The team is very knowledgeable and provided excellent advice for my home renovation.',
  },
  {
    id: 3,
    name: 'Muhammad Shahid',
    location: 'Gujranwala',
    rating: 4,
    comment: 'Good quality products at reasonable prices. Fast delivery and excellent customer service. Highly recommended!',
  }
]

const ReviewsPreview = () => {
  return (
    <section className="section-padding bg-white relative" aria-labelledby="reviews-preview-title">
      <div className="absolute inset-0 bg-dots opacity-40" />
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block badge-primary mb-4">Testimonials</span>
          <h2 id="reviews-preview-title" className="section-title">
            What Our Customers Say
          </h2>
          <p className="section-subtitle">
            Real reviews from our valued customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {previewReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="card h-full flex flex-col">
                <Quote className="w-8 h-8 text-accent/20 mb-4" />
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < review.rating ? 'fill-accent text-accent' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <p className="text-text mb-6 flex-grow leading-relaxed">"{review.comment}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">
                      {review.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-primary text-sm">{review.name}</p>
                    <p className="text-xs text-muted">{review.location}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/reviews"
            className="inline-flex items-center gap-2 text-accent hover:text-accent-hover font-semibold transition-colors group"
          >
            Read All Reviews
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ReviewsPreview
