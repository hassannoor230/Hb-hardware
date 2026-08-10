import React from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Breadcrumb from '../components/common/Breadcrumb'
import { Wrench, Truck, Shield, Headphones, PenTool, Clock } from 'lucide-react'

const services = [
  {
    icon: Wrench,
    title: 'Hardware Solutions',
    description: 'Comprehensive hardware solutions for construction, renovation, and maintenance projects.',
  },
  {
    icon: Truck,
    title: 'Delivery Services',
    description: 'Fast and reliable delivery of hardware products across Gujranwala and surrounding areas.',
  },
  {
    icon: Shield,
    title: 'Quality Assurance',
    description: 'We ensure all our products meet the highest quality standards and are sourced from trusted manufacturers.',
  },
  {
    icon: Headphones,
    title: 'Expert Consultation',
    description: 'Get professional advice from our experienced team for your specific hardware requirements.',
  },
  {
    icon: PenTool,
    title: 'Project Support',
    description: 'We provide support for both small and large scale projects from planning to completion.',
  },
  {
    icon: Clock,
    title: 'After-Sales Service',
    description: 'Committed to your satisfaction with dedicated after-sales support and service.',
  }
]

const Services = () => {
  return (
    <>
      <Helmet>
        <title>Services - HB Hardware | Hardware Solutions in Gujranwala</title>
        <meta name="description" content="Explore our comprehensive hardware services including delivery, consultation, project support, and quality assurance." />
        <link rel="canonical" href="/services" />
      </Helmet>

      <section className="section-padding bg-white" aria-labelledby="services-title">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-block badge-primary mb-4">Our Services</span>
            <h1 id="services-title" className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Comprehensive Hardware Services
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
              Tailored solutions to meet all your hardware needs with excellence and reliability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="card card-hover h-full">
                  <div className="icon-box-accent group-hover:scale-110 transition-transform duration-300 mb-4">
                    <service.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-primary mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Services
