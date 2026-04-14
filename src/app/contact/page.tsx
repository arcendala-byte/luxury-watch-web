"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Check, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: 'Private Viewing Inquiry',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          watchName: formData.subject,
          method: 'Contact Form'
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert("Transmission error. Please try again or contact concierge@chronos.ch directly.");
      }
    } catch (err) {
      console.error("Submission failed", err);
    } finally {
      setIsSubmitting(false);
    }
  };

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
            className="bg-[#0a0a0a] border border-white/5 p-12 relative overflow-hidden group min-h-[600px] flex flex-col"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 blur-[80px] group-hover:bg-[#D4AF37]/10 transition-colors duration-700" />
            
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  onSubmit={handleSubmit} 
                  className="space-y-10 relative z-10"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-2 group/input">
                      <label className="text-[9px] uppercase tracking-[0.4em] text-white/40 block group-focus-within/input:text-[#D4AF37] transition-colors">First Name</label>
                      <input 
                        required
                        type="text" 
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        className="w-full bg-transparent border-b border-white/10 pb-3 outline-none focus:border-[#D4AF37] transition-colors font-light text-sm" 
                      />
                    </div>
                    <div className="space-y-2 group/input">
                      <label className="text-[9px] uppercase tracking-[0.4em] text-white/40 block group-focus-within/input:text-[#D4AF37] transition-colors">Last Name</label>
                      <input 
                        required
                        type="text" 
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        className="w-full bg-transparent border-b border-white/10 pb-3 outline-none focus:border-[#D4AF37] transition-colors font-light text-sm" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2 group/input">
                    <label className="text-[9px] uppercase tracking-[0.4em] text-white/40 block group-focus-within/input:text-[#D4AF37] transition-colors">Email Address</label>
                    <input 
                      required
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-transparent border-b border-white/10 pb-3 outline-none focus:border-[#D4AF37] transition-colors font-light text-sm" 
                    />
                  </div>

                  <div className="space-y-2 group/input">
                    <label className="text-[9px] uppercase tracking-[0.4em] text-white/40 block group-focus-within/input:text-[#D4AF37] transition-colors">Subject</label>
                    <select 
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full bg-transparent border-b border-white/10 pb-3 outline-none focus:border-[#D4AF37] transition-colors font-light text-sm appearance-none cursor-pointer"
                    >
                      <option className="bg-black" value="Private Viewing Inquiry">Private Viewing Inquiry</option>
                      <option className="bg-black" value="Service & Repair">Service & Repair</option>
                      <option className="bg-black" value="Collection Information">Collection Information</option>
                      <option className="bg-black" value="Other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2 group/input">
                    <label className="text-[9px] uppercase tracking-[0.4em] text-white/40 block group-focus-within/input:text-[#D4AF37] transition-colors">Message</label>
                    <textarea 
                      required
                      rows={4} 
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-transparent border-b border-white/10 pb-3 outline-none focus:border-[#D4AF37] transition-colors font-light text-sm resize-none" 
                    />
                  </div>

                  <button 
                    disabled={isSubmitting}
                    className="w-full bg-[#D4AF37] text-black py-5 uppercase tracking-[0.6em] text-[10px] font-bold hover:bg-white transition-all duration-500 flex items-center justify-center gap-4 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send size={14} />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center flex-1 text-center space-y-6"
                >
                  <div className="w-16 h-16 rounded-full border border-[#D4AF37] flex items-center justify-center">
                    <Check className="text-[#D4AF37]" size={32} />
                  </div>
                  <h2 className="text-2xl font-light uppercase tracking-widest">Message Received</h2>
                  <p className="text-white/40 text-sm font-light max-w-xs">
                    Our concierge team has received your inquiry. A specialist will contact you within 24 hours.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-[#D4AF37] text-[10px] uppercase tracking-[0.4em] hover:text-white transition-colors"
                  >
                    Send another inquiry
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
