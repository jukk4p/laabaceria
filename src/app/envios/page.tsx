'use client'

import { useState } from 'react'
import PageHero from '@/components/PageHero'
import CTABand from '@/components/CTABand'
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

const shippingMethods = [
  {
    icon: Truck,
    title: "Envío Estándar",
    price: "4,95 €",
    unit: "/ pedido",
    time: "Entrega en 3–5 días laborables",
    badge: "Gratis a partir de 60 €",
    featured: false
  },
  {
    icon: Rocket,
    title: "Envío Express",
    price: "9,95 €",
    unit: "/ pedido",
    time: "Entrega en 24–48 h laborables",
    badge: "Gratis a partir de 120 €",
    featured: true,
    tag: "MÁS RÁPIDO"
  },
  {
    icon: Store,
    title: "Recogida en tienda",
    price: "Gratis",
    unit: "",
    time: "Disponible en 2–4 horas",
    badge: "C. Cervantes 75, Coria del Río",
    featured: false
  }
]

const steps = [
  {
    icon: MessageCircle,
    title: "1. Contáctanos",
    desc: "Escríbenos por WhatsApp o llámanos con tu selección de productos."
  },
  {
    icon: FileText,
    title: "2. Confirmamos",
    desc: "Te enviamos un presupuesto detallado con disponibilidad y precio final."
  },
  {
    icon: Package,
    title: "3. Preparamos",
    desc: "Empaquetamos tu pedido con cuidado, con refrigeración si es necesario."
  },
  {
    icon: Home,
    title: "4. Lo recibes",
    desc: "Tu pedido llega en perfectas condiciones con número de seguimiento."
  }
]

const faqs = [
  {
    q: "¿Enviáis jamones enteros?",
    a: "Sí, enviamos jamones y paletas enteras, así como piezas deshuesadas o loncheadas y envasadas al vacío según su preferencia."
  },
  {
    q: "¿Puedo encargar una cesta personalizada para regalar?",
    a: "¡Por supuesto! Puede configurar su cesta con los productos que desee y nosotros nos encargamos de prepararla con una presentación gourmet impecable."
  },
  {
    q: "¿Enviáis fuera de España?",
    a: "Actualmente realizamos envíos a toda la Península y Baleares. Para envíos internacionales, por favor consúltenos por WhatsApp."
  },
  {
    q: "¿Qué pasa si mi pedido llega en mal estado?",
    a: "Si detecta cualquier anomalía en el transporte o el producto, contáctenos de inmediato y gestionaremos el reemplazo o abono sin coste para usted."
  },
  {
    q: "¿Cómo puedo hacer un pedido para una empresa?",
    a: "Gestionamos pedidos para empresas, regalos corporativos y lotes de Navidad. Contáctenos para obtener un presupuesto personalizado y factura."
  }
]

export default function EnviosPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="flex flex-col bg-bg-base">
      <PageHero 
        eyebrow="SERVICIO A DOMICILIO"
        title="Envíos y Pedidos"
        subtitle="Disfrute de la máxima calidad de nuestros ibéricos sin salir de casa, con todas las garantías de frescura y rapidez."
      />

      {/* Tarifas de Envío */}
      <section className="py-24 px-6">
        <div className="container mx-auto">
          <div className="mb-16">
            <p className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold mb-4">TARIFAS DE ENVÍO</p>
            <h2 className="text-4xl font-medium text-gold">Elige cómo recibirlo</h2>
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
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold/10 border border-gold/30 px-4 py-1.5 rounded-full">
                    <span className="text-gold text-[10px] font-bold tracking-[0.1em]">{method.tag}</span>
                  </div>
                )}
                
                <div className={`mb-8 w-16 h-16 rounded-full flex items-center justify-center ${method.featured ? 'bg-gold/10 text-gold' : 'bg-bg-product text-gold/40'}`}>
                  <method.icon size={32} strokeWidth={1.5} />
                </div>

                <h3 className="text-lg font-medium text-gold mb-2">{method.title}</h3>
                
                <div className="mb-2">
                  <span className="text-3xl font-bold text-gold">{method.price}</span>
                  {method.unit && <span className="text-gold/60 text-sm ml-1">{method.unit}</span>}
                </div>

                <p className="text-gold/40 text-xs mb-8">{method.time}</p>

                <div className="mt-auto px-6 py-2 rounded-full border border-gold/20 bg-gold/5">
                  <span className="text-gold text-[11px] font-medium tracking-tight">{method.badge}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo Funciona */}
      <section className="py-24 px-6 bg-bg-section">
        <div className="container mx-auto">
          <div className="mb-20">
            <p className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold mb-4">CÓMO FUNCIONA</p>
            <h2 className="text-4xl font-medium text-gold">Tu pedido en 4 pasos</h2>
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
                  <h4 className="text-base font-bold text-gold mb-3">{step.title}</h4>
                  <p className="text-[13px] text-gold-muted leading-relaxed max-w-[240px]">{step.desc}</p>
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
            <p className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold mb-4">PREGUNTAS FRECUENTES</p>
            <h2 className="text-4xl font-medium text-gold">Dudas sobre envíos</h2>
          </div>

          <div className="space-y-4 mb-20">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className="bg-bg-card border border-gold/10 rounded-2xl overflow-hidden group hover:border-gold/20 transition-all"
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-gold font-medium text-[15px]">{faq.q}</span>
                  <ChevronDown className={`text-gold/40 group-hover:text-gold transition-all ${openFaq === i ? 'rotate-180' : ''}`} size={18} />
                </button>
                <div 
                  className={`px-6 transition-all duration-300 ease-in-out ${
                    openFaq === i ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-[14px] text-gold-muted leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Info Box */}
          <div className="bg-bg-card border border-gold/10 p-8 rounded-2xl flex gap-6">
            <Info className="text-gold shrink-0 mt-1" size={20} />
            <div>
              <h4 className="text-gold text-sm font-bold mb-2">Nota sobre productos refrigerados</h4>
              <p className="text-[13px] text-gold-muted leading-relaxed">
                Los productos que requieran refrigeración (quesos frescos, fiambres loncheados) se envían en envase isotérmico con acumulador de frío. Para estos productos recomendamos siempre el envío express de 24-48 horas y que haya alguien en el domicilio para recibirlos.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTABand 
        title="¿Listo para hacer tu pedido?"
        subtitle="Escríbenos por WhatsApp y te atendemos en menos de 1 hora en horario de apertura."
        buttonText="Hacer pedido por WhatsApp"
      />
    </div>
  )
}
