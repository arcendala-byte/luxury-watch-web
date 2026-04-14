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
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -256 }}
        animate={{ x: 0 }}
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-[#0a0a0a] border-r border-white/10 transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <Link href="/admin" className="text-xl font-light tracking-[0.3em] uppercase text-[#D4AF37]">
            {isSidebarOpen ? 'Admin' : 'A'}
          </Link>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-4 px-4 py-3 rounded-lg text-white/60 hover:text-[#D4AF37] hover:bg-white/5 transition-all duration-300 group"
              >
                <Icon size={20} className="flex-shrink-0" />
                {isSidebarOpen && <span className="text-sm">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Toggle & Logout */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center justify-center gap-4 px-4 py-3 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all duration-300"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-4 px-4 py-3 rounded-lg text-white/60 hover:text-[#D4AF37] hover:bg-white/5 transition-all duration-300"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="text-sm">Exit</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-black">
        {children}
      </main>
    </div>
  );
}
