"use client";

import { motion } from 'framer-motion';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an analytics provider
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      
      <section className="flex-1 flex flex-col items-center justify-center px-6 pt-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center space-y-10"
        >
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full border border-red-500/20 flex items-center justify-center">
              <AlertCircle className="text-red-500/50" size={32} />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-light tracking-tighter leading-tight">
              A MomentARY <br /> <span className="italic font-serif text-[#D4AF37]">Friction</span>
            </h1>
            <p className="text-white/40 text-sm md:text-base font-light tracking-widest uppercase max-w-sm mx-auto">
              The mechanism encountered an unexpected resistance. Our specialists are already investigating.
            </p>
          </div>

          <div className="pt-8">
            <button
              onClick={() => reset()}
              className="group flex items-center justify-center gap-4 bg-white text-black px-10 py-5 text-[10px] uppercase tracking-[0.5em] font-bold hover:bg-[#D4AF37] transition-all duration-500 mx-auto"
            >
              <RefreshCw size={14} className="group-hover:rotate-180 transition-transform duration-700" />
              <span>Reset Mechanism</span>
            </button>
            <p className="mt-8 text-[9px] uppercase tracking-[0.3em] text-white/20">
              Error Hash: {error.digest || 'Internal Exception'}
            </p>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
