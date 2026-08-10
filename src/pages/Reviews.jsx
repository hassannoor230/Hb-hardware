import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Breadcrumb from '../components/common/Breadcrumb'
import { Star, ThumbsUp, MessageCircle, ChevronDown } from 'lucide-react'

const reviews = [
  {
    id: 1,
    name: 'Ahmed Khan',
    location: 'Gujranwala',
    rating: 5,
    comment: 'Excellent quality products and very helpful staff. They helped me find exactly what I needed for my construction project.',
    date: '2024-12-15'
  },
  {
    id: 2,
    name: 'Fatima Ali',
    location: 'Gujranwala',
    rating: 5,
    comment: 'Great selection of hardware. The team is very knowledgeable and provides excellent customer service.',
    date: '2024-12-10'
  },
  {
    id: 3,
    name: 'Muhammad Shahid',
    location: 'Gujranwala',
    rating: 4,
    comment: 'Good quality products at reasonable prices. Delivery was prompt and professional.',
    date: '2024-12-05'
  },
  {
    id: 4,
    name: 'Saima Akhtar',
    location: 'Gujranwala',
    rating: 5,
    comment: 'I love shopping at HB Hardware. They always have what I need and the staff is always ready to help.',
    date: '2024-12-01'
  },
  {
    id: 5,
    name: 'Hassan Ahmed',
    location: 'Gujranwala',
    rating: 5,
    comment: 'Best hardware store in Gujranwala. Quality products and great prices. Highly recommended!',
    date: '2024-11-28'
  },
  {
    id: 6,
    name: 'Ayesha Malik',
    location: 'Gujranwala',
    rating: 4,
    comment: 'Very satisfied with the service. The staff helped me choose the right products for my home renovation.',
    date: '2024-11-20'
  }
]

const ReviewCard = ({ review }) => {
  return (
    <div className="card h-full flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <span className="text-primary font-bold text-sm">
              {review.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <h3 className="font-heading font-semibold text-primary text-sm">{review.name}</h3>
            <p className="text-xs text-muted">{review.location}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < review.rating ? 'fill-accent text-accent' : 'text-gray-300'}`}
            />
          ))}
        </div>
      </div>
      <p className="text-text mb-4 flex-grow leading-relaxed text-sm">"{review.comment}"</p>
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <span className="text-xs text-muted">{new Date(review.date).toLocaleDateString()}</span>
        <button className="flex items-center gap-1 text-xs text-muted hover:text-accent transition-colors">
          <ThumbsUp className="w-3 h-3" />
          Helpful
        </button>
      </div>
    </div>
  )
}

const Reviews = () => {
  const [showAll, setShowAll] = useState(false)
  const displayedReviews = showAll ? reviews : reviews.slice(0, 3)

  return (
    <>
      <Helmet>
        <title>Customer Reviews - HB Hardware | Trusted Hardware Store</title>
        <meta name="description" content="Read what our customers say about HB Hardware. Trusted hardware store in Gujranwala with quality products and excellent service." />
        <link rel="canonical" href="/reviews" />
      </Helmet>

      <section className="section-padding bg-background" aria-labelledby="reviews-title">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-block badge-primary mb-4">Testimonials</span>
            <h1 id="reviews-title" className="text-4xl md:text-5xl font-bold text-primary mb-4">
              What Our Customers Say
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
              Don't just take our word for it. Here's what our valued customers have to say about their experience with HB Hardware.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedReviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ReviewCard review={review} />
              </motion.div>
            ))}
          </div>

          {reviews.length > 3 && (
            <div className="text-center mt-10">
              <button
                onClick={() => setShowAll(!showAll)}
                className="btn-outline"
              >
                {showAll ? 'Show Less' : 'View All Reviews'}
                <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showAll ? 'rotate-180' : ''}`} />
              </button>
            </div>
          )}

          <div className="mt-16">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-card border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10 text-center">
                <div className="flex items-center justify-center gap-2 text-accent mb-4">
                  <MessageCircle className="w-8 h-8" />
                  <span className="text-4xl font-extrabold">4.8</span>
                  <span className="text-lg text-muted">/ 5.0</span>
                </div>
                <div className="flex items-center justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted mb-2">Based on {reviews.length} customer reviews</p>
                <p className="text-sm text-muted">Thank you for your trust and continued support</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Reviews
