"use client"
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const features = [
  {
    title: "Forged Carbon",
    description: "Lightweight yet indestructible. Our carbon cases are forged under extreme pressure for a unique marble finish.",
    icon: "01"
  },
  {
    title: "Calibre X-1",
    description: "A manual-wind masterpiece with a 72-hour power reserve and hand-finished bridges.",
    icon: "02"
  },
  {
    title: "Grade 5 Titanium",
    description: "Aerospace-grade durability polished to a mirror shine, offering unparalleled comfort on the wrist.",
    icon: "03"
  }
];

export default function Craftsmanship() {
  const containerRef = useRef(null);
  
  // FIX: Added 'start start' so the sticky effect locks immediately
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // 1. Assembly Animations
  const movementY = useTransform(scrollYProgress, [0, 0.4], [250, 0]);
  const dialY = useTransform(scrollYProgress, [0, 0.4], [-250, 0]);
  const caseScale = useTransform(scrollYProgress, [0, 0.4], [0.8, 1]);
  // FIX: Adjusted opacity timing so it doesn't vanish too early
  const assemblyOpacity = useTransform(scrollYProgress, [0, 0.1, 0.6, 0.8], [0, 1, 1, 0]);

  // --- ADDED ZOOM EFFECT ---
  const assemblyZoom = useTransform(scrollYProgress, [0.45, 0.75], [1, 1.5]);

  // --- ADDED BLUR EFFECT ---
  const assemblyBlur = useTransform(scrollYProgress, [0.5, 0.8], ["blur(0px)", "blur(10px)"]);

  // --- ADDED DYNAMIC GLOW ---
  // The background glow expands and brightens as the watch completes
  const glowScale = useTransform(scrollYProgress, [0, 0.4, 0.7], [0.8, 1.2, 2]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.4, 0.7], [0.3, 0.6, 0]);

  return (
    // FIX: Added h-[300vh] so the sticky container has room to scroll
    <section ref={containerRef} className="relative bg-[#0a0a0a] h-[300vh]">
      
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden border-b border-white/5">
        
        {/* ADDED: Animated background glow */}
        <motion.div 
          style={{ 
            scale: glowScale,
            opacity: glowOpacity
          }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#D4AF37_0.05,_transparent_70%)] pointer-events-none" 
        />

        <motion.div 
          style={{ opacity: assemblyOpacity }}
          className="absolute top-20 text-center z-10"
        >
          <h2 className="text-[#D4AF37] text-[10px] tracking-[0.8em] uppercase mb-4">Engineering Marvel</h2>
          <p className="text-2xl md:text-4xl font-extralight tracking-widest text-white uppercase">The Assembly</p>
        </motion.div>

        {/* The Exploded Watch Parts */}
        <motion.div 
          style={{ 
            opacity: assemblyOpacity,
            scale: assemblyZoom,
            filter: assemblyBlur
          }}
          className="relative w-[300px] md:w-[500px] aspect-square flex items-center justify-center"
        >
          {/* Case (Bottom Layer) */}
          <motion.div style={{ scale: caseScale }} className="absolute inset-0 z-10 p-4">
             <img src="/watch-case.png" alt="Case" className="w-full h-full object-contain" />
          </motion.div>

          {/* Movement (Middle Layer) */}
          <motion.div style={{ y: movementY }} className="absolute inset-0 z-20 p-12">
             <img src="/watch-movement.png" alt="Movement" className="w-full h-full object-contain" />
          </motion.div>

          {/* Dial (Top Layer) */}
          <motion.div style={{ y: dialY }} className="absolute inset-0 z-30 p-8">
             <img src="/watch-dial.png" alt="Dial" className="w-full h-full object-contain" />
          </motion.div>
        </motion.div>

        <ScrollCaptions progress={scrollYProgress} />
      </div>

      {/* PART 2: MATERIAL GRID */}
      <div className="relative z-40 bg-[#0a0a0a] py-32 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-[#D4AF37] tracking-[0.5em] uppercase text-[10px] mb-4">The Engineering</h2>
            <h3 className="text-4xl md:text-5xl font-extralight text-white tracking-tight">Material Innovation</h3>
          </motion.div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="group p-10 border border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent hover:border-[#D4AF37]/30 transition-all duration-700"
              >
                <span className="text-[#D4AF37]/30 font-serif italic text-4xl mb-6 block group-hover:text-[#D4AF37] transition-colors duration-700">
                  {feature.icon}
                </span>
                <h4 className="text-white text-xl font-light tracking-widest uppercase mb-4">
                  {feature.title}
                </h4>
                <p className="text-white/40 font-light leading-relaxed text-sm">
                  {feature.description}
                </p>
                <div className="mt-8 h-px w-0 bg-[#D4AF37]/50 group-hover:w-full transition-all duration-700" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ScrollCaptions({ progress }: { progress: any }) {
  const text1Opacity = useTransform(progress, [0.15, 0.25, 0.35], [0, 1, 0]);
  const text2Opacity = useTransform(progress, [0.45, 0.55, 0.65], [0, 1, 0]);

  return (
    <>
      <motion.div style={{ opacity: text1Opacity }} className="absolute left-6 md:left-20 bottom-1/4 max-w-[200px] md:max-w-xs z-50">
        <h4 className="text-[#D4AF37] text-[9px] tracking-widest mb-2 uppercase">01. Internal Calibre</h4>
        <p className="text-white/40 text-[11px] font-light leading-relaxed">322 components working in perfect mechanical harmony.</p>
      </motion.div>

      <motion.div style={{ opacity: text2Opacity }} className="absolute right-6 md:right-20 top-1/3 max-w-[200px] md:max-w-xs z-50">
        <h4 className="text-[#D4AF37] text-[9px] tracking-widest mb-2 uppercase">02. Hand-Finished</h4>
        <p className="text-white/40 text-[11px] font-light leading-relaxed">Every bridge is polished to a mirror shine by our master watchmakers.</p>
      </motion.div>
    </>
  );
}