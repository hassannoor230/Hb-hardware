import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Phone,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

import Button from "../common/Button";

const CTABanner = ({
  phone = "",
  whatsapp = "",
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-24 text-white">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-amber-500/20 blur-3xl" />
        <div className="absolute bottom-0 -right-24 h-80 w-80 rounded-full bg-orange-500/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-[32px] border border-white/10 bg-white/10 p-10 shadow-2xl backdrop-blur-xl lg:p-14"
        >
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full bg-amber-500/20 px-4 py-2 text-sm font-semibold text-amber-300">
              Get Started Today
            </span>

            <h2 className="mt-6 text-4xl font-bold leading-tight lg:text-5xl">
              Ready to Start Your Next
              <span className="block text-amber-400">
                Hardware Project?
              </span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              Whether you're building, renovating, or repairing,
              HB Hardware is here to help you find quality products
              and the right solutions for your project.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button size="lg">
                Get a Free Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            {phone && (
              <a href={`tel:${phone}`}>
                <Button variant="outline" size="lg">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now
                </Button>
              </a>
            )}

            {whatsapp && (
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary" size="lg">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp Us
                </Button>
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABanner;