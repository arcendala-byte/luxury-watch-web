"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Upload, Eye, Package, Info } from 'lucide-react';
import Link from 'next/link';
import { Product } from '@/types/product';

interface ProductFormProps {
  initialData?: Product;
  isEdit?: boolean;
}

export default function ProductForm({ initialData, isEdit = false }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    brand: initialData?.brand || '',
    slug: initialData?.slug || '',
    price: initialData?.price || '',
    image: initialData?.image || '',
    description: initialData?.description || '',
    stock: initialData?.stock || 0,
  });

  // Auto-generate slug from name
  useEffect(() => {
    if (!isEdit && formData.name) {
      const generatedSlug = formData.name
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');
      setFormData(prev => ({ ...prev, slug: generatedSlug }));
    }
  }, [formData.name, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'stock' ? (value === '' ? 0 : parseInt(value)) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const method = isEdit ? 'PATCH' : 'POST';
      const url = isEdit 
        ? `/api/admin/products/${initialData?.id}` 
        : `/api/admin/products`;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/admin/products');
        router.refresh();
      }
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = "w-full bg-white/[0.03] border border-white/10 text-white px-4 py-3 rounded-xl focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] focus:outline-none transition-all duration-300 placeholder:text-white/10 text-sm";
  const labelClasses = "block text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 font-medium";

  return (
    <div className="max-w-5xl mx-auto pb-20">
      {/* Header Area */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-10"
      >
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#D4AF37] hover:text-white mb-6 transition-colors group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Vault
        </Link>
        <h1 className="text-3xl md:text-4xl font-extralight tracking-[0.2em] uppercase text-white">
          {isEdit ? 'Refine' : 'Curate'} <span className="text-[#D4AF37]">Piece</span>
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="lg:col-span-2 space-y-8"
        >
          <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 md:p-10 space-y-8">
            
            {/* Essential Details */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-[#D4AF37]">
                <Info size={14} />
                <h2 className="text-[10px] uppercase tracking-[0.3em]">Essential Specifications</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClasses}>Model Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Alpine Heritage"
                    required
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label className={labelClasses}>Manufacturer / Brand</label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    placeholder="e.g., Chronos Geneva"
                    required
                    className={inputClasses}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClasses}>Permanent Slug</label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    required
                    className={`${inputClasses} font-mono text-xs opacity-80`}
                  />
                </div>
                <div>
                  <label className={labelClasses}>Valuation (Price String)</label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="€12,500"
                    required
                    className={inputClasses}
                  />
                </div>
              </div>
            </div>

            <hr className="border-white/5" />

            {/* Inventory & Media */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-[#D4AF37]">
                <Package size={14} />
                <h2 className="text-[10px] uppercase tracking-[0.3em]">Logistics & Assets</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClasses}>Image Asset URL</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      placeholder="/watches/model-front.webp"
                      required
                      className={inputClasses}
                    />
                    <Upload size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20" />
                  </div>
                </div>
                <div>
                  <label className={labelClasses}>Vault Stock Count</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                    className={inputClasses}
                  />
                </div>
              </div>

              <div>
                <label className={labelClasses}>Narrative Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Describe the movement, material, and heritage..."
                  className={`${inputClasses} resize-none`}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-white text-black text-[10px] uppercase tracking-[0.4em] font-bold py-5 rounded-xl hover:bg-[#D4AF37] transition-all duration-500 disabled:opacity-50 active:scale-[0.98]"
            >
              {loading ? 'Processing...' : isEdit ? 'Commit Changes' : 'Finalize Curation'}
            </button>
            <Link
              href="/admin/products"
              className="flex-1 bg-white/5 text-white text-[10px] uppercase tracking-[0.4em] font-bold py-5 rounded-xl hover:bg-white/10 transition-all text-center border border-white/5"
            >
              Discard
            </Link>
          </div>
        </motion.form>

        {/* Sidebar: Live Preview */}
        <aside className="space-y-6">
          <div className="sticky top-12">
            <div className="flex items-center gap-2 text-white/40 mb-4 px-2">
              <Eye size={14} />
              <h2 className="text-[10px] uppercase tracking-[0.3em]">Live Preview</h2>
            </div>
            
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden group">
              <div className="aspect-[4/5] relative bg-neutral-900 flex items-center justify-center overflow-hidden">
                {formData.image ? (
                  <img 
                    src={formData.image} 
                    alt="Preview" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => (e.currentTarget.src = "https://placehold.co/400x500/000000/D4AF37?text=Asset+Not+Found")}
                  />
                ) : (
                  <div className="text-center p-8">
                    <Package size={40} className="mx-auto text-white/5 mb-4" />
                    <p className="text-[8px] uppercase tracking-widest text-white/20">Waiting for asset URL...</p>
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                   <p className="text-[8px] uppercase tracking-widest text-[#D4AF37]">{formData.brand || 'Brand'}</p>
                </div>
              </div>
              
              <div className="p-6 space-y-2">
                <h3 className="text-lg font-light tracking-wide truncate">{formData.name || 'Untitled Piece'}</h3>
                <div className="flex justify-between items-center">
                  <p className="text-[#D4AF37] font-mono text-sm">{formData.price || '€0.00'}</p>
                  <p className="text-[9px] uppercase tracking-widest text-white/30">Stock: {formData.stock}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-6 rounded-2xl bg-[#D4AF37]/5 border border-[#D4AF37]/10">
              <p className="text-[9px] text-[#D4AF37] leading-relaxed italic opacity-60">
                "Every masterpiece begins with meticulous data. Ensure the slug is unique for optimal SEO indexing."
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}