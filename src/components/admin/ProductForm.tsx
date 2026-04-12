"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'stock' ? parseInt(value) : value,
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
      }
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Products
        </Link>
        <h1 className="text-4xl font-light tracking-[0.2em] uppercase text-white">
          {isEdit ? 'Edit' : 'New'} Product
        </h1>
      </motion.div>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-lg p-8"
      >
        <div className="space-y-6">
          {/* Name & Brand */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white/60 text-sm mb-2">Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/10 text-white px-4 py-2 rounded-lg focus:border-[#D4AF37] focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-white/60 text-sm mb-2">Brand</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/10 text-white px-4 py-2 rounded-lg focus:border-[#D4AF37] focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Slug & Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white/60 text-sm mb-2">Slug (URL)</label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/10 text-white px-4 py-2 rounded-lg focus:border-[#D4AF37] focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-white/60 text-sm mb-2">Price</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="$12,500"
                required
                className="w-full bg-white/5 border border-white/10 text-white px-4 py-2 rounded-lg focus:border-[#D4AF37] focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Image & Stock */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white/60 text-sm mb-2">Image Path</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="/apex-front.jpg"
                required
                className="w-full bg-white/5 border border-white/10 text-white px-4 py-2 rounded-lg focus:border-[#D4AF37] focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-white/60 text-sm mb-2">Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                className="w-full bg-white/5 border border-white/10 text-white px-4 py-2 rounded-lg focus:border-[#D4AF37] focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-white/60 text-sm mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full bg-white/5 border border-white/10 text-white px-4 py-2 rounded-lg focus:border-[#D4AF37] focus:outline-none transition-colors"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#D4AF37] text-black px-6 py-3 rounded-lg hover:bg-[#D4AF37]/90 disabled:opacity-50 transition-all duration-300 font-medium"
            >
              {loading ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}
            </button>
            <Link
              href="/admin/products"
              className="flex-1 bg-white/10 text-white px-6 py-3 rounded-lg hover:bg-white/20 transition-all duration-300 text-center"
            >
              Cancel
            </Link>
          </div>
        </div>
      </motion.form>
    </div>
  );
}
