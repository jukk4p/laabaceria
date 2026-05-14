'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import { 
  Save, 
  RefreshCw, 
  CheckCircle2, 
  Image as ImageIcon,
  Upload,
  Pencil,
  X,
  Send
} from 'lucide-react'

// --- Diccionario de Nombres Amigables ---
const labels: Record<string, string> = {
  'home_hero_title': 'Título Principal (Hero)',
  'home_hero_subtitle': 'Subtítulo de Bienvenida',
  'home_hero_eyebrow': 'Cejilla Superior',
  'home_hero_image': 'Imagen de Portada',
  'about-eyebrow': 'Cejilla de Historia',
  'about-title': 'Título de Sección About',
  'about-content': 'Contenido de Historia (Párrafos)',
  'footer_description': 'Texto del Pie de Página',
  'home_about_title': 'Título de Presentación',
  'home_about_content': 'Texto de Presentación Home',
  'contact_title': 'Título de Contacto',
  'contact_subtitle': 'Subtítulo de Contacto',
  'contact_address': 'Dirección Física',
  'contact_phone': 'Teléfono de Contacto',
  'contact_email': 'Email de Contacto',
  'gallery-image-1': 'Imagen Galería 1 (Fachada)',
  'gallery-image-2': 'Imagen Galería 2 (Vinos)',
  'gallery-image-3': 'Imagen Galería 3 (Corte)',
  'gallery-image-4': 'Imagen Galería 4 (Vitrinas)',
  'gallery-label-1': 'Etiqueta Foto 1',
  'gallery-label-2': 'Etiqueta Foto 2',
  'gallery-label-3': 'Etiqueta Foto 3',
  'gallery-label-4': 'Etiqueta Foto 4',
}

const sectionLabels: Record<string, string> = {
  'home-hero': 'Cabecera Principal (Hero)',
  'home-about': 'Sección Sobre Nosotros',
  'about-history': 'Nuestra Historia Detallada',
  'footer-general': 'Pie de Página Global',
  'gallery': 'Galería de Imágenes (Home)',
  'baskets': 'Sección Cestas Gourmet',
}

// Estructura de Páginas para mapear con la DB
const PAGE_STRUCTURE: Record<string, { label: string, categories: string[] }> = {
  'home': { 
    label: 'Página de Inicio', 
    categories: ['home', 'hero', 'features', 'gallery', 'social', 'reviews', 'baskets', 'ticker'] 
  },
  'about': { 
    label: 'Sobre Nosotros (Historia)', 
    categories: ['about', 'nosotros', 'history'] 
  },
  'contact': { 
    label: 'Contacto y Ubicación', 
    categories: ['contact', 'contacto'] 
  },
  'legal': { 
    label: 'Información y Legal', 
    categories: ['legal', 'envios', 'privacy', 'terms'] 
  },
  'footer': { 
    label: 'Ajustes Globales (Footer)', 
    categories: ['footer', 'general', 'social'] 
  },
}

// Orden visual de las secciones por página
const SECTION_ORDER: Record<string, string[]> = {
  'home': ['hero', 'features', 'about', 'baskets', 'gallery', 'reviews', 'social'],
  'about': ['history', 'about'],
  'contact': ['contact'],
  'legal': ['legal', 'envios', 'privacy', 'terms'],
  'footer': ['footer', 'general']
}

function ContentPageInner() {
  const searchParams = useSearchParams()
  const activePageId = searchParams.get('page') || 'home'
  
  const [content, setContent] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [savingId, setSavingId] = useState<string | null>(null)
  const [editMode, setEditMode] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    fetchContent()
  }, [])

  async function fetchContent() {
    setLoading(true)
    const { data, error } = await supabase
      .from('site_content')
      .select('*')
    
    if (error) console.error('Error fetching content:', error)
    else setContent(data || [])
    setLoading(false)
  }

  async function updateContent(id: string, value: string) {
    setSavingId(id)
    const { error } = await supabase
      .from('site_content')
      .update({ content: value, updated_at: new Date() })
      .eq('id', id)

    if (error) alert('Error al guardar')
    else {
      setEditMode(null)
      fetchContent()
    }
    setSavingId(null)
  }

  async function handleFileUpload(id: string, file: File) {
    setSavingId(id)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${id}-${Math.random()}.${fileExt}`
      const filePath = `content/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath)

      const { error: updateError } = await supabase
        .from('site_content')
        .update({ content: publicUrl, updated_at: new Date() })
        .eq('id', id)

      if (updateError) throw updateError
      
      setEditMode(null)
      fetchContent()
    } catch (error) {
      console.error('Error uploading:', error)
      alert('Error al subir la imagen')
    } finally {
      setSavingId(null)
    }
  }

  // Filtrar y ordenar contenido
  const pageCategories = PAGE_STRUCTURE[activePageId]?.categories || []
  const filteredContent = content.filter(item => pageCategories.includes(item.category))
  
  const sections = Array.from(new Set(filteredContent.map(item => item.category)))
    .sort((a, b) => {
      const order = SECTION_ORDER[activePageId] || []
      return order.indexOf(a) - order.indexOf(b)
    })

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-12 animate-in fade-in duration-700">
      <input 
        type="file" 
        id="file-upload" 
        className="hidden" 
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0]
          const id = (e.target as any).dataset.targetId
          if (file && id) handleFileUpload(id, file)
        }}
      />
      {/* Top Header - Gestión Contextual */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-gold/10">
        <div>
          <h2 className="text-3xl font-serif italic text-gold tracking-tight">
            {PAGE_STRUCTURE[activePageId]?.label || 'Gestión de Contenido'}
          </h2>
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold/40 mt-2 font-bold">
            Gestión de Contenido · Haz clic en cualquier campo para editar
          </p>
        </div>
        <button className="flex items-center gap-2 bg-gold/5 border border-gold/20 text-gold px-6 py-2.5 rounded-full text-[10px] font-bold tracking-[0.2em] hover:bg-gold hover:text-black transition-all group">
          <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          PUBLICAR CAMBIOS
        </button>
      </header>

      {/* Stats Grid - Mockup Data for UI Polish */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Productos', value: '48', trend: '+3 este mes' },
          { label: 'Mensajes', value: '12', trend: '3 sin leer' },
          { label: 'Imágenes', value: '94', trend: '+7 nuevas' },
          { label: 'Última Edición', value: 'Hoy', trend: 'hace 2 horas' },
        ].map((stat, i) => (
          <div key={i} className="bg-[#1a120b] p-6 rounded-[2rem] border border-gold/5 space-y-2">
            <p className="text-[9px] uppercase tracking-widest text-gold/30 font-bold">{stat.label}</p>
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-serif italic text-gold">{stat.value}</span>
              <span className="text-[9px] text-green-500 font-bold">{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Content Editor Area */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <RefreshCw className="animate-spin text-gold/20" size={40} />
          <p className="text-[10px] tracking-[0.3em] text-gold/20 uppercase font-bold">Cargando contenido...</p>
        </div>
      ) : (
        <div className="space-y-12 pb-20">
          {sections.length > 0 ? sections.map(section => (
            <section key={section} className="bg-[#1a120b] rounded-[2.5rem] border border-gold/5 overflow-hidden shadow-2xl animate-in slide-in-from-bottom-4 duration-500">
              <div className="px-8 py-6 border-b border-gold/5 flex items-center justify-between bg-gold/[0.02]">
                <h3 className="text-[11px] font-black tracking-[0.3em] text-gold uppercase">{sectionLabels[section] || section}</h3>
                <span className="px-3 py-1 bg-gold/5 border border-gold/10 rounded-full text-[8px] font-bold text-gold/40 tracking-widest">VISIBLE</span>
              </div>
              
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                {filteredContent
                  .filter(item => item.category === section)
                  .map(item => (
                    <div key={item.id} className="group relative space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-[9px] uppercase tracking-widest text-gold/30 font-bold">
                          {labels[item.id] || item.id.split('_').pop()?.replace(/-/g, ' ')}
                        </label>
                        {item.type === 'image' && (
                          <button 
                            onClick={() => {
                              const input = document.getElementById('file-upload') as HTMLInputElement
                              if (input) {
                                input.dataset.targetId = item.id
                                input.click()
                              }
                            }}
                            className="text-gold/20 hover:text-gold transition-colors"
                          >
                            <Upload size={14} />
                          </button>
                        )}
                      </div>

                      {editMode === item.id ? (
                        <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
                          {item.type === 'image' ? (
                            <div 
                              onClick={() => {
                                const input = document.getElementById('file-upload') as HTMLInputElement
                                if (input) {
                                  input.dataset.targetId = item.id
                                  input.click()
                                }
                              }}
                              className="w-full aspect-video bg-gold/[0.02] border-2 border-dashed border-gold/20 rounded-[2rem] flex flex-col items-center justify-center gap-4 hover:bg-gold/[0.05] hover:border-gold/40 transition-all cursor-pointer group/upload"
                            >
                              <div className="bg-gold/10 p-4 rounded-full text-gold group-hover/upload:scale-110 transition-transform">
                                <Upload size={24} />
                              </div>
                              <div className="text-center">
                                <p className="text-[10px] font-bold tracking-[0.2em] text-gold uppercase">Seleccionar nueva imagen</p>
                                <p className="text-[9px] text-gold/40 mt-1 uppercase tracking-widest">Arrastra o haz clic para subir</p>
                              </div>
                            </div>
                          ) : (
                            <textarea 
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              rows={4}
                              className="w-full bg-black/40 border border-gold/20 rounded-2xl px-6 py-4 text-xs text-gold outline-none focus:border-gold/50 transition-all font-serif italic leading-relaxed"
                            />
                          )}
                          <div className="flex gap-2">
                            {item.type !== 'image' && (
                              <button 
                                onClick={() => updateContent(item.id, editValue)}
                                disabled={savingId === item.id}
                                className="bg-gold text-black px-6 py-2 rounded-full text-[10px] font-bold flex items-center gap-2 hover:scale-105 transition-transform disabled:opacity-50"
                              >
                                {savingId === item.id ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
                                GUARDAR
                              </button>
                            )}
                            <button 
                              onClick={() => setEditMode(null)}
                              className="bg-white/5 text-gold/60 px-6 py-2 rounded-full text-[10px] font-bold hover:bg-white/10 transition-colors"
                            >
                              {item.type === 'image' ? 'CERRAR' : 'CANCELAR'}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div 
                          onClick={() => {
                            setEditMode(item.id)
                            setEditValue(item.content)
                          }}
                          className="cursor-pointer group/item relative"
                        >
                          {item.type === 'image' ? (
                            <div className="relative aspect-video rounded-3xl overflow-hidden border border-gold/10 group-hover:border-gold/30 transition-all">
                              {item.content ? (
                                <img src={item.content} alt="" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                              ) : (
                                <div className="w-full h-full bg-gold/5 flex flex-col items-center justify-center space-y-2">
                                  <ImageIcon size={32} className="text-gold/10" />
                                  <span className="text-[8px] text-gold/20 font-bold uppercase tracking-widest">Sin imagen</span>
                                </div>
                              )}
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="bg-gold text-black p-3 rounded-full shadow-xl">
                                  <Pencil size={20} />
                                </div>
                              </div>
                              {savingId === item.id && (
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                                  <RefreshCw size={24} className="animate-spin text-gold" />
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="relative">
                              <p className="text-lg font-serif italic text-gold/80 leading-relaxed group-hover:text-gold transition-colors pr-8">
                                {item.content || "Sin contenido..."}
                              </p>
                              <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                                <Pencil size={14} className="text-gold/40" />
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                }
              </div>
            </section>
          )) : (
            <div className="text-center py-20 bg-gold/5 rounded-[2.5rem] border border-gold/10 border-dashed">
              <p className="text-[10px] tracking-[0.3em] text-gold/40 uppercase font-bold">No hay contenido configurado para esta página</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function ContentPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center h-screen space-y-4 bg-[#0f0a05]">
        <RefreshCw className="animate-spin text-gold/20" size={40} />
      </div>
    }>
      <ContentPageInner />
    </Suspense>
  )
}
