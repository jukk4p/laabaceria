'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useRouter } from 'next/navigation'

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
    <div className="min-h-screen bg-bg-base flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-bg-card border border-gold/10 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-[50px] rounded-full -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative z-10 text-center mb-10">
          <span className="text-[10px] uppercase tracking-[0.4em] text-gold/40 font-bold mb-4 block">SISTEMA DE GESTIÓN</span>
          <h1 className="text-3xl font-serif text-gold italic">Acceso Administrador</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 relative z-10">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-[0.2em] text-gold/40 font-bold ml-2">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              className="w-full bg-bg-product border border-gold/18 rounded-xl px-4 py-4 text-base text-gold-muted focus:outline-none focus:border-gold transition-all" 
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
              className="w-full bg-bg-product border border-gold/18 rounded-xl px-4 py-4 text-base text-gold-muted focus:outline-none focus:border-gold transition-all" 
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-500 text-xs text-center font-medium italic">{error}</p>}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gold hover:bg-gold-light text-bg-dark font-bold py-5 rounded-2xl transition-all shadow-[0_10px_30px_rgba(197,160,89,0.2)] disabled:opacity-50 uppercase tracking-[0.2em] text-[11px]"
          >
            {loading ? 'Cargando...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  )
}
