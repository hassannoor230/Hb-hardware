import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Breadcrumb from '../components/common/Breadcrumb'
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from 'lucide-react'
import Button from '../components/common/Button'

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you for contacting us! We will get back to you soon.')
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
  }

  return (
    <>
      <Helmet>
        <title>Contact HB Hardware - Hardware Store in Gujranwala</title>
        <meta name="description" content="Contact HB Hardware for quality hardware products, quotes, and expert advice in Gujranwala. Call, WhatsApp, or visit our store." />
        <link rel="canonical" href="/contact" />
      </Helmet>

      <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Contact', path: '/contact' }]} />

      <section className="section-padding bg-white" aria-labelledby="contact-title">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-block badge-primary mb-4">Get In Touch</span>
            <h1 id="contact-title" className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
              Have a question or need a quote? We'd love to hear from you. Reach out and we'll respond as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-1 space-y-6"
            >
              <div className="card h-full">
                <h2 className="text-2xl font-bold text-primary mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="icon-box-accent flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-1">Our Address</h3>
                      <p className="text-muted text-sm">
                        Deen Market, Krishan Nagar<br />
                        Gujranwala, Punjab, Pakistan
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="icon-box-accent flex-shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-1">Phone</h3>
                      <a href="tel:+923126314045" className="text-muted hover:text-accent transition-colors text-sm">
                        0312-6314045
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="icon-box-accent flex-shrink-0">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-1">WhatsApp</h3>
                      <a href="https://wa.me/923126314045" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors text-sm">
                        Chat with us
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="icon-box-accent flex-shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-1">Email</h3>
                      <a href="mailto:info@hbhardware.com" className="text-muted hover:text-accent transition-colors text-sm">
                        info@hbhardware.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="icon-box-accent flex-shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-1">Business Hours</h3>
                      <div className="text-muted text-sm space-y-1">
                        <p>Mon-Fri: 9:00 AM - 8:00 PM</p>
                        <p>Saturday: 10:00 AM - 6:00 PM</p>
                        <p>Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <a
                    href="https://wa.me/923126314045"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-xl hover:bg-[#20BD5A] transition-colors font-medium"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Forms */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-8"
            >
              <div className="card">
                <h2 className="text-2xl font-bold text-primary mb-6">Send us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-text mb-2">
                        Full Name <span className="text-error">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
                        Email Address <span className="text-error">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="input-field"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-text mb-2">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-text mb-2">
                        Subject <span className="text-error">*</span>
                      </label>
                      <input
                        id="subject"
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        className="input-field"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-text mb-2">
                      Message <span className="text-error">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows="5"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="input-field resize-none"
                      required
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full gap-2">
                    <Send className="w-4 h-4" />
                    Send Message
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>

          {/* Map Section */}
          <div className="mt-16">
            <div className="card p-0 overflow-hidden">
              <div className="w-full h-[450px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27198.678405478854!2d74.1783443!3d32.1590268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391737ddb98b77f5%3A0x5d70ae721f60ac6c!2sGujranwala%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="HB Hardware Location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact
