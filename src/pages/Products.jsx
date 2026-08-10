import React, { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Breadcrumb from '../components/common/Breadcrumb'
import { Search, Filter, ShoppingBag, MessageCircle, ArrowRight } from 'lucide-react'
import Button from '../components/common/Button'

const productCategories = [
  'All Products',
  'Construction Hardware',
  'Door Hardware',
  'Cabinet Hardware',
  'Bathroom Hardware',
  'Kitchen Hardware',
  'Tools & Equipment',
  'Fasteners',
  'Safety Equipment'
]

const products = [
  {
    id: 1,
    name: 'Premium Door Hinges',
    category: 'Door Hardware',
    price: 'PKR 1,200',
    image: '/images/door-hardware.jpg',
    badge: 'Best Seller',
    description: 'Heavy-duty stainless steel door hinges designed for durability and smooth operation. Suitable for residential and commercial doors.',
    features: ['Stainless steel construction', 'Anti-rust coating', 'Quiet closing mechanism', 'Load capacity up to 40kg'],
    specifications: { Material: 'Stainless Steel', Finish: 'Brushed Nickel', Size: '4 inch', 'Load Capacity': '40kg' }
  },
  {
    id: 2,
    name: 'Cabinet Handles Set',
    category: 'Cabinet Hardware',
    price: 'PKR 2,500',
    image: '/images/cabinet-hardware.jpg',
    description: 'Elegant cabinet handle set with modern design. Perfect for kitchen cabinets, wardrobes, and bathroom vanities.',
    features: ['Modern minimalist design', 'Zinc alloy construction', 'Easy installation', 'Set of 6 handles'],
    specifications: { Material: 'Zinc Alloy', Finish: 'Chrome', 'Handle Length': '128mm', 'Set Includes': '6 handles + screws' }
  },
  {
    id: 3,
    name: 'Bathroom Faucet',
    category: 'Bathroom Hardware',
    price: 'PKR 4,500',
    image: '/images/bathroom-hardware.jpg',
    badge: 'New',
    description: 'Premium single-handle bathroom faucet with ceramic disc valve for leak-free operation. Modern design complements any bathroom decor.',
    features: ['Ceramic disc valve', 'Water-saving aerator', 'Easy installation', '5-year warranty'],
    specifications: { Material: 'Brass', Finish: 'Chrome', 'Valve Type': 'Ceramic Disc', 'Warranty': '5 years' }
  },
  {
    id: 4,
    name: 'Kitchen Cabinet Pulls',
    category: 'Kitchen Hardware',
    price: 'PKR 3,200',
    image: '/images/kitchen-hardware.jpg',
    description: 'Stylish kitchen cabinet pulls that add a contemporary touch to your kitchen. Durable construction for daily use.',
    features: ['Contemporary design', 'Solid brass construction', 'Fade-resistant finish', 'Set of 8 pulls'],
    specifications: { Material: 'Solid Brass', Finish: 'Matte Black', 'Pull Length': '160mm', 'Set Includes': '8 pulls + screws' }
  },
  {
    id: 5,
    name: 'Construction Grade Steel',
    category: 'Construction Hardware',
    price: 'PKR 8,500',
    image: '/images/construction-hardware.jpg',
    description: 'High-grade construction steel bars for reinforced concrete structures. Certified quality for maximum structural integrity.',
    features: ['High tensile strength', 'ISO certified', 'Corrosion resistant', 'Available in multiple sizes'],
    specifications: { Material: 'Mild Steel', Grade: 'Fe-500', 'Length': '12 meters', 'Weight': '10mm dia' }
  },
  {
    id: 6,
    name: 'Heavy Duty Drill Machine',
    category: 'Tools & Equipment',
    price: 'PKR 12,000',
    image: '/images/hardware-shelves.jpg',
    description: 'Professional-grade heavy duty drill machine for construction and industrial use. Powerful motor for drilling through tough materials.',
    features: ['2000W powerful motor', 'Variable speed control', 'Ergonomic grip', '1-year warranty'],
    specifications: { 'Power': '2000W', 'Voltage': '230V', 'Chuck Size': '13mm', 'Warranty': '1 year' }
  },
]

const buildWhatsAppMessage = (product) => {
  const message = encodeURIComponent(
    `Hi HB Hardware, I'm interested in *${product.name}* (PKR ${product.price}). Can you provide more details?`
  )
  return `https://wa.me/923126314045?text=${message}`
}

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Products')

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'All Products' || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory])

  return (
    <>
      <Helmet>
        <title>Products - HB Hardware | Quality Hardware in Gujranwala</title>
        <meta name="description" content="Browse our extensive range of hardware products including construction hardware, door hardware, cabinet hardware, and more." />
        <link rel="canonical" href="/products" />
      </Helmet>

      <section className="section-padding bg-white" aria-labelledby="products-title">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-block badge-accent mb-4">Our Products</span>
            <h1 id="products-title" className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Premium Hardware Products
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
              Discover our comprehensive range of quality hardware products for all your needs
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-10">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-12"
                aria-label="Search products"
              />
            </div>
            <div className="relative md:w-64">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-field pl-12 pr-10 appearance-none cursor-pointer"
                aria-label="Filter by category"
              >
                {productCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="w-16 h-16 text-muted/30 mx-auto mb-4" />
              <p className="text-muted text-lg">No products found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="card card-hover h-full flex flex-col">
                    <Link to={`/products/${product.id}`} className="block">
                      <div className="relative aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden mb-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                          onError={(e) => { e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23e2e8f0"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%2394a3b8" font-family="sans-serif"%3ENo Image%3C/text%3E%3C/svg%3E'; e.target.onerror = null; }}
                        />
                        {product.badge && (
                          <span className="absolute top-3 left-3 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">
                            {product.badge}
                          </span>
                        )}
                      </div>
                      <div className="flex-1">
                        <span className="text-xs font-medium text-accent uppercase tracking-wider">{product.category}</span>
                        <h3 className="font-heading font-semibold text-lg text-primary mt-1 mb-2 group-hover:text-accent transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-muted text-sm leading-relaxed line-clamp-2">{product.description}</p>
                      </div>
                    </Link>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                      <span className="text-xl font-bold text-primary">{product.price}</span>
                      <a
                        href={buildWhatsAppMessage(product)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button size="sm" className="gap-2">
                          <MessageCircle className="w-4 h-4" />
                          Order on WhatsApp
                        </Button>
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default Products
