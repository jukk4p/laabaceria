'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError('Credenciales inválidas')
      setLoading(false)
    } else {
      router.push('/admin/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-[#0f0a05] flex items-center justify-center px-6 selection:bg-gold/30">
      <div className="max-w-md w-full bg-[#1a120b] border border-gold/10 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-[50px] rounded-full -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative z-10 text-center mb-10">
          <span className="text-[10px] uppercase tracking-[0.4em] text-gold/40 font-bold mb-4 block">SISTEMA DE GESTIÓN</span>
          <h1 className="text-3xl font-serif text-gold italic">Acceso Administrador</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 relative z-10 mb-8">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-gold/40 font-bold ml-2">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              className="w-full bg-[#0f0a05] border border-gold/10 rounded-xl px-4 py-4 text-base text-gold/80 focus:outline-none focus:border-gold transition-all placeholder:text-gold/10" 
              placeholder="admin@laabaceria.es"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-gold/40 font-bold ml-2">Contraseña</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              className="w-full bg-[#0f0a05] border border-gold/10 rounded-xl px-4 py-4 text-base text-gold/80 focus:outline-none focus:border-gold transition-all placeholder:text-gold/10" 
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-500 text-[11px] text-center font-medium italic">{error}</p>}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gold hover:bg-[#f3d49b] text-[#1a120b] font-bold py-5 rounded-2xl transition-all shadow-[0_10px_30px_rgba(197,160,89,0.1)] disabled:opacity-50 uppercase tracking-[0.2em] text-[11px] active:scale-[0.98]"
          >
            {loading ? 'Cargando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="relative z-10 flex justify-center border-t border-gold/5 pt-8">
          <Link 
            href="/"
            className="flex items-center gap-2 text-gold/40 hover:text-gold transition-all duration-300 group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Volver a la web</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
