"use client";

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#D4AF37] selection:text-black">
      <Navbar />
      
      <section className="pt-48 pb-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          
          {/* Left Side: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <div>
              <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.6em] mb-4 block">
                Contact the Maison
              </span>
              <h1 className="text-6xl md:text-8xl font-light uppercase tracking-tighter leading-tight mb-8">
                Inquire <br /> <span className="italic font-serif text-[#D4AF37]">Further</span>
              </h1>
              <p className="text-white/40 text-lg font-light leading-relaxed max-w-md">
                Whether you seek a private viewing of a specific reference or require professional service for your timepiece, our concierge is at your disposal.
              </p>
            </div>

            <div className="space-y-8 pt-8">
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#D4AF37] transition-colors duration-500">
                  <Mail size={18} className="text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-1">Email</h3>
                  <p className="text-sm tracking-widest uppercase">concierge@chronos.ch</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#D4AF37] transition-colors duration-500">
                  <Phone size={18} className="text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-1">Office</h3>
                  <p className="text-sm tracking-widest uppercase">+41 22 310 00 00</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#D4AF37] transition-colors duration-500">
                  <MapPin size={18} className="text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-1">Atelier</h3>
                  <p className="text-sm tracking-widest uppercase">Rue du Rhône 42, 1204 Genève</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-[#0a0a0a] border border-white/5 p-12 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 blur-[80px] group-hover:bg-[#D4AF37]/10 transition-colors duration-700" />
            
            <form className="space-y-10 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-2 group/input">
                  <label className="text-[9px] uppercase tracking-[0.4em] text-white/40 block group-focus-within/input:text-[#D4AF37] transition-colors">First Name</label>
                  <input type="text" className="w-full bg-transparent border-b border-white/10 pb-3 outline-none focus:border-[#D4AF37] transition-colors font-light text-sm" />
                </div>
                <div className="space-y-2 group/input">
                  <label className="text-[9px] uppercase tracking-[0.4em] text-white/40 block group-focus-within/input:text-[#D4AF37] transition-colors">Last Name</label>
                  <input type="text" className="w-full bg-transparent border-b border-white/10 pb-3 outline-none focus:border-[#D4AF37] transition-colors font-light text-sm" />
                </div>
              </div>

              <div className="space-y-2 group/input">
                <label className="text-[9px] uppercase tracking-[0.4em] text-white/40 block group-focus-within/input:text-[#D4AF37] transition-colors">Email Address</label>
                <input type="email" className="w-full bg-transparent border-b border-white/10 pb-3 outline-none focus:border-[#D4AF37] transition-colors font-light text-sm" />
              </div>

              <div className="space-y-2 group/input">
                <label className="text-[9px] uppercase tracking-[0.4em] text-white/40 block group-focus-within/input:text-[#D4AF37] transition-colors">Subject</label>
                <select className="w-full bg-transparent border-b border-white/10 pb-3 outline-none focus:border-[#D4AF37] transition-colors font-light text-sm appearance-none cursor-pointer">
                  <option className="bg-black">Private Viewing Inquiry</option>
                  <option className="bg-black">Service & Repair</option>
                  <option className="bg-black">Collection Information</option>
                  <option className="bg-black">Other</option>
                </select>
              </div>

              <div className="space-y-2 group/input">
                <label className="text-[9px] uppercase tracking-[0.4em] text-white/40 block group-focus-within/input:text-[#D4AF37] transition-colors">Message</label>
                <textarea rows={4} className="w-full bg-transparent border-b border-white/10 pb-3 outline-none focus:border-[#D4AF37] transition-colors font-light text-sm resize-none" />
              </div>

              <button className="w-full bg-[#D4AF37] text-black py-5 uppercase tracking-[0.6em] text-[10px] font-bold hover:bg-white transition-all duration-500 flex items-center justify-center gap-4">
                <span>Send Message</span>
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
