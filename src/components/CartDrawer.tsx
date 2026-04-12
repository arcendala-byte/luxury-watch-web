"use client"
import { useCart } from '../lib/store';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function CartDrawer() {
  const { items, isOpen, toggleCart, removeItem, totalPrice } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full md:w-[450px] bg-[#0a0a0a] border-l border-white/10 z-[101] p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-white text-2xl font-light tracking-tighter">Your Selection</h2>
              <button onClick={toggleCart} className="text-white/40 hover:text-[#D4AF37] transition-colors">Close</button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-8 no-scrollbar">
              {items.length === 0 ? (
                <p className="text-white/20 italic font-serif py-20 text-center">The gallery is empty.</p>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-6 items-center group">
                    <div className="relative w-20 h-24 bg-[#111] overflow-hidden">
                      <Image src={`/apex-back.jpg/${item.image}`} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white text-sm font-light">{item.name}</h4>
                      <p className="text-[#D4AF37] text-xs mt-1">{item.price}</p>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-[10px] text-white/30 uppercase tracking-widest mt-2 hover:text-red-500 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-white/10 pt-8 mt-auto">
                <div className="flex justify-between items-end mb-8">
                  <span className="text-white/40 text-[10px] uppercase tracking-widest">Subtotal</span>
                  <span className="text-white text-2xl font-light tracking-tighter">${totalPrice().toLocaleString()}</span>
                </div>
                <button className="w-full bg-[#D4AF37] text-black py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white transition-colors">
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}