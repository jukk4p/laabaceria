'use client'

import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, ChevronRight } from 'lucide-react'
import { FacebookIcon, InstagramIcon } from './SocialIcons'
import BusinessStatus from '@/components/BusinessStatus'

const exploreLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/catalogo', label: 'Catálogo' },
  { href: '/catalogo?cat=cestas', label: 'Cestas Gourmet' },
  { href: '/historia', label: 'Nuestra Historia' },
  { href: '/envios', label: 'Envíos y Pedidos' },
]

const legalLinks = [
  { href: '/aviso-legal', label: 'Aviso Legal' },
  { href: '/privacidad', label: 'Privacidad' },
  { href: '/cookies', label: 'Cookies' },
  { href: '/terminos', label: 'Términos' },
]

export default function Footer() {
  return (
    <footer className="bg-bg-dark border-t border-gold/10 pt-24 pb-12 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          
          {/* Col 1: Branding (span 4) */}
          <div className="lg:col-span-4">
            <div className="flex flex-col mb-8">
              <span className="text-xl font-bold tracking-[0.2em] text-gold mb-2">LA ABACERÍA</span>
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold/60 font-medium">CALIDAD · TRADICIÓN · SABOR</p>
            </div>
            <p className="text-gold-muted text-[14px] leading-relaxed mb-8 max-w-sm">
              Tienda de referencia en jamones ibéricos y embutidos artesanales en Coria del Río, Sevilla. Desde 1990.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://www.facebook.com/p/Jamones-y-Embutidos-La-Abacer%C3%ADa-100054325518401/" 
                target="_blank" 
                className="w-10 h-10 rounded-lg bg-transparent flex items-center justify-center text-gold/60 hover:text-gold border border-gold-18 hover:border-gold-35 transition-all group"
              >
                <FacebookIcon size={18} />
              </a>
              <a 
                href="https://www.instagram.com/la_abaceria_/" 
                target="_blank" 
                className="w-10 h-10 rounded-lg bg-transparent flex items-center justify-center text-gold/60 hover:text-gold border border-gold-18 hover:border-gold-35 transition-all group"
              >
                <InstagramIcon size={18} />
              </a>
            </div>
          </div>

          {/* Col 2: Explorar (span 3) */}
          <div className="lg:col-span-3 lg:pl-8">
            <h3 className="text-gold text-[11px] uppercase tracking-[0.3em] font-bold mb-8">EXPLORAR</h3>
            <ul className="flex flex-col gap-4">
              {exploreLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-text-muted hover:text-gold text-[15px] transition-all flex items-center gap-3 group">
                    <ChevronRight size={14} className="text-gold/40 group-hover:text-gold transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Visítenos (span 5) */}
          <div className="lg:col-span-5 lg:pl-12">
            <h3 className="text-gold text-[11px] uppercase tracking-[0.3em] font-bold mb-8">VISÍTENOS</h3>
            <div className="space-y-6">
              {/* Address */}
              <div className="flex gap-4 items-start">
                <MapPin size={18} className="text-gold shrink-0 mt-1" />
                <div className="text-text-muted text-[15px]">
                  <p>C. Cervantes, 75</p>
                  <p>41100 Coria del Río, Sevilla</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4 items-start">
                <Clock size={18} className="text-gold shrink-0 mt-1" />
                <div className="flex flex-col gap-3">
                  <div className="text-text-muted text-[14px] leading-relaxed">
                    <p><span className="font-medium text-text-primary">Lunes a Viernes:</span> 08:30–14:00, 17:30–21:00</p>
                    <p><span className="font-medium text-text-primary">Sábados:</span> 08:30–14:00</p>
                    <p><span className="font-medium text-text-primary">Domingos:</span> Cerrado</p>
                  </div>
                  <BusinessStatus />
                </div>
              </div>

              {/* Contact Info */}
              <div className="pt-1 space-y-3">
                <div className="flex gap-4 items-center">
                  <Phone size={18} className="text-gold shrink-0" />
                  <a href="tel:+34691419369" className="text-text-muted hover:text-gold text-[15px] transition-colors font-medium">+34 691 419 369</a>
                </div>
                <div className="flex gap-4 items-center">
                  <Mail size={18} className="text-gold shrink-0" />
                  <a href="mailto:Info@laabaceriacoria.es" className="text-text-muted hover:text-gold text-[15px] transition-colors font-medium">Info@laabaceriacoria.es</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar - Reference #040100 */}
        <div className="pt-8 mt-20 border-t border-gold-10 bg-bg-dark -mx-6 px-6 py-8">
          <div className="flex flex-col gap-6">
            <p className="text-[12px] text-text-faint font-medium">
              © 2026 La Abacería · Jamones y Embutidos Gourmet · Coria del Río, Sevilla
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] font-medium text-gold/40">
              {legalLinks.map((link, idx) => (
                <div key={link.href} className="flex items-center gap-4">
                  <Link href={link.href} className="hover:text-gold transition-colors">
                    {link.label}
                  </Link>
                  {idx < legalLinks.length - 1 && <span className="w-1 h-1 rounded-full bg-gold/10" />}
                </div>
              ))}
              <span className="w-1 h-1 rounded-full bg-gold/10" />
              <span className="text-gold/20 italic">Hecho con amor en Andalucía</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
