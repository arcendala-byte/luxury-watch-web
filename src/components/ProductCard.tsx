"use client"

import { motion } from 'framer-motion';
import Link from 'next/link';
// use standard img for remote images to avoid optimization errors
import Image from 'next/image';
import { useCart } from '../lib/store';
import { Product } from '@/types/product';

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCart((state) => state.addItem);

  return (
    <div className="group relative">
      <Link href={`/product/${product.slug}`} className="block outline-none">
        <motion.div 
          whileHover={{ y: -8 }}
          transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
          className="relative bg-[#0a0a0a] border border-white/5 p-4 transition-all duration-500 hover:border-[#D4AF37]/30"
        >
          {/* Decorative Corner (Appears on Hover) */}
          <div className="absolute top-0 right-0 w-0 h-0 border-t-[1px] border-r-[1px] border-[#D4AF37]/0 group-hover:w-4 group-hover:h-4 group-hover:border-[#D4AF37]/50 transition-all duration-700 z-20" />

          {/* Image Container */}
          <div className="relative aspect-[4/5] overflow-hidden bg-[#111] mb-6">
            
            {/* The Gold Glow Effect Layer */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-10 pointer-events-none"
                 style={{
                   background: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.1) 0%, transparent 80%)'
                 }} 
            />

            <img
              src={
                product.image.startsWith('/') || product.image.startsWith('http')
                  ? product.image
                  : `/${product.image}`
              }
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
            />
            
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-20">
               <div className="bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 text-[8px] uppercase tracking-[0.4em] text-white opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-100">
                 View Details
               </div>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-2 px-1 pb-2">
            <p className="text-[#D4AF37] text-[9px] tracking-[0.4em] uppercase font-light opacity-80">{product.brand}</p>
            <h3 className="text-white text-base font-light tracking-tight group-hover:text-[#D4AF37] transition-colors duration-500">{product.name}</h3>
            <p className="text-white/40 text-xs font-serif italic">{product.price}</p>
          </div>
        </motion.div>
      </Link>

      {/* Add to Cart Button (Fixed Event Propagation) */}
      <button 
        onClick={(e) => {
          e.preventDefault();  // Stops Link navigation
          e.stopPropagation(); // Stops click reaching the Link
          addItem(product as any); 
        }}
        className="absolute bottom-6 right-6 z-30 bg-[#D4AF37] text-black w-10 h-10 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 hover:scale-110 hover:bg-white active:scale-95 shadow-xl"
        aria-label="Add to Cart"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
          <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
        </svg>
      </button>
    </div>
  );
}