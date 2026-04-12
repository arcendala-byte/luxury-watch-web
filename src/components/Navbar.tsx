"use client"

import { useState, useEffect } from 'react';
import { Search, Menu, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence, Variants, useScroll, useSpring } from 'framer-motion';
import Link from 'next/link';

// Components
import MobileMenu from './MobileMenu';
import SearchOverlay from './SearchOverlay';
import Magnetic from './Magnetic';
import CartButton from './CartButton'; 

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.08, 
      delayChildren: 0.1,
      ease: [0.22, 1, 0.36, 1],
      duration: 0.8
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -10, filter: "blur(4px)" },
  show: { 
    opacity: 1, 
    x: 0, 
    filter: "blur(0px)",
    transition: { 
        duration: 0.6, 
        ease: [0.215, 0.61, 0.355, 1.0] 
    } 
  },
};

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const collectionSubOptions = [
    { name: 'All Timepieces', href: '/collection' },
    { name: 'Heritage Series', href: '/collection?cat=heritage' },
    { name: 'Lux Editions', href: '/collection?cat=lux' },
    { name: 'Tech Skeleton', href: '/collection?cat=tech' },
  ];

  // New Heritage Sub-options
  const heritageSubOptions = [
    { name: 'Our Story', href: '/heritage' },
    { name: 'Craftsmanship', href: '/heritage#craft' },
    { name: 'Historical Timeline', href: '/heritage#timeline' },
    { name: 'Archive Vault', href: '/heritage#vault' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-[100] transition-all duration-1000 px-6 md:px-12 ${
          isScrolled 
            ? 'py-4 bg-black/80 backdrop-blur-xl border-b border-white/5' 
            : 'py-8 bg-transparent'
        }`}
      >
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent origin-left"
          style={{ scaleX }}
        />

        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          <div className="flex-1">
            <Magnetic>
              <Link href="/" className="inline-block" aria-label="Home">
                <span className="text-xl md:text-2xl font-light tracking-[0.6em] uppercase text-white hover:text-[#D4AF37] transition-colors duration-500">
                  Chronos
                </span>
              </Link>
            </Magnetic>
          </div>
          
          <div className="hidden md:flex gap-2 text-[10px] uppercase tracking-[0.4em] font-light text-white/70 items-center">
            
            {/* Collections Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveSubMenu('collections')}
              onMouseLeave={() => setActiveSubMenu(null)}
            >
              <Magnetic>
                <div className="flex items-center gap-2 px-6 py-3 cursor-pointer group">
                  <span className={`transition-colors duration-500 ${activeSubMenu === 'collections' ? 'text-[#D4AF37]' : 'group-hover:text-[#D4AF37]'}`}>
                    Collections
                  </span>
                  <ChevronDown 
                    size={10} 
                    className={`transition-transform duration-700 ${activeSubMenu === 'collections' ? 'rotate-180 text-[#D4AF37]' : ''}`} 
                  />
                </div>
              </Magnetic>

              <AnimatePresence>
                {activeSubMenu === 'collections' && (
                  <motion.div 
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    variants={containerVariants}
                    className="absolute top-full left-0 pt-4"
                  >
                    <div className="bg-[#0a0a0a]/95 backdrop-blur-3xl border border-white/10 p-10 w-72 shadow-[0_40px_100px_rgba(0,0,0,0.9)] relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
                      <div className="flex flex-col gap-8">
                        {collectionSubOptions.map((opt) => (
                          <motion.div key={opt.name} variants={itemVariants}>
                            <Link 
                              href={opt.href} 
                              onClick={() => setActiveSubMenu(null)}
                              className="group flex items-center gap-4 text-white/40 hover:text-white transition-all duration-500"
                            >
                              <div className="h-[1px] w-0 bg-[#D4AF37] group-hover:w-4 transition-all duration-500" />
                              <span className="text-[9px] tracking-[0.3em] whitespace-nowrap uppercase">
                                {opt.name}
                              </span>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Heritage Dropdown (Updated) */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveSubMenu('heritage')}
              onMouseLeave={() => setActiveSubMenu(null)}
            >
              <Magnetic>
                <div className="flex items-center gap-2 px-6 py-3 cursor-pointer group">
                  <span className={`transition-colors duration-500 ${activeSubMenu === 'heritage' ? 'text-[#D4AF37]' : 'group-hover:text-[#D4AF37]'}`}>
                    Heritage
                  </span>
                  <ChevronDown 
                    size={10} 
                    className={`transition-transform duration-700 ${activeSubMenu === 'heritage' ? 'rotate-180 text-[#D4AF37]' : ''}`} 
                  />
                </div>
              </Magnetic>

              <AnimatePresence>
                {activeSubMenu === 'heritage' && (
                  <motion.div 
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    variants={containerVariants}
                    className="absolute top-full left-0 pt-4"
                  >
                    <div className="bg-[#0a0a0a]/95 backdrop-blur-3xl border border-white/10 p-10 w-72 shadow-[0_40px_100px_rgba(0,0,0,0.9)] relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
                      <div className="flex flex-col gap-8">
                        {heritageSubOptions.map((opt) => (
                          <motion.div key={opt.name} variants={itemVariants}>
                            <Link 
                              href={opt.href} 
                              onClick={() => setActiveSubMenu(null)}
                              className="group flex items-center gap-4 text-white/40 hover:text-white transition-all duration-500"
                            >
                              <div className="h-[1px] w-0 bg-[#D4AF37] group-hover:w-4 transition-all duration-500" />
                              <span className="text-[9px] tracking-[0.3em] whitespace-nowrap uppercase">
                                {opt.name}
                              </span>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Boutiques Link */}
            <Magnetic>
              <Link href="/boutiques" className="hover:text-[#D4AF37] transition-colors duration-700 px-6 py-3 block uppercase">
                Boutiques
              </Link>
            </Magnetic>
          </div>

          <div className="flex-1 flex justify-end gap-4 items-center text-white">
            <Magnetic>
              <Link 
                href="/admin/login"
                className="hidden md:block text-[9px] uppercase tracking-[0.3em] text-white/40 hover:text-[#D4AF37] transition-colors duration-500 px-3 py-2 border border-white/10 hover:border-[#D4AF37]/30 rounded"
              >
                Admin
              </Link>
            </Magnetic>

            <Magnetic>
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-3 hover:text-[#D4AF37] transition-colors outline-none group"
                aria-label="Open Search"
              >
                <Search size={18} strokeWidth={1} className="group-hover:scale-110 transition-transform duration-500" />
              </button>
            </Magnetic>

            <Magnetic>
              <div className="p-1">
                <CartButton />
              </div>
            </Magnetic>
            
            <button 
              onClick={() => setIsMobileMenuOpen(true)} 
              className="md:hidden flex items-center gap-3 group border-l border-white/10 pl-6 ml-2"
              aria-label="Open Menu"
            >
              <Menu size={22} strokeWidth={1} />
            </button>
          </div>
        </div>
      </nav>

      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}