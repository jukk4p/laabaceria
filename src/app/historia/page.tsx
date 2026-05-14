'use client'

import Image from 'next/image'
import PageHero from '@/components/PageHero'
import CTABand from '@/components/CTABand'
import { Award, Heart, Users, ShieldCheck, History, Star } from 'lucide-react'

const milestones = [
  { year: '1993', title: 'La apertura', desc: 'Abrimos nuestras puertas en C. Cervantes, 75 con una selección inicial de jamones y embutidos de productores locales.' },
  { year: '1998', title: 'Primera DOP', desc: 'Comenzamos a trabajar directamente con productores de la Denominación de Origen Protegida de Jabugo, elevando nuestra selección.' },
  { year: '2005', title: 'Ampliación del catálogo', desc: 'Incorporamos quesos artesanales, aceites de oliva virgen extra y conservas seleccionadas. La tienda se convierte en una abacería gourmet completa.' },
  { year: '2012', title: 'Cestas y eventos', desc: 'Lanzamos nuestro servicio de cestas gourmet personalizadas para empresas, celebraciones y regalos especiales.' },
  { year: '2023', title: 'Referente del Aljarafe', desc: 'Con más de 30 años de historia y una valoración de 4.8 en Google, consolidamos nuestra posición como la tienda gourmet de referencia en la comarca.' },
]

export default function HistoriaPage() {
  return (
    <div className="flex flex-col min-h-screen bg-bg-base">
      <PageHero 
        eyebrow="DESDE 1993 · CORIA DEL RÍO"
        title="Nuestra Historia"
        subtitle="Más de tres décadas seleccionando los mejores productos ibéricos con pasión, dedicación y respeto por la tradición."
      />

      {/* Orígenes */}
      <section className="py-32 px-6 bg-bg-base">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          <div className="lg:col-span-5">
            <div className="relative aspect-square rounded-[2rem] bg-bg-card border border-gold/10 flex flex-col items-center justify-center text-center p-12 overflow-hidden shadow-2xl">
              <div className="text-gold/10 mb-6">
                <History size={120} strokeWidth={0.5} />
              </div>
              <p className="text-gold/40 text-[10px] uppercase tracking-[0.4em] font-bold">LA ABACERÍA, 1993</p>
              
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-3xl rounded-full" />
            </div>
          </div>
          
          <div className="lg:col-span-7">
            <span className="text-gold/40 uppercase tracking-[0.4em] text-[10px] font-bold mb-6 block">NUESTROS ORÍGENES</span>
            <h2 className="text-4xl md:text-5xl font-serif text-gold mb-10 italic">
              Una tienda nacida del <br />
              amor por el buen producto
            </h2>
            <div className="space-y-8 text-text-muted font-light leading-relaxed max-w-2xl">
              <p>
                En 1993, en una pequeña calle de Coria del Río, abrió sus puertas La Abacería. Lo que comenzó como un sueño familiar se convirtió con los años en un referente indiscutible del producto gourmet en el Aljarafe sevillano.
              </p>
              <p>
                Desde el primer día, nuestra filosofía ha sido la misma: ofrecer solo aquello que nosotros mismos querríamos encontrar en una tienda. Sin intermediarios innecesarios, sin sacrificar la calidad por el precio.
              </p>
              <p>
                Hoy, más de treinta años después, seguimos eligiendo a mano cada pieza, manteniendo relaciones directas con las mejores dehesas y productores de España.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-32 px-6 bg-bg-section">
        <div className="container mx-auto max-w-5xl">
          <span className="text-gold/40 uppercase tracking-[0.4em] text-[10px] font-bold mb-16 block text-center">TRES DÉCADAS DE CALIDAD</span>
          
          <div className="relative border-l border-gold/10 ml-6 md:ml-10 space-y-20">
            {milestones.map((m, idx) => (
              <div key={idx} className="relative pl-12">
                {/* Dot */}
                <div className="absolute top-0 left-[-6px] w-3 h-3 bg-gold rounded-full shadow-[0_0_15px_rgba(235,196,122,0.5)]" />
                
                <span className="text-gold font-serif text-2xl mb-4 block">{m.year}</span>
                <h3 className="text-xl font-medium text-gold mb-4">{m.title}</h3>
                <p className="text-gold-muted font-light leading-relaxed max-w-2xl">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-32 px-6 bg-bg-base">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <span className="text-gold/40 uppercase tracking-[0.4em] text-[10px] font-bold mb-6 block">LO QUE NOS MUEVE</span>
            <h2 className="text-4xl md:text-5xl font-serif text-gold italic mb-6">Nuestros valores</h2>
            <p className="text-gold-muted font-light max-w-2xl mx-auto">Todo lo que hacemos está guiado por tres principios que nos han acompañado desde el primer día.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Heart, title: "Pasión", desc: "Cada producto que entra en nuestra tienda lo elegimos con el mismo cuidado que si fuera para nuestra propia mesa." },
              { icon: ShieldCheck, title: "Honestidad", desc: "Nunca vendemos algo que no podamos defender. Somos carniceros, solo vendemos lo que es de elegir." },
              { icon: Users, title: "Comunidad", desc: "Somos parte de Coria del Río. Apoyamos a productores locales y creemos en el comercio que construye vecindad." }
            ].map((v, i) => (
              <div key={i} className="p-12 bg-bg-card border border-gold/10 rounded-[2rem] text-center hover:border-gold/20 transition-all group">
                <div className="w-16 h-16 rounded-2xl bg-gold/5 flex items-center justify-center text-gold mx-auto mb-8 group-hover:scale-110 transition-transform">
                  <v.icon size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-serif text-gold mb-4">{v.title}</h3>
                <p className="text-[13px] text-gold-muted font-light leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="py-32 px-6 bg-bg-section">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <span className="text-gold/40 uppercase tracking-[0.4em] text-[10px] font-bold mb-6 block">LAS PERSONAS DETRÁS</span>
            <h2 className="text-4xl md:text-5xl font-serif text-gold italic mb-6">Nuestro equipo</h2>
            <p className="text-text-muted font-light max-w-2xl mx-auto">Cada persona de La Abacería comparte la misma pasión por el producto bien hecho.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: "Antonio", role: "FUNDADOR & MAESTRO CORTADOR", desc: "Con más de 30 años en el oficio, Antonio conoce cada pieza que entra en la tienda. Su corte a cuchillo es legendario en la comarca." },
              { name: "Carmen", role: "SELECCIÓN & ATENCIÓN AL CLIENTE", desc: "Carmen es quien garantiza que solo lo mejor llegue a nuestro mostrador. Una técnica en selección excepcional." },
              { name: "Miguel", role: "CESTAS GOURMET & LOGÍSTICA", desc: "Miguel diseña cada cesta con mimo y gestiona que cada pedido llegue en perfectas condiciones a su destino." }
            ].map((p, i) => (
              <div key={i} className="flex flex-col items-center bg-bg-card border border-gold/10 rounded-[2rem] p-10 text-center hover:border-gold/20 transition-all">
                <div className="w-32 h-32 rounded-full bg-bg-product border border-gold/10 flex items-center justify-center text-gold/20 mb-8 overflow-hidden">
                  <Users size={64} strokeWidth={0.5} />
                </div>
                <h3 className="text-xl font-serif text-gold mb-2">{p.name}</h3>
                <p className="text-[9px] uppercase tracking-[0.2em] text-gold/40 mb-6 font-bold leading-tight">{p.role}</p>
                <p className="text-[12px] text-text-muted font-light leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </div>
  )
}
