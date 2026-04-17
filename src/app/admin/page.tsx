"use client"

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Package, ShoppingCart, Users } from 'lucide-react';

interface Stats {
  totalProducts: number;
  totalOrders: number;
  totalUsers: number;
  totalRevenue: number;
}

export default function AdminDashboard() {
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
    { label: 'Inventory', value: stats.totalProducts, icon: Package, color: '#D4AF37', detail: 'Items in vault' },
    { label: 'Acquisitions', value: stats.totalOrders, icon: ShoppingCart, color: '#D4AF37', detail: 'Completed sales' },
    { label: 'Clientele', value: stats.totalUsers, icon: Users, color: '#D4AF37', detail: 'Registered members' },
    { label: 'Treasury', value: `€${stats.totalRevenue.toLocaleString()}`, icon: TrendingUp, color: '#D4AF37', detail: 'Gross volume' },
  ];

  return (
    <div className="space-y-12 pb-20">
      {/* Header Section */}
      <section className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-extralight tracking-[0.3em] uppercase text-white">
            Maison <span className="text-[#D4AF37]">Insights</span>
          </h1>
          <p className="text-[10px] uppercase tracking-[0.5em] text-white/30">Intelligence & Performance Overview</p>
        </div>
        <div className="bg-white/[0.03] border border-white/5 px-6 py-3 rounded-full flex items-center gap-4">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[9px] uppercase tracking-[0.3em] text-white/60">System Operational</span>
        </div>
      </section>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative bg-white/[0.02] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.04] transition-all duration-700 overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 blur-3xl -mr-16 -mt-16 group-hover:bg-[#D4AF37]/10 transition-colors duration-700" />
              
              <div className="relative z-10 flex flex-col gap-6">
                <div className="flex justify-between items-center">
                  <div className="p-3 bg-white/[0.03] rounded-xl group-hover:bg-[#D4AF37]/10 transition-colors duration-700">
                    <Icon size={20} className="text-[#D4AF37]" />
                  </div>
                  <span className="text-[8px] uppercase tracking-[0.4em] text-white/20">Real-time</span>
                </div>
                
                <div className="space-y-1">
                  <p className="text-3xl font-light text-white tracking-tighter tabular-nums">
                    {loading ? (
                      <span className="inline-block w-12 h-8 bg-white/5 rounded animate-pulse" />
                    ) : (
                      card.value
                    )}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-medium">{card.label}</p>
                </div>

                <p className="text-[9px] text-white/30 tracking-widest">{card.detail}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Recent Inquiries / Activity Feed */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="lg:col-span-2 bg-black/40 backdrop-blur-xl border border-white/5 rounded-3xl p-10 flex flex-col"
        >
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-sm uppercase tracking-[0.4em] text-white/60">Global Activity</h2>
            <button className="text-[9px] uppercase tracking-widest text-[#D4AF37] hover:text-white transition-colors duration-500">View All Archive</button>
          </div>
          
          <div className="space-y-8 flex-1">
             {[
               { user: "Alexander R.", action: "Acquired Alpine Heritage", time: "2 hours ago", status: "Success" },
               { user: "Marie L.", action: "Inquiry: Lunar Phase X", time: "5 hours ago", status: "Pending" },
               { user: "Elias C.", action: "Registered: Platinum Circle", time: "8 hours ago", status: "New" },
               { user: "Sofia T.", action: "Reserved: Tech Series Case", time: "1 day ago", status: "Pre-order" }
             ].map((activity, i) => (
               <div key={i} className="flex items-center justify-between group">
                  <div className="flex items-center gap-6">
                    <div className="w-10 h-10 rounded-full bg-white/[0.03] flex items-center justify-center text-[10px] text-[#D4AF37] border border-white/5 group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-500">
                      {activity.user[0]}
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-white uppercase tracking-wider">{activity.user}</p>
                      <p className="text-[10px] text-white/30 uppercase tracking-widest">{activity.action}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] text-white/20 uppercase tracking-widest mb-1">{activity.time}</p>
                    <span className={`text-[8px] px-2 py-0.5 rounded-full uppercase tracking-tighter font-bold ${
                      activity.status === 'Success' ? 'bg-green-500/10 text-green-500' :
                      activity.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500' :
                      'bg-blue-500/10 text-blue-500'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
               </div>
             ))}
          </div>
        </motion.div>

        {/* Quick Commands */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="bg-[#D4AF37]/5 border border-[#D4AF37]/10 rounded-3xl p-10 space-y-10"
        >
          <div className="space-y-2">
            <h2 className="text-sm uppercase tracking-[0.4em] text-[#D4AF37]">Management</h2>
            <p className="text-[9px] uppercase tracking-widest text-[#D4AF37]/40 leading-relaxed italic">Direct system overrides and inventory control protocols.</p>
          </div>
          
          <div className="flex flex-col gap-4">
            <a
              href="/admin/products/new"
              className="bg-white text-black text-[9px] uppercase tracking-[0.5em] font-bold py-5 text-center transition-all duration-500 hover:tracking-[0.8em]"
            >
              Curate New Piece
            </a>
            <a
              href="/admin/orders"
              className="border border-white/10 text-white text-[9px] uppercase tracking-[0.5em] font-bold py-5 text-center transition-all duration-500 hover:bg-white/5"
            >
              Sales Log
            </a>
            <a
              href="/admin/products"
              className="border border-white/10 text-white text-[9px] uppercase tracking-[0.5em] font-bold py-5 text-center transition-all duration-500 hover:bg-white/5"
            >
              Vault Catalog
            </a>
          </div>

          <div className="pt-8 border-t border-white/5 text-center">
             <p className="text-[8px] text-white/20 uppercase tracking-[0.3em]">Authorized Access Only</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
