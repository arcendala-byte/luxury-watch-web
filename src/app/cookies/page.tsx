"use client"
import Footer from '@/components/Footer';

export default function CookiesPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      
      <main className="pt-40 pb-20 px-6">
        <div className="max-w-4xl mx-auto space-y-16">
          
          <header className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-extralight tracking-tighter uppercase">
              Cookie <br />
              <span className="text-[#D4AF37] italic font-serif">Preferences</span>
            </h1>
            <p className="text-white/40 text-[10px] uppercase tracking-[0.4em]">Last Updated: April 2026</p>
          </header>

          <section className="space-y-12 text-sm text-white/60 font-light leading-relaxed">
            <div className="space-y-4">
              <h2 className="text-white uppercase tracking-widest text-xs">A Tailored Digital Experience</h2>
              <p>
                To provide the refined digital service expected from Chronos, we use cookies and similar technologies. 
                These small files help us understand how you navigate our Maison's digital presence, 
                allowing us to tailor content to your specific horological interests.
              </p>
            </div>

            <div className="space-y-6">
               <h3 className="text-white uppercase tracking-widest text-[10px]">Classification of Cookies</h3>
               
               <div className="grid gap-6">
                  <div className="p-8 border border-white/5 bg-white/[0.01]">
                     <h4 className="text-[#D4AF37] text-[10px] uppercase tracking-widest mb-2 font-medium">Essential</h4>
                     <p className="text-[11px] leading-relaxed">Required for secure authentication, bag management, and checkout operations. These cannot be disabled.</p>
                  </div>
                  
                  <div className="p-8 border border-white/5 bg-white/[0.01]">
                     <h4 className="text-[#D4AF37] text-[10px] uppercase tracking-widest mb-2 font-medium">Analytical</h4>
                     <p className="text-[11px] leading-relaxed">Enables us to track traffic and popular collections, helping us optimize the performance of our platform.</p>
                  </div>
                  
                  <div className="p-8 border border-white/5 bg-white/[0.01]">
                     <h4 className="text-[#D4AF37] text-[10px] uppercase tracking-widest mb-2 font-medium">Personalization</h4>
                     <p className="text-[11px] leading-relaxed">Remembers your regional preferences and stylistic choices to provide a bespoke browsing experience.</p>
                  </div>
               </div>
            </div>

            <p className="pt-8 border-t border-white/5">
              You may adjust your browser settings at any time to refuse cookies, though certain aspects of our 
              private boutique access and checkout may be impacted.
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
