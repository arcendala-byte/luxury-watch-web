'use client';

import { ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import ProductGrid from './ProductGrid';
import CollectionFilters from './CollectionFilters';
import { Product } from '@/types/product';

export default function CollectionPageContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams?.get('q') || '';
  const activeBrand = searchParams?.get('category') || 'All';

  const [brands, setBrands] = useState<string[]>(['All']);

  // Fetch products to determine available brands
  useEffect(() => {
    let cancelled = false;

    async function fetchBrands() {
      try {
        const baseUrl = typeof window === 'undefined' 
          ? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
          : '';
        const res = await fetch(`${baseUrl}/api/products`, { cache: 'no-store' });
        const products: Product[] = res.ok ? await res.json() : [];
        if (!cancelled) {
          const uniqueBrands = ['All', ...Array.from(new Set(products.map((p) => p.brand)))];
          setBrands(uniqueBrands);
        }
      } catch (e) {
        // Silently fail if fetch doesn't work
      }
    }

    fetchBrands();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="min-h-screen bg-black pt-32 pb-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-12"
        >
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
              Back
            </span>
          </Link>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-[#D4AF37] text-[10px] uppercase tracking-[0.5em] mb-4 font-medium">
              The Collection
            </h2>
            <h1 className="text-4xl md:text-6xl lg:text-7xl text-white font-extralight tracking-tighter leading-none">
              Curated <br /> Masterpieces
            </h1>
            {activeBrand && activeBrand !== 'All' && (
              <p className="text-white/40 max-w-xl mt-4 text-sm">
                {(() => {
                  switch (activeBrand.toLowerCase()) {
                    case 'heritage':
                      return 'Our Heritage Series blends vintage styling with modern precision and timeless elegance.';
                    case 'apex':
                      return 'Apex Editions represent the pinnacle of dark aesthetics and high-performance materials.';
                    case 'celeste':
                      return 'Celestial masterpieces featuring complex tourbillons and astronomical complications.';
                    case 'luna':
                      return 'Inspired by the lunar cycle, these pieces feature exquisite moon-phase movements.';
                    default:
                      return `Explore the exceptional craftsmanship of the ${activeBrand} collection.`;
                  }
                })()}
              </p>
            )}
          </motion.div>

          <CollectionFilters brands={brands} />
        </div>

        <ProductGrid categoryFilter={activeBrand} searchQuery={searchQuery} />
      </div>
    </main>
  );
}
