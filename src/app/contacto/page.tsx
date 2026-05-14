import PageHero from '@/components/PageHero'
import CTABand from '@/components/CTABand'
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react'
import BusinessStatus from '@/components/BusinessStatus'
import { getSiteContent } from '@/lib/content'
import AdminEditable from '@/components/AdminEditable'
import ContactForm from '@/components/ContactForm'

export const dynamic = 'force-dynamic'

export default async function ContactoPage() {
  const content = await getSiteContent()

  return (
    <div className="flex flex-col min-h-screen bg-bg-base">
      <PageHero 
        eyebrow={content['contact_hero_eyebrow'] || "ATENCIÓN PERSONALIZADA"}
        title={content['contact_hero_title'] || "Contacto"}
        subtitle={content['contact_hero_subtitle'] || "Estamos a su disposición para resolver cualquier duda sobre nuestra selección artesanal o gestionar su pedido."}
        eyebrowId="contact_hero_eyebrow"
        titleId="contact_hero_title"
        subtitleId="contact_hero_subtitle"
      />

      <ContactForm content={content} />

      {/* 2. VISÍTENOS SECTION */}
      <section className="py-32 px-6 bg-bg-base">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          <div className="lg:col-span-5">
            <AdminEditable category="contacto" id="contact_info_eyebrow" content={content['contact_info_eyebrow'] || "ESTAMOS EN CORIA"}>
              <span className="inline-block text-[10px] uppercase tracking-[0.4em] text-gold/60 mb-6 font-bold">
                {content['contact_info_eyebrow'] || "ESTAMOS EN CORIA"}
              </span>
            </AdminEditable>
            <AdminEditable category="contacto" id="contact_info_title" content={content['contact_info_title'] || "Visítenos"}>
              <h2 className="text-5xl md:text-6xl font-serif text-gold mb-16 italic">
                {content['contact_info_title'] || "Visítenos"}
              </h2>
            </AdminEditable>
            
            <div className="space-y-10">
              <div className="flex gap-6 items-start">
                <div className="w-10 h-10 rounded-sm border border-gold-faint/20 flex items-center justify-center text-gold/60 shrink-0">
                  <MapPin size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-[9px] uppercase tracking-[0.3em] text-gold/40 mb-2 font-bold">DIRECCIÓN</h4>
                  <AdminEditable category="contacto" id="contact_info_address_1" content={content['contact_info_address_1'] || "C. Cervantes, 75"}>
                    <p className="text-gold text-base font-serif">{content['contact_info_address_1'] || "C. Cervantes, 75"}</p>
                  </AdminEditable>
                  <AdminEditable category="contacto" id="contact_info_address_2" content={content['contact_info_address_2'] || "41100 Coria del Río, Sevilla"}>
                    <p className="text-text-muted text-[13px] font-light">{content['contact_info_address_2'] || "41100 Coria del Río, Sevilla"}</p>
                  </AdminEditable>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-10 h-10 rounded-sm border border-gold-faint/20 flex items-center justify-center text-gold/60 shrink-0">
                  <Clock size={20} strokeWidth={1.5} />
                </div>
                <div className="w-full">
                  <h4 className="text-[9px] uppercase tracking-[0.3em] text-gold/40 mb-3 font-bold">HORARIO</h4>
                  <div className="space-y-2 max-w-[340px]">
                    <div className="flex justify-between text-[11px]">
                       <span className="text-text-muted uppercase tracking-widest">Lunes a Viernes</span>
                       <AdminEditable category="contacto" id="contact_info_hours_mon_fri" content={content['contact_info_hours_mon_fri'] || "08:30 - 14:00 | 17:30 - 21:00"}>
                        <span className="text-gold font-bold">{content['contact_info_hours_mon_fri'] || "08:30 - 14:00 | 17:30 - 21:00"}</span>
                       </AdminEditable>
                    </div>
                    <div className="flex justify-between text-[11px]">
                       <span className="text-text-muted uppercase tracking-widest">Sábados</span>
                       <AdminEditable category="contacto" id="contact_info_hours_sat" content={content['contact_info_hours_sat'] || "08:30 - 14:00"}>
                        <span className="text-gold font-bold">{content['contact_info_hours_sat'] || "08:30 - 14:00"}</span>
                       </AdminEditable>
                    </div>
                    <div className="flex justify-between text-[11px]">
                       <span className="text-text-muted uppercase tracking-widest">Domingos</span>
                       <AdminEditable category="contacto" id="contact_info_hours_sun" content={content['contact_info_hours_sun'] || "Cerrado"}>
                        <span className="text-gold font-bold uppercase tracking-widest">{content['contact_info_hours_sun'] || "Cerrado"}</span>
                       </AdminEditable>
                    </div>
                  </div>
                  <div className="mt-4">
                    <BusinessStatus />
                  </div>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-10 h-10 rounded-sm border border-gold-faint/20 flex items-center justify-center text-gold/60 shrink-0">
                  <Phone size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-[9px] uppercase tracking-[0.3em] text-gold/40 mb-2 font-bold">TELÉFONO</h4>
                  <AdminEditable category="contacto" id="contact_info_phone" content={content['contact_info_phone'] || "+34 691 419 369"}>
                    <p className="text-gold text-base font-serif">{content['contact_info_phone'] || "+34 691 419 369"}</p>
                  </AdminEditable>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-10 h-10 rounded-sm border border-gold-faint/20 flex items-center justify-center text-gold/60 shrink-0">
                  <Mail size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-[9px] uppercase tracking-[0.3em] text-gold/40 mb-2 font-bold">EMAIL</h4>
                  <AdminEditable category="contacto" id="contact_info_email" content={content['contact_info_email'] || "info@laabaceriacoria.es"}>
                    <p className="text-gold text-[15px] font-medium">{content['contact_info_email'] || "info@laabaceriacoria.es"}</p>
                  </AdminEditable>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-7 relative group">
            <div className="absolute -top-16 right-0 z-20">
              <a 
                href="https://www.google.com/maps/dir/37.2919148,-6.0527119/LA+ABACERIA+JAMONES+Y+EMBUTIDOS.+PRODUCTOS+GOURMET.,+C.+Cervantes,+75,+41100+Coria+del+R%C3%ADo,+Sevilla/@37.2899402,-6.0549274,1729m/data=!3m2!1e3!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0xd3de5aa4e0c0d93:0x455c656bb08f6e63!2m2!1d-6.051773!2d37.2849864?entry=ttu&g_ep=EgoyMDI2MDUwNi4wIKXMDSoASAFQAw%3D%3D" 
                target="_blank"
                className="bg-[#ebc47a] hover:bg-[#f3d49b] text-bg-dark px-7 py-3.5 rounded-xl text-[13px] font-bold flex items-center gap-2 shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all hover:-translate-y-1 active:scale-95"
              >
                <ArrowRight size={18} />
                ¿Cómo llegar?
              </a>
            </div>

            <div className="w-full aspect-square md:aspect-video lg:h-[600px] overflow-hidden rounded-[2.5rem] border border-white/5 shadow-2xl relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3175.764506260714!2d-6.056880523458693!3d37.28655823932822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd120306c547846f%3A0x6b77209d6c7846f!2sC.%20Cervantes%2C%2075%2C%2041100%20Coria%20del%20R%C3%ADo%2C%20Sevilla!5e0!3m2!1ses!2ses!4v1715367800000!5m2!1ses!2ses" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-80 contrast-125"
              />
            </div>
          </div>
        </div>
      </section>

      <CTABand />
    </div>
  )
}
