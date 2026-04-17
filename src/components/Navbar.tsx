"use client"

import { useState, useEffect } from 'react';
import { Search, Menu, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence, Variants, useScroll, useSpring } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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

  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Handle scroll effect and close mobile menu on route change
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    setIsMobileMenuOpen(false); // Close menu on navigation
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const collectionSubOptions = [
    { name: 'All Timepieces', href: '/collection' },
    { name: 'Heritage Series', href: '/collection?category=Heritage' },
    { name: 'Apex Editions', href: '/collection?category=Apex' },
    { name: 'Astronomical', href: '/collection?category=Celeste' },
  ];

  const heritageSubOptions = [
    { name: 'Our Story', href: '/heritage#heritage' },
    { name: 'Craftsmanship', href: '/heritage#craft' },
    { name: 'Historical Timeline', href: '/heritage#timeline' },
    { name: 'Archive Vault', href: '/heritage#vault' },
  ];

  const isCollectionsActive = pathname.startsWith('/collection') || pathname.startsWith('/product');
  const isHeritageActive = pathname.startsWith('/heritage');
  const isBoutiquesActive = pathname === '/boutiques';

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-[100] transition-all duration-700 px-4 md:px-12 ${
          isScrolled 
            ? 'py-3 bg-black/90 backdrop-blur-xl border-b border-white/5' 
            : 'py-6 md:py-8 bg-transparent'
        }`}
      >
        {/* Progress Bar */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[1px] bg-[#D4AF37] origin-left z-50"
          style={{ scaleX }}
        />

        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* Logo Section */}
          <div className="flex-1">
            <Magnetic>
              <Link href="/" className="inline-block" aria-label="Home">
                <span className={`text-lg md:text-2xl font-light tracking-[0.4em] md:tracking-[0.6em] uppercase transition-colors duration-500 ${pathname === '/' ? 'text-[#D4AF37]' : 'text-white hover:text-[#D4AF37]'}`}>
                  Chronos
                </span>
              </Link>
            </Magnetic>
          </div>
          
          {/* Desktop Navigation - Hidden on lg (1024px) and below */}
          <div className="hidden lg:flex gap-2 text-[10px] uppercase tracking-[0.4em] font-light items-center">
            
            {/* Collections Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveSubMenu('collections')}
              onMouseLeave={() => setActiveSubMenu(null)}
            >
              <Magnetic>
                <div className="flex items-center gap-2 px-6 py-3 cursor-pointer group">
                  <span className={`transition-colors duration-500 ${isCollectionsActive || activeSubMenu === 'collections' ? 'text-[#D4AF37]' : 'text-white/70 group-hover:text-[#D4AF37]'}`}>
                    Collections
                  </span>
                  <ChevronDown size={10} className={`transition-transform duration-700 ${activeSubMenu === 'collections' ? 'rotate-180 text-[#D4AF37]' : isCollectionsActive ? 'text-[#D4AF37]' : 'text-white/30'}`} />
                  {(isCollectionsActive || activeSubMenu === 'collections') && (
                    <motion.div layoutId="navIndicator" className="absolute bottom-0 left-6 right-8 h-px bg-[#D4AF37]/50" />
                  )}
                </div>
              </Magnetic>

              <AnimatePresence>
                {activeSubMenu === 'collections' && (
                  <motion.div initial="hidden" animate="show" exit="hidden" variants={containerVariants} className="absolute top-full left-0 pt-4">
                    <div className="bg-[#0a0a0a]/95 backdrop-blur-3xl border border-white/10 p-10 w-72 shadow-2xl relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
                      <div className="flex flex-col gap-8">
                        {collectionSubOptions.map((opt) => (
                          <motion.div key={opt.name} variants={itemVariants}>
                            <Link href={opt.href} onClick={() => setActiveSubMenu(null)} className={`group flex items-center gap-4 transition-all duration-500 ${pathname === opt.href ? 'text-white' : 'text-white/40 hover:text-white'}`}>
                              <div className={`h-[1px] transition-all duration-500 bg-[#D4AF37] ${pathname === opt.href ? 'w-4' : 'w-0 group-hover:w-4'}`} />
                              <span className="text-[9px] tracking-[0.3em] uppercase">{opt.name}</span>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Heritage Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveSubMenu('heritage')}
              onMouseLeave={() => setActiveSubMenu(null)}
            >
              <Magnetic>
                <div className="flex items-center gap-2 px-6 py-3 cursor-pointer group">
                  <span className={`transition-colors duration-500 ${isHeritageActive || activeSubMenu === 'heritage' ? 'text-[#D4AF37]' : 'text-white/70 group-hover:text-[#D4AF37]'}`}>
                    Heritage
                  </span>
                  <ChevronDown size={10} className={`transition-transform duration-700 ${activeSubMenu === 'heritage' ? 'rotate-180 text-[#D4AF37]' : isHeritageActive ? 'text-[#D4AF37]' : 'text-white/30'}`} />
                  {(isHeritageActive || activeSubMenu === 'heritage') && (
                    <motion.div layoutId="navIndicator" className="absolute bottom-0 left-6 right-8 h-px bg-[#D4AF37]/50" />
                  )}
                </div>
              </Magnetic>

              <AnimatePresence>
                {activeSubMenu === 'heritage' && (
                  <motion.div initial="hidden" animate="show" exit="hidden" variants={containerVariants} className="absolute top-full left-0 pt-4">
                    <div className="bg-[#0a0a0a]/95 backdrop-blur-3xl border border-white/10 p-10 w-72 shadow-2xl relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
                      <div className="flex flex-col gap-8">
                        {heritageSubOptions.map((opt) => (
                          <motion.div key={opt.name} variants={itemVariants}>
                            <Link href={opt.href} onClick={() => setActiveSubMenu(null)} className={`group flex items-center gap-4 transition-all duration-500 ${pathname === opt.href ? 'text-white' : 'text-white/40 hover:text-white'}`}>
                              <div className={`h-[1px] transition-all duration-500 bg-[#D4AF37] ${pathname === opt.href ? 'w-4' : 'w-0 group-hover:w-4'}`} />
                              <span className="text-[9px] tracking-[0.3em] uppercase">{opt.name}</span>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Boutiques */}
            <Magnetic>
              <div className="relative">
                <Link href="/boutiques" className={`transition-colors duration-700 px-6 py-3 block uppercase ${isBoutiquesActive ? 'text-[#D4AF37]' : 'text-white/70 hover:text-[#D4AF37]'}`}>
                  Boutiques
                </Link>
                {isBoutiquesActive && <motion.div layoutId="navIndicator" className="absolute bottom-0 left-6 right-6 h-px bg-[#D4AF37]/50" />}
              </div>
            </Magnetic>
          </div>

          {/* Right Actions Section */}
          <div className="flex-1 flex justify-end gap-2 md:gap-4 items-center">
            
            <Magnetic>
              <Link href="/admin/login" className="hidden lg:block text-[8px] uppercase tracking-[0.3em] text-white/30 hover:text-[#D4AF37] transition-all duration-500 px-3 py-1.5 border border-white/10 hover:border-[#D4AF37]/30 rounded">
                Admin
              </Link>
            </Magnetic>

            <Magnetic>
              <button onClick={() => setIsSearchOpen(true)} className="p-2 md:p-3 text-white/70 hover:text-[#D4AF37] transition-colors group" aria-label="Open Search">
                <Search size={18} strokeWidth={1} className="group-hover:scale-110 transition-transform duration-500" />
              </button>
            </Magnetic>

            <CartButton />
            
            {/* Mobile Menu Toggle - Visible on md and below */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)} 
              className="lg:hidden flex items-center justify-center p-2 text-white border-l border-white/10 ml-2 pl-4"
              aria-label="Open Menu"
            >
              <Menu size={24} strokeWidth={1} />
            </button>
          </div>
        </div>
      </nav>

      {/* Overlays */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu 
            isOpen={isMobileMenuOpen} 
            onClose={() => setIsMobileMenuOpen(false)} 
          />
        )}
      </AnimatePresence>
    </>
  );
}