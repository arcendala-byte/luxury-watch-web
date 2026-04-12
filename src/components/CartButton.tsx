"use client"
import { useCart } from '../lib/store';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartButton() {
  const { items, toggleCart } = useCart();
  
  // Calculate total quantity of all items
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <button 
      onClick={toggleCart}
      className="relative p-2 group outline-none"
      aria-label="Open Selection"
    >
      {/* The Icon (Minimalist Shopping Bag) */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="20" height="20" 
        viewBox="0 0 256 256" 
        fill="white"
        className="group-hover:fill-[#D4AF37] transition-colors duration-300"
      >
        <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,160H40V56H216V200ZM176,88a48,48,0,0,1-96,0,8,8,0,0,1,16,0,32,32,0,0,0,64,0,8,8,0,0,1,16,0Z"></path>
      </svg>

      {/* The Notification Badge */}
      <AnimatePresence>
        {itemCount > 0 && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute -top-1 -right-1 bg-[#D4AF37] text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-lg"
          >
            {itemCount}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}