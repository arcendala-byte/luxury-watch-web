"use client"

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Upload, X, Watch, ShieldCheck, Zap } from 'lucide-react';
import Image from 'next/image';

export default function NewProductPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '', brand: '', price: '', stock: '',
    caseMaterial: '', caseSize: '', thickness: '',
    movement: 'Automatic', caliber: '', powerReserve: '',
    dialColor: '', dialPattern: '', bracelet: '', clasp: '',
    description: '', curatorNotes: '',
    features: [] as string[]
  });

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
    setLoading(true);
    // Logic to send formData and imagePreview to /api/admin/products
    setTimeout(() => {
      setLoading(false);
      router.push('/admin/products');
    }, 1500);
  };

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
              Curate <span className="text-[#D4AF37]">New Piece</span>
            </h1>
            <p className="text-[9px] uppercase tracking-[0.4em] text-white/30 italic">Registry Entry Protocol Active</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="px-8 py-3 border border-white/10 rounded-xl text-[10px] uppercase tracking-widest text-white/40 hover:bg-white/5 transition-all">Cancel & Discard</button>
          <button onClick={handleSubmit} disabled={loading} className="px-8 py-3 bg-[#D4AF37] rounded-xl text-[10px] uppercase tracking-widest text-black font-bold hover:bg-[#b8962d] transition-all flex items-center gap-2">
            <Save size={14} /> {loading ? 'Archiving...' : 'Secure & Archive Entry'}
          </button>
        </div>
      </div>

      <form className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Media & Identity */}
        <div className="lg:col-span-4 space-y-8">
          <section className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 space-y-6">
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">Visual Asset</h2>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="relative aspect-square bg-white/[0.02] border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center cursor-pointer group hover:border-[#D4AF37]/30 transition-all overflow-hidden"
            >
              {imagePreview ? (
                <Image src={imagePreview} alt="Preview" fill className="object-cover" />
              ) : (
                <>
                  <Upload className="text-white/10 group-hover:text-[#D4AF37] transition-colors mb-4" size={32} />
                  <p className="text-[9px] uppercase tracking-[0.2em] text-white/20">Upload High-Res Master</p>
                </>
              )}
              <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-[8px] uppercase tracking-widest text-white/20">SKU (Auto)</p>
                <div className="bg-white/[0.03] p-3 rounded-lg text-[10px] text-white/40 border border-white/5 font-mono uppercase">CH-GEN-2026</div>
              </div>
              <div className="space-y-1">
                <p className="text-[8px] uppercase tracking-widest text-white/20">Status</p>
                <select className="w-full bg-white/[0.03] p-3 rounded-lg text-[10px] text-white border border-white/5 focus:outline-none">
                  <option>Active</option>
                  <option>Limited</option>
                  <option>Archived</option>
                </select>
              </div>
            </div>
          </section>

          <section className="bg-[#D4AF37]/5 border border-[#D4AF37]/10 rounded-3xl p-8 space-y-4">
            <div className="flex items-center gap-3 text-[#D4AF37]">
              <ShieldCheck size={18} />
              <h3 className="text-[10px] uppercase tracking-[0.2em]">Provenance Check</h3>
            </div>
            <p className="text-[9px] text-white/40 leading-relaxed uppercase tracking-widest">Verify serial numbers and movement authenticity before final archive. All entries are encrypted.</p>
          </section>
        </div>

        {/* Middle & Right: Technical Specs */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Core Details */}
              <div className="space-y-8">
                <h2 className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">Core Details</h2>
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-white/40">Model Name</label>
                    <input type="text" placeholder="e.g. Royal Oak 15500ST" className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-white text-[11px] focus:border-[#D4AF37]/50 outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-widest text-white/40">Valuation (€)</label>
                      <input type="number" placeholder="42000" className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-white text-[11px] focus:border-[#D4AF37]/50 outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-widest text-white/40">Stock</label>
                      <input type="number" placeholder="1" className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-white text-[11px] focus:border-[#D4AF37]/50 outline-none" />
                    </div>
                  </div>
                </div>

                <h2 className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold pt-4">Movement & Dial</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-white/40">Caliber</label>
                    <input type="text" placeholder="AP 4302" className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-3 text-white text-[10px] focus:border-[#D4AF37]/50 outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-white/40">Power Reserve</label>
                    <input type="text" placeholder="70 Hours" className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-3 text-white text-[10px] focus:border-[#D4AF37]/50 outline-none" />
                  </div>
                </div>
              </div>

              {/* Case & Features */}
              <div className="space-y-8">
                <h2 className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">Case Specs</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-white/40">Diameter</label>
                    <input type="text" placeholder="41mm" className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-3 text-white text-[10px] focus:border-[#D4AF37]/50 outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest text-white/40">Thickness</label>
                    <input type="text" placeholder="10.4mm" className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-3 text-white text-[10px] focus:border-[#D4AF37]/50 outline-none" />
                  </div>
                </div>

                <h2 className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold pt-4">Features Check</h2>
                <div className="grid grid-cols-2 gap-y-4">
                  {['Date', 'Moonphase', 'Water Resistance', 'Chronograph', 'Skeleton', 'Sapphire Crystal'].map((f) => (
                    <label key={f} className="flex items-center gap-3 cursor-pointer group">
                      <div onClick={() => toggleFeature(f)} className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${formData.features.includes(f) ? 'bg-[#D4AF37] border-[#D4AF37]' : 'border-white/10 group-hover:border-white/30'}`}>
                        {formData.features.includes(f) && <Zap size={10} className="text-black" />}
                      </div>
                      <span className="text-[10px] uppercase tracking-widest text-white/40 group-hover:text-white/60 transition-colors">{f}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12 space-y-6">
              <div className="space-y-2">
                <label className="text-[9px] uppercase tracking-widest text-[#D4AF37]">Maison Curation Notes</label>
                <textarea rows={4} className="w-full bg-white/[0.02] border border-white/5 rounded-2xl p-6 text-white/60 text-[11px] leading-relaxed italic focus:border-[#D4AF37]/30 outline-none resize-none" placeholder="Internal remarks regarding this specific reference..."></textarea>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}