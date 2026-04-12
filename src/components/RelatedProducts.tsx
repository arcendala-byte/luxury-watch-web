"use client"

import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Product } from '@/types/product';

interface RelatedProductsProps {
  currentSlug: string;
  brand: string;
}

export default function RelatedProducts({ currentSlug, brand }: RelatedProductsProps) {
  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const res = await fetch('/api/products');
      if (!res.ok) return;
      const all: Product[] = await res.json();
      let related = all.filter((p) => p.brand === brand && p.slug !== currentSlug).slice(0, 3);
      if (related.length === 0) {
        related = all.filter((p) => p.slug !== currentSlug).slice(0, 3);
      }
      if (!cancelled) setDisplayProducts(related);
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [brand, currentSlug]);

  if (displayProducts.length === 0) return null;

  return (
    <section className="py-24 border-t border-white/5 bg-stone-950/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header with Decorative Line */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="flex-shrink-0">
            <h2 className="text-[#D4AF37] text-[10px] tracking-[0.6em] uppercase mb-4 font-medium">
              Recommendations
            </h2>
            <h3 className="text-4xl md:text-5xl text-white font-extralight tracking-tighter">
              Complete the <br /> Collection
            </h3>
          </div>
          
          {/* Decorative Minimalist Line */}
          <div className="hidden md:block h-px flex-grow mx-12 bg-white/10 mb-4" />

          <motion.div 
            whileHover={{ x: 5 }}
            className="flex-shrink-0"
          >
            <Link 
              href="/collection" 
              className="text-white/40 uppercase tracking-[0.3em] text-[10px] hover:text-[#D4AF37] transition-colors border-b border-white/10 pb-1"
            >
              View All Masterpieces
            </Link>
          </motion.div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8, 
                delay: idx * 0.1, 
                ease: [0.21, 0.47, 0.32, 0.98] 
              }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}