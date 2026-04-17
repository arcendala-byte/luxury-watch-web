"use client"
import { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Hero from '@/components/Hero';
import Heritage from '@/components/Heritage';
import ProductGrid from '@/components/ProductGrid';
import Craftsmanship from '@/components/Craftsmanship';
import Footer from '@/components/Footer';
import Loader from '@/components/Loader';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Sync with the visual weight of the video asset
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* 1. Cinematic Entry Loader */}
      <AnimatePresence mode="wait">
        {isLoading && <Loader key="loader" />}
      </AnimatePresence>

      {/* 2. Main Site Content */}
      <main 
        className={`relative min-h-screen bg-black transition-opacity duration-1000 overflow-x-hidden ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <section className="relative h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden">
          
          {/* Background Video Implementation */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-50"
            >
              <source src="/videos/hero-bg.mp4" type="video/mp4" />
              {/* Fallback for browsers that don't support video */}
              <div className="absolute inset-0 bg-stone-900" />
            </video>
            
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_90%)] opacity-60" />
          </div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={!isLoading ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#D4AF37] tracking-[0.5em] uppercase text-[10px] md:text-xs mb-4 relative z-10"
          >
            Masterpiece of Time
          </motion.h2>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={!isLoading ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-6xl md:text-8xl font-light mb-10 tracking-tighter text-white relative z-10"
          >
            Precision. <br/> 
            <span className="italic font-serif">Elegance.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={!isLoading ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.7 }}
            className="relative z-10"
          >
            <Link href="#collection">
              <button className="group relative border border-[#D4AF37]/30 px-10 py-4 uppercase text-[10px] tracking-[0.3em] text-[#D4AF37] hover:text-black transition-colors duration-500 overflow-hidden">
                <span className="relative z-10">Explore Collection</span>
                <div className="absolute inset-0 bg-[#D4AF37] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
              </button>
            </Link>
          </motion.div>

          {/* Abstract Watch Component: Floating Rotating Gear */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-64 opacity-10 pointer-events-none"
          >
            <div className="w-[800px] h-[800px] border border-white rounded-full flex items-center justify-center">
               <div className="w-[600px] h-[600px] border border-white rounded-full opacity-50" />
            </div>
          </motion.div>
        </section>

        {/* 3. Heritage Section */}
        <div id="heritage">
          <Heritage />
        </div>

        {/* 4. Collection Showcase */}
        <div id="collection" className="py-20 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <h2 className="text-white font-extralight text-3xl md:text-4xl tracking-widest uppercase">The Collection</h2>
              <div className="h-px w-20 bg-[#D4AF37] mt-4" />
            </div>
          </div>
          
          <Suspense fallback={
            <div className="h-96 flex flex-col items-center justify-center text-white/20 uppercase tracking-[0.5em] text-[10px] gap-4">
              <div className="w-8 h-8 border-t border-[#D4AF37] animate-spin rounded-full" />
              Authenticating Collection...
            </div>
          }>
            <ProductGrid />
          </Suspense>
        </div>

        {/* 5. Final Experience Sections */}
        <div id="craftsmanship">
          <Craftsmanship />
        </div>
        <Footer />
      </main>
    </>
  );
}