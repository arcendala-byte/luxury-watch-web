"use client"
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      
      <main className="pt-40 pb-20 px-6">
        <div className="max-w-4xl mx-auto space-y-24">
          
          {/* Hero Section */}
          <section className="text-center space-y-8">
            <span className="text-[#D4AF37] text-[10px] uppercase tracking-[1em]">Our Heritage</span>
            <h1 className="text-6xl md:text-8xl font-extralight tracking-tighter leading-[0.9]">
              The Masters <br />
              <span className="italic font-serif text-[#D4AF37]">of Seconds</span>
            </h1>
            <p className="text-white/40 text-[11px] uppercase tracking-[0.5em] max-w-lg mx-auto leading-loose">
              Established in 1892. Hand-crafted in the heart of the Swiss Alps.
            </p>
          </section>

          {/* Philosophy */}
          <section className="grid md:grid-cols-2 gap-16 items-center py-20 border-y border-white/5">
            <div className="space-y-6">
              <h2 className="text-3xl font-light uppercase tracking-widest italic">Philosophy</h2>
              <p className="text-white/60 font-light leading-relaxed">
                At Chronos, we don't just measure time; we honor it. Our philosophy is rooted in the belief 
                that a watch is more than an instrument—it is a vessel for history, engineering, 
                and personal legacy.
              </p>
              <p className="text-white/60 font-light leading-relaxed">
                Every component, from the smallest escapement wheel to the hand-polished titanium case, 
                is a testament to our obsession with mechanical perfection.
              </p>
            </div>
            <div className="relative aspect-square overflow-hidden rounded-2xl grayscale brightness-50">
               <img src="https://images.unsplash.com/photo-1547996160-81dfa63595dd?q=80&w=1200" alt="Workshop" className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-tr from-black/80 to-transparent" />
            </div>
          </section>

          {/* The Workshop */}
          <section className="space-y-12">
            <div className="text-center">
               <h2 className="text-[#D4AF37] text-[9px] uppercase tracking-[0.6em] mb-4">The Atelier</h2>
               <h3 className="text-4xl font-extralight tracking-tight">Where Precision Meets Passion</h3>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
               {[
                 { title: "Design", desc: "Aesthetic harmony carved from light and shadow." },
                 { title: "Engineering", desc: "Mechanical movements designed for a century of motion." },
                 { title: "Craft", desc: "Hand-finished components refined under the microscope." }
               ].map((item, i) => (
                 <div key={i} className="p-10 bg-white/[0.02] border border-white/5 rounded-3xl space-y-6 hover:bg-white/[0.05] transition-all duration-700">
                    <span className="text-[#D4AF37] font-serif italic text-2xl">0{i+1}</span>
                    <h4 className="text-xs uppercase tracking-[0.4em] font-medium">{item.title}</h4>
                    <p className="text-[11px] text-white/40 leading-relaxed tracking-wider font-light uppercase">{item.desc}</p>
                 </div>
               ))}
            </div>
          </section>

          {/* Legacy Quote */}
          <section className="py-40 text-center">
             <blockquote className="text-4xl md:text-6xl font-serif italic text-white/10 select-none">
                "Time is the only true luxury."
             </blockquote>
             <p className="text-[#D4AF37] text-[10px] uppercase tracking-[1em] mt-8">Elias Chronos</p>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
