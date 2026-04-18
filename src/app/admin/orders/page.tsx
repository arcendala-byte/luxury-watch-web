"use client"

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  TrendingUp
} from 'lucide-react';

interface Order {
  id: string;
  customerName: string;
  email: string;
  total: number;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  createdAt: string;
  itemCount: number;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/admin/orders');
        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        }
      } catch (error) {
        console.error('Failed to retrieve transactions:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusStyle = (status: Order['status']) => {
    switch (status) {
      case 'DELIVERED': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'SHIPPED': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'PROCESSING': return 'text-[#D4AF37] bg-[#D4AF37]/10 border-[#D4AF37]/20';
      case 'CANCELLED': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-white/40 bg-white/5 border-white/10';
    }
  };

  const filteredOrders = orders.filter(o => 
    o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    o.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-10 pb-20">
      {/* Header & Stats */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-extralight tracking-[0.3em] uppercase text-white">
            Client <span className="text-[#D4AF37]">Orders</span>
          </h1>
          <p className="text-[9px] uppercase tracking-[0.4em] text-white/30 italic">Transaction Manifest & Fulfillment</p>
        </div>

        <div className="flex gap-4">
          <div className="bg-white/[0.03] border border-white/5 px-6 py-3 rounded-2xl flex items-center gap-4">
            <TrendingUp size={16} className="text-[#D4AF37]" />
            <div>
              <p className="text-[8px] uppercase tracking-widest text-white/20">Monthly Volume</p>
              <p className="text-sm font-medium text-white tabular-nums">€142,800</p>
            </div>
          </div>
        </div>
      </section>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
          <input 
            type="text"
            placeholder="SEARCH BY CLIENT OR ORDER ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-[10px] text-white tracking-[0.2em] focus:border-[#D4AF37]/50 focus:outline-none transition-all placeholder:text-white/10"
          />
        </div>
        <button className="flex items-center gap-3 px-6 py-4 bg-white/[0.03] border border-white/10 rounded-xl text-[9px] uppercase tracking-widest text-white/40 hover:text-white hover:border-white/20 transition-all">
          <Filter size={14} />
          Filter Manifest
        </button>
      </div>

      {/* Orders Table */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-8 py-6 text-[9px] uppercase tracking-[0.3em] text-white/40 font-medium">Order ID</th>
                <th className="px-8 py-6 text-[9px] uppercase tracking-[0.3em] text-white/40 font-medium">Client</th>
                <th className="px-8 py-6 text-[9px] uppercase tracking-[0.3em] text-white/40 font-medium">Status</th>
                <th className="px-8 py-6 text-[9px] uppercase tracking-[0.3em] text-white/40 font-medium">Amount</th>
                <th className="px-8 py-6 text-[9px] uppercase tracking-[0.3em] text-white/40 font-medium">Date</th>
                <th className="px-8 py-6 text-[9px] uppercase tracking-[0.3em] text-white/40 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence mode="popLayout">
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={6} className="px-8 py-8 h-20 bg-white/[0.01]" />
                    </tr>
                  ))
                ) : filteredOrders.map((order) => (
                  <motion.tr 
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={order.id} 
                    className="group hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-8 py-6">
                      <span className="text-[10px] text-white/60 font-mono tracking-wider">#{order.id.slice(-8).toUpperCase()}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-[11px] text-white uppercase tracking-wider">{order.customerName}</span>
                        <span className="text-[9px] text-white/20 tracking-tight lowercase">{order.email}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[8px] font-bold uppercase tracking-widest ${getStatusStyle(order.status)}`}>
                        <div className="w-1 h-1 rounded-full bg-current" />
                        {order.status}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-[11px] text-white tabular-nums">€{order.total.toLocaleString()}</td>
                    <td className="px-8 py-6 text-[10px] text-white/40 tracking-wider">
                      {new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-[#D4AF37] transition-all">
                          <Eye size={14} />
                        </button>
                        <button className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-all">
                          <CheckCircle2 size={14} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          
          {!loading && filteredOrders.length === 0 && (
            <div className="py-20 text-center">
              <ShoppingBag className="mx-auto text-white/5 mb-4" size={40} />
              <p className="text-[10px] uppercase tracking-[0.4em] text-white/20">No matching orders found in the registry</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}