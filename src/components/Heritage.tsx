"use client"
import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function Heritage() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  // PARALLAX EFFECT
  const imageY = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const frameY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  // YEAR COUNTER LOGIC
  const yearValue = useTransform(scrollYProgress, [0.1, 0.8], [1894, 2026]);
  const smoothYear = useSpring(yearValue, { stiffness: 50, damping: 20 });
  const displayYear = useTransform(smoothYear, (latest) => Math.floor(latest));

  return (
    <>
    <section 
      ref={targetRef} 
      className="relative bg-[#020202] py-32 px-6 md:px-12 border-t border-white/5 overflow-hidden"
    >
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating Background Year */}
      <motion.div 
        style={{ opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]) }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none"
      >
        <motion.h3 className="text-[15vw] md:text-[20vw] font-black text-white/[0.03] select-none tabular-nums">
          {displayYear}
        </motion.h3>
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          
          {/* Left Side: Imagery with Parallax Image */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-[4/5] overflow-hidden border border-white/10 z-10 bg-stone-950">
              <motion.img 
                style={{ y: imageY, scale: 1.2 }}
                src="/heritage.jpg"  // UPDATED IMAGE PATH
                alt="Watchmaking Heritage"
                className="w-full h-full object-cover grayscale brightness-[0.7] hover:grayscale-0 transition-all duration-1000 opacity-90 hover:opacity-100"
              />
              <div className="absolute inset-0 border border-white/10 m-6 pointer-events-none" />
            </div>
            
            <motion.div 
              style={{ y: frameY }}
              className="absolute -bottom-8 -right-8 w-full h-full border border-[#D4AF37]/20 z-0" 
            />
          </motion.div>

          {/* Right Side: Narrative Content */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="space-y-10 order-1 lg:order-2"
          >
            <div className="space-y-4">
              <motion.p 
                style={{ letterSpacing: useTransform(scrollYProgress, [0, 0.3], ["0.2em", "0.5em"]) }}
                className="text-[#D4AF37] uppercase text-xs"
              >
                Our Journey
              </motion.p>
              
              <h2 className="text-5xl md:text-7xl font-extralight tracking-tighter text-white leading-[0.9]">
                A Legacy Carved <br /> 
                <span className="italic font-serif text-[#D4AF37]/90 pl-4">in Perpetual Motion</span>
              </h2>
            </div>

            <div className="h-px w-24 bg-gradient-to-r from-[#D4AF37] to-transparent" />
            
            <div className="space-y-8 text-white/60 font-light leading-relaxed max-w-md text-lg">
              <p className="first-letter:text-3xl first-letter:font-serif first-letter:text-[#D4AF37] first-letter:mr-2">
                For over a century, our workshop has remained dedicated to the pursuit of 
                horological perfection. Every gear, spring, and dial is assembled by hand 
                in the heart of the Swiss Alps.
              </p>
            </div>

            <div className="pt-6">
              <button className="group relative flex items-center gap-6 cursor-pointer bg-transparent border-none p-0">
                <div className="relative flex items-center justify-center">
                  <div className="h-px w-14 bg-[#D4AF37] group-hover:w-24 transition-all duration-700" />
                  <div className="absolute right-0 w-2 h-2 border-t border-r border-[#D4AF37] rotate-45 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                </div>
                <span className="text-[11px] uppercase tracking-[0.4em] text-[#D4AF37] group-hover:text-white transition-colors duration-500">
                  Discover our history
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </div> 
    </section>

    </>
  );
}