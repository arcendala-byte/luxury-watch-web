"use client"
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Magnetic from './Magnetic';

const collections = [
  {
    id: "01",
    name: "The Obsidian Skeleton",
    series: "Tech Series",
    price: "€24,500",
    image: "/obsidian-skeleton.png", 
    color: "#D4AF37"
  },
  {
    id: "02",
    name: "Alpine Heritage",
    series: "Heritage Series",
    price: "€18,200",
    image: "/alpine-heritage.png",
    color: "#C0C0C0"
  },
  {
    id: "03",
    name: "Lunar Phase X",
    series: "Astral Series",
    price: "€42,000",
    image: "/lunar-phase.png",
    color: "#D4AF37"
  }
];

export default function ProductShowcase() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // This creates the horizontal "sliding" effect based on vertical scroll
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-[#050505]">
      {/* Sticky container keeps the view locked while we scroll through the items */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden relative">
        
        {/* Background "Ghost" Text */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
          <h2 className="text-[30vw] font-black uppercase tracking-tighter text-white">
            Elite
          </h2>
        </div>

        <motion.div style={{ x }} className="flex gap-24 px-12 md:px-24">
          
          {/* Section Introduction Card */}
          <div className="flex flex-col justify-center min-w-[300px] md:min-w-[500px] space-y-8">
            <motion.p 
              initial={{ opacity: 0, letterSpacing: "0.2em" }}
              whileInView={{ opacity: 1, letterSpacing: "0.5em" }}
              className="text-[#D4AF37] text-[10px] uppercase"
            >
              Curated Selection
            </motion.p>
            <h2 className="text-5xl md:text-8xl font-extralight text-white leading-[1.1]">
              New <br /> <span className="italic font-serif">Arrivals</span>
            </h2>
            <p className="text-white/40 text-sm font-light max-w-xs leading-relaxed uppercase tracking-widest">
              A symphony of gears and carbon, designed for those who command time.
            </p>
          </div>

          {/* Product Cards Map */}
          {collections.map((item) => (
            <motion.div 
              key={item.id}
              className="relative group min-w-[350px] md:min-w-[550px] h-[650px] bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 p-12 flex flex-col justify-between overflow-hidden"
            >
              {/* Header: ID and Price */}
              <div className="relative z-10 flex justify-between items-start">
                <div>
                  <span className="text-white/20 font-serif italic text-4xl">{item.id}</span>
                  <p className="text-[#D4AF37] text-[9px] tracking-[0.4em] uppercase mt-3">{item.series}</p>
                </div>
                <p className="text-white/40 text-[11px] tabular-nums tracking-[0.2em] font-light">{item.price}</p>
              </div>

              {/* Central Image with Parallax-ish Scale */}
              <div className="relative flex-1 flex items-center justify-center py-12">
                <motion.img 
                  whileHover={{ scale: 1.05, rotate: -2 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
                />
                
                {/* Subtle Radial Glow behind the watch */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.05)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              </div>

              {/* Footer: Name and Action */}
              <div className="relative z-10 space-y-8">
                <h3 className="text-white text-3xl md:text-4xl font-light tracking-tight uppercase">
                  {item.name}
                </h3>
                <Magnetic>
                  <Link 
                    href={`/product/${item.id}`}
                    className="inline-flex items-center gap-4 text-[10px] tracking-[0.4em] text-[#D4AF37] group/link transition-all"
                  >
                    <span className="border-b border-[#D4AF37]/30 pb-1 group-hover/link:text-white group-hover/link:border-white transition-all">
                      View Piece
                    </span>
                    <span className="text-lg mb-1 group-hover/link:translate-x-2 transition-transform duration-500">→</span>
                  </Link>
                </Magnetic>
              </div>

              {/* Bottom Decorative Slide Reveal */}
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#D4AF37] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
            </motion.div>
          ))}

        </motion.div>
      </div>
    </section>
  );
}