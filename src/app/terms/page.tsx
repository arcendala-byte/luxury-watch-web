"use client";

import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#D4AF37] selection:text-black">
      <Navbar />
      
      <section className="pt-48 pb-32 px-6 md:px-12 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-16"
        >
          <div>
            <h1 className="text-5xl md:text-7xl font-light tracking-tighter mb-8">
              Terms of <br /> <span className="italic font-serif text-[#D4AF37]">Service</span>
            </h1>
            <p className="text-white/40 text-[10px] uppercase tracking-[0.5em]">Effective Date: April 14, 2026</p>
          </div>

          <div className="prose prose-invert prose-stone max-w-none space-y-12 text-white/70 font-light leading-relaxed">
            <section className="space-y-6">
              <h2 className="text-white text-xl tracking-[0.2em] uppercase font-light">1. The Chronos Circle</h2>
              <p>
                By accessing this platform, you agree to engage with the Chronos brand with the respect due to haute horlogerie. Our services are provided to collectors, enthusiasts, and partners seeking the pinnacle of mechanical timekeeping.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-white text-xl tracking-[0.2em] uppercase font-light">2. Intellectual Property</h2>
              <p>
                All designs, mechanical diagrams, and cinematic content displayed are the exclusive property of Chronos. Unauthorized reproduction or dissemination of our intellectual assets is strictly prohibited.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-white text-xl tracking-[0.2em] uppercase font-light">3. Inquiries & Acquisitions</h2>
              <p>
                Placing an inquiry does not constitute a legal contract of sale. All timepiece acquisitions are subject to verification, global availability, and final confirmation by our master horologists.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-white text-xl tracking-[0.2em] uppercase font-light">4. Jurisdiction</h2>
              <p>
                These terms are governed by the laws of Switzerland. Any disputes arising from the use of our digital platforms or services shall be adjudicated in the courts of Geneva.
              </p>
            </section>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
