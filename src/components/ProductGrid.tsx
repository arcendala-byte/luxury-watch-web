"use client"

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './ProductCard';
import { Product } from '@/types/product';

interface Props {
  categoryFilter?: string;
  searchQuery?: string;
}

export default function ProductGrid({
  categoryFilter,
  searchQuery,
}: Props = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products', { cache: 'no-store' });
        if (res.ok && !cancelled) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (err) {
        console.error('fetch products error', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchProducts();
    return () => {
      cancelled = true;
    };
  }, []);

  let filtered = products;
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
    );
  }
  if (categoryFilter && categoryFilter !== 'All') {
    filtered = filtered.filter(
      (p) => p.brand.toLowerCase() === categoryFilter.toLowerCase()
    );
  }

  if (loading) {
    return (
      <section id="collection" className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="h-64 flex items-center justify-center">
          <div className="text-white/30 uppercase tracking-[0.5em] text-[10px] flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-t border-[#D4AF37] animate-spin rounded-full" />
            Loading Collection...
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="collection" className="relative max-w-7xl mx-auto px-6 md:px-12 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            filtered.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.1,
                  ease: [0.215, 0.61, 0.355, 1.0],
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-20"
            >
              <p className="text-white/30 uppercase tracking-[0.5em] text-[10px]">
                No timepieces found in this category.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}