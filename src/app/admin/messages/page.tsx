'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { Mail, Trash2, CheckCircle, Clock, User, MessageSquare } from 'lucide-react'

export default function MessagesPage() {
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const fetchMessages = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) console.error('Error fetching messages:', error)
    else setMessages(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const markAsRead = async (id: string) => {
    const { error } = await supabase
      .from('contact_messages')
      .update({ is_read: true })
      .eq('id', id)
    
    if (error) console.error('Error updating message:', error)
    else fetchMessages()
  }

  const deleteMessage = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este mensaje?')) return
    
    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', id)
    
    if (error) console.error('Error deleting message:', error)
    else fetchMessages()
  }

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-serif text-gold italic mb-4">Mensajes de Contacto</h1>
          <p className="text-gold/60 font-light">Gestiona las consultas recibidas a través de la web.</p>
        </div>
        <button 
          onClick={fetchMessages}
          className="px-6 py-2 rounded-xl border border-gold/10 text-gold/60 hover:text-gold hover:border-gold transition-all text-xs uppercase tracking-widest font-bold"
        >
          Actualizar
        </button>
      </div>

      {loading ? (
        <div className="py-40 text-center">
          <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gold/40 text-sm italic">Cargando mensajes...</p>
        </div>
      ) : messages.length === 0 ? (
        <div className="py-40 text-center border border-dashed border-gold/10 rounded-[3rem] bg-bg-card/30">
          <MessageSquare className="mx-auto text-gold/20 mb-6" size={48} strokeWidth={1} />
          <p className="text-gold/40 text-xl font-serif italic">No hay mensajes todavía</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {messages.map((msg) => (
            <div 
              key={msg.id}
              className={`bg-bg-card border transition-all rounded-[2rem] overflow-hidden ${
                msg.is_read ? 'border-gold/5 opacity-80' : 'border-gold/20 shadow-[0_10px_40px_rgba(197,160,89,0.05)]'
              }`}
            >
              <div className="p-8">
                <div className="flex flex-wrap justify-between items-start gap-6 mb-8">
                  <div className="flex gap-4 items-center">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${msg.is_read ? 'bg-gold/5 text-gold/40' : 'bg-gold/10 text-gold shadow-[0_0_20px_rgba(197,160,89,0.2)]'}`}>
                      <User size={20} />
                    </div>
                    <div>
                      <h3 className="text-gold font-serif text-xl">{msg.name}</h3>
                      <p className="text-gold/40 text-xs tracking-wider">{msg.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-bold">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 text-gold/40">
                      <Clock size={12} />
                      {new Date(msg.created_at).toLocaleDateString()}
                    </div>
                    {!msg.is_read && (
                      <span className="px-3 py-1.5 rounded-full bg-gold text-bg-dark">NUEVO</span>
                    )}
                  </div>
                </div>

                <div className="mb-8">
                  <p className="text-gold/40 text-[10px] uppercase tracking-[0.2em] mb-2 font-bold">ASUNTO: {msg.subject || 'General'}</p>
                  <p className="text-gold-muted font-light leading-relaxed bg-white/5 p-6 rounded-2xl border border-white/5">
                    {msg.message}
                  </p>
                </div>

                <div className="flex justify-end gap-4 border-t border-white/5 pt-6">
                  {!msg.is_read && (
                    <button 
                      onClick={() => markAsRead(msg.id)}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gold/10 text-gold hover:bg-gold hover:text-bg-dark transition-all text-[10px] uppercase tracking-widest font-bold"
                    >
                      <CheckCircle size={14} />
                      Marcar como leído
                    </button>
                  )}
                  <button 
                    onClick={() => deleteMessage(msg.id)}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-all text-[10px] uppercase tracking-widest font-bold"
                  >
                    <Trash2 size={14} />
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
