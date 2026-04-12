"use client"
import { motion } from 'framer-motion';

export default function Loader() {
  return (
    <motion.div 
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
    >
      <div className="relative flex items-center justify-center">
        {/* The Outer Rotating Gear Hint */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="w-32 h-32 border border-[#D4AF37]/20 rounded-full border-t-[#D4AF37]"
        />
        
        {/* The Inner Pulsing Logo */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute text-white tracking-[0.6em] uppercase text-[10px] font-light"
        >
          Chronos
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 overflow-hidden"
      >
        <div className="h-px w-24 bg-white/10 relative">
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-[#D4AF37]"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}