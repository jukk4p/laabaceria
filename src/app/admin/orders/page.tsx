'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { ShoppingBag, Clock, User, Trash2, CheckCircle, Package, ChevronDown, ChevronUp } from 'lucide-react'

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const fetchOrders = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) console.error('Error fetching orders:', error)
    else setOrders(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id)
    
    if (error) console.error('Error updating status:', error)
    else fetchOrders()
  }

  const deleteOrder = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este registro de pedido?')) return
    const { error } = await supabase.from('orders').delete().eq('id', id)
    if (error) console.error('Error deleting order:', error)
    else fetchOrders()
  }

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-12 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-serif text-gold italic mb-4">Registro de Pedidos</h1>
          <p className="text-gold/60 font-light">Historial de pedidos realizados a través de la web y WhatsApp.</p>
        </div>
        <button 
          onClick={fetchOrders}
          className="px-6 py-2 rounded-xl border border-gold/10 text-gold/60 hover:text-gold hover:border-gold transition-all text-xs uppercase tracking-widest font-bold"
        >
          Actualizar
        </button>
      </div>

      {loading ? (
        <div className="py-40 text-center">
          <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gold/40 text-sm italic">Cargando pedidos...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="py-40 text-center border border-dashed border-gold/10 rounded-[3rem] bg-bg-card/30">
          <ShoppingBag className="mx-auto text-gold/20 mb-6" size={48} strokeWidth={1} />
          <p className="text-gold/40 text-xl font-serif italic">No hay pedidos registrados todavía</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div 
              key={order.id}
              className={`bg-bg-card border border-gold/10 rounded-[2.5rem] overflow-hidden transition-all ${
                expandedOrder === order.id ? 'ring-1 ring-gold/30' : ''
              }`}
            >
              {/* Header de la Card */}
              <div 
                className="p-8 flex flex-wrap items-center justify-between gap-6 cursor-pointer hover:bg-gold/[0.02]"
                onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
              >
                <div className="flex items-center gap-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                    order.status === 'Completado' ? 'bg-green-500/10 text-green-500' : 'bg-gold/10 text-gold'
                  }`}>
                    <Package size={24} />
                  </div>
                  <div>
                    <h3 className="text-gold font-serif text-xl">{order.customer_name}</h3>
                    <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-gold/40 font-bold mt-1">
                      <Clock size={12} />
                      {new Date(order.created_at).toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-right hidden sm:block">
                    <p className="text-[10px] uppercase tracking-widest text-gold/30 font-bold mb-1">Total Estimado</p>
                    <p className="text-xl font-serif text-gold">{Number(order.total).toFixed(2)}€</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase ${
                      order.status === 'Completado' ? 'bg-green-500/20 text-green-500' : 'bg-gold/20 text-gold'
                    }`}>
                      {order.status}
                    </span>
                    {expandedOrder === order.id ? <ChevronUp size={20} className="text-gold/20" /> : <ChevronDown size={20} className="text-gold/20" />}
                  </div>
                </div>
              </div>

              {/* Detalles Expandidos */}
              {expandedOrder === order.id && (
                <div className="px-8 pb-8 animate-in slide-in-from-top-4 duration-300">
                  <div className="pt-8 border-t border-gold/5 grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Lista de Productos */}
                    <div className="space-y-4">
                      <h4 className="text-[10px] uppercase tracking-[0.3em] text-gold/40 font-bold mb-4">Artículos del Pedido</h4>
                      <div className="space-y-3">
                        {order.items.map((item: any, idx: number) => (
                          <div key={idx} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                            <div className="flex items-center gap-4">
                              <span className="text-gold font-bold text-sm">x{item.quantity}</span>
                              <span className="text-gold-muted text-sm">{item.name}</span>
                            </div>
                            <span className="text-gold/60 text-xs">{item.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Notas y Acciones */}
                    <div className="space-y-8">
                      <div className="space-y-4">
                        <h4 className="text-[10px] uppercase tracking-[0.3em] text-gold/40 font-bold">Notas del Cliente</h4>
                        <div className="p-6 bg-gold/5 rounded-2xl border border-gold/10 italic text-gold-muted text-sm leading-relaxed">
                          {order.notes || 'Sin notas adicionales.'}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 pt-4">
                        {order.status !== 'Completado' ? (
                          <button 
                            onClick={(e) => { e.stopPropagation(); updateStatus(order.id, 'Completado'); }}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white transition-all text-[10px] uppercase tracking-widest font-bold border border-green-500/20"
                          >
                            <CheckCircle size={14} />
                            Marcar como Completado
                          </button>
                        ) : (
                          <button 
                            onClick={(e) => { e.stopPropagation(); updateStatus(order.id, 'Pendiente'); }}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gold/10 text-gold hover:bg-gold hover:text-bg-dark transition-all text-[10px] uppercase tracking-widest font-bold border border-gold/20"
                          >
                            <Clock size={14} />
                            Reabrir Pedido
                          </button>
                        )}
                        <button 
                          onClick={(e) => { e.stopPropagation(); deleteOrder(order.id); }}
                          className="flex items-center gap-2 px-6 py-3 rounded-xl border border-red-500/10 text-red-500/30 hover:bg-red-500 hover:text-white transition-all text-[10px] uppercase tracking-widest font-bold"
                        >
                          <Trash2 size={14} />
                          Eliminar Registro
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
