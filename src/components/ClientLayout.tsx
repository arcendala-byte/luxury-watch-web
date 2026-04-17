"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import CustomCursor from '@/components/CustomCursor';
import CartDrawer from '@/components/CartDrawer';
import Navbar from '@/components/Navbar';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');

  return (
    <>
      <CustomCursor />
      <CartDrawer />
      {!isAdminPage && <Navbar />}
      
      <AnimatePresence mode="wait">
        <motion.main
          className="relative"
          key={pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </>
  );
}
