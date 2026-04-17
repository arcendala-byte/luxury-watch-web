"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import CustomCursor from '@/components/CustomCursor';
import CartDrawer from '@/components/CartDrawer';
import Navbar from '@/components/Navbar';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');

  // Ensure scroll resets to top on route change for smooth entrance animations
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <CustomCursor />
      <CartDrawer />
      
      {/* Conditional Navbar rendering for clean Admin interface */}
      {!isAdminPage && <Navbar />}
      
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
          transition={{ 
            duration: 0.6, 
            ease: [0.22, 1, 0.36, 1] // Custom quint ease for luxury feel
          }}
          className={`relative min-h-screen ${!isAdminPage ? 'pt-0' : ''}`}
        >
          {children}
        </motion.main>
      </AnimatePresence>

      {/* Optional: Add a global localized footer here if needed outside the animation loop */}
    </>
  );
}