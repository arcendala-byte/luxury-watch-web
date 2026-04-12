"use client"
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  watchName: string;
}

export default function InquiryModal({ isOpen, onClose, watchName }: InquiryModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState(''); // ✅ State for email
  const [method, setMethod] = useState('Email'); // ✅ State for contact method

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: userName,
          email: email,      // ✅ Now sending email
          watchName: watchName,
          method: method     // ✅ Now sending method
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        console.error("API Response Error");
        alert("Our concierge service is currently busy. Please try again shortly.");
      }
    } catch (err) {
      console.error("Submission failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Resets the modal state after it fully closes
  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setIsSubmitted(false);
      setIsLoading(false);
      setUserName('');
      setEmail('');
      setMethod('Email');
    }, 500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with Blur */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
          />

          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 m-auto w-full max-w-lg h-fit bg-stone-900 border border-white/10 p-10 z-[101] shadow-2xl"
          >
            {/* Close Button */}
            <button 
              onClick={handleClose} 
              className="absolute top-6 right-6 text-white/40 hover:text-[#D4AF37] transition-colors"
            >
              <X size={20} />
            </button>

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="text-center mb-8">
                    <h2 className="text-[#D4AF37] text-[10px] tracking-[0.5em] uppercase mb-4">Private Inquiry</h2>
                    <h3 className="text-3xl font-extralight tracking-tight text-white mb-2">{watchName}</h3>
                    <p className="text-white/40 text-xs font-light">Enter your details for a consultation with our specialist.</p>
                  </div>

                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-white/30 mb-2 block font-medium">Full Name</label>
                      <input 
                        required
                        type="text" 
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full bg-transparent border-b border-white/10 py-2 text-white focus:border-[#D4AF37] outline-none transition-colors font-light" 
                        placeholder="Johnathan Doe" 
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-white/30 mb-2 block font-medium">Email Address</label>
                      <input 
                        required
                        type="email" 
                        value={email} // ✅ Linked to state
                        onChange={(e) => setEmail(e.target.value)} // ✅ Updates state
                        className="w-full bg-transparent border-b border-white/10 py-2 text-white focus:border-[#D4AF37] outline-none transition-colors font-light" 
                        placeholder="email@luxury.com" 
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-widest text-white/30 mb-2 block font-medium">Preferred Contact Method</label>
                      <select 
                        value={method} // ✅ Linked to state
                        onChange={(e) => setMethod(e.target.value)} // ✅ Updates state
                        className="w-full bg-transparent border-b border-white/10 py-2 text-white/50 focus:text-white outline-none transition-colors font-light cursor-pointer"
                      >
                        <option className="bg-stone-900" value="Email">Email</option>
                        <option className="bg-stone-900" value="Phone Call">Phone Call</option>
                        <option className="bg-stone-900" value="WhatsApp">WhatsApp</option>
                      </select>
                    </div>

                    <button 
                      disabled={isLoading}
                      type="submit" 
                      className="w-full py-4 bg-[#D4AF37] text-black text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-white transition-all duration-500 mt-4 flex items-center justify-center min-h-[56px]"
                    >
                      {isLoading ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : (
                        "Send Request"
                      )}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="w-16 h-16 border border-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <Check className="text-[#D4AF37]" size={32} />
                  </motion.div>
                  
                  <h3 className="text-2xl font-light text-white mb-2">
                    Thank You, {userName.split(' ')[0]}
                  </h3>
                  <p className="text-white/40 text-sm font-light mb-8 max-w-xs mx-auto">
                    Your inquiry for the <span className="text-white italic">{watchName}</span> has been received. Our specialist will contact you shortly via {method}.
                  </p>
                  
                  <button 
                    onClick={handleClose}
                    className="text-[#D4AF37] text-[10px] uppercase tracking-[0.3em] hover:text-white transition-colors"
                  >
                    Return to Piece
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}