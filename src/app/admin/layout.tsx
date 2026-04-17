"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut, LayoutDashboard, Package, ShoppingCart, Users, ChevronLeft, ChevronRight } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Products', href: '/admin/products', icon: Package },
    { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
    { label: 'Users', href: '/admin/users', icon: Users },
  ];

  // Handle responsive behavior on mount and resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) setIsSidebarOpen(false);
      else setIsSidebarOpen(true);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) { /* ignore */ }
    router.push('/admin/login');
    router.refresh();
  };

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-[#050505] text-white overflow-hidden relative font-sans">
      
      {/* Mobile Backdrop Overlay */}
      <AnimatePresence>
        {isMobile && isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[90] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar Toggle (Floating Button) */}
      <div className="lg:hidden fixed bottom-6 right-6 z-[110]">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-4 bg-[#D4AF37] text-black rounded-full shadow-[0_0_30px_rgba(212,175,55,0.3)] active:scale-90 transition-transform"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <motion.aside
        initial={false}
        animate={{ 
          width: isSidebarOpen ? (isMobile ? 280 : 256) : (isMobile ? 0 : 96),
          x: isMobile && !isSidebarOpen ? -280 : 0
        }}
        className={`fixed lg:relative h-full bg-black/40 backdrop-blur-3xl border-r border-white/5 flex flex-col z-[100] transition-all duration-700 ease-[0.22, 1, 0.36, 1] overflow-hidden`}
      >
        {/* Brand/Logo */}
        <div className="p-8 pb-12 flex items-center justify-center min-w-[256px]">
          <Link href="/admin" className="text-2xl font-light tracking-[0.5em] uppercase text-white group flex items-center">
            <span className="text-[#D4AF37] group-hover:shadow-[0_0_15px_rgba(212,175,55,0.5)] transition-all">C</span>
            {isSidebarOpen && <span className="text-[10px] tracking-[0.8em] ml-2 opacity-40">Admin</span>}
          </Link>
        </div>

        {/* User Card */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="px-6 mb-12 min-w-[256px]"
            >
              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#8b7355] p-[1.5px]">
                   <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-[10px] font-bold">JD</div>
                </div>
                <div className="flex flex-col truncate">
                  <span className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-bold italic">Concierge</span>
                  <span className="text-[11px] text-white/40 truncate">admin@chronos.ch</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto min-w-[256px]">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-500 group ${
                  isActive 
                    ? 'text-[#D4AF37] bg-white/[0.05]' 
                    : 'text-white/40 hover:text-white hover:bg-white/[0.02]'
                }`}
                onClick={() => isMobile && setIsSidebarOpen(false)}
              >
                <Icon size={18} className={`flex-shrink-0 ${isActive ? 'text-[#D4AF37]' : 'group-hover:text-[#D4AF37] transition-colors duration-500'}`} />
                {isSidebarOpen && <span className="text-[10px] uppercase tracking-[0.3em] font-medium">{item.label}</span>}
                
                {isActive && (
                  <motion.div 
                    layoutId="activeNavIndicator"
                    className="absolute left-0 w-1 h-6 bg-[#D4AF37] rounded-full shadow-[0_0_10px_#D4AF37]" 
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 space-y-4 pt-8 border-t border-white/5 min-w-[256px]">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden lg:flex w-full items-center justify-center p-4 rounded-xl text-white/20 hover:text-[#D4AF37] hover:bg-white/[0.03] transition-all duration-500"
          >
            {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-4 p-4 rounded-xl text-white/20 hover:text-red-400 hover:bg-red-400/5 transition-all duration-500 group"
          >
            <LogOut size={18} />
            {isSidebarOpen && <span className="text-[10px] uppercase tracking-widest">Sign Out</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-[#050505] relative custom-scrollbar">
        {/* Subtle top gradient for depth */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#D4AF37]/5 to-transparent pointer-events-none" />
        
        <div className="p-6 md:p-12 lg:p-16 max-w-7xl mx-auto">
          <motion.div
             key={pathname}
             initial={{ opacity: 0, y: 15 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
}