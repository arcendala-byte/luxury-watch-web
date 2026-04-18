"use client"

import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Upload, Zap, ShieldCheck, Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '', brand: '', price: '', stock: '',
    caseMaterial: '', caseSize: '', thickness: '',
    movement: 'Automatic', caliber: '', powerReserve: '',
    dialColor: '', dialPattern: '', bracelet: '', clasp: '',
    description: '', curatorNotes: '',
    features: [] as string[]
  });

  // Fetch existing product data
  useEffect(() => {
    const fetchProduct = async () => {
      if (!params.id) return;
      try {
        const res = await fetch(`/api/products/${params.id}`);
        if (!res.ok) throw new Error('Product not found');
        const data = await res.json();
        
        setFormData({
          ...data,
          price: data.price.toString(),
          stock: data.stock.toString(),
          features: data.features || []
        });
        if (data.image) setImagePreview(data.image);
      } catch (error) {
        console.error("Friction in retrieval:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [params.id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const toggleFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature) 
        ? prev.features.filter(f => f !== feature) 
        : [...prev.features, feature]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`/api/products/${params.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
          image: imagePreview // Sending base64 string to API
        }),
      });

      if (res.ok) {
        router.push('/admin/products');
        router.refresh();
      }
    } catch (error) {
      console.error('Update failed:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="text-[#D4AF37] animate-spin" size={40} />
        <p className="text-[10px] uppercase tracking-[0.4em] text-white/20">Syncing with Vault...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-20 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <button onClick={() => router.back()} className="p-3 bg-white/[0.03] border border-white/5 rounded-full text-white/40 hover:text-[#D4AF37] transition-all">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-extralight tracking-[0.3em] uppercase text-white">
              Edit <span className="text-[#D4AF37]">Masterpiece</span>
            </h1>
            <p className="text-[9px] uppercase tracking-[0.4em] text-white/30 italic">Registry Modification Protocol</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button onClick={handleSubmit} disabled={saving} className="px-8 py-3 bg-[#D4AF37] rounded-xl text-[10px] uppercase tracking-widest text-black font-bold hover:bg-[#b8962d] transition-all flex items-center gap-2">
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {saving ? 'UPDATING...' : 'COMMIT CHANGES'}
          </button>
        </div>
      </div>

      <form className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Media & Identity */}
        <div className="lg:col-span-4 space-y-8">
          <section className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 space-y-6">
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">Asset Preview</h2>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="relative aspect-square bg-white/[0.02] border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center cursor-pointer group hover:border-[#D4AF37]/30 transition-all overflow-hidden"
            >
              {imagePreview ? (
                <Image src={imagePreview} alt="Preview" fill className="object-cover" />
              ) : (
                <Upload className="text-white/10 group-hover:text-[#D4AF37]" size={32} />
              )}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <p className="text-[10px] text-white uppercase tracking-widest">Change Image</p>
              </div>
              <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
            </div>
            <div className="space-y-1">
              <p className="text-[8px] uppercase tracking-widest text-white/20">Registry ID</p>
              <div className="bg-white/[0.03] p-3 rounded-lg text-[10px] text-white/40 border border-white/5 font-mono">#{params.id}</div>
            </div>
          </section>

          <section className="bg-[#D4AF37]/5 border border-[#D4AF37]/10 rounded-3xl p-8 space-y-4 text-center">
             <ShieldCheck size={24} className="mx-auto text-[#D4AF37]" />
             <p className="text-[9px] text-white/40 uppercase tracking-[0.2em] leading-relaxed">Changes to valuation or stock will be logged in the audit trail.</p>
          </section>
        </div>

        {/* Right: Specs (Using same structure as New page for consistency) */}
        <div className="lg:col-span-8 bg-black/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-10">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <h2 className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">Core Specifications</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-white/40">Model Name</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-white text-[11px] outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-widest text-white/40">Valuation (€)</label>
                      <input type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-white text-[11px] outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-widest text-white/40">Stock</label>
                      <input type="number" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-white text-[11px] outline-none" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">Technical Features</h2>
                <div className="grid grid-cols-2 gap-y-4">
                  {['Date', 'Moonphase', 'Water Resistance', 'Skeleton', 'Sapphire Crystal'].map((f) => (
                    <label key={f} className="flex items-center gap-3 cursor-pointer group">
                      <div onClick={() => toggleFeature(f)} className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${formData.features.includes(f) ? 'bg-[#D4AF37] border-[#D4AF37]' : 'border-white/10 group-hover:border-white/30'}`}>
                        {formData.features.includes(f) && <Zap size={10} className="text-black" />}
                      </div>
                      <span className="text-[10px] uppercase tracking-widest text-white/40">{f}</span>
                    </label>
                  ))}
                </div>
              </div>
           </div>
           
           <div className="mt-10 space-y-2">
             <label className="text-[9px] uppercase tracking-widest text-[#D4AF37]">Description</label>
             <textarea rows={6} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full bg-white/[0.02] border border-white/5 rounded-2xl p-6 text-white text-[11px] outline-none" />
           </div>
        </div>
      </form>
    </div>
  );
}