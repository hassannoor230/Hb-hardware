import React from 'react'
import { Helmet } from 'react-helmet-async'
import Hero from '../components/home/Hero'
import Categories from '../components/home/Categories'
import WhyChooseUs from '../components/home/WhyChooseUs'
import AboutPreview from '../components/home/AboutPreview'
import Process from '../components/home/Process'
import GalleryPreview from '../components/home/GalleryPreview'
import ReviewsPreview from '../components/home/ReviewsPreview'
import CTABanner from '../components/home/CTABanner'

const Home = () => {
  return (
    <>
      <Helmet>
        <title>HB Hardware - Premium Hardware Store in Gujranwala</title>
        <meta name="description" content="Quality hardware products in Gujranwala. Construction materials, door hardware, cabinet hardware, and more. Visit our store in Deen Market, Krishan Nagar." />
        <link rel="canonical" href="/" />
        
        {/* Open Graph */}
        <meta property="og:title" content="HB Hardware - Premium Hardware Store in Gujranwala" />
        <meta property="og:description" content="Quality hardware products in Gujranwala. Construction materials, door hardware, cabinet hardware, and more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hbhardware.com" />
        <meta property="og:image" content="https://hbhardware.com/images/og-image.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="HB Hardware - Premium Hardware Store in Gujranwala" />
        <meta name="twitter:description" content="Quality hardware products in Gujranwala. Visit us today!" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "HB Hardware",
            "image": "https://hbhardware.com/images/logo.jpg",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Deen Market, Krishan Nagar",
              "addressLocality": "Gujranwala",
              "addressRegion": "Punjab",
              "addressCountry": "Pakistan"
            },
            "telephone": "+923126314045",
            "openingHours": "Mo-Fr 09:00-20:00, Sa 10:00-18:00",
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "32.1590",
              "longitude": "74.1834"
            }
          })}
        </script>
      </Helmet>

      <Hero />
      <Categories />
      <WhyChooseUs />
      <AboutPreview />
      <Process />
      <GalleryPreview />
      <ReviewsPreview />
      <CTABanner />
    </>
  )
}

export default Home
