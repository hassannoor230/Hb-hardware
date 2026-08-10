import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Truck, Award, Headphones, CheckCircle } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Premium Quality',
    description: 'We source only the highest quality hardware products from trusted manufacturers.',
    stat: '100%',
    statLabel: 'Quality Assured'
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Quick and reliable delivery services across Gujranwala and surrounding areas.',
    stat: '24hr',
    statLabel: 'Quick Delivery'
  },
  {
    icon: Award,
    title: 'Expert Guidance',
    description: 'Our knowledgeable staff provides expert advice for all your hardware needs.',
    stat: '15+',
    statLabel: 'Years Experience'
  },
  {
    icon: Headphones,
    title: 'Customer Support',
    description: 'Dedicated support team ready to assist you with any questions or concerns.',
    stat: '24/7',
    statLabel: 'Support Available'
  }
]

const WhyChooseUs = () => {
  return (
    <section className="section-padding bg-white relative" aria-labelledby="why-choose-title">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="container-custom relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block badge-primary mb-4">Why Choose Us</span>
          <h2 id="why-choose-title" className="section-title">
            Why Choose HB Hardware?
          </h2>
          <p className="section-subtitle">
            We combine quality products with exceptional service to provide the best hardware experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="card card-hover h-full text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-accent/10 transition-colors duration-300">
                    <feature.icon className="w-8 h-8 text-primary group-hover:text-accent transition-colors duration-300" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white text-xs font-bold">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-extrabold text-accent mb-1">{feature.stat}</div>
                <div className="text-xs text-muted uppercase tracking-wider mb-3">{feature.statLabel}</div>
                <h3 className="font-heading font-semibold text-lg text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
