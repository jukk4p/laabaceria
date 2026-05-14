'use client'

import { useState } from 'react'
import { Send, MessageSquare, ChevronDown } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import AdminEditable from '@/components/AdminEditable'

interface ContactFormProps {
  content: any
}

export default function ContactForm({ content }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: `${formData.get('name')} ${formData.get('apellidos')}`,
      email: formData.get('email') as string,
      subject: formData.get('motivo') as string,
      message: formData.get('mensaje') as string,
    }

    try {
      const supabase = createClient()
      const { error: submitError } = await supabase
        .from('contact_messages')
        .insert([data])

      if (submitError) throw submitError

      setIsSubmitted(true)
    } catch (err: any) {
      console.error('Error sending message:', err)
      setError('Lo sentimos, ha ocurrido un error al enviar su mensaje. Por favor, inténtelo de nuevo más tarde.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="pt-24 pb-12 px-6 bg-bg-base">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-bg-card border border-gold/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
          {/* Internal glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-50" />
          
          {isSubmitted ? (
            <div className="py-20 text-center animate-[fade-in-up_0.5s_ease-out_forwards] relative z-10">
              <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center text-gold mx-auto mb-6 shadow-[0_0_40px_rgba(197,160,89,0.2)]">
                <Send size={32} strokeWidth={1.5} />
              </div>
              <h4 className="text-3xl font-serif text-gold mb-3">¡Mensaje enviado!</h4>
              <p className="text-[#a39485] font-light mb-8 max-w-xs mx-auto">Gracias por contactar. Le responderemos con la máxima brevedad posible.</p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="text-gold text-[10px] border-b border-gold/40 pb-1 uppercase tracking-[0.3em] font-bold hover:border-gold transition-all"
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <div className="relative z-10">
              <div className="mb-10 text-center">
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gold/5 rounded-xl flex items-center justify-center text-gold border border-gold/10">
                    <MessageSquare size={20} strokeWidth={1.5} />
                  </div>
                  <AdminEditable category="contacto" id="contact_form_title" content={content['contact_form_title'] || "Envíenos un mensaje"}>
                    <h3 className="text-2xl font-serif text-gold-muted italic">{content['contact_form_title'] || "Envíenos un mensaje"}</h3>
                  </AdminEditable>
                </div>
                <AdminEditable category="contacto" id="contact_form_subtitle" content={content['contact_form_subtitle'] || "Atención personalizada en menos de 24 horas."}>
                  <p className="text-gold/45 text-sm font-light italic">{content['contact_form_subtitle'] || "Atención personalizada en menos de 24 horas."}</p>
                </AdminEditable>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-[0.3em] text-gold/40 font-bold ml-1">Nombre</label>
                    <input name="name" required type="text" placeholder="Su nombre" className="w-full bg-bg-product/50 border border-gold/10 rounded-xl px-4 py-3 text-sm text-gold-muted placeholder:text-gold/20 focus:outline-none focus:border-gold/30 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-[0.3em] text-gold/40 font-bold ml-1">Apellidos</label>
                    <input name="apellidos" required type="text" placeholder="Sus apellidos" className="w-full bg-bg-product/50 border border-gold/10 rounded-xl px-4 py-3 text-sm text-gold-muted placeholder:text-gold/20 focus:outline-none focus:border-gold/30 transition-all" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-[0.3em] text-gold/40 font-bold ml-1">Email</label>
                    <input name="email" required type="email" placeholder="su@email.com" className="w-full bg-bg-product/50 border border-gold/10 rounded-xl px-4 py-3 text-sm text-gold-muted placeholder:text-gold/20 focus:outline-none focus:border-gold/30 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-[0.3em] text-gold/40 font-bold ml-1">Motivo</label>
                    <div className="relative">
                      <select name="motivo" required className="w-full bg-bg-product/50 border border-gold/10 rounded-xl px-4 py-3 text-sm text-gold-muted focus:outline-none focus:border-gold/30 transition-all appearance-none cursor-pointer">
                        <option value="" className="bg-bg-base">Seleccione motivo</option>
                        <option value="pedido" className="bg-bg-base">Consulta sobre Pedido</option>
                        <option value="catalogo" className="bg-bg-base">Información de Productos</option>
                        <option value="eventos" className="bg-bg-base">Eventos y Celebraciones</option>
                        <option value="otro" className="bg-bg-base">Otro Motivo</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gold/40 pointer-events-none" size={16} />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-[0.3em] text-gold/40 font-bold ml-1">Mensaje</label>
                  <textarea name="mensaje" required rows={3} placeholder="¿En qué podemos ayudarle?" className="w-full bg-bg-product/50 border border-gold/10 rounded-xl px-4 py-3 text-sm text-gold-muted placeholder:text-gold/20 focus:outline-none focus:border-gold/30 transition-all resize-none"></textarea>
                </div>

                <div className="pt-2">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-gold/90 hover:bg-gold text-bg-dark font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-lg hover:scale-[1.01] active:scale-[0.99] uppercase tracking-[0.2em] text-[11px]"
                  >
                    {isSubmitting ? (
                      <span className="w-5 h-5 border-2 border-bg-dark border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send size={16} />
                        Enviar Mensaje
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
        </div>
      </div>
    </section>
  )
}
