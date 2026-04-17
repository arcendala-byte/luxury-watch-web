"use client"
import Footer from '@/components/Footer';

export default function WarrantyPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      
      <main className="pt-40 pb-20 px-6">
        <div className="max-w-4xl mx-auto space-y-20">
          
          <header className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-extralight tracking-tighter uppercase leading-[0.9]">
              The Chronos <br />
              <span className="text-[#D4AF37] italic font-serif">Commitment</span>
            </h1>
            <div className="h-px w-24 bg-[#D4AF37]/50" />
            <p className="text-white/40 text-xs uppercase tracking-[0.4em] leading-relaxed max-w-xl">
              Precision is guaranteed. Legacy is protected. Our responsibility to your timepiece 
              extends far beyond the point of acquisition.
            </p>
          </header>

          <section className="grid gap-16 border-t border-white/5 pt-12">
            <div className="space-y-6">
              <h2 className="text-[#D4AF37] text-[10px] uppercase tracking-[0.6em] font-medium">Standard International Warranty</h2>
              <p className="text-white/60 font-light leading-relaxed">
                Every Chronos timepiece is accompanied by a five-year International Warranty, covering 
                manufacturing defects and mechanical irregularities. This certificate of authenticity 
                ensures that your piece has been assembled by master watchmakers and tested for 
                uncompromising accuracy.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
               <div className="p-10 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors duration-700 space-y-4">
                  <h3 className="text-[10px] uppercase tracking-widest text-white">Movement Integrity</h3>
                  <p className="text-[11px] text-white/40 leading-relaxed font-light">
                    Full coverage of the internal calibre and power reserve mechanisms under 
                    documented normal usage conditions.
                  </p>
               </div>
               <div className="p-10 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors duration-700 space-y-4">
                  <h3 className="text-[10px] uppercase tracking-widest text-white">Water Resistance</h3>
                  <p className="text-[11px] text-white/40 leading-relaxed font-light">
                    Guarantee of structural integrity and seal pressure up to the specified 
                    depth for each distinct series.
                  </p>
               </div>
            </div>

            <div className="space-y-6 pt-12">
              <h2 className="text-[#D4AF37] text-[10px] uppercase tracking-[0.6em] font-medium">Servicing & Maintenance</h2>
              <p className="text-white/60 font-light leading-relaxed">
                To maintain the mechanical longevity of your movement, we recommend a complete 
                service every five years. Our master watchmakers will disassemble, clean, oil, 
                and re-regulate the movement to Swiss observatory standards.
              </p>
              <div className="p-8 border border-[#D4AF37]/20 rounded-2xl inline-block">
                 <p className="text-[10px] uppercase tracking-widest text-[#D4AF37]">The Lifetime Registry</p>
                 <p className="text-white/30 text-[9px] mt-2 italic">Register your serial number to access private maintenance history and valuation logs.</p>
              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
