"use client";

import { motion } from 'framer-motion';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#D4AF37] selection:text-black">
      
      <section className="pt-48 pb-32 px-6 md:px-12 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-16"
        >
          <div>
            <h1 className="text-5xl md:text-7xl font-light tracking-tighter mb-8">
              Privacy <br /> <span className="italic font-serif text-[#D4AF37]">Policy</span>
            </h1>
            <p className="text-white/40 text-[10px] uppercase tracking-[0.5em]">Effective Date: April 14, 2026</p>
          </div>

          <div className="prose prose-invert prose-stone max-w-none space-y-12 text-white/70 font-light leading-relaxed">
            <section className="space-y-6">
              <h2 className="text-white text-xl tracking-[0.2em] uppercase font-light">1. The Collection of Intelligence</h2>
              <p>
                At Chronos, we treat your data as we do a rare timepiece: with absolute discretion and precision. We collect information you provide directly to us through inquiries, boutique appointments, and account creation.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-white text-xl tracking-[0.2em] uppercase font-light">2. Preservation of Privacy</h2>
              <p>
                We do not sell, lease, or distribute your personal details to third parties. Your data is used exclusively to facilitate private viewings, manage your collection, and provide tailor-made horological insights.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-white text-xl tracking-[0.2em] uppercase font-light">3. Digital Security</h2>
              <p>
                Our platforms utilize industry-leading encryption to safeguard your correspondence and transaction history. Every digital interaction is protected by redundant security mechanisms.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-white text-xl tracking-[0.2em] uppercase font-light">4. Your Rights</h2>
              <p>
                You retain complete sovereignty over your data. At any time, you may request access to, correction of, or permanent deletion of your information from our archives by contacting our concierge.
              </p>
            </section>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
