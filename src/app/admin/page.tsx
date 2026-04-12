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
    { label: 'Total Products', value: stats.totalProducts, icon: Package, color: 'text-blue-400' },
    { label: 'Total Orders', value: stats.totalOrders, icon: ShoppingCart, color: 'text-green-400' },
    { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'text-purple-400' },
    { label: 'Revenue', value: `$${stats.totalRevenue.toFixed(2)}`, icon: TrendingUp, color: 'text-yellow-400' },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <h1 className="text-4xl font-light tracking-[0.2em] uppercase text-white mb-2">
          Admin Dashboard
        </h1>
        <p className="text-white/60">Welcome back! Here's your store overview.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#0a0a0a] border border-white/10 rounded-lg p-6 hover:border-[#D4AF37]/30 transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-white/60 text-sm mb-2">{card.label}</p>
                  <p className="text-3xl font-light text-white">
                    {loading ? '-' : card.value}
                  </p>
                </div>
                <Icon size={24} className={card.color + ' opacity-60'} />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-[#0a0a0a] border border-white/10 rounded-lg p-6"
      >
        <h2 className="text-xl font-light text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/admin/products/new"
            className="bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-white px-6 py-3 rounded-lg transition-all duration-300 text-center"
          >
            Add New Product
          </a>
          <a
            href="/admin/orders"
            className="bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-white px-6 py-3 rounded-lg transition-all duration-300 text-center"
          >
            View Orders
          </a>
          <a
            href="/admin/products"
            className="bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-white px-6 py-3 rounded-lg transition-all duration-300 text-center"
          >
            Manage Products
          </a>
        </div>
      </motion.div>
    </div>
  );
}
