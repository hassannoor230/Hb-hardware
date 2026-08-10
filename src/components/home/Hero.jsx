import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Phone, MessageCircle, ArrowRight, Shield, Award, Truck } from 'lucide-react'
import Button from '../common/Button'

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center bg-primary overflow-hidden pt-20 sm:pt-24 lg:pt-28" aria-label="Hero">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-light to-primary" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-2xl" />

      <div className="container-custom relative z-10 py-20">
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold border border-accent/20">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              Pakistan's Trusted Hardware Partner
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight"
          >
            Quality Hardware Solutions for <br />
            <span className="text-accent">Every Project</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed"
          >
            From construction to renovation, HB Hardware provides premium quality products
            and expert guidance for all your hardware needs in Gujranwala.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <Link to="/contact">
              <Button size="lg" className="gap-2 shadow-glow">
                Get a Quote
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <a href="tel:+923126314045">
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white hover:text-primary gap-2">
                <Phone className="w-4 h-4" />
                Call Now
              </Button>
            </a>
            <a
              href="https://wa.me/923126314045"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="secondary" size="lg" className="bg-[#25D366] hover:bg-[#20BD5A] gap-2">
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </Button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-8"
          >
            <div className="flex items-center gap-3 text-white/80">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-accent" />
              </div>
              <span className="text-sm font-medium">Premium Quality Products</span>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                <Award className="w-5 h-5 text-accent" />
              </div>
              <span className="text-sm font-medium">Expert Guidance</span>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                <Truck className="w-5 h-5 text-accent" />
              </div>
              <span className="text-sm font-medium">Fast Delivery</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}

export default Hero
