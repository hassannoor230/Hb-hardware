import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import Breadcrumb from '../components/common/Breadcrumb'
import { ChevronDown, HelpCircle } from 'lucide-react'

const faqs = [
  {
    question: 'What are your business hours?',
    answer: 'We are open Monday to Friday from 9:00 AM to 8:00 PM, Saturday from 10:00 AM to 6:00 PM, and closed on Sunday.'
  },
  {
    question: 'Do you deliver hardware products?',
    answer: 'Yes, we provide fast and reliable delivery services across Gujranwala and surrounding areas. Contact us for delivery details and charges.'
  },
  {
    question: 'What types of hardware do you sell?',
    answer: 'We offer a comprehensive range including construction hardware, door hardware, cabinet hardware, bathroom and kitchen hardware, tools, fasteners, and more.'
  },
  {
    question: 'Can I get a quote for my project?',
    answer: 'Absolutely! We provide free quotes for all projects. Simply fill out our quote form or contact us directly with your requirements.'
  },
  {
    question: 'Do you offer wholesale prices?',
    answer: 'Yes, we offer competitive wholesale prices for bulk orders. Please contact us for detailed pricing and volume discounts.'
  },
  {
    question: 'Where is your store located?',
    answer: 'Our store is located at Deen Market, Krishan Nagar, Gujranwala, Punjab, Pakistan. You can visit us during business hours.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept cash, bank transfers, and major credit/debit cards. Please confirm payment options when placing your order.'
  },
  {
    question: 'Do you provide installation services?',
    answer: 'While we primarily supply hardware products, we can recommend trusted contractors for installation services.'
  }
]

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border border-border rounded-2xl overflow-hidden bg-white hover:border-accent/30 transition-colors">
      <button
        onClick={onClick}
        className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-heading font-semibold text-primary text-base md:text-lg">{question}</span>
        <ChevronDown className={`w-5 h-5 text-accent transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-5 text-muted leading-relaxed">
          {answer}
        </div>
      </motion.div>
    </div>
  )
}

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <>
      <Helmet>
        <title>FAQ - HB Hardware | Frequently Asked Questions</title>
        <meta name="description" content="Find answers to frequently asked questions about HB Hardware, our products, services, and policies." />
        <link rel="canonical" href="/faq" />
      </Helmet>

      <section className="section-padding bg-background" aria-labelledby="faq-title">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="inline-block badge-primary mb-4">FAQ</span>
            <h1 id="faq-title" className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
              Find answers to common questions about HB Hardware. Can't find what you're looking for? Contact us directly.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <FAQItem
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === index}
                  onClick={() => toggleFAQ(index)}
                />
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex flex-col items-center p-8 bg-white rounded-2xl shadow-card border border-gray-100">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-4">
                <HelpCircle className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">Still have questions?</h3>
              <p className="text-muted mb-6 max-w-md">Can't find the answer you're looking for? Please reach out to our friendly team.</p>
              <a
                href="/contact"
                className="btn-primary"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default FAQ
