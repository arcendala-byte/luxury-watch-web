"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#D4AF37] selection:text-black flex flex-col">
      
      <section className="flex-1 flex flex-col items-center justify-center relative overflow-hidden px-6 pt-32">
        <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
          <h2 className="text-[40vw] font-black text-white italic whitespace-nowrap">404</h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center space-y-8"
        >
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-light tracking-tighter leading-none">
              Lost in <br /> <span className="italic font-serif text-[#D4AF37]">Time</span>
            </h1>
            <p className="text-white/40 text-sm md:text-base font-light tracking-widest uppercase max-w-sm mx-auto">
              The reference you are seeking does not exist in our current collection.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8">
            <Link 
              href="/"
              className="group flex items-center gap-3 bg-[#D4AF37] text-black px-8 py-4 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-white transition-all duration-500"
            >
              <Home size={14} />
              <span>Back Home</span>
            </Link>
            
            <Link 
              href="/collection"
              className="group flex items-center gap-3 text-white/60 hover:text-[#D4AF37] text-[10px] uppercase tracking-[0.4em] transition-all duration-500"
            >
              <span>Explore Pieces</span>
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
