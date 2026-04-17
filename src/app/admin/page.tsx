"use client"

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation'; // 1. Import useRouter
import { TrendingUp, Package, ShoppingCart, Users, ArrowUpRight } from 'lucide-react';

interface Stats {
  totalProducts: number;
  totalOrders: number;
  totalUsers: number;
  totalRevenue: number;
}

export default function AdminDashboard() {
  const router = useRouter(); // 2. Initialize the router
  
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/admin/stats');
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { label: 'Inventory', value: stats.totalProducts, icon: Package, detail: 'Items in vault' },
    { label: 'Acquisitions', value: stats.totalOrders, icon: ShoppingCart, detail: 'Completed sales' },
    { label: 'Clientele', value: stats.totalUsers, icon: Users, detail: 'Registered members' },
    { label: 'Treasury', value: `€${(stats.totalRevenue || 0).toLocaleString()}`, icon: TrendingUp, detail: 'Gross volume' },
  ];

  return (
    <div className="space-y-8 md:space-y-12 pb-20">
      {/* Header Section */}
      <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-4xl font-extralight tracking-[0.2em] md:tracking-[0.3em] uppercase text-white">
            Maison <span className="text-[#D4AF37]">Insights</span>
          </h1>
          <p className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-white/30">Intelligence & Performance Overview</p>
        </div>
        <div className="bg-white/[0.03] border border-white/5 px-4 md:px-6 py-2 md:py-3 rounded-full flex items-center gap-3 md:gap-4">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
          <span className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] text-white/60">Live Engine Active</span>
        </div>
      </section>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="group relative bg-white/[0.02] border border-white/5 rounded-2xl p-6 md:p-8 hover:bg-white/[0.04] transition-all duration-700 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/5 blur-3xl -mr-12 -mt-12 group-hover:bg-[#D4AF37]/10 transition-colors duration-700" />
              
              <div className="relative z-10 flex flex-col gap-4 md:gap-6">
                <div className="flex justify-between items-center">
                  <div className="p-2 md:p-3 bg-white/[0.03] rounded-xl group-hover:bg-[#D4AF37]/10 transition-colors duration-700 text-[#D4AF37]">
                    <Icon size={18} />
                  </div>
                  <ArrowUpRight size={14} className="text-white/10 group-hover:text-[#D4AF37] transition-colors" />
                </div>
                
                <div className="space-y-1">
                  <p className="text-2xl md:text-3xl font-light text-white tracking-tighter tabular-nums">
                    {loading ? (
                      <span className="inline-block w-16 h-8 bg-white/5 rounded animate-pulse" />
                    ) : (
                      card.value
                    )}
                  </p>
                  <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-medium">{card.label}</p>
                </div>
                <p className="text-[8px] md:text-[9px] text-white/30 tracking-widest">{card.detail}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
        {/* Global Activity Feed */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="lg:col-span-2 bg-black/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 md:p-10"
        >
          <div className="flex justify-between items-center mb-8 md:mb-10">
            <h2 className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-white/60 font-semibold">Global Activity</h2>
            <button className="text-[8px] md:text-[9px] uppercase tracking-widest text-[#D4AF37] hover:text-white transition-all underline underline-offset-8 decoration-white/10 hover:decoration-[#D4AF37]">View Archive</button>
          </div>
          
          <div className="space-y-6 md:space-y-8">
             {[
               { user: "Alexander R.", action: "Acquired Alpine Heritage", time: "2h ago", status: "Success" },
               { user: "Marie L.", action: "Inquiry: Lunar Phase X", time: "5h ago", status: "Pending" },
               { user: "Elias C.", action: "Registered: Platinum Circle", time: "8h ago", status: "New" },
               { user: "Sofia T.", action: "Reserved: Tech Series", time: "1d ago", status: "Pre-order" }
             ].map((activity, i) => (
               <div key={i} className="flex items-center justify-between group">
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/[0.03] flex items-center justify-center text-[10px] text-[#D4AF37] border border-white/5 group-hover:border-[#D4AF37]/50 transition-all">
                      {activity.user[0]}
                    </div>
                    <div className="space-y-1 truncate max-w-[120px] sm:max-w-none">
                      <p className="text-[11px] md:text-xs text-white uppercase tracking-wider truncate">{activity.user}</p>
                      <p className="text-[9px] md:text-[10px] text-white/30 uppercase tracking-widest truncate">{activity.action}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-[8px] md:text-[9px] text-white/20 uppercase tracking-widest mb-1">{activity.time}</p>
                    <span className={`text-[7px] md:text-[8px] px-2 py-0.5 rounded-full uppercase tracking-tighter font-bold border ${
                      activity.status === 'Success' ? 'border-green-500/20 bg-green-500/5 text-green-500' :
                      activity.status === 'Pending' ? 'border-yellow-500/20 bg-yellow-500/5 text-yellow-500' :
                      'border-blue-500/20 bg-blue-500/5 text-blue-500'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
               </div>
             ))}
          </div>
        </motion.div>

        {/* Quick Management Commands */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="bg-[#D4AF37]/5 border border-[#D4AF37]/10 rounded-3xl p-6 md:p-10 flex flex-col justify-between"
        >
          <div className="space-y-4">
            <h2 className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#D4AF37]">Atelier Protocols</h2>
            <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-[#D4AF37]/40 leading-relaxed italic">Unauthorized access to these commands is logged and encrypted.</p>
          </div>
          
          <div className="flex flex-col gap-3 md:gap-4 mt-8 md:mt-0">
            <button
              onClick={() => router.push('/admin/products/new')}
              className="group relative bg-white text-black text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-bold py-4 md:py-5 overflow-hidden transition-all active:scale-95"
            >
              <span className="relative z-10">Curate New Piece</span>
              <div className="absolute inset-0 bg-[#D4AF37] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
            <button
              onClick={() => router.push('/admin/orders')}
              className="border border-white/10 text-white text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-bold py-4 md:py-5 hover:bg-white/5 transition-all"
            >
              Sales Ledger
            </button>
            <button
              onClick={() => router.push('/admin/products')}
              className="border border-white/10 text-white text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-bold py-4 md:py-5 hover:bg-white/5 transition-all"
            >
              Vault Catalog
            </button>
          </div>

          <div className="pt-8 text-center hidden lg:block">
             <p className="text-[8px] text-[#D4AF37]/20 uppercase tracking-[0.5em]">Secured by Chronos Core</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}