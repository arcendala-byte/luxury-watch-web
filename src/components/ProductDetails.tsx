"use client"

import { useState, useRef } from 'react';
import { motion, Variants, AnimatePresence, useScroll } from 'framer-motion';
import { ChevronLeft, ChevronDown, ShieldCheck, Truck, RotateCcw, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Components
import WhatsAppButton from '@/components/WhatsAppButton';
import InquiryModal from '@/components/InquiryModal';
import RelatedProducts from '@/components/RelatedProducts';
import { Product } from '@/types/product';

// 1. Animation Variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer: Variants = {
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

// Define the Extended Type to match what your API sends
interface ExtendedProduct extends Product {
  images?: string[];
  isLimited?: boolean;
  specs?: {
    movement?: string;
    case?: string;
    diameter?: string;
    waterResistance?: string;
  };
}

interface Props {
  product: ExtendedProduct;
}

export default function ProductDetails({ product }: Props) {
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  // Parallax Ref
  const containerRef = useRef<HTMLElement>(null);
  
  const currentDisplayImage = activeImage || product.image;
  const galleryImages = product.images || [product.image];

  // Helper to format image paths safely
  const formatImagePath = (path: string) => {
    if (path.startsWith('/') || path.startsWith('http')) return path;
    return `/${path}`;
  };

  return (
    <main ref={containerRef} className="min-h-screen bg-black text-white pt-32 pb-20 selection:bg-[#D4AF37] selection:text-black">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* --- NAVIGATION BUTTONS --- */}
        <div className="flex items-center gap-6 mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-3 text-white/60 hover:text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] group transition-colors duration-500"
          >
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full border border-white/20 group-hover:border-[#D4AF37] transition-colors duration-500">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:-translate-y-1 transition-transform duration-300">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              </svg>
            </div>
            <span className="opacity-60 group-hover:opacity-100 transition-opacity duration-300">
              Home
            </span>
          </Link>

          <Link
            href="/collection"
            className="inline-flex items-center gap-3 text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] group"
          >
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full border border-[#D4AF37]/20 group-hover:border-[#D4AF37] transition-colors duration-500">
              <ChevronLeft
                size={14}
                className="group-hover:-translate-x-1 transition-transform duration-300"
              />
            </div>
            <span className="opacity-60 group-hover:opacity-100 transition-opacity duration-300">
              Return to Collection
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32">
          
          {/* LEFT: Image & Gallery Section */}
          <div className="flex flex-col gap-6">
            <motion.div
              key={currentDisplayImage}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/5] bg-stone-900 border border-white/5 overflow-hidden group cursor-crosshair"
            >
              {product.isLimited && (
                <div className="absolute top-6 left-6 z-10">
                  <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="bg-[#D4AF37] text-black text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 shadow-2xl"
                  >
                    Limited Edition
                  </motion.div>
                </div>
              )}

              <Image
                src={formatImagePath(currentDisplayImage)}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.3]"
                onMouseMove={(e) => {
                  const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
                  const x = ((e.clientX - left) / width) * 100;
                  const y = ((e.clientY - top) / height) * 100;
                  e.currentTarget.style.transformOrigin = `${x}% ${y}%`;
                }}
              />
              
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>

            {/* Thumbnail Row */}
            {galleryImages.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {galleryImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(img)}
                    className={`relative aspect-square border transition-all duration-500 overflow-hidden ${
                      currentDisplayImage === img ? 'border-[#D4AF37]' : 'border-white/5 hover:border-white/20'
                    }`}
                  >
                    <Image
                      src={formatImagePath(img)}
                      alt={`${product.name} view ${index}`}
                      fill
                      sizes="120px"
                      className={`object-cover transition-opacity duration-500 ${currentDisplayImage === img ? 'opacity-100' : 'opacity-40 hover:opacity-80'}`}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Content Section */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <motion.div variants={fadeInUp} className="mb-8">
              <motion.p 
                initial={{ letterSpacing: "0.2em", opacity: 0 }}
                animate={{ letterSpacing: "0.5em", opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="text-[#D4AF37] uppercase text-[10px] mb-4"
              >
                {product.brand}
              </motion.p>
              <h1 className="text-6xl md:text-8xl font-extralight tracking-tighter leading-[0.9] mb-4">
                {product.name.split(' ').map((word, i) => (
                  <span key={i} className={i % 2 !== 0 ? "italic font-serif block md:inline" : ""}>
                    {word}{" "}
                  </span>
                ))}
              </h1>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex items-baseline gap-4 mb-8">
               <p className="text-3xl text-white font-light tabular-nums">
                {product.price}
              </p>
              <span className="text-white/20 text-[10px] uppercase tracking-widest">VAT Inclusive</span>
            </motion.div>

            <motion.p variants={fadeInUp} className="text-white/50 leading-relaxed font-light max-w-md mb-10 text-lg border-l border-[#D4AF37]/30 pl-6">
              {product.description}
            </motion.p>

            {product.isLimited && (
              <motion.p variants={fadeInUp} className="text-[#D4AF37] text-[10px] uppercase tracking-widest mb-8 flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]"></span>
                </span>
                Reserved Selection: Only 50 units worldwide
              </motion.p>
            )}

            <motion.button
              onClick={() => setIsInquiryOpen(true)}
              variants={fadeInUp}
              whileHover={{ scale: 1.02, backgroundColor: "#fff" }}
              whileTap={{ scale: 0.98 }}
              className="group relative bg-[#D4AF37] text-black py-6 w-full uppercase tracking-[0.5em] text-[11px] font-bold transition-all duration-700 mb-12 flex items-center justify-center gap-4"
            >
              Inquire for Purchase
              <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-500" />
            </motion.button>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-8 border-t border-white/10 pt-10 mb-12 text-[9px] uppercase tracking-[0.2em] text-white/40">
              <div className="flex flex-col items-center gap-3 text-center group">
                <ShieldCheck size={20} strokeWidth={1} className="group-hover:text-[#D4AF37] transition-colors" />
                <span className="group-hover:text-white transition-colors">5 Year Warranty</span>
              </div>
              <div className="flex flex-col items-center gap-3 text-center group">
                <Truck size={20} strokeWidth={1} className="group-hover:text-[#D4AF37] transition-colors" />
                <span className="group-hover:text-white transition-colors">Global Shipping</span>
              </div>
              <div className="flex flex-col items-center gap-3 text-center group">
                <RotateCcw size={20} strokeWidth={1} className="group-hover:text-[#D4AF37] transition-colors" />
                <span className="group-hover:text-white transition-colors">Concierge Returns</span>
              </div>
            </div>

            {/* Specs Accordion */}
            <motion.div variants={fadeInUp} className="border-y border-white/5 py-8">
              <button
                onClick={() => setIsSpecsOpen(!isSpecsOpen)}
                className="w-full flex justify-between items-center group"
              >
                <h3 className="text-white group-hover:text-[#D4AF37] uppercase tracking-[0.4em] text-[11px] transition-colors">Detailed Specifications</h3>
                <motion.div animate={{ rotate: isSpecsOpen ? 180 : 0 }}>
                  <ChevronDown className="text-white/20 group-hover:text-[#D4AF37] transition-colors" size={20} />
                </motion.div>
              </button>
              <AnimatePresence>
                {isSpecsOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-2 gap-y-6 text-sm pt-10 px-2">
                      <div className="text-white/30 font-light text-[10px] uppercase tracking-widest">Movement</div>
                      <div className="text-white font-extralight italic text-right md:text-left">{product.specs?.movement || "Mechanical Self-winding"}</div>
                      
                      <div className="text-white/30 font-light text-[10px] uppercase tracking-widest">Case Material</div>
                      <div className="text-white font-extralight italic text-right md:text-left">{product.specs?.case || "Brushed Grade 5 Titanium"}</div>
                      
                      <div className="text-white/30 font-light text-[10px] uppercase tracking-widest">Case Diameter</div>
                      <div className="text-white font-extralight italic text-right md:text-left">{product.specs?.diameter || "42mm"}</div>
                      
                      <div className="text-white/30 font-light text-[10px] uppercase tracking-widest">Water Resistance</div>
                      <div className="text-white font-extralight italic text-right md:text-left">{product.specs?.waterResistance || "100 Meters"}</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <InquiryModal isOpen={isInquiryOpen} onClose={() => setIsInquiryOpen(false)} watchName={product.name} />
      <div className="mt-20">
        <RelatedProducts currentSlug={product.slug} brand={product.brand} />
      </div>
      <WhatsAppButton watchName={product.name} price={product.price} />
    </main>
  );
}