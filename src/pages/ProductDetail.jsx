import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Breadcrumb from '../components/common/Breadcrumb'
import { ArrowLeft, MessageCircle, CheckCircle, Truck, Shield, Phone } from 'lucide-react'
import Button from '../components/common/Button'

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
    specifications: { Power: '2000W', Voltage: '230V', 'Chuck Size': '13mm', 'Warranty': '1 year' }
  },
]

const ProductDetail = () => {
  const { id } = useParams()
  const product = products.find(p => p.id === parseInt(id))

  if (!product) {
    return (
      <>
        <Helmet>
          <title>Product Not Found - HB Hardware</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <section className="section-padding bg-white">
          <div className="container-custom text-center">
            <h1 className="text-4xl font-bold text-primary mb-4">Product Not Found</h1>
            <p className="text-muted mb-8">The product you're looking for doesn't exist.</p>
            <Link to="/products" className="btn-primary inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Products
            </Link>
          </div>
        </section>
      </>
    )
  }

  const whatsappMessage = encodeURIComponent(
    `Hi HB Hardware, I'm interested in *${product.name}* (PKR ${product.price}). Can you provide more details and availability?`
  )
  const whatsappLink = `https://wa.me/923126314045?text=${whatsappMessage}`

  return (
    <>
      <Helmet>
        <title>{product.name} - HB Hardware | {product.category}</title>
        <meta name="description" content={product.description} />
        <link rel="canonical" href={`/products/${product.id}`} />
      </Helmet>

      <section className="section-padding bg-white" aria-labelledby="product-detail-title">
        <div className="container-custom">
          <Breadcrumb items={[
            { label: 'Home', path: '/' },
            { label: 'Products', path: '/products' },
            { label: product.name, path: `/products/${product.id}` }
          ]} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/products" className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" />
              Back to Products
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product Image */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="aspect-square bg-gray-100 rounded-3xl overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23e2e8f0"/%3E%text x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%2394a3b8" font-family="sans-serif"%3ENo Image%3C/text%3E%3C/svg%3E'; e.target.onerror = null; }}
                  />
                </div>
                {product.badge && (
                  <span className="absolute top-4 left-4 bg-accent text-white text-sm font-bold px-4 py-2 rounded-full">
                    {product.badge}
                  </span>
                )}
              </motion.div>

              {/* Product Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col"
              >
                <span className="text-sm font-medium text-accent uppercase tracking-wider mb-2">{product.category}</span>
                <h1 id="product-detail-title" className="text-3xl md:text-4xl font-bold text-primary mb-4">
                  {product.name}
                </h1>
                <p className="text-3xl font-extrabold text-primary mb-6">{product.price}</p>
                <p className="text-muted text-lg leading-relaxed mb-8">{product.description}</p>

                {/* Features */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-primary mb-4">Key Features</h3>
                  <ul className="space-y-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-text">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Specifications */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-primary mb-4">Specifications</h3>
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex flex-col">
                          <span className="text-xs text-muted uppercase tracking-wider mb-1">{key}</span>
                          <span className="text-sm font-semibold text-primary">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="w-full sm:w-auto gap-2">
                      <MessageCircle className="w-5 h-5" />
                      Order on WhatsApp
                    </Button>
                  </a>
                  <a href="tel:+923126314045">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2">
                      <Phone className="w-5 h-5" />
                      Call Now
                    </Button>
                  </a>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-border">
                  <div className="flex flex-col items-center text-center">
                    <Shield className="w-6 h-6 text-accent mb-2" />
                    <span className="text-xs text-muted">Quality Assured</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <Truck className="w-6 h-6 text-accent mb-2" />
                    <span className="text-xs text-muted">Fast Delivery</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <CheckCircle className="w-6 h-6 text-accent mb-2" />
                    <span className="text-xs text-muted">Verified Product</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default ProductDetail
