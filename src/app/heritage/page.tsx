"use client";

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { fadeInUp } from '@/lib/animations'; 
import Link from 'next/link';
import { History, Milestone, Award, Shield, Wind, ArrowRight, Cog } from 'lucide-react';

const timeline = [
  { year: "1892", event: "Elias Chronos establishes the workshop in the Jura Mountains.", icon: <History size={22} /> },
  { year: "1924", event: "The invention of the 'Aero-Balance' anti-magnetic escapement.", icon: <Wind size={22} /> },
  { year: "1958", event: "Chronos is named the Official Timekeeper of the Mediterranean Regatta.", icon: <Award size={22} /> },
  { year: "2024", event: "Launching the 'Eternal Movement'—a 100-year power reserve concept.", icon: <Shield size={22} /> }
];

export default function HeritagePage() {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  const springConfig = { damping: 25, stiffness: 150 };
  const cursorX = useSpring(mousePos.x, springConfig);
  const cursorY = useSpring(mousePos.y, springConfig);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const enterLink = () => setCursorVariant("link");
  const leaveLink = () => setCursorVariant("default");

  return (
    <main ref={containerRef} className="relative min-h-screen bg-[#050505] cursor-none selection:bg-[#D4AF37] selection:text-black overflow-x-hidden">
      
      {/* CUSTOM CURSOR */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 bg-[#D4AF37] rounded-full mix-blend-difference pointer-events-none z-[9999] hidden md:block"
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
        animate={cursorVariant}
        variants={{
          default: { scale: 1 },
          link: { scale: 3.5, backgroundColor: "#FFF", mixBlendMode: "difference" }
        }}
      />

      {/* SECTION 1: PARALLAX HERO */}
      <section id="heritage" className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1547996160-81dfa63595dd?q=80&w=2000')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-[#f4f1ea]" />
        </motion.div>

        <div className="relative z-10 text-center px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
            <span className="text-[#D4AF37] text-[10px] uppercase tracking-[1.2em] mb-6 block font-bold">
              ESTABLISHED IN SWITZERLAND
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-[14rem] font-light tracking-tighter text-white leading-[0.8] mb-4">
              CHRONOS<br/>
              <span className="italic font-serif text-[#D4AF37] tracking-normal">2025</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: THE ANATOMY OF TIME (New Interesting Section) */}
      <section id="craft" className="bg-[#f4f1ea] py-40 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-24 items-center">
            <div className="relative h-[600px]">
              {/* Staggered Image Layers */}
              <motion.div 
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                className="absolute top-0 left-0 w-4/5 h-4/5 z-30 shadow-2xl overflow-hidden border-8 border-white"
              >
                <img src="https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=800" className="w-full h-full object-cover" alt="Internal 1" />
              </motion.div>
              <motion.div 
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-0 right-0 w-4/5 h-4/5 z-20 shadow-xl overflow-hidden grayscale"
              >
                <img src="https://images.unsplash.com/photo-1509048191080-d2984bad6ad5?q=80&w=800" className="w-full h-full object-cover" alt="Internal 2" />
              </motion.div>
            </div>

            <motion.div initial="initial" whileInView="animate" variants={fadeInUp} className="space-y-8">
              <div className="flex items-center gap-4 text-[#8b7355]">
                <Cog className="animate-spin-slow" />
                <span className="text-xs uppercase tracking-[0.4em] font-bold">Technical Prowess</span>
              </div>
              <h2 className="text-6xl font-serif text-[#1a1a1a] leading-tight">
                Engineering <br/><span className="italic text-[#8b7355]">the Eternal.</span>
              </h2>
              <p className="text-lg text-[#1a1a1a]/70 font-light leading-relaxed">
                Our heritage isn't just in the archives; it's in the friction-less movement of a balance wheel. We pioneered the use of silicon hairsprings to fight gravity—the eternal enemy of precision.
              </p>
            </motion.div>
          </div>
        </div>
        
        {/* TIMELINE OVERLAY */}
        <div id="timeline" className="max-w-7xl mx-auto mt-40 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {timeline.map((item, index) => (
            <motion.div 
              key={index} 
              onMouseEnter={enterLink} onMouseLeave={leaveLink}
              whileHover={{ y: -10 }}
              className="p-8 border border-black/5 bg-white/50 backdrop-blur-sm transition-colors hover:bg-white"
            >
              <span className="text-4xl font-serif italic text-[#D4AF37] mb-4 block">{item.year}</span>
              <div className="text-[#8b7355] mb-4">{item.icon}</div>
              <p className="text-xs uppercase tracking-widest text-black font-semibold leading-loose">{item.event}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 3: THE VAULT */}
      <section id="vault" className="bg-black py-60 relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <h2 className="text-[40vw] font-black text-white italic whitespace-nowrap -translate-x-1/4">LEGACY</h2>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative z-10 text-center max-w-2xl px-6"
        >
          <h3 className="text-[#D4AF37] text-xs uppercase tracking-[1em] mb-10">THE ARCHIVE</h3>
          <h2 className="text-5xl md:text-7xl font-light text-white mb-12 leading-tight">
            Witness the evolution <br/>of the <span className="italic font-serif">Masterpiece.</span>
          </h2>
          
          <Link 
            href="/collection" 
            onMouseEnter={enterLink} 
            onMouseLeave={leaveLink}
            className="inline-flex items-center gap-4 text-white uppercase text-[10px] tracking-[0.6em] group"
          >
            <span>Enter the collection</span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-4 text-[#D4AF37]" />
          </Link>
        </motion.div>
      </section>
    </main>
  );
}