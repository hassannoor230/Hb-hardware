import React from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Breadcrumb from '../components/common/Breadcrumb'
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react'

const About = () => {
  return (
    <>
      <Helmet>
        <title>About HB Hardware - Trusted Hardware Store in Gujranwala</title>
        <meta name="description" content="Learn about HB Hardware, your trusted hardware partner in Gujranwala. Quality products, expert advice, and exceptional service." />
        <link rel="canonical" href="/about" />
      </Helmet>

      <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'About', path: '/about' }]} />

      <section className="section-padding bg-white" aria-labelledby="about-title">
        <div className="container-custom">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <span className="inline-block badge-primary mb-4">About Us</span>
            <h1 id="about-title" className="text-4xl md:text-5xl font-bold text-primary mb-6">
              About HB Hardware
            </h1>
            <p className="text-lg text-muted leading-relaxed">
              Your trusted partner for quality hardware solutions in Gujranwala. We've been serving 
              the community with premium products and exceptional service for over a decade.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-accent/10 to-primary/10 rounded-3xl blur-2xl" />
                <div className="relative aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden">
                  <img
                    src="/images/store-placeholder.jpg"
                    alt="HB Hardware Store"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => { e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23e2e8f0"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%2394a3b8" font-family="sans-serif"%3ENo Image%3C/text%3E%3C/svg%3E'; e.target.onerror = null; }}
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-primary mb-6">Our Story</h2>
              <p className="text-muted text-lg leading-relaxed mb-6">
                HB Hardware was established with a vision to provide premium quality hardware products 
                and exceptional service to the community of Gujranwala. Located in the bustling Deen Market, 
                Krishan Nagar, we have become a trusted destination for contractors, builders, and homeowners 
                seeking reliable hardware solutions.
              </p>
              <p className="text-muted text-lg leading-relaxed">
                Our commitment to quality and customer satisfaction has earned us a reputation as the 
                go-to hardware store in the region. We continuously expand our product range to meet 
                the evolving needs of our customers.
              </p>
            </motion.div>
          </div>

          {/* Mission & Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {[
              { 
                title: 'Our Mission', 
                desc: 'To provide the highest quality hardware products with expert guidance, ensuring every customer finds exactly what they need for their projects.' 
              },
              { 
                title: 'Our Vision', 
                desc: 'To become the most trusted and comprehensive hardware destination in Punjab, known for quality, service, and integrity.' 
              },
              { 
                title: 'Our Values', 
                desc: 'Quality, integrity, customer satisfaction, and continuous improvement are the cornerstones of our business philosophy.' 
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="card h-full">
                  <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                  <p className="text-muted leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-primary rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-8">Visit Our Store</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Address</h3>
                        <p className="text-gray-300 text-sm">
                          Deen Market, Krishan Nagar<br />
                          Gujranwala, Punjab, Pakistan
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Phone</h3>
                        <a href="tel:+923126314045" className="text-gray-300 hover:text-accent transition-colors text-sm">
                          0312-6314045
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Email</h3>
                        <a href="mailto:info@hbhardware.com" className="text-gray-300 hover:text-accent transition-colors text-sm">
                          info@hbhardware.com
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Clock className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">Business Hours</h3>
                        <div className="text-gray-300 text-sm space-y-1">
                          <p>Mon-Fri: 9:00 AM - 8:00 PM</p>
                          <p>Saturday: 10:00 AM - 6:00 PM</p>
                          <p>Sunday: Closed</p>
                        </div>
                      </div>
                    </div>
                    <div className="pt-4">
                      <a href="/contact" className="inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-xl hover:bg-accent-hover transition-colors font-medium">
                        Contact Us
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default About
