import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from '../common/Button'
import {
  Construction,
  DoorClosed,
  Box,
  Bath,
  Utensils,
  Package,
  ArrowRight
} from 'lucide-react'

const categories = [
  {
    name: 'Construction Hardware',
    icon: Construction,
    description: 'High-quality construction materials',
    href: '/products'
  },
  {
    name: 'Door Hardware',
    icon: DoorClosed,
    description: 'Locks, handles, and hinges',
    href: '/products'
  },
  {
    name: 'Cabinet Hardware',
    icon: Box,
    description: 'Knobs, pulls, and hinges',
    href: '/products'
  },
  {
    name: 'Bathroom Hardware',
    icon: Bath,
    description: 'Faucets, showers, and accessories',
    href: '/products'
  },
  {
    name: 'Kitchen Hardware',
    icon: Utensils,
    description: 'Cabinet solutions and fixtures',
    href: '/products'
  },
  {
    name: 'General Hardware',
    icon: Package,
    description: 'Tools, fasteners, and more',
    href: '/products'
  },
]

const Categories = () => {
  return (
    <section className="section-padding bg-background" aria-labelledby="categories-title">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="inline-block badge-accent mb-4">Product Categories</span>
          <h2 id="categories-title" className="section-title">
            Our Product Categories
          </h2>
          <p className="section-subtitle">
            Explore our extensive range of hardware products for every need
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link to={category.href} className="block">
                <div className="card card-hover h-full cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="icon-box-accent group-hover:scale-110 transition-transform duration-300">
                      <category.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold text-lg text-primary mb-1 group-hover:text-accent transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-muted text-sm leading-relaxed">{category.description}</p>
                    </div>
                    <div className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      <ArrowRight className="w-5 h-5 text-accent" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/products">
            <Button variant="outline" className="gap-2">
              View All Products
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Categories
