import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  MapPin,
  Users,
  Award,
} from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Prime Location",
    text: "Deen Market, Krishan Nagar, Gujranwala",
  },
  {
    icon: Users,
    title: "Trusted Service",
    text: "Serving homeowners, builders & contractors",
  },
  {
    icon: Award,
    title: "Quality Products",
    text: "Reliable hardware for residential & commercial projects",
  },
];

const AboutPreview = () => {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          {/* Main Image */}
          <div className="overflow-hidden rounded-3xl shadow-2xl">
            <img
              src="/images/about-preview.jpg"
              alt="HB Hardware"
              className="h-[520px] w-full object-cover"
              onError={(e) => { e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%23e2e8f0"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%2394a3b8" font-family="sans-serif"%3ENo Image%3C/text%3E%3C/svg%3E'; e.target.onerror = null; }}
            />
          </div>

          {/* Experience Card */}
          <div className="absolute -bottom-8 -right-6 rounded-3xl bg-gradient-to-r from-amber-500 to-orange-600 p-6 text-white shadow-xl">
            <h3 className="text-5xl font-extrabold">10+</h3>
            <p className="mt-2 text-sm uppercase  font-semibold tracking-wider text-white/90">
              Years of Trusted Service
            </p>
          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-flex rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
            About HB Hardware
          </span>

          <h2 className="mt-5 text-4xl font-bold leading-tight text-slate-900">
            Your Trusted Hardware Partner in{" "}
            <span className="text-amber-600">
              Gujranwala
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Located in Deen Market, Krishan Nagar,
            HB Hardware supplies quality hardware,
            construction materials, tools, fittings,
            and accessories for residential,
            commercial, and industrial projects.
          </p>

          <p className="mt-4 leading-8 text-gray-600">
            We are committed to delivering
            dependable products, competitive pricing,
            and exceptional customer service for
            homeowners, contractors, builders, and
            businesses.
          </p>

          {/* Features */}
          <div className="mt-10 space-y-5">
            {features.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ x: 8 }}
                className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-lg"
              >
                <div className="rounded-2xl bg-amber-100 p-3 text-amber-600">
                  <item.icon className="h-6 w-6" />
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900">
                    {item.title}
                  </h4>

                  <p className="mt-1 text-gray-600">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Button */}
          <Link
            to="/about"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 px-7 py-4 font-semibold text-white shadow-lg transition hover:scale-105 hover:shadow-xl"
          >
            Learn More
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutPreview;