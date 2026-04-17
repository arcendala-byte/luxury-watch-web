"use client"
import Footer from '@/components/Footer';

export default function AccessibilityPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      
      <main className="pt-40 pb-20 px-6">
        <div className="max-w-4xl mx-auto space-y-16">
          
          <header className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-extralight tracking-tighter uppercase">
              Digital <br />
              <span className="text-[#D4AF37] italic font-serif">Inclusion</span>
            </h1>
            <p className="text-white/40 text-[10px] uppercase tracking-[0.4em]">Universal Access Standards</p>
          </header>

          <section className="space-y-12 text-sm text-white/60 font-light leading-relaxed">
            <div className="space-y-4">
              <h2 className="text-white uppercase tracking-widest text-xs">Our Commitment</h2>
              <p>
                As a Maison dedicated to the precision of time, we believe that the digital experience 
                of Chronos should be accessible to everyone, regardless of ability. We are committed 
                to providing a website that reflects our respect for our entire global clientele.
              </p>
            </div>

            <div className="space-y-6">
               <h3 className="text-white uppercase tracking-widest text-[10px]">Accessibility Features</h3>
               
               <div className="grid gap-6">
                  <div className="p-8 border border-white/5 bg-white/[0.01]">
                     <h4 className="text-[#D4AF37] text-[10px] uppercase tracking-widest mb-2 font-medium">Navigational Clarity</h4>
                     <p className="text-[11px] leading-relaxed">Optimized keyboard navigation and semantic HTML structure to support screen reading technologies.</p>
                  </div>
                  
                  <div className="p-8 border border-white/5 bg-white/[0.01]">
                     <h4 className="text-[#D4AF37] text-[10px] uppercase tracking-widest mb-2 font-medium">Visual Harmony</h4>
                     <p className="text-[11px] leading-relaxed">High-contrast text ratios and scalable typography options that preserve our luxury aesthetic while ensuring readability.</p>
                  </div>
               </div>
            </div>

            <p className="pt-8 border-t border-white/5">
              If you experience any difficulty in accessing our collections, please contact our 
              Concierge directly at <span className="text-white">accessibility@chronos.ch</span>.
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
