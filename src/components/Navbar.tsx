'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, MessageSquare } from 'lucide-react'
import { FacebookIcon, InstagramIcon, WhatsAppIcon } from './SocialIcons'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Helper for tailwind class merging
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/catalogo', label: 'Catálogo' },
  { href: '/historia', label: 'Nuestra Historia' },
  { href: '/contacto', label: 'Contacto' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6",
        scrolled ? "py-4 bg-[rgba(var(--bg-card-rgb),0.35)] backdrop-blur-md border-b border-gold-18" : "py-8 bg-transparent"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo & Branding */}
        <Link href="/" className="flex flex-col group">
          <span className="text-xl md:text-2xl font-serif font-bold tracking-[0.15em] text-gold leading-none">LA ABACERÍA</span>
          <span className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-text-faint mt-1.5 group-hover:text-gold transition-colors">
            Desde 1990 · Coria del Río
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href}
              className={cn(
                "text-[11px] uppercase tracking-[0.25em] font-medium transition-all relative pb-1",
                pathname === link.href 
                  ? "text-gold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-gold" 
                  : "text-text-faint hover:text-gold"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Action Elements */}
        <div className="hidden lg:flex items-center gap-8">
          {/* Social Icons */}
          <div className="flex items-center gap-4 text-text-faint border-r border-gold-faint pr-8">
            <a href="https://www.facebook.com/p/Jamones-y-Embutidos-La-Abacer%C3%ADa-100054325518401/" target="_blank" className="hover:text-gold transition-colors"><FacebookIcon size={14} /></a>
            <a href="https://www.instagram.com/la_abaceria_/" target="_blank" className="hover:text-gold transition-colors"><InstagramIcon size={14} /></a>
          </div>

          {/* Vertical Phone Display */}
          <a 
            href="tel:+34691419369"
            className="flex items-center gap-3 px-5 py-2.5 border border-gold/30 rounded-xl bg-bg-card hover:border-gold/50 transition-all group"
          >
            <Phone size={14} className="text-gold group-hover:scale-110 transition-transform" />
            <span className="text-[12px] font-bold text-gold tracking-tight">691 41 93 69</span>
          </a>

          {/* WhatsApp Button */}
          <a 
            href="https://wa.me/34691419369"
            target="_blank"
            className="bg-gold text-bg-dark px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest flex items-center gap-3 hover:bg-gold-light transition-all shadow-lg hover:scale-105"
          >
            <WhatsAppIcon size={14} />
            Encargar
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-gold p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "lg:hidden fixed inset-0 bg-bg-base z-50 flex flex-col items-center justify-center transition-all duration-500",
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        )}
      >
        <button 
          className="absolute top-8 right-8 text-gold p-2"
          onClick={() => setIsOpen(false)}
        >
          <X size={32} />
        </button>

        <div className="flex flex-col items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.href}
              href={link.href}
              className="text-2xl font-serif text-text-primary hover:text-gold transition-colors uppercase tracking-widest"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          
          <div className="flex gap-8 mt-10">
             <a href="https://www.facebook.com/p/Jamones-y-Embutidos-La-Abacer%C3%ADa-100054325518401/" target="_blank" className="text-gold"><FacebookIcon size={24} /></a>
             <a href="https://www.instagram.com/la_abaceria_/" target="_blank" className="text-gold"><InstagramIcon size={24} /></a>
          </div>

          <a 
            href="https://wa.me/34691419369"
            className="mt-10 bg-gold text-bg-dark px-12 py-4 rounded-full font-bold uppercase tracking-widest flex items-center gap-3"
            onClick={() => setIsOpen(false)}
          >
            <WhatsAppIcon size={20} />
            Encargar ahora
          </a>
        </div>
      </div>
    </nav>
  )
}


