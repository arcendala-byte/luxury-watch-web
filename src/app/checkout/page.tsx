"use client"
import { useCart } from '../../lib/store';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function CheckoutPage() {
  const { items, totalPrice } = useCart();

  // If cart is empty, show a refined empty state
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center">
        <p className="text-white/20 font-serif italic text-xl mb-8">Your collection is currently empty.</p>
        <Link href="/collection" className="text-[#D4AF37] text-[10px] uppercase tracking-[0.4em] border border-[#D4AF37]/30 px-8 py-4 hover:bg-[#D4AF37] hover:text-black transition-all">
          Return to Gallery
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        
        {/* Left Side: Reservation Form */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-[#D4AF37] text-[10px] uppercase tracking-[0.5em] mb-4">Concierge</h2>
          <h1 className="text-4xl text-white font-extralight tracking-tighter mb-12">Secure Your <br /> Timepiece</h1>
          
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40">First Name</label>
                <input type="text" className="w-full bg-transparent border-b border-white/10 pb-2 text-white outline-none focus:border-[#D4AF37] transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40">Last Name</label>
                <input type="text" className="w-full bg-transparent border-b border-white/10 pb-2 text-white outline-none focus:border-[#D4AF37] transition-colors" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-white/40">Email Address</label>
              <input type="email" className="w-full bg-transparent border-b border-white/10 pb-2 text-white outline-none focus:border-[#D4AF37] transition-colors" />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-white/40">Preferred Contact Method</label>
              <select className="w-full bg-transparent border-b border-white/10 pb-2 text-white outline-none focus:border-[#D4AF37] appearance-none cursor-pointer">
                <option className="bg-black">Email</option>
                <option className="bg-black">Phone Call</option>
                <option className="bg-black">WhatsApp</option>
              </select>
            </div>

            <div className="pt-8">
              <button className="w-full bg-[#D4AF37] text-black py-5 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-white transition-all duration-500">
                Request Private Consultation
              </button>
              <p className="text-white/20 text-[9px] mt-6 text-center leading-relaxed tracking-widest uppercase">
                A specialist will contact you within 24 hours to arrange secure payment and delivery.
              </p>
            </div>
          </form>
        </motion.div>

        {/* Right Side: Order Summary */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-[#0a0a0a] border border-white/5 p-10 h-fit"
        >
          <h3 className="text-white text-sm font-light tracking-widest uppercase mb-10 border-b border-white/5 pb-6">Your Selection</h3>
          
          <div className="space-y-8 mb-10 max-h-[400px] overflow-y-auto no-scrollbar">
            {items.map((item) => (
              <div key={item.id} className="flex gap-6">
                <div className="relative w-20 h-24 bg-[#111] border border-white/5 flex-shrink-0">
                  <Image src={`/${item.image}`} alt={item.name} fill className="object-cover grayscale" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-[#D4AF37] text-[8px] uppercase tracking-widest mb-1">{item.brand}</span>
                  <h4 className="text-white text-sm font-light tracking-tight">{item.name}</h4>
                  <p className="text-white/40 text-xs mt-2">{item.price}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-white/5 pt-8 space-y-4">
            <div className="flex justify-between items-center text-white/40 text-[10px] uppercase tracking-widest">
              <span>Delivery</span>
              <span>Complimentary Insured Shipping</span>
            </div>
            <div className="flex justify-between items-end pt-4">
              <span className="text-white text-[10px] uppercase tracking-widest">Total Investment</span>
              <span className="text-white text-3xl font-light tracking-tighter">
                ${totalPrice().toLocaleString()}
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </main>
  );
}