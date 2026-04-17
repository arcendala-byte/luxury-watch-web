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

  useEffect(() => {
    // Force a scroll reset on route change
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    /* The 'relative' class here ensures Framer Motion's useScroll 
       can calculate offsets correctly, clearing the console warning.
    */
    <div className="relative min-h-screen w-full">
      <CustomCursor />
      <CartDrawer />
      
      {!isAdminPage && <Navbar />}
      
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
          transition={{ 
            duration: 0.6, 
            ease: [0.22, 1, 0.36, 1] 
          }}
          className="relative w-full"
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </div>
  );
}