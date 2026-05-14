'use client'

import { useState } from 'react'
import PageHero from '@/components/PageHero'
import CTABand from '@/components/CTABand'
import { MapPin, Phone, Mail, Send, ChevronDown, MessageSquare, Instagram, Facebook, Clock } from 'lucide-react'
import BusinessStatus from '@/components/BusinessStatus'

export default function ContactoPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg-base">
      <PageHero 
        eyebrow="ATENCIÓN PERSONALIZADA"
        title="Contacto"
        subtitle="Estamos a su disposición para resolver cualquier duda sobre nuestra selección artesanal o gestionar su pedido."
      />

      <section className="py-32 px-6 bg-bg-base">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            
            {/* Info de contacto */}
            <div className="space-y-16">
              <div>
                <span className="text-gold/40 uppercase tracking-[0.4em] text-[10px] font-bold mb-6 block">NUESTRA TIENDA</span>
                <h2 className="text-4xl md:text-5xl font-serif text-gold italic mb-10">Venga a visitarnos</h2>
                <p className="text-text-muted text-[15px] font-light leading-relaxed max-w-lg mb-12">
                  Le esperamos en el corazón de Coria del Río para ofrecerle la mejor experiencia gourmet y asesoramiento personal.
                </p>
                
                <div className="space-y-8">
                  <div className="flex gap-6 items-start group">
                    <div className="w-12 h-12 rounded-2xl bg-gold/5 flex items-center justify-center text-gold border border-gold/10 group-hover:bg-gold/10 transition-colors">
                      <MapPin size={24} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-gold/40 mb-2 font-bold">DIRECCIÓN</p>
                      <p className="text-gold text-lg font-serif">C. Cervantes, 75</p>
                      <p className="text-text-muted text-sm font-light">41100 Coria del Río, Sevilla</p>
                    </div>
                  </div>

                  <div className="flex gap-6 items-start group">
                    <div className="w-12 h-12 rounded-2xl bg-gold/5 flex items-center justify-center text-gold border border-gold/10 group-hover:bg-gold/10 transition-colors">
                      <Phone size={24} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-gold/40 mb-2 font-bold">TELÉFONO</p>
                      <p className="text-gold text-lg font-serif">+34 691 419 369</p>
                      <p className="text-text-muted text-sm font-light italic">Atención directa por WhatsApp disponible</p>
                    </div>
                  </div>

                  <div className="flex gap-6 items-start group">
                    <div className="w-12 h-12 rounded-2xl bg-gold/5 flex items-center justify-center text-gold border border-gold/10 group-hover:bg-gold/10 transition-colors">
                      <Mail size={24} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-gold/40 mb-2 font-bold">EMAIL</p>
                      <p className="text-gold text-lg font-serif">info@laabaceriacoria.es</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Redes Sociales */}
              <div className="pt-8 border-t border-white/5">
                <p className="text-[10px] uppercase tracking-[0.2em] text-gold/40 mb-6 font-bold">SÍGUENOS EN</p>
                <div className="flex gap-4">
                  <a href="https://www.instagram.com/la_abaceria_/" target="_blank" className="w-12 h-12 rounded-xl border border-gold/10 flex items-center justify-center text-gold/60 hover:text-gold hover:border-gold hover:bg-gold/5 transition-all">
                    <Instagram size={20} strokeWidth={1.5} />
                  </a>
                  <a href="https://www.facebook.com/p/Jamones-y-Embutidos-La-Abacer%C3%ADa-100054325518401/" target="_blank" className="w-12 h-12 rounded-xl border border-gold/10 flex items-center justify-center text-gold/60 hover:text-gold hover:border-gold hover:bg-gold/5 transition-all">
                    <Facebook size={20} strokeWidth={1.5} />
                  </a>
                </div>
              </div>
            </div>

            {/* Canal Directo WhatsApp & Formulario */}
            <div className="bg-bg-card border border-gold/10 p-10 lg:p-16 rounded-[3rem] shadow-[0_30px_100px_rgba(0,0,0,0.8)] relative overflow-hidden group">
              {/* Internal glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-50" />
              
              {isSubmitted ? (
                <div className="py-20 text-center animate-[fade-in-up_0.5s_ease-out_forwards] relative z-10">
                  <div className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center text-gold mx-auto mb-8 shadow-[0_0_40px_rgba(197,160,89,0.2)]">
                    <Send size={40} strokeWidth={1.5} />
                  </div>
                  <h4 className="text-3xl font-serif text-gold mb-4">¡Mensaje enviado!</h4>
                  <p className="text-[#a39485] font-light mb-10 max-w-xs mx-auto">Gracias por contactar. Le responderemos con la máxima brevedad posible.</p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-gold text-[10px] border-b border-gold/40 pb-1 uppercase tracking-[0.3em] font-bold hover:border-gold transition-all"
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <div className="relative z-10">
                  <div className="mb-14">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-gold/5 rounded-2xl flex items-center justify-center text-gold border border-gold/10">
                        <MessageSquare size={24} strokeWidth={1.5} />
                      </div>
                      <h3 className="text-3xl font-serif text-gold-muted">Envíenos un mensaje</h3>
                    </div>
                    <p className="text-gold/45 text-base font-light italic">Atención personalizada en menos de 24 horas.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="space-y-4">
                        <label className="text-[10px] uppercase tracking-[0.4em] text-gold/40 font-bold ml-2">Nombre</label>
                        <input required type="text" placeholder="Su nombre" className="w-full bg-bg-product border border-gold/18 rounded-xl px-4 py-4 text-base text-gold-muted placeholder:text-gold/20 focus:outline-none focus:border-gold transition-all" />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] uppercase tracking-[0.4em] text-gold/40 font-bold ml-2">Apellidos</label>
                        <input required type="text" placeholder="Sus apellidos" className="w-full bg-bg-product border border-gold/18 rounded-xl px-4 py-4 text-base text-gold-muted placeholder:text-gold/20 focus:outline-none focus:border-gold transition-all" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[10px] uppercase tracking-[0.4em] text-gold/40 font-bold ml-2">Email</label>
                      <input required type="email" placeholder="su@email.com" className="w-full bg-bg-product border border-gold/18 rounded-xl px-4 py-4 text-base text-gold-muted placeholder:text-gold/20 focus:outline-none focus:border-gold transition-all" />
                    </div>

                    <div className="space-y-4">
                      <label className="text-[10px] uppercase tracking-[0.4em] text-gold/40 font-bold ml-2">Motivo de contacto</label>
                      <div className="relative">
                        <select required className="w-full bg-bg-product border border-gold/18 rounded-xl px-4 py-4 text-base text-gold-muted focus:outline-none focus:border-gold transition-all appearance-none cursor-pointer">
                          <option value="" className="bg-bg-base">Selecciona una opción</option>
                          <option value="pedido" className="bg-bg-base">Consulta sobre Pedido</option>
                          <option value="catalogo" className="bg-bg-base">Información de Productos</option>
                          <option value="eventos" className="bg-bg-base">Eventos y Celebraciones</option>
                          <option value="otro" className="bg-bg-base">Otro Motivo</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gold/40 pointer-events-none" size={18} />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[10px] uppercase tracking-[0.4em] text-gold/40 font-bold ml-2">Mensaje</label>
                      <textarea required rows={4} placeholder="¿En qué podemos ayudarle?" className="w-full bg-bg-product border border-gold/18 rounded-xl px-4 py-4 text-base text-gold-muted placeholder:text-gold/20 focus:outline-none focus:border-gold transition-all resize-none"></textarea>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-gold hover:bg-gold-light text-bg-dark font-bold py-6 rounded-2xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-[0_15px_40px_rgba(197,160,89,0.2)] hover:scale-[1.02] active:scale-[0.98] uppercase tracking-[0.2em] text-[12px]"
                    >
                      {isSubmitting ? (
                        <span className="w-6 h-6 border-3 border-bg-dark border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send size={18} />
                          Enviar Mensaje
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}
              
              {/* Decorative background element */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
            </div>
          </div>
        </div>
      </section>

      {/* Horario y Mapa */}
      <section className="py-32 px-6 bg-bg-base border-t border-white/5">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl font-serif text-gold mb-12 italic">Horario comercial</h2>
              <div className="space-y-4 max-w-sm">
                {[
                  { days: "Lunes a Viernes", time: "8:30 - 14:00 | 17:30 - 21:00" },
                  { days: "Sábados", time: "8:30 - 14:00" },
                  { days: "Domingos", time: "Cerrado" }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-4 border-b border-white/5">
                    <span className="text-[10px] uppercase tracking-widest text-gold/40 font-bold">{item.days}</span>
                    <span className={`text-[13px] ${item.time === 'Cerrado' ? 'text-red-500' : 'text-gold'} font-medium`}>{item.time}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <BusinessStatus />
              </div>
            </div>
            
            <div className="h-[400px] rounded-[2.5rem] overflow-hidden border border-gold/18 grayscale opacity-70">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3175.764506260714!2d-6.056880523458693!3d37.28655823932822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd120306c547846f%3A0x6b77209d6c7846f!2sC.%20Cervantes%2C%2075%2C%2041100%20Coria%20del%20R%C3%ADo%2C%20Sevilla!5e0!3m2!1ses!2ses!4v1715367800000!5m2!1ses!2ses" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
              />
            </div>
          </div>
        </div>
      </section>

      <CTABand />
    </div>
  )
}

function WhatsAppIcon({ size = 16, className = "" }: { size?: number, className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      width={size} 
      height={size} 
      fill="currentColor" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .01 5.403.007 12.039c0 2.121.54 4.19 1.566 6.041L0 24l6.103-1.601a11.832 11.832 0 005.94 1.585h.005c6.637 0 12.042-5.403 12.045-12.039a11.82 11.82 0 00-3.483-8.482z"/>
    </svg>
  )
}
