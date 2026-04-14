"use client";

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { X, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuVariants: Variants = {
  closed: { 
    x: "100%", 
    transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] } 
  },
  opened: { 
    x: 0, 
    transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] } 
  }
};

const linkContainerVariants: Variants = {
  opened: {
    transition: { staggerChildren: 0.1, delayChildren: 0.3 }
  }
};

const itemVariants: Variants = {
  closed: { opacity: 0, y: 20 },
  opened: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const menuData = [
    {
      id: 'collections',
      title: 'Collections',
      count: '08',
      links: [
        { name: 'All Timepieces', href: '/collection' },
        { name: 'Heritage Series', href: '/collection?category=Heritage' },
        { name: 'Apex Editions', href: '/collection?category=Apex' },
        { name: 'Astronomical', href: '/collection?category=Celeste' },
      ]
    },
    {
      id: 'heritage',
      title: 'Heritage',
      links: [
        { name: 'Our Story', href: '/heritage#heritage' },
        { name: 'Craftsmanship', href: '/heritage#craft' },
        { name: 'Historical Timeline', href: '/heritage#timeline' },
        { name: 'Archive Vault', href: '/heritage#vault' },
      ]
    },
    { id: 'boutiques', title: 'Boutiques', href: '/boutiques' },
  ];

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="closed"
          animate="opened"
          exit="closed"
          variants={menuVariants}
          className="fixed inset-0 z-[200] bg-black flex flex-col p-8 overflow-y-auto"
        >
          {/* Header */}
          <div className="flex justify-end mb-12">
            <button 
              onClick={onClose} 
              className="text-[#D4AF37] p-2 hover:rotate-90 transition-transform duration-300 outline-none"
              aria-label="Close menu"
            >
              <X size={32} strokeWidth={1} />
            </button>
          </div>

          {/* Navigation */}
          <motion.nav 
            variants={linkContainerVariants}
            className="flex flex-col space-y-4"
          >
            {menuData.map((item) => (
              <motion.div 
                key={item.id} 
                variants={itemVariants}
                className="border-b border-white/5 pb-4 last:border-none"
              >
                {item.links ? (
                  <div className="flex flex-col">
                    <button
                      onClick={() => toggleSection(item.id)}
                      className="w-full flex justify-between items-baseline py-4 group"
                    >
                      <div className="flex items-baseline gap-4">
                        <span className={`text-4xl font-extralight tracking-tighter transition-colors ${expandedSection === item.id ? 'text-[#D4AF37]' : 'text-white'}`}>
                          {item.title}
                        </span>
                        {item.count && (
                          <span className="text-[10px] tracking-widest text-[#D4AF37] opacity-60">
                            {item.count}
                          </span>
                        )}
                      </div>
                      <ChevronRight 
                        size={18} 
                        className={`text-[#D4AF37] transition-transform duration-500 ${expandedSection === item.id ? 'rotate-90' : 'opacity-30 group-hover:opacity-100'}`} 
                      />
                    </button>

                    <AnimatePresence>
                      {expandedSection === item.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: "circOut" }}
                          className="overflow-hidden bg-white/[0.02] rounded-lg"
                        >
                          <div className="flex flex-col gap-6 py-6 pl-6 pr-4">
                            {item.links.map((link) => (
                              <Link
                                key={link.name}
                                href={link.href}
                                onClick={onClose}
                                className="text-white/50 text-[11px] uppercase tracking-[0.3em] hover:text-[#D4AF37] flex items-center justify-between group transition-colors"
                              >
                                {link.name}
                                <ArrowRight size={14} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#D4AF37]" />
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={item.href!}
                    onClick={onClose}
                    className="text-4xl font-extralight tracking-tighter text-white py-4 block hover:text-[#D4AF37] transition-colors"
                  >
                    {item.title}
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.nav>

          {/* Footer Overlay */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-auto pt-12"
          >
            <div className="h-px w-12 bg-[#D4AF37] mb-8" />
            <p className="text-[#D4AF37] tracking-[0.4em] uppercase text-[9px] mb-4 font-medium">
              Visit our Atelier
            </p>
            <address className="text-white/30 text-xs font-light leading-relaxed not-italic">
              Rue du Rhône 42, <br />
              1204 Genève, Switzerland
            </address>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}