"use client"

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Instagram, Youtube, Twitter, Facebook } from 'lucide-react'; // Added icons
import Magnetic from './Magnetic';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] border-t border-white/5 relative overflow-hidden">
      {/* 1. Back to Top */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="group w-full py-12 border-b border-white/5 flex flex-col items-center justify-center gap-4 transition-colors hover:bg-white/[0.02]"
      >
        <motion.span 
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-[#D4AF37] text-lg"
        >
          ↑
        </motion.span>
        <span className="text-[9px] uppercase tracking-[0.6em] text-white/30 group-hover:text-[#D4AF37] transition-all duration-700">
          Back to the Top
        </span>
      </button>

      <div className="max-w-7xl mx-auto px-6 pt-24 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-32">
          
          {/* 2. Brand, Newsletter & Socials */}
          <div className="lg:col-span-2 space-y-12">
            <div className="space-y-4">
              <h3 className="text-white font-light tracking-[0.5em] uppercase text-3xl">Chronos</h3>
              <div className="h-px w-12 bg-[#D4AF37]/50" />
            </div>
            
            <p className="text-white/40 font-light text-sm leading-relaxed max-w-xs uppercase tracking-wider">
              Join our private circle for early access to limited editions and exclusive horological stories.
            </p>

            <form className="group flex w-full max-w-sm border-b border-white/10 pb-3 focus-within:border-[#D4AF37] transition-all duration-500">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-transparent border-none outline-none text-white text-[10px] tracking-[0.3em] w-full placeholder:text-white/10 uppercase"
              />
              <button className="text-[#D4AF37] uppercase text-[10px] tracking-widest hover:text-white transition-colors">
                Subscribe
              </button>
            </form>

            {/* --- ADDED: SOCIAL MEDIA BLOCK --- */}
            <div className="flex gap-6 items-center pt-4">
              {[
                { icon: <Instagram size={18} />, label: 'Instagram' },
                { icon: <Youtube size={18} />, label: 'YouTube' },
                { icon: <Twitter size={18} />, label: 'X' },
                { icon: <Facebook size={18} />, label: 'Facebook' }
              ].map((social, i) => (
                <Magnetic key={i}>
                  <Link 
                    href="#" 
                    className="text-white/20 hover:text-[#D4AF37] transition-all duration-500 p-2 block relative group"
                  >
                    {social.icon}
                    {/* Subtle glow effect on hover */}
                    <span className="absolute inset-0 bg-[#D4AF37]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </Link>
                </Magnetic>
              ))}
            </div>
          </div>

          <FooterColumn 
            title="The Maison" 
            links={[
              { label: 'Collections', href: '/collection' },
              { label: 'Our Heritage', href: '/heritage' },
              { label: 'Craftsmanship', href: '/heritage#craft' },
              { label: 'Boutiques', href: '/boutiques' },
            ]} 
          />

          <FooterColumn 
            title="Client Care" 
            links={[
              { label: 'Contact Us', href: '/contact' },
              { label: 'Private Viewings', href: '/contact' },
              { label: 'Shipping & Returns', href: '#' },
              { label: 'Warranty', href: '#' },
            ]} 
          />
        </div>

        {/* 4. Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-white/20 text-[9px] uppercase tracking-[0.4em]">
            © {currentYear} Chronos Heritage. Crafted in Switzerland.
          </p>

          <div className="flex gap-12 text-white/20 text-[9px] uppercase tracking-[0.4em]">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="#" className="hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string, links: { label: string, href: string }[] }) {
  return (
    <div className="space-y-8">
      <h4 className="text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] font-medium">{title}</h4>
      <ul className="space-y-5">
        {links.map((link, i) => (
          <li key={i}>
            <Link 
              href={link.href} 
              className="group flex items-center gap-3 text-white/30 hover:text-white transition-all duration-500 text-[10px] uppercase tracking-[0.25em] font-light"
            >
              <span className="h-[1px] w-0 bg-[#D4AF37] group-hover:w-3 transition-all duration-500" />
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}