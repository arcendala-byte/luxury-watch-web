"use client"
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  watchName: string;
  price: string;
}

export default function WhatsAppButton({ watchName, price }: WhatsAppButtonProps) {
  // Replace with your actual phone number (include country code, no + or spaces)
  const phoneNumber = "1234567890"; 
  
  const message = `Hello, I am interested in the ${watchName} priced at ${price}. Could I speak with a specialist regarding its availability?`;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-8 right-8 z-50"
    >
      <a 
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full shadow-2xl hover:bg-[#D4AF37] hover:text-white transition-all duration-500 group"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-medium hidden md:block">
          Speak with a Specialist
        </span>
        <div className="relative">
          <MessageCircle size={20} />
          {/* Subtle notification dot */}
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse group-hover:bg-white" />
        </div>
      </a>
    </motion.div>
  );
}