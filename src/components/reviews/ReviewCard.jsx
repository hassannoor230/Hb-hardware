import React from 'react'
import { Star, ThumbsUp } from 'lucide-react'

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-heading font-semibold text-primary">{review.name}</h3>
          <p className="text-sm text-muted">{review.location}</p>
        </div>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < review.rating ? 'fill-accent text-accent' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
      
      <p className="text-muted mb-4 leading-relaxed">{review.comment}</p>
      
      <div className="flex items-center justify-between text-sm text-muted border-t border-border pt-4">
        <span>{new Date(review.date).toLocaleDateString()}</span>
        <button 
          className="flex items-center gap-1 hover:text-accent transition-colors"
          aria-label="Mark as helpful"
        >
          <ThumbsUp className="w-4 h-4" />
          <span>Helpful</span>
        </button>
      </div>
    </div>
  )
}

export default ReviewCard