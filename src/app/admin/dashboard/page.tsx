import { getProducts, getSiteContent, getMessages } from '@/lib/content'
import { Package, Mail, Database, ShoppingBag, TrendingUp, Clock, User, ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function AdminDashboard() {
  const serverSupabase = await createClient()
  const products = await getProducts()
  const content = await getSiteContent()
  const messages = await getMessages(serverSupabase)
  
  const unreadMessages = messages.filter(m => !m.is_read).length

  const stats = [
    { label: 'Productos', value: products.length, trend: 'Activos en catálogo', icon: Package },
    { label: 'Mensajes', value: messages.length, trend: `${unreadMessages} nuevos por leer`, icon: Mail },
    { label: 'Pedidos', value: '0', trend: 'Nuevos hoy', icon: ShoppingBag },
    { label: 'Mantenimiento', value: 'Correcto', trend: 'Sistema estable', icon: Database },
  ]

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-12 animate-in fade-in duration-700">
      {/* Top Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-gold/10">
        <div>
          <h2 className="text-3xl font-serif italic text-gold tracking-tight">Panel de Control</h2>
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold/40 mt-2 font-bold">
            Resumen operativo · Estado de La Abacería
          </p>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#1a120b] p-6 rounded-[2rem] border border-gold/5 space-y-2 hover:border-gold/20 transition-colors group">
            <div className="flex justify-between items-start">
              <p className="text-[9px] uppercase tracking-widest text-gold/30 font-bold">{stat.label}</p>
              <stat.icon size={14} className="text-gold/20 group-hover:text-gold/50 transition-colors" />
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-serif italic text-gold">{stat.value}</span>
              <span className="text-[9px] text-green-500 font-bold">{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Productos Recientes */}
        <section className="bg-[#1a120b] rounded-[2.5rem] border border-gold/5 overflow-hidden shadow-2xl">
          <div className="px-8 py-6 border-b border-gold/5 flex items-center justify-between bg-gold/[0.02]">
            <h3 className="text-[11px] font-black tracking-[0.3em] text-gold uppercase">Productos Recientes</h3>
            <Link href="/admin/products" className="text-[9px] font-bold text-gold/40 hover:text-gold flex items-center gap-2 transition-colors">
              VER TODOS <ArrowRight size={10} />
            </Link>
          </div>
          <div className="p-4 space-y-2">
            {products.slice(0, 4).map((p: any) => (
              <div key={p.id} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gold/5 transition-colors border border-transparent hover:border-gold/10 group">
                <div className="w-10 h-10 rounded-xl bg-black overflow-hidden border border-gold/10 group-hover:border-gold/30 transition-colors">
                  {p.image_url && <img src={p.image_url} alt={p.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />}
                </div>
                <div className="flex-1">
                  <h4 className="text-gold text-xs font-bold leading-tight">{p.name}</h4>
                  <p className="text-gold/40 text-[9px] uppercase tracking-widest mt-0.5">{p.category}</p>
                </div>
                <div className="text-gold/80 font-serif italic text-sm">{p.price}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Mensajes Recientes */}
        <section className="bg-[#1a120b] rounded-[2.5rem] border border-gold/5 overflow-hidden shadow-2xl">
          <div className="px-8 py-6 border-b border-gold/5 flex items-center justify-between bg-gold/[0.02]">
            <h3 className="text-[11px] font-black tracking-[0.3em] text-gold uppercase">Últimos Mensajes</h3>
            <Link href="/admin/messages" className="text-[9px] font-bold text-gold/40 hover:text-gold flex items-center gap-2 transition-colors">
              BANDEJA DE ENTRADA <ArrowRight size={10} />
            </Link>
          </div>
          <div className="p-8 space-y-6">
            {messages.length > 0 ? (
              messages.slice(0, 3).map((msg: any) => (
                <div key={msg.id} className="space-y-3 pb-6 border-b border-gold/5 last:border-0 last:pb-0 group">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold text-[10px] font-bold border border-gold/10">
                        {msg.name.charAt(0)}
                      </div>
                      <span className="text-xs font-bold text-gold">{msg.name}</span>
                    </div>
                    <span className="text-[9px] text-gold/30 uppercase tracking-widest">{new Date(msg.created_at).toLocaleDateString()}</span>
                  </div>
                  <p className="text-gold/60 text-xs font-serif italic leading-relaxed line-clamp-2">
                    "{msg.message}"
                  </p>
                </div>
              ))
            ) : (
              <div className="py-10 text-center space-y-4">
                <Mail size={32} className="mx-auto text-gold/10" />
                <p className="text-gold/30 font-serif italic">Bandeja de entrada vacía</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
