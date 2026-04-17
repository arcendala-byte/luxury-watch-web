"use client"
import Footer from '@/components/Footer';

export default function ShippingPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      
      <main className="pt-40 pb-20 px-6">
        <div className="max-w-4xl mx-auto space-y-20">
          
          <header className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-extralight tracking-tighter uppercase italic">
              Dispatch <br />
              <span className="text-[#D4AF37]">& Logistics</span>
            </h1>
            <div className="h-px w-24 bg-[#D4AF37]/50" />
            <p className="text-white/40 text-xs uppercase tracking-[0.4em] leading-relaxed max-w-xl">
              We ensure every timepiece reaches its destination with the same care and precision 
              with which it was assembled.
            </p>
          </header>

          <section className="grid gap-12 border-t border-white/5 pt-12">
            <div className="space-y-4">
              <h2 className="text-[#D4AF37] text-[10px] uppercase tracking-[0.6em] font-medium">The Courier Experience</h2>
              <p className="text-white/60 font-light leading-relaxed">
                Chronos utilizes highly secure, specialized couriers to deliver our timepieces worldwide. 
                Each shipment is fully insured and requires a direct signature from the recipient 
                holding a valid government-issued ID.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
               <div className="p-10 bg-white/[0.02] border border-white/5 rounded-3xl space-y-6">
                 <h3 className="text-xs uppercase tracking-widest text-white">Delivery Timelines</h3>
                 <ul className="space-y-4 text-[11px] text-white/40 uppercase tracking-widest leading-loose">
                   <li><span className="text-white">Switzerland:</span> Next Business Day</li>
                   <li><span className="text-white">Europe:</span> 2-3 Business Days</li>
                   <li><span className="text-white">International:</span> 5-7 Business Days</li>
                 </ul>
               </div>
               
               <div className="p-10 bg-white/[0.02] border border-white/5 rounded-3xl space-y-6">
                 <h3 className="text-xs uppercase tracking-widest text-white">Security Protocol</h3>
                 <ul className="space-y-4 text-[11px] text-white/40 uppercase tracking-widest leading-loose">
                   <li>Tamper-evident vacuum sealing</li>
                   <li>GPS-tracked discrete packaging</li>
                   <li>Confidential high-value handling</li>
                 </ul>
               </div>
            </div>

            <div className="space-y-4 pt-12">
              <h2 className="text-[#D4AF37] text-[10px] uppercase tracking-[0.6em] font-medium">Returns & Exchanges</h2>
              <p className="text-white/60 font-light leading-relaxed">
                In the rare event that a timepiece does not meet your expectations, we offer a 14-day 
                complimentary return service. The watch must be in pristine, unworn condition with all 
                original seals and documentation intact.
              </p>
              <p className="text-white/60 font-light leading-relaxed">
                Contact our <span className="text-[#D4AF37] italic">Concierge Team</span> to arrange for a 
                secure pick-up at your convenience.
              </p>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
