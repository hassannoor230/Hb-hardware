import React from 'react'
import { motion } from 'framer-motion'
import { Search, ShoppingBag, Truck, CheckCircle } from 'lucide-react'

const steps = [
  {
    icon: Search,
    title: 'Browse Products',
    description: 'Explore our extensive catalog of quality hardware products.',
  },
  {
    icon: ShoppingBag,
    title: 'Choose Your Items',
    description: 'Select the perfect products for your project needs.',
  },
  {
    icon: Truck,
    title: 'Quick Delivery',
    description: 'Get your items delivered fast to your location.',
  },
  {
    icon: CheckCircle,
    title: 'Satisfaction Guaranteed',
    description: 'We ensure complete satisfaction with every purchase.',
  }
]

const Process = () => {
  return (
    <section className="section-padding bg-white relative" aria-labelledby="process-title">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="inline-block badge-primary mb-4">How It Works</span>
          <h2 id="process-title" className="section-title">
            Simple Steps to Get Started
          </h2>
          <p className="section-subtitle">
            Easy and hassle-free process to get the hardware you need
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="text-center relative"
              >
                <div className="relative inline-flex mb-6">
                  <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center relative z-10 shadow-lg shadow-primary/20">
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white text-sm font-bold z-20 shadow-lg shadow-accent/30">
                    {index + 1}
                  </div>
                </div>
                <h3 className="font-heading font-semibold text-lg text-primary mb-2">
                  {step.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Process
