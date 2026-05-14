import Image from 'next/image'
import PageHero from '@/components/PageHero'
import CTABand from '@/components/CTABand'
import { Award, Heart, Users, ShieldCheck, History, Star } from 'lucide-react'
import { getSiteContent } from '@/lib/content'
import AdminEditable from '@/components/AdminEditable'

export const dynamic = 'force-dynamic'

export default async function HistoriaPage() {
  const content = await getSiteContent()

  return (
    <div className="flex flex-col min-h-screen bg-[#0e0600]">
      {/* Hero Section - Clean Dark Aesthetic */}
      <section className="relative pt-44 pb-28 px-6 overflow-hidden border-b border-gold/5">
        {/* Premium ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gold/10 blur-[160px] rounded-full opacity-60" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0e0600_100%)] opacity-40" />
        </div>

        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <div className="mb-6 opacity-0 animate-fade-in">
            <AdminEditable category="historia" id="historia_hero_eyebrow" content={content['historia_hero_eyebrow'] || "DESDE 1993 · CORIA DEL RÍO"}>
              <span className="inline-block text-[10px] md:text-[11px] uppercase tracking-[0.5em] text-gold/60 font-bold border-b border-gold/20 pb-2">
                {content['historia_hero_eyebrow'] || "DESDE 1993 · CORIA DEL RÍO"}
              </span>
            </AdminEditable>
          </div>
          
          <AdminEditable category="historia" id="historia_hero_title" content={content['historia_hero_title'] || "Nuestra Historia"}>
            <h1 className="text-4xl md:text-6xl font-serif text-[#f4ead5] mb-6 leading-tight opacity-0 animate-fade-in-up italic">
              {content['historia_hero_title'] || "Nuestra Historia"}
            </h1>
          </AdminEditable>
          
          <div className="opacity-0 animate-fade-in [animation-delay:0.3s] [animation-fill-mode:forwards]">
            <AdminEditable category="historia" id="historia_hero_subtitle" content={content['historia_hero_subtitle'] || "Más de tres décadas seleccionando los mejores productos ibéricos con pasión, dedicación y respeto por la tradición."}>
              <p className="text-[#a39485] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
                {content['historia_hero_subtitle'] || "Más de tres décadas seleccionando los mejores productos ibéricos con pasión, dedicación y respeto por la tradición."}
              </p>
            </AdminEditable>
          </div>
        </div>
      </section>

      {/* Orígenes */}
      <section className="py-32 px-6 bg-bg-base">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          <div className="lg:col-span-5">
            <AdminEditable category="historia" id="historia_image_main" content={content['historia_image_main'] || "/images/historia-origenes.png"} type="image" className="relative aspect-square rounded-[2rem] overflow-hidden shadow-2xl">
               <Image 
                 src={content['historia_image_main'] || "/images/historia-origenes.png"}
                 alt="Nuestra Historia"
                 fill
                 className="object-cover"
               />
            </AdminEditable>
          </div>
          
          <div className="lg:col-span-7">
            <AdminEditable category="historia" id="historia_origins_eyebrow" content={content['historia_origins_eyebrow'] || "NUESTROS ORÍGENES"}>
              <span className="text-gold/40 uppercase tracking-[0.4em] text-[10px] font-bold mb-6 block">
                {content['historia_origins_eyebrow'] || "NUESTROS ORÍGENES"}
              </span>
            </AdminEditable>
            
            <AdminEditable category="historia" id="historia_origins_title" content={content['historia_origins_title'] || "Una tienda nacida del\namor por el buen producto"}>
              <h2 className="text-4xl md:text-5xl font-serif text-gold mb-10 italic leading-tight whitespace-pre-line">
                {content['historia_origins_title'] || "Una tienda nacida del\namor por el buen producto"}
              </h2>
            </AdminEditable>

            <div className="space-y-8 text-text-muted font-light leading-relaxed max-w-2xl">
              <AdminEditable category="historia" id="historia_origins_p1" content={content['historia_origins_p1'] || "En 1993, en una pequeña calle de Coria del Río, abrió sus puertas La Abacería. Lo que comenzó como un sueño familiar se convirtió con los años en un referente indiscutible del producto gourmet en el Aljarafe sevillano."}>
                <p>
                  {content['historia_origins_p1'] || "En 1993, en una pequeña calle de Coria del Río, abrió sus puertas La Abacería. Lo que comenzó como un sueño familiar se convirtió con los años en un referente indiscutible del producto gourmet en el Aljarafe sevillano."}
                </p>
              </AdminEditable>
              <AdminEditable category="historia" id="historia_origins_p2" content={content['historia_origins_p2'] || "Desde el primer día, nuestra filosofía ha sido la misma: ofrecer solo aquello que nosotros mismos querríamos encontrar en una tienda. Sin intermediarios innecesarios, sin sacrificar la calidad por el precio."}>
                <p>
                  {content['historia_origins_p2'] || "Desde el primer día, nuestra filosofía ha sido la misma: ofrecer solo aquello que nosotros mismos querríamos encontrar en una tienda. Sin intermediarios innecesarios, sin sacrificar la calidad por el precio."}
                </p>
              </AdminEditable>
              <AdminEditable category="historia" id="historia_origins_p3" content={content['historia_origins_p3'] || "Hoy, más de treinta años después, seguimos eligiendo a mano cada pieza, manteniendo relaciones directas con las mejores dehesas y productores de España."}>
                <p>
                  {content['historia_origins_p3'] || "Hoy, más de treinta años después, seguimos eligiendo a mano cada pieza, manteniendo relaciones directas con las mejores dehesas y productores de España."}
                </p>
              </AdminEditable>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-32 px-6 bg-bg-section">
        <div className="container mx-auto max-w-5xl">
          <AdminEditable category="historia" id="historia_timeline_eyebrow" content={content['historia_timeline_eyebrow'] || "TRES DÉCADAS DE CALIDAD"}>
            <span className="text-gold/40 uppercase tracking-[0.4em] text-[10px] font-bold mb-16 block text-center">
              {content['historia_timeline_eyebrow'] || "TRES DÉCADAS DE CALIDAD"}
            </span>
          </AdminEditable>
          
          <div className="relative border-l border-gold/10 ml-6 md:ml-10 space-y-20">
            {[
              { year: "1993", title: "La apertura", desc: "Abrimos nuestras puertas en C. Cervantes, 75 con una selección inicial de jamones y embutidos de productores locales." },
              { year: "1998", title: "Primera DOP", desc: "Comenzamos a trabajar directamente con productores de la Denominación de Origen Protegida de Jabugo, elevando nuestra selección." },
              { year: "2005", title: "Ampliación del catálogo", desc: "Incorporamos quesos artesanales, aceites de oliva virgen extra y conservas seleccionadas. La tienda se convierte en una abacería gourmet completa." },
              { year: "2012", title: "Cestas y eventos", desc: "Lanzamos nuestro servicio de cestas gourmet personalizadas para empresas, celebraciones y regalos especiales." },
              { year: "2023", title: "Referente del Aljarafe", desc: "Con más de 30 años de historia y una valoración de 4.8 en Google, consolidamos nuestra posición como la tienda gourmet de referencia en la comarca." }
            ].map((milestone, idx) => {
              const i = idx + 1;
              return (
                <div key={i} className="relative pl-12">
                  <div className="absolute top-0 left-[-6px] w-3 h-3 bg-gold rounded-full shadow-[0_0_15px_rgba(235,196,122,0.5)]" />
                  
                  <AdminEditable category="historia" id={`historia_milestone_${i}_year`} content={content[`historia_milestone_${i}_year`] || milestone.year}>
                     <span className="text-gold font-serif text-2xl mb-4 block">{content[`historia_milestone_${i}_year`] || milestone.year}</span>
                  </AdminEditable>

                  <AdminEditable category="historia" id={`historia_milestone_${i}_title`} content={content[`historia_milestone_${i}_title`] || milestone.title}>
                     <h3 className="text-xl font-medium text-gold mb-4">{content[`historia_milestone_${i}_title`] || milestone.title}</h3>
                  </AdminEditable>

                  <AdminEditable category="historia" id={`historia_milestone_${i}_desc`} content={content[`historia_milestone_${i}_desc`] || milestone.desc}>
                     <p className="text-text-muted font-light leading-relaxed max-w-2xl">{content[`historia_milestone_${i}_desc`] || milestone.desc}</p>
                  </AdminEditable>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-32 px-6 bg-bg-base">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <AdminEditable category="historia" id="historia_valores_eyebrow" content={content['historia_valores_eyebrow'] || "LO QUE NOS MUEVE"}>
              <span className="text-gold/40 uppercase tracking-[0.4em] text-[10px] font-bold mb-6 block">
                {content['historia_valores_eyebrow'] || "LO QUE NOS MUEVE"}
              </span>
            </AdminEditable>
            <AdminEditable category="historia" id="historia_valores_title" content={content['historia_valores_title'] || "Nuestros valores"}>
              <h2 className="text-4xl md:text-5xl font-serif text-gold italic mb-6">
                {content['historia_valores_title'] || "Nuestros valores"}
              </h2>
            </AdminEditable>
            <AdminEditable category="historia" id="historia_valores_subtitle" content={content['historia_valores_subtitle'] || "Todo lo que hacemos está guiado por tres principios que nos han acompañado desde el primer día."}>
              <p className="text-text-muted font-light max-w-2xl mx-auto">
                {content['historia_valores_subtitle'] || "Todo lo que hacemos está guiado por tres principios que nos han acompañado desde el primer día."}
              </p>
            </AdminEditable>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Heart, title: "Pasión", desc: "Cada producto que entra en nuestra tienda lo elegimos con el mismo cuidado que si fuera para nuestra propia mesa." },
              { icon: ShieldCheck, title: "Honestidad", desc: "Nunca vendemos algo que no podamos defender. Somos carniceros, solo vendemos lo que es de elegir." },
              { icon: Users, title: "Comunidad", desc: "Somos parte de Coria del Río. Apoyamos a productores locales y creemos en el comercio que construye vecindad." }
            ].map((v, idx) => {
              const i = idx + 1;
              return (
                <div key={i} className="p-12 bg-bg-card border border-gold/10 rounded-[2rem] text-center hover:border-gold/20 transition-all group relative">
                  <div className="w-16 h-16 rounded-2xl bg-gold/5 flex items-center justify-center text-gold mx-auto mb-8 group-hover:scale-110 transition-transform">
                    <v.icon size={32} strokeWidth={1.5} />
                  </div>
                  <AdminEditable category="historia" id={`historia_valor_${i}_title`} content={content[`historia_valor_${i}_title`] || v.title}>
                    <h3 className="text-xl font-serif text-gold mb-4">{content[`historia_valor_${i}_title`] || v.title}</h3>
                  </AdminEditable>
                  <AdminEditable category="historia" id={`historia_valor_${i}_desc`} content={content[`historia_valor_${i}_desc`] || v.desc}>
                    <p className="text-[13px] text-text-muted font-light leading-relaxed">{content[`historia_valor_${i}_desc`] || v.desc}</p>
                  </AdminEditable>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="py-32 px-6 bg-bg-section">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <AdminEditable category="historia" id="historia_equipo_eyebrow" content={content['historia_equipo_eyebrow'] || "LAS PERSONAS DETRÁS"}>
              <span className="text-gold/40 uppercase tracking-[0.4em] text-[10px] font-bold mb-6 block">
                {content['historia_equipo_eyebrow'] || "LAS PERSONAS DETRÁS"}
              </span>
            </AdminEditable>
            <AdminEditable category="historia" id="historia_equipo_title" content={content['historia_equipo_title'] || "Nuestro equipo"}>
              <h2 className="text-4xl md:text-5xl font-serif text-gold italic mb-6">
                {content['historia_equipo_title'] || "Nuestro equipo"}
              </h2>
            </AdminEditable>
            <AdminEditable category="historia" id="historia_equipo_subtitle" content={content['historia_equipo_subtitle'] || "Cada persona de La Abacería comparte la misma pasión por el producto bien hecho."}>
              <p className="text-text-muted font-light max-w-2xl mx-auto">
                {content['historia_equipo_subtitle'] || "Cada persona de La Abacería comparte la misma pasión por el producto bien hecho."}
              </p>
            </AdminEditable>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: "Antonio", role: "FUNDADOR & MAESTRO CORTADOR", desc: "Con más de 30 años en el oficio, Antonio conoce cada pieza que entra en la tienda. Su corte a cuchillo es legendario en la comarca." },
              { name: "Carmen", role: "SELECCIÓN & ATENCIÓN AL CLIENTE", desc: "Carmen es quien garantiza que solo lo mejor llegue a nuestro mostrador. Una técnica en selección excepcional." },
              { name: "Miguel", role: "CESTAS GOURMET & LOGÍSTICA", desc: "Miguel diseña cada cesta con mimo y gestiona que cada pedido llegue en perfectas condiciones a su destino." }
            ].map((p, idx) => {
              const i = idx + 1;
              return (
                <div key={i} className="flex flex-col items-center bg-bg-card border border-gold/10 rounded-[2rem] p-10 text-center hover:border-gold/20 transition-all relative">
                  <div className="w-32 h-32 rounded-full bg-bg-product border border-gold/10 flex items-center justify-center text-gold/20 mb-8 overflow-hidden">
                    <Users size={64} strokeWidth={0.5} />
                  </div>
                  <AdminEditable category="historia" id={`historia_miembro_${i}_name`} content={content[`historia_miembro_${i}_name`] || p.name}>
                    <h3 className="text-xl font-serif text-gold mb-2">{content[`historia_miembro_${i}_name`] || p.name}</h3>
                  </AdminEditable>
                  <AdminEditable category="historia" id={`historia_miembro_${i}_role`} content={content[`historia_miembro_${i}_role`] || p.role}>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-gold/40 mb-6 font-bold leading-tight">{content[`historia_miembro_${i}_role`] || p.role}</p>
                  </AdminEditable>
                  <AdminEditable category="historia" id={`historia_miembro_${i}_desc`} content={content[`historia_miembro_${i}_desc`] || p.desc}>
                    <p className="text-[12px] text-text-muted font-light leading-relaxed">{content[`historia_miembro_${i}_desc`] || p.desc}</p>
                  </AdminEditable>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTABand />
    </div>
  )
}
