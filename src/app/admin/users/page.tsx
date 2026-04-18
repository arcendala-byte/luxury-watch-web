"use client"

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Search, 
  Shield, 
  UserPlus, 
  Mail, 
  Calendar, 
  MoreVertical, 
  UserCheck, 
  UserX,
  BadgeCheck
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'CLIENT' | 'CONCIERGE';
  status: 'ACTIVE' | 'SUSPENDED' | 'PENDING';
  joinedDate: string;
  totalOrders: number;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/admin/users');
        if (res.ok) {
          const data = await res.json();
          setUsers(data);
        }
      } catch (error) {
        console.error('Failed to sync user registry:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const getRoleStyle = (role: User['role']) => {
    switch (role) {
      case 'ADMIN': return 'text-[#D4AF37] border-[#D4AF37]/20 bg-[#D4AF37]/5';
      case 'CONCIERGE': return 'text-purple-400 border-purple-400/20 bg-purple-400/5';
      default: return 'text-white/40 border-white/10 bg-white/5';
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-extralight tracking-[0.3em] uppercase text-white">
            Member <span className="text-[#D4AF37]">Registry</span>
          </h1>
          <p className="text-[9px] uppercase tracking-[0.4em] text-white/30 italic">Access Control & Client Directory</p>
        </div>

        <button className="flex items-center gap-3 px-8 py-3 bg-white text-black rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-[#D4AF37] transition-all">
          <UserPlus size={14} />
          Invite Member
        </button>
      </section>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
          <input 
            type="text"
            placeholder="SEARCH BY NAME OR EMAIL..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-[10px] text-white tracking-[0.2em] focus:border-[#D4AF37]/50 focus:outline-none transition-all placeholder:text-white/10"
          />
        </div>
        
        <div className="flex gap-3">
            <div className="bg-black/40 border border-white/5 px-6 py-2 rounded-xl flex items-center gap-4">
                <Shield size={14} className="text-[#D4AF37]" />
                <span className="text-[9px] uppercase tracking-widest text-white/40">Secured Access</span>
            </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-8 py-6 text-[9px] uppercase tracking-[0.3em] text-white/40 font-medium">Member</th>
                <th className="px-8 py-6 text-[9px] uppercase tracking-[0.3em] text-white/40 font-medium">Clearance</th>
                <th className="px-8 py-6 text-[9px] uppercase tracking-[0.3em] text-white/40 font-medium">Status</th>
                <th className="px-8 py-6 text-[9px] uppercase tracking-[0.3em] text-white/40 font-medium">Portfolio</th>
                <th className="px-8 py-6 text-[9px] uppercase tracking-[0.3em] text-white/40 font-medium">Joined</th>
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
                ) : filteredUsers.map((user) => (
                  <motion.tr 
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={user.id} 
                    className="group hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/20">
                           <span className="text-[10px] font-bold">{user.name.charAt(0)}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[11px] text-white uppercase tracking-wider flex items-center gap-2">
                            {user.name}
                            {user.role === 'ADMIN' && <BadgeCheck size={12} className="text-[#D4AF37]" />}
                          </span>
                          <span className="text-[9px] text-white/20 tracking-tight lowercase">{user.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className={`inline-flex px-3 py-1 rounded-lg border text-[8px] font-bold uppercase tracking-widest ${getRoleStyle(user.role)}`}>
                        {user.role}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`text-[9px] uppercase tracking-widest ${user.status === 'ACTIVE' ? 'text-green-400' : 'text-red-400'}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-white/60">
                         <span className="text-[11px] tabular-nums">{user.totalOrders}</span>
                         <span className="text-[8px] uppercase tracking-widest text-white/20">Pieces</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-[10px] text-white/40 tracking-wider">
                      {new Date(user.joinedDate).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-all">
                          <UserCheck size={14} />
                        </button>
                        <button className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-red-400 transition-all">
                          <UserX size={14} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          
          {!loading && filteredUsers.length === 0 && (
            <div className="py-20 text-center">
              <Users className="mx-auto text-white/5 mb-4" size={40} />
              <p className="text-[10px] uppercase tracking-[0.4em] text-white/20">No members found in this clearance level</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}