'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { 
  LayoutDashboard, 
  Package, 
  Mail, 
  FileText, 
  Globe, 
  Image as ImageIcon, 
  LogOut, 
  Bell, 
  ChevronDown,
  Settings
} from 'lucide-react'
import { createBrowserClient } from '@supabase/ssr'

const menuGroups = [
  {
    label: 'General',
    items: [
      { id: 'dashboard', label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
      { id: 'products', label: 'Productos', href: '/admin/products', icon: Package },
      { id: 'messages', label: 'Mensajes', href: '/admin/messages', icon: Mail, badge: '2' },
    ]
  },
  {
    label: 'Contenido',
    items: [
      { id: 'content', label: 'Contenido Web', href: '/admin/content', icon: FileText, hasSubmenu: true },
    ]
  },
  {
    label: 'Sitio',
    items: [
      { id: 'seo', label: 'SEO', href: '/admin/seo', icon: Globe },
      { id: 'gallery', label: 'Galería', href: '/admin/gallery', icon: ImageIcon },
    ]
  }
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const isLoginPage = pathname === '/admin/login'

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  if (isLoginPage) return <>{children}</>

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#0f0a05] text-gold/90 font-sans selection:bg-gold/30">
      {/* Sidebar General Premium */}
      <aside className="w-full md:w-72 bg-[#1a120b] border-r border-gold/5 flex flex-col h-screen sticky top-0 z-50">
        {/* Header Branding */}
        <div className="p-8 border-b border-gold/5 flex items-center justify-between">
          <div>
            <h1 className="text-sm font-black tracking-[0.3em] text-gold uppercase whitespace-nowrap">La Abacería</h1>
            <p className="text-[9px] tracking-[0.2em] text-gold/40 uppercase font-bold mt-1">Admin Panel</p>
          </div>
          <div className="flex gap-2">
            <div className="w-8 h-8 rounded-full bg-gold/5 flex items-center justify-center text-gold/40 hover:text-gold transition-colors cursor-pointer">
              <Bell size={14} />
            </div>
          </div>
        </div>

        {/* Navegación Categorizada */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-8 no-scrollbar">
          {menuGroups.map((group) => (
            <div key={group.label} className="space-y-3">
              <h3 className="px-4 text-[9px] font-bold text-gold/30 tracking-[0.3em] uppercase">{group.label}</h3>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname.startsWith(item.href)
                  return (
                    <div key={item.id} className={item.hasSubmenu && isActive ? "bg-gold/5 rounded-2xl p-1 border border-gold/10" : ""}>
                      <Link
                        href={item.href}
                        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all group ${
                          isActive && !item.hasSubmenu
                            ? 'bg-gold text-black font-bold' 
                            : isActive && item.hasSubmenu
                            ? 'bg-gold/10 text-gold font-bold'
                            : 'text-gold/50 hover:bg-gold/5 hover:text-gold'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon size={18} className={isActive && !item.hasSubmenu ? 'text-black' : 'group-hover:text-gold'} />
                          <span className="text-xs font-medium">{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className={`${isActive ? 'bg-black text-gold' : 'bg-gold text-black'} text-[9px] font-bold px-1.5 py-0.5 rounded-full`}>
                            {item.badge}
                          </span>
                        )}
                        {item.hasSubmenu && <ChevronDown size={14} className={isActive ? 'rotate-0' : '-rotate-90'} />}
                      </Link>

                      {/* Submenú de Páginas (Solo si está activo) */}
                      {item.id === 'content' && isActive && (
                        <div className="mt-2 px-2 pb-2 space-y-1 animate-in fade-in slide-in-from-top-2 duration-300">
                          {[
                            { id: 'home', label: 'Página de Inicio' },
                            { id: 'about', label: 'Sobre Nosotros (Historia)' },
                            { id: 'contact', label: 'Contacto y Ubicación' },
                            { id: 'legal', label: 'Información y Legal' },
                            { id: 'footer', label: 'Ajustes Globales (Footer)' },
                          ].map((subItem) => (
                            <Link
                              key={subItem.id}
                              href={`/admin/content?page=${subItem.id}`}
                              className="block px-8 py-2 text-[10px] font-medium text-gold/40 hover:text-gold transition-colors"
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Perfil de Usuario e Inferior */}
        <div className="p-6 border-t border-gold/5 bg-[#140d07]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gold/20 flex items-center justify-center text-gold font-bold text-xs border border-gold/20">A</div>
              <div>
                <p className="text-[11px] font-bold text-gold">Administrador</p>
                <p className="text-[9px] text-gold/40">Admin Access</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="text-gold/20 hover:text-gold transition-colors p-1"><Settings size={14} /></button>
              <button onClick={handleLogout} className="text-gold/20 hover:text-red-400 transition-colors p-1"><LogOut size={14} /></button>
            </div>
          </div>
        </div>
      </aside>

      {/* Área de Contenido Principal */}
      <main className="flex-1 h-screen overflow-y-auto no-scrollbar bg-[#0f0a05]">
        {children}
      </main>
    </div>
  )
}
