"use client"
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

  // Auto-focus the input when the overlay opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim()) {
      router.push(`/collection?q=${encodeURIComponent(searchTerm.trim())}`);
      onClose();
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(query);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] bg-black/90 backdrop-blur-2xl flex flex-col items-center justify-center px-6"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-10 right-10 text-white/40 hover:text-[#D4AF37] transition-colors"
          >
            <X size={32} strokeWidth={1} />
          </button>

          <div className="w-full max-w-3xl text-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-[#D4AF37] tracking-[0.5em] uppercase text-[10px] mb-8">
                Search the Collection
              </h2>
              
              <div className="relative group border-b border-white/10 focus-within:border-[#D4AF37] transition-colors duration-500">
                <input 
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Reference, Series, or Material..."
                  className="w-full bg-transparent border-none outline-none py-6 text-2xl md:text-4xl font-extralight text-white placeholder:text-white/10 uppercase tracking-tighter"
                />
                <button 
                  onClick={() => handleSearch(query)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#D4AF37] transition-colors hover:scale-110"
                >
                  <SearchIcon size={24} strokeWidth={1} />
                </button>
              </div>
            </motion.div>

            {/* Quick Suggestions */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-12 flex flex-wrap justify-center gap-6"
            >
              {['Apex', 'Tourbillon', 'Heritage', 'Diver'].map((tag) => (
                <button 
                  key={tag}
                  onClick={() => handleSearch(tag)}
                  className="text-[10px] tracking-[0.2em] uppercase text-white/30 hover:text-white border border-white/5 hover:border-white/20 px-4 py-2 transition-all"
                >
                  {tag}
                </button>
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}