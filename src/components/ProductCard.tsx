'use client'

import Image from 'next/image'
import { MessageSquare, Award, Beef, Milk, Utensils, Gift, Ribbon } from 'lucide-react'
import type { Product } from '@/data/products'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const whatsappLink = `https://wa.me/34691419369?text=${encodeURIComponent(`Hola, me interesa el producto: ${product.name}`)}`

  // Map category to icon
  const getIcon = () => {
    switch (product.category) {
      case 'jamon': return <Award size={64} strokeWidth={1} />
      case 'embutido': return <Beef size={64} strokeWidth={1} />
      case 'queso': return <Milk size={64} strokeWidth={1} />
      case 'conserva': return <Utensils size={64} strokeWidth={1} />
      case 'cesta': return <Gift size={64} strokeWidth={1} />
      default: return <Utensils size={64} strokeWidth={1} />
    }
  }

  const categoryLabel = (cat: string) => {
    switch(cat) {
      case 'jamon': return 'JAMÓN IBÉRICO';
      case 'embutido': return 'EMBUTIDO';
      case 'queso': return 'QUESO';
      case 'conserva': return 'CONSERVA';
      case 'cesta': return 'CESTA GOURMET';
      default: return cat.toUpperCase();
    }
  }

  return (
    <div className="bg-bg-card border border-gold/18 rounded-[2rem] group hover:border-gold/40 transition-all flex flex-col h-full overflow-hidden shadow-2xl relative">
      {/* Visual / Badge Area (60% of card visual weight roughly) */}
      <div className="relative aspect-[4/3] flex items-center justify-center overflow-hidden bg-bg-product">
        {/* Product Image */}
        <Image 
          src={product.image} 
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-40"
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent opacity-80" />

        {/* Quality Badges */}
        <div className="absolute top-6 right-6 z-10 flex flex-col gap-2 items-end">
          {product.category === 'jamon' && (
            <div className="bg-bg-card/80 border border-gold/20 text-gold text-[8px] uppercase tracking-widest px-3 py-1.5 rounded-full font-bold backdrop-blur-sm">
              D.O.P. Jabugo
            </div>
          )}
          {product.badge && (
            <div className="bg-bg-card/80 border border-gold/30 text-gold text-[8px] uppercase tracking-widest px-3 py-1.5 rounded-full font-bold backdrop-blur-sm">
              {product.badge}
            </div>
          )}
        </div>
        
        {/* Large Centered Icon (Visible on hover or as fallback) */}
        <div className="relative z-10 text-gold/20 group-hover:text-gold/40 transition-all duration-700 transform group-hover:scale-110 pointer-events-none">
          {getIcon()}
        </div>
      </div>

      {/* Info Area */}
      <div className="p-10 flex flex-col flex-grow bg-gradient-to-b from-transparent to-bg-dark">
        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-[0.4em] text-gold/40 mb-4 font-bold">
            {categoryLabel(product.category)}
          </p>
          <h3 className="text-2xl font-serif text-gold-muted mb-4 group-hover:text-gold transition-colors leading-tight">
            {product.name}
          </h3>
          <p className="text-[14px] text-gold-muted font-light leading-relaxed opacity-60 group-hover:opacity-90 transition-opacity">
            {product.description}
          </p>
        </div>
        
        <div className="mt-auto pt-8 flex items-end justify-between border-t border-gold/10">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-gold/30 mb-2 font-bold">Desde</p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-serif text-gold leading-none">
                {product.price.split('/')[0]}
              </span>
              {product.price.includes('/') && (
                <span className="text-[11px] text-gold/40 font-light lowercase">
                  /{product.price.split('/')[1]}
                </span>
              )}
            </div>
          </div>
          
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 border border-gold/20 px-5 py-2.5 rounded-full text-[10px] text-gold/80 hover:bg-gold hover:text-bg-dark hover:border-gold transition-all uppercase tracking-widest font-bold group/btn"
          >
            <WhatsAppIcon size={14} className="transition-transform group-hover/btn:scale-110" />
            Consultar
          </a>
        </div>
      </div>
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
