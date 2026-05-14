'use client'

import { useState } from 'react'
import { 
  Truck, 
  Rocket, 
  Store, 
  ChevronDown, 
  MessageCircle, 
  FileText, 
  Package, 
  Home, 
  Info 
} from 'lucide-react'
import AdminEditable from '@/components/AdminEditable'

interface EnviosClientProps {
  content: any
}

const shippingMethodsIcons = [Truck, Rocket, Store]
const stepsIcons = [MessageCircle, FileText, Package, Home]

export default function EnviosClient({ content = {} }: EnviosClientProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const shippingMethods = [
    {
      id: 'ship-1',
      icon: Truck,
      title: content['ship-1-title'] || "Envío Estándar",
      price: content['ship-1-price'] || "4,95 €",
      unit: content['ship-1-unit'] || "/ pedido",
      time: content['ship-1-time'] || "Entrega en 3–5 días laborables",
      badge: content['ship-1-badge'] || "Gratis a partir de 60 €",
      featured: false
    },
    {
      id: 'ship-2',
      icon: Rocket,
      title: content['ship-2-title'] || "Envío Express",
      price: content['ship-2-price'] || "9,95 €",
      unit: content['ship-2-unit'] || "/ pedido",
      time: content['ship-2-time'] || "Entrega en 24–48 h laborables",
      badge: content['ship-2-badge'] || "Gratis a partir de 120 €",
      featured: true,
      tag: content['ship-2-tag'] || "MÁS RÁPIDO"
    },
    {
      id: 'ship-3',
      icon: Store,
      title: content['ship-3-title'] || "Recogida en tienda",
      price: content['ship-3-price'] || "Gratis",
      unit: content['ship-3-unit'] || "",
      time: content['ship-3-time'] || "Disponible en 2–4 horas",
      badge: content['ship-3-badge'] || "C. Cervantes 75, Coria del Río",
      featured: false
    }
  ]

  const steps = [
    {
      id: 'step-1',
      icon: MessageCircle,
      title: content['step-1-title'] || "1. Contáctanos",
      desc: content['step-1-desc'] || "Escríbenos por WhatsApp o llámanos con tu selección de productos."
    },
    {
      id: 'step-2',
      icon: FileText,
      title: content['step-2-title'] || "2. Confirmamos",
      desc: content['step-2-desc'] || "Te enviamos un presupuesto detallado con disponibilidad y precio final."
    },
    {
      id: 'step-3',
      icon: Package,
      title: content['step-3-title'] || "3. Preparamos",
      desc: content['step-3-desc'] || "Empaquetamos tu pedido con cuidado, con refrigeración si es necesario."
    },
    {
      id: 'step-4',
      icon: Home,
      title: content['step-4-title'] || "4. Lo recibes",
      desc: content['step-4-desc'] || "Tu pedido llega en perfectas condiciones con número de seguimiento."
    }
  ]

  const faqs = [
    {
      id: 'faq-1',
      q: content['faq-1-q'] || "¿Enviáis jamones enteros?",
      a: content['faq-1-a'] || "Sí, enviamos jamones y paletas enteras, así como piezas deshuesadas o loncheadas y envasadas al vacío según su preferencia."
    },
    {
      id: 'faq-2',
      q: content['faq-2-q'] || "¿Puedo encargar una cesta personalizada para regalar?",
      a: content['faq-2-a'] || "¡Por supuesto! Puede configurar su cesta con los productos que desee y nosotros nos encargamos de prepararla con una presentación gourmet impecable."
    },
    {
      id: 'faq-3',
      q: content['faq-3-q'] || "¿Enviáis fuera de España?",
      a: content['faq-3-a'] || "Actualmente realizamos envíos a toda la Península y Baleares. Para envíos internacionales, por favor consúltenos por WhatsApp."
    },
    {
      id: 'faq-4',
      q: content['faq-4-q'] || "¿Qué pasa si mi pedido llega en mal estado?",
      a: content['faq-4-a'] || "Si detecta cualquier anomalía en el transporte o el producto, contáctenos de inmediato y gestionaremos el reemplazo o abono sin coste para usted."
    },
    {
      id: 'faq-5',
      q: content['faq-5-q'] || "¿Cómo puedo hacer un pedido para una empresa?",
      a: content['faq-5-a'] || "Gestionamos pedidos para empresas, regalos corporativos y lotes de Navidad. Contáctenos para obtener un presupuesto personalizado y factura."
    }
  ]

  return (
    <div className="flex flex-col bg-bg-base">
      {/* Tarifas de Envío */}
      <section className="py-24 px-6">
        <div className="container mx-auto">
          <div className="mb-16">
            <AdminEditable id="envios-rates-eyebrow" content={content['envios-rates-eyebrow'] || "TARIFAS DE ENVÍO"}>
              <p className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold mb-4">{content['envios-rates-eyebrow'] || "TARIFAS DE ENVÍO"}</p>
            </AdminEditable>
            <AdminEditable id="envios-rates-title" content={content['envios-rates-title'] || "Elige cómo recibirlo"}>
              <h2 className="text-4xl font-medium text-gold">{content['envios-rates-title'] || "Elige cómo recibirlo"}</h2>
            </AdminEditable>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {shippingMethods.map((method, idx) => (
              <div 
                key={idx}
                className={`relative p-12 rounded-[1.5rem] border flex flex-col items-center text-center transition-all duration-500 ${
                  method.featured 
                    ? 'bg-bg-section border-gold shadow-2xl shadow-gold/5 scale-105 z-10' 
                    : 'bg-bg-card border-gold/10 hover:border-gold/20'
                }`}
              >
                {method.tag && (
                  <AdminEditable 
                    id={`${method.id}-tag`} 
                    content={method.tag}
                    className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#1a150e] border border-gold/30 px-4 py-1.5 rounded-full z-20"
                  >
                    <span className="text-gold text-[10px] font-bold tracking-[0.1em] whitespace-nowrap block">{method.tag}</span>
                  </AdminEditable>
                )}
                
                <div className={`mb-8 w-16 h-16 rounded-full flex items-center justify-center ${method.featured ? 'bg-gold/10 text-gold' : 'bg-bg-product text-gold/40'}`}>
                  <method.icon size={32} strokeWidth={1.5} />
                </div>

                <AdminEditable id={`${method.id}-title`} content={method.title}>
                  <h3 className="text-lg font-medium text-gold mb-2">{method.title}</h3>
                </AdminEditable>
                
                <div className="mb-2 flex items-baseline justify-center gap-1">
                  <AdminEditable id={`${method.id}-price`} content={method.price}>
                    <span className="text-3xl font-bold text-gold">{method.price}</span>
                  </AdminEditable>
                  {method.unit && (
                    <AdminEditable id={`${method.id}-unit`} content={method.unit}>
                      <span className="text-gold/60 text-sm ml-1">{method.unit}</span>
                    </AdminEditable>
                  )}
                </div>

                <AdminEditable id={`${method.id}-time`} content={method.time}>
                  <p className="text-gold/40 text-xs mb-8">{method.time}</p>
                </AdminEditable>

                <AdminEditable 
                  id={`${method.id}-badge`} 
                  content={method.badge}
                  className="mt-auto px-6 py-2 rounded-full border border-gold/20 bg-gold/5"
                >
                  <span className="text-gold text-[11px] font-medium tracking-tight block">{method.badge}</span>
                </AdminEditable>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo Funciona */}
      <section className="py-24 px-6 bg-bg-section">
        <div className="container mx-auto">
          <div className="mb-20">
            <AdminEditable id="envios-steps-eyebrow" content={content['envios-steps-eyebrow'] || "CÓMO FUNCIONA"}>
              <p className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold mb-4">{content['envios-steps-eyebrow'] || "CÓMO FUNCIONA"}</p>
            </AdminEditable>
            <AdminEditable id="envios-steps-title" content={content['envios-steps-title'] || "Tu pedido en 4 pasos"}>
              <h2 className="text-4xl font-medium text-gold">{content['envios-steps-title'] || "Tu pedido en 4 pasos"}</h2>
            </AdminEditable>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-10 left-0 w-full h-[1px] bg-gold/10 hidden lg:block" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
              {steps.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center lg:items-start text-center lg:text-left group">
                  <div className="w-20 h-20 bg-bg-product border border-gold/10 rounded-full flex items-center justify-center text-gold mb-8 group-hover:border-gold group-hover:bg-gold/10 transition-all duration-500 relative z-20">
                    <step.icon size={28} strokeWidth={1.2} />
                  </div>
                  <AdminEditable id={`${step.id}-title`} content={step.title}>
                    <h4 className="text-base font-bold text-gold mb-3">{step.title}</h4>
                  </AdminEditable>
                  <AdminEditable id={`${step.id}-desc`} content={step.desc}>
                    <p className="text-[13px] text-gold-muted leading-relaxed max-w-[240px]">{step.desc}</p>
                  </AdminEditable>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dudas sobre envíos */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-16">
            <AdminEditable id="envios-faqs-eyebrow" content={content['envios-faqs-eyebrow'] || "PREGUNTAS FRECUENTES"}>
              <p className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold mb-4">{content['envios-faqs-eyebrow'] || "PREGUNTAS FRECUENTES"}</p>
            </AdminEditable>
            <AdminEditable id="envios-faqs-title" content={content['envios-faqs-title'] || "Dudas sobre envíos"}>
              <h2 className="text-4xl font-medium text-gold">{content['envios-faqs-title'] || "Dudas sobre envíos"}</h2>
            </AdminEditable>
          </div>

          <div className="space-y-4 mb-20">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className="bg-bg-card border border-gold/10 rounded-2xl overflow-hidden group hover:border-gold/20 transition-all"
              >
                <div className="flex items-center justify-between p-6">
                  <div 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex-grow text-left flex items-center justify-between group cursor-pointer"
                  >
                    <AdminEditable id={`${faq.id}-q`} content={faq.q}>
                      <span className="text-gold font-medium text-[15px]">{faq.q}</span>
                    </AdminEditable>
                    <ChevronDown className={`text-gold/40 group-hover:text-gold transition-all ml-4 ${openFaq === i ? 'rotate-180' : ''}`} size={18} />
                  </div>
                </div>
                <div 
                  className={`px-6 transition-all duration-300 ease-in-out ${
                    openFaq === i ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                  }`}
                >
                  <AdminEditable id={`${faq.id}-a`} content={faq.a}>
                    <p className="text-[14px] text-gold-muted leading-relaxed">{faq.a}</p>
                  </AdminEditable>
                </div>
              </div>
            ))}
          </div>

          {/* Info Box */}
          <div className="bg-bg-card border border-gold/10 p-8 rounded-2xl flex gap-6">
            <Info className="text-gold shrink-0 mt-1" size={20} />
            <div>
              <AdminEditable id="envios-note-title" content={content['envios-note-title'] || "Nota sobre productos refrigerados"}>
                <h4 className="text-gold text-sm font-bold mb-2">{content['envios-note-title'] || "Nota sobre productos refrigerados"}</h4>
              </AdminEditable>
              <AdminEditable id="envios-note-desc" content={content['envios-note-desc'] || "Los productos que requieran refrigeración (quesos frescos, fiambres loncheados) se envían en envase isotérmico con acumulador de frío. Para estos productos recomendamos siempre el envío express de 24-48 horas y que haya alguien en el domicilio para recibirlos."}>
                <p className="text-[13px] text-gold-muted leading-relaxed">
                  {content['envios-note-desc'] || "Los productos que requieran refrigeración (quesos frescos, fiambres loncheados) se envían en envase isotérmico con acumulador de frío. Para estos productos recomendamos siempre el envío express de 24-48 horas y que haya alguien en el domicilio para recibirlos."}
                </p>
              </AdminEditable>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
