"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X, Search as SearchIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Auto-focus and scroll lock
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim()) {
      router.push(`/collection?q=${encodeURIComponent(searchTerm.trim())}`);
      onClose();
      setQuery(''); // Reset query on success
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(query);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[500] bg-black/95 backdrop-blur-3xl flex flex-col items-center justify-center px-6"
        >
          {/* Close Button */}
          <motion.button 
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ delay: 0.2 }}
            onClick={onClose}
            className="absolute top-8 right-8 md:top-12 md:right-12 text-white/40 hover:text-[#D4AF37] transition-all duration-500 outline-none"
            aria-label="Close search"
          >
            <X size={32} strokeWidth={1} />
          </motion.button>

          <div className="w-full max-w-4xl">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-[#D4AF37] tracking-[0.6em] uppercase text-[9px] md:text-[11px] mb-6 md:mb-10 font-medium text-center">
                Search the Collection
              </h2>
              
              <div className="relative group border-b border-white/10 focus-within:border-[#D4AF37] transition-colors duration-700">
                <input 
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Reference, Series, or Material..."
                  className="w-full bg-transparent border-none outline-none py-6 md:py-10 text-2xl md:text-5xl font-extralight text-white placeholder:text-white/5 uppercase tracking-tighter"
                />
                <button 
                  onClick={() => handleSearch(query)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#D4AF37] transition-all duration-500 hover:scale-110"
                >
                  <SearchIcon size={28} strokeWidth={1} />
                </button>
              </div>
            </motion.div>

            {/* Quick Suggestions / Trending */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-12 md:mt-16"
            >
              <p className="text-[9px] tracking-[0.3em] uppercase text-white/20 mb-6 text-center md:text-left">
                Refined Curations
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4">
                {['Apex', 'Tourbillon', 'Heritage', 'Stellar', 'Chronograph'].map((tag) => (
                  <button 
                    key={tag}
                    onClick={() => handleSearch(tag)}
                    className="text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-white/40 hover:text-white border border-white/5 hover:border-[#D4AF37]/50 px-5 md:px-8 py-3 transition-all duration-500 bg-white/[0.02]"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom Branding Detail */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="absolute bottom-12 text-[8px] tracking-[0.8em] uppercase text-white/10"
          >
            Chronos Atelier • Precision Excellence
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}