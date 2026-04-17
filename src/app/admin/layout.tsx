"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X, LogOut, LayoutDashboard, Package, ShoppingCart, Users } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const pathname = usePathname();
  const router = useRouter();



  const menuItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Products', href: '/admin/products', icon: Package },
    { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
    { label: 'Users', href: '/admin/users', icon: Users },
  ];

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {
      // ignore
    }
    router.push('/admin/login');
    router.refresh();
  };



  // if login page, just show children without sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-[#050505] text-white relative">
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden fixed top-6 right-6 z-[110]">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-3 bg-[#D4AF37] text-black rounded-full shadow-2xl"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          x: isSidebarOpen ? 0 : -256,
          width: isSidebarOpen ? 256 : (typeof window !== 'undefined' && window.innerWidth < 768 ? 0 : 96)
        }}
        className={`fixed md:relative h-full bg-black/40 backdrop-blur-2xl border-r border-white/5 transition-all duration-700 flex flex-col z-[100] ${
          isSidebarOpen ? 'w-64' : 'w-0 md:w-24'
        } overflow-hidden`}
      >
        {/* Brand */}
        <div className="p-8 pb-12 flex items-center justify-center">
          <Link href="/admin" className="text-2xl font-light tracking-[0.5em] uppercase text-white group">
            <span className="text-[#D4AF37] group-hover:text-white transition-colors duration-500">C</span>
            {isSidebarOpen && <span className="text-[10px] tracking-[0.8em] ml-2 opacity-40">Admin</span>}
          </Link>
        </div>

        {/* User Info (Premium Touch) */}
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="px-8 mb-12"
          >
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#8b7355] p-[1px]">
                 <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-[10px] font-bold">JD</div>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37]">Concierge</span>
                <span className="text-xs text-white/40">admin@chronos.ch</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Menu Items */}
        <nav className="flex-1 px-4 space-y-3">
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
                onClick={() => {
                   if (typeof window !== 'undefined' && window.innerWidth < 768) {
                     setIsSidebarOpen(false);
                   }
                }}
              >
                <Icon size={18} className={`flex-shrink-0 ${isActive ? 'text-[#D4AF37]' : 'group-hover:text-[#D4AF37] transition-colors duration-500'}`} />
                {isSidebarOpen && <span className="text-[10px] uppercase tracking-[0.3em] font-medium">{item.label}</span>}
                
                {isActive && (
                  <motion.div 
                    layoutId="activeNav"
                    className="absolute left-0 w-1 h-1/2 bg-[#D4AF37] rounded-full" 
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 space-y-4 pt-8 border-t border-white/5">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden md:flex w-full items-center justify-center p-4 rounded-xl text-white/20 hover:text-[#D4AF37] hover:bg-white/[0.03] transition-all duration-500 group"
          >
            {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
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

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-[#050505] p-6 md:p-12">
        <motion.div
           key={pathname}
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
