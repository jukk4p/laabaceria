'use client'

import Image from 'next/image'
import { MessageSquare, Award, Plus, Eye } from 'lucide-react'
import type { Product } from '@/lib/types'
import { useCart } from '@/context/CartContext'
import Link from 'next/link'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()


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
    <div className="bg-bg-card border border-gold/18 rounded-[1.5rem] group hover:border-gold/40 transition-all flex flex-col h-full overflow-hidden shadow-2xl relative">
      {/* Visual / Badge Area (60% of card visual weight roughly) */}
      <div className="relative aspect-video flex items-center justify-center overflow-hidden bg-bg-product">
        {/* Product Image */}
        <Image 
          src={product.image_url || product.image || '/images/placeholder.jpg'} 
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-60"
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

      </div>

      {/* Info Area */}
      <div className="p-6 flex flex-col flex-grow bg-gradient-to-b from-transparent to-bg-dark">
        <div className="flex-grow">
          <p className="text-[10px] uppercase tracking-[0.4em] text-gold/40 mb-4 font-bold">
            {categoryLabel(product.category)}
          </p>
          <h3 className="text-xl font-serif text-gold-muted mb-3 group-hover:text-gold transition-colors leading-tight">
            {product.name}
          </h3>
          <p className="text-[13px] text-gold-muted font-light leading-relaxed opacity-60 group-hover:opacity-90 transition-opacity mb-6">
            {product.description}
          </p>
        </div>

        {/* Bottom Actions - Absolute vertical centering */}
        <div className="grid grid-cols-[1.2fr_auto_auto] items-center gap-2 border-t border-gold/5 pt-6">
          <div className="flex flex-col h-10 justify-center">
            <span className="text-[7px] uppercase tracking-[0.2em] text-gold/30 font-bold leading-none mb-1">Desde</span>
            <div className="flex items-baseline gap-0.5 leading-none">
              <span className="text-[1.1rem] font-serif text-gold">{product.price.split('/')[0]}</span>
              {product.price.includes('/') && (
                <span className="text-[9px] text-gold/40 font-light lowercase">/{product.price.split('/')[1]}</span>
              )}
            </div>
          </div>
          
          <Link 
            href={`/catalogo/${product.id}`}
            className="flex items-center justify-center w-10 h-10 border border-gold/20 rounded-full text-gold/60 hover:bg-gold/10 transition-all shrink-0"
            title="Ver detalles"
          >
            <Eye size={16} />
          </Link>
          
          <button 
            onClick={() => addToCart(product)}
            className="h-10 flex items-center gap-2 bg-gold/10 hover:bg-gold text-gold hover:text-bg-dark border border-gold/20 hover:border-gold px-4 rounded-full text-[9px] transition-all uppercase tracking-widest font-bold group/btn whitespace-nowrap shrink-0"
          >
            <Plus size={12} className="transition-transform group-hover/btn:rotate-90" />
            Añadir
          </button>
        </div>
      </div>
    </div>
  )
}
