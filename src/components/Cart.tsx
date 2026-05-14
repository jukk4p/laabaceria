'use client'

import React from 'react'
import { useCart } from '@/context/CartContext'
import { X, Plus, Minus, ShoppingCart, Trash2 } from 'lucide-react'
import Image from 'next/image'

import { createBrowserClient } from '@supabase/ssr'

export default function Cart() {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    totalPrice,
    totalItems 
  } = useCart()

  const [notes, setNotes] = React.useState('')
  const [customerName, setCustomerName] = React.useState('')
  const [isSaving, setIsSaving] = React.useState(false)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  if (!isCartOpen) return null

  const handleWhatsAppOrder = async () => {
    if (!customerName.trim()) {
      alert('Por favor, introduce tu nombre para el pedido.')
      return
    }

    setIsSaving(true)
    
    // 1. Guardar en Supabase
    const { error } = await supabase
      .from('orders')
      .insert({
        customer_name: customerName,
        items: cart,
        total: totalPrice,
        notes: notes,
        status: 'Pendiente'
      })

    if (error) {
      console.error('Error saving order:', error)
      alert('Hubo un error al registrar el pedido, pero podés continuar por WhatsApp.')
    }

    // 2. Abrir WhatsApp
    const message = encodeURIComponent(
      `Hola La Abacería, soy ${customerName}. Me gustaría realizar el siguiente pedido:\n\n` +
      cart.map(item => `• ${item.name} x${item.quantity} - ${item.price}`).join('\n') +
      (notes ? `\n\nNotas adicionales:\n${notes}` : '') +
      `\n\nTotal estimado: ${totalPrice.toFixed(2)}€\n\n¿Me podríais confirmar disponibilidad y precio final? Gracias.`
    )
    
    setIsSaving(false)
    window.open(`https://wa.me/34691419369?text=${message}`, '_blank')
    clearCart()
    setIsCartOpen(false)
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-bg-card border-l border-gold/10 z-[101] shadow-2xl flex flex-col transition-transform duration-500 ease-out">
        {/* Header */}
        <div className="p-8 border-b border-gold/10 flex items-center justify-between bg-bg-dark/50">
          <div className="flex items-center gap-3">
            <ShoppingCart className="text-gold" size={24} />
            <h2 className="text-2xl font-serif text-gold">Tu Carrito</h2>
            <span className="bg-gold/10 text-gold text-[10px] px-3 py-1 rounded-full font-bold">
              {totalItems} {totalItems === 1 ? 'artículo' : 'artículos'}
            </span>
          </div>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsCartOpen(false)}
              className="text-gold/40 hover:text-gold transition-all duration-500 p-2 hover:bg-gold/5 rounded-full"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Items List */}
        <div className="flex-grow overflow-y-auto p-8 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-40">
              <ShoppingCart size={64} strokeWidth={1} />
              <p className="font-serif italic text-xl">Tu carrito está vacío</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-[10px] uppercase tracking-widest border border-gold/20 px-8 py-3 rounded-full hover:bg-gold hover:text-bg-dark transition-all"
              >
                Seguir explorando
              </button>
            </div>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 group">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-bg-product border border-gold/10">
                    <Image 
                      src={item.image} 
                      alt={item.name} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="text-gold-muted font-serif text-lg leading-tight group-hover:text-gold transition-colors">
                        {item.name}
                      </h4>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gold/20 hover:text-red-400 transition-colors p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-gold text-[13px] font-medium mb-3">{item.price}</p>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-gold/20 rounded-full px-2 py-1 bg-bg-dark/30">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-gold/40 hover:text-gold transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-[13px] font-bold text-gold">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-gold/40 hover:text-gold transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Customer Name Section */}
              <div className="pt-6 border-t border-gold/5 space-y-4">
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-gold/40 font-bold italic">
                    Tu nombre
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="¿A nombre de quién hacemos el pedido?"
                    className="w-full bg-bg-dark/30 border border-gold/10 rounded-2xl px-6 py-4 text-gold-muted text-sm placeholder:text-gold/20 focus:outline-none focus:border-gold/30 transition-all font-light"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-gold/40 font-bold italic">
                    Notas para el pedido
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Escribe aquí cualquier instrucción especial (ej. preparación, horario de recogida, etc.)"
                    className="w-full bg-bg-dark/30 border border-gold/10 rounded-2xl p-4 text-gold-muted text-sm placeholder:text-gold/20 focus:outline-none focus:border-gold/30 transition-all min-h-[100px] resize-none font-light"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-8 bg-bg-dark/80 border-t border-gold/10 space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-gold/40 text-[10px] uppercase tracking-widest font-bold mb-1">Subtotal estimado</p>
                <p className="text-3xl font-serif text-gold">{totalPrice.toFixed(2)}€</p>
              </div>
              <div className="flex flex-col items-end gap-3">
                {cart.length > 0 && (
                  <button 
                    onClick={clearCart}
                    className="group flex items-center gap-2 text-red-400/40 hover:text-red-400 transition-all duration-500"
                  >
                    <Trash2 size={12} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                    <span className="text-[9px] uppercase tracking-[0.3em] font-bold border-b border-transparent group-hover:border-red-400/30 pb-0.5">
                      Vaciar cesta
                    </span>
                  </button>
                )}
                <p className="text-[10px] text-gold/30 italic max-w-[150px] text-right">
                  * El precio final puede variar según el peso exacto.
                </p>
              </div>
            </div>
            
            <button 
              onClick={handleWhatsAppOrder}
              disabled={isSaving}
              className="w-full bg-[#ebc47a] hover:bg-[#f3d49b] disabled:opacity-50 disabled:hover:bg-[#ebc47a] text-bg-dark py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-[12px] flex items-center justify-center gap-3 shadow-xl transition-all hover:-translate-y-1 active:scale-[0.98]"
            >
              {isSaving ? 'Procesando...' : 'Realizar pedido por WhatsApp'}
            </button>
            
            <p className="text-center text-[10px] text-gold/40 tracking-wider">
              Te atenderemos personalmente para finalizar tu compra
            </p>
          </div>
        )}
      </div>
    </>
  )
}
