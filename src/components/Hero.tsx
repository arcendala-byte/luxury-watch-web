"use client"
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const containerRef = useRef(null);
  
  // 1. Track scroll progress specifically for this container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // 2. Map scroll progress to different movement speeds
  // Background text moves slowly
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  // Main watch moves faster upwards
  const watchY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  // Foreground elements move the fastest
  const flareY = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-[120vh] flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Layer 1: Background Typography */}
      <motion.div 
        style={{ y: textY }}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
      >
        <h1 className="text-[20vw] font-bold text-white/[0.03] uppercase leading-none tracking-tighter">
          Precision
        </h1>
      </motion.div>

      {/* Layer 2: The Main Watch Image */}
      <motion.div 
        style={{ y: watchY }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[600px] px-12"
      >
        <img 
          src="/images/hero-watch.png" // Ensure you have a transparent PNG here
          alt="Chronos Apex Skeleton"
          className="w-full h-auto drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)]"
        />
      </motion.div>

      {/* Layer 3: Foreground Detail (Light Flare / Particles) */}
      <motion.div 
        style={{ y: flareY }}
        className="absolute inset-0 z-20 pointer-events-none flex justify-center"
      >
        <div className="w-1/2 h-full bg-gradient-to-b from-white/[0.05] to-transparent blur-3xl transform -rotate-12" />
      </motion.div>

      {/* Hero Content Overlay */}
      <div className="absolute bottom-20 left-12 md:left-24 z-30">
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="text-[#D4AF37] text-xs uppercase tracking-[0.6em] mb-4"
        >
          Limited Edition 2026
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          className="text-4xl md:text-6xl font-extralight text-white tracking-tighter"
        >
          Apex <br /> Skeleton
        </motion.h2>
      </div>
    </section>
  );
}