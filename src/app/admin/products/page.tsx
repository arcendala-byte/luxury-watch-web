"use client"

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Package, Plus, Search, MoreVertical, Edit, Trash2, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  stock: number;
  image: string;
  slug: string;
}

export default function AdminProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          setProducts(data);
        }
      } catch (error) {
        console.error('Error fetching inventory:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-10 pb-20">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-extralight tracking-[0.3em] uppercase text-white">
            Vault <span className="text-[#D4AF37]">Catalog</span>
          </h1>
          <p className="text-[9px] uppercase tracking-[0.4em] text-white/30">Inventory Management & Curation</p>
        </div>

        <button
          onClick={() => router.push('/admin/products/new')}
          className="group flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full hover:bg-[#D4AF37] transition-all duration-500 active:scale-95"
        >
          <Plus size={16} />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Curate New Piece</span>
        </button>
      </section>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
        <input 
          type="text"
          placeholder="SEARCH COLLECTIONS..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-[10px] text-white tracking-[0.2em] focus:border-[#D4AF37]/50 focus:outline-none transition-all placeholder:text-white/10"
        />
      </div>

      {/* Inventory Table */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-8 py-6 text-[9px] uppercase tracking-[0.3em] text-white/40 font-medium">Product</th>
                <th className="px-8 py-6 text-[9px] uppercase tracking-[0.3em] text-white/40 font-medium">Brand</th>
                <th className="px-8 py-6 text-[9px] uppercase tracking-[0.3em] text-white/40 font-medium">Valuation</th>
                <th className="px-8 py-6 text-[9px] uppercase tracking-[0.3em] text-white/40 font-medium">Availability</th>
                <th className="px-8 py-6 text-[9px] uppercase tracking-[0.3em] text-white/40 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence mode="popLayout">
                {loading ? (
                  [...Array(3)].map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={5} className="px-8 py-8 h-20 bg-white/[0.01]" />
                    </tr>
                  ))
                ) : filteredProducts.map((product) => (
                  <motion.tr 
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={product.id} 
                    className="group hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 bg-white/[0.03] border border-white/5 rounded-lg overflow-hidden flex-shrink-0">
                          <Image 
                            src={product.image || '/placeholder-watch.jpg'} 
                            alt={product.name}
                            fill
                            className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                          />
                        </div>
                        <span className="text-[11px] text-white uppercase tracking-wider font-medium">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-[10px] text-white/60 uppercase tracking-widest">{product.brand}</td>
                    <td className="px-8 py-6 text-[11px] text-white tabular-nums">€{product.price.toLocaleString()}</td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
                        <span className="text-[10px] text-white/40 uppercase tracking-tighter">
                          {product.stock} units
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => router.push(`/admin/products/${product.id}/edit`)}
                          className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-[#D4AF37] transition-all"
                        >
                          <Edit size={14} />
                        </button>
                        <button className="p-2 hover:bg-red-500/10 rounded-lg text-white/40 hover:text-red-500 transition-all">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          
          {!loading && filteredProducts.length === 0 && (
            <div className="py-20 text-center">
              <Package className="mx-auto text-white/5 mb-4" size={40} />
              <p className="text-[10px] uppercase tracking-[0.4em] text-white/20">The vault is currently empty</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}