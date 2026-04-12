"use client";

import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations'; 
import { MapPin, Phone, Clock, Calendar, ShieldCheck, Coffee, Globe } from 'lucide-react';
import Link from 'next/link';

const locations = [
  {
    city: "Geneva",
    address: "Rue du Rhône 42, 1204 Genève",
    phone: "+41 22 310 00 00",
    hours: "10:00 AM - 6:30 PM",
    image: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?q=80&w=1000",
    specialty: "Flagship & Restoration Atelier"
  },
  {
    city: "Paris",
    address: "22 Place Vendôme, 75001 Paris",
    phone: "+33 1 42 60 00 00",
    hours: "10:30 AM - 7:00 PM",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000",
    specialty: "High Jewelry Timepieces"
  },
  {
    city: "New York",
    address: "711 Fifth Avenue, NY 10022",
    phone: "+1 212 750 00 00",
    hours: "10:00 AM - 6:00 PM",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e3e9?q=80&w=1000",
    specialty: "Limited Edition Lounge"
  }
];

const services = [
  { icon: <Calendar size={20} />, title: "Private Viewings", desc: "One-on-one sessions with our master horologists." },
  { icon: <ShieldCheck size={20} />, title: "Lifetime Care", desc: "Complimentary ultrasonic cleaning and accuracy testing." },
  { icon: <Coffee size={20} />, title: "Collectors Lounge", desc: "Exclusive access to our private bar for timepiece members." },
  { icon: <Globe size={20} />, title: "Global Warranty", desc: "Service your timepiece at any boutique worldwide." }
];

export default function BoutiquesPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white pt-32 pb-24">
      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-32">
        <motion.div 
          initial="initial"
          animate="animate"
          variants={fadeInUp} 
          className="max-w-3xl"
        >
          <span className="text-[#D4AF37] text-[10px] uppercase tracking-[0.6em] mb-4 block">
            The World of Chronos
          </span>
          <h1 className="text-5xl md:text-7xl font-light uppercase tracking-widest mb-8 leading-tight">
            Our <span className="italic">Sanctuaries</span>
          </h1>
          <p className="text-white/40 text-sm md:text-base leading-relaxed tracking-wide max-w-xl">
            Beyond commerce, our boutiques are temples of time. Experience the weight, the movement, and the soul of our collection in an environment of absolute tranquility.
          </p>
        </motion.div>
      </section>

      {/* Boutique Experience Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-32">
        <div className="flex flex-col gap-32">
          {locations.map((loc, index) => (
            <motion.div
              key={loc.city}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
            >
              {/* Image Side */}
              <div className="w-full md:w-3/5 overflow-hidden group relative">
                <div className="absolute inset-0 bg-[#D4AF37]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
                <img 
                  src={loc.image} 
                  alt={loc.city} 
                  className="w-full h-[500px] object-cover grayscale transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0" 
                />
                <div className="absolute bottom-6 left-6 z-20">
                    <span className="px-4 py-2 bg-black/50 backdrop-blur-md border border-white/10 text-[9px] uppercase tracking-[0.3em]">
                        {loc.specialty}
                    </span>
                </div>
              </div>

              {/* Info Side */}
              <div className="w-full md:w-2/5 space-y-8">
                <h2 className="text-4xl font-light tracking-[0.3em] uppercase italic">{loc.city}</h2>
                <div className="space-y-6 text-[12px] text-white/60 uppercase tracking-widest font-light">
                  <div className="flex items-start gap-4">
                    <MapPin size={18} className="text-[#D4AF37] shrink-0" /> 
                    <p className="leading-relaxed">{loc.address}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone size={18} className="text-[#D4AF37] shrink-0" /> 
                    <p>{loc.phone}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Clock size={18} className="text-[#D4AF37] shrink-0" /> 
                    <p>{loc.hours}</p>
                  </div>
                </div>
                
                <div className="pt-8">
                    <Link href="/contact" className="inline-block px-8 py-4 border border-[#D4AF37]/30 text-[10px] uppercase tracking-[0.4em] hover:bg-[#D4AF37] hover:text-black transition-all duration-500">
                        Book Private Viewing
                    </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="border-y border-white/5 bg-[#080808] py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                {services.map((service, i) => (
                    <motion.div 
                        key={i}
                        whileHover={{ y: -5 }}
                        className="space-y-4"
                    >
                        <div className="text-[#D4AF37]">{service.icon}</div>
                        <h3 className="text-[11px] uppercase tracking-[0.2em] text-white">{service.title}</h3>
                        <p className="text-[11px] text-white/40 leading-relaxed tracking-wider">{service.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>
    </main>
  );
}