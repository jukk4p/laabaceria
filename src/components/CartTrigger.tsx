'use client'

import React from 'react'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export default function CartTrigger() {
  const { totalItems, setIsCartOpen } = useCart()

  if (totalItems === 0) return null

  return (
    <div className="fixed bottom-24 right-6 z-50 group">
      {/* Tooltip */}
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-bg-dark text-gold text-xs font-medium px-3 py-1.5 rounded border border-gold/10 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Ver mi pedido
      </span>

      <button 
        onClick={() => setIsCartOpen(true)}
        className="flex items-center justify-center w-14 h-14 bg-gold text-bg-dark rounded-full shadow-2xl hover:bg-[#f3d49b] transition-all transform hover:scale-110 active:scale-95 relative"
        aria-label="Ver carrito"
      >
        <ShoppingCart size={24} />
        <span className="absolute -top-1 -right-1 bg-white text-bg-dark text-[10px] font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-gold shadow-lg animate-in zoom-in">
          {totalItems}
        </span>
      </button>
    </div>
  )
}
