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
  Send,
  Database,
  Download,
  UploadCloud,
  RotateCcw,
  Trash2
} from 'lucide-react'

// --- Valores Predeterminados para Restauración ---
const DEFAULT_CONTENT = [
  { id: 'home_hero_title', content: 'Tradición y Sabor en cada rincón', category: 'home', type: 'text' },
  { id: 'home_hero_subtitle', content: 'Descubre la auténtica experiencia de una abacería tradicional con los mejores productos de nuestra tierra.', category: 'home', type: 'text' },
  { id: 'home_hero_eyebrow', content: 'BIENVENIDOS A LA ABACERÍA', category: 'home', type: 'text' },
  { id: 'catalogo-title', content: 'Nuestro Catálogo', category: 'catalogo', type: 'text' },
  { id: 'catalogo-subtitle', content: 'Descubre nuestra exclusiva selección de jamones ibéricos, embutidos artesanos y productos gourmet de la máxima calidad.', category: 'catalogo', type: 'text' },
  { id: 'catalogo-eyebrow', content: 'SELECCIÓN ARTESANAL', category: 'catalogo', type: 'text' },
  { id: 'footer_description', content: 'Tu rincón gourmet de confianza para disfrutar de los mejores productos ibéricos y artesanales.', category: 'footer', type: 'text' },
  { id: 'contact_phone', content: '+34 600 000 000', category: 'contact', type: 'text' },
  { id: 'contact_email', content: 'hola@laabaceria.es', category: 'contact', type: 'text' },
  { id: 'contact_address', content: 'Calle Real, 1, 41001 Sevilla', category: 'contact', type: 'text' },
]

function ContentPageInner() {
  const [content, setContent] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isRestoring, setIsRestoring] = useState(false)

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

  // --- Funciones de Backup y Restauración ---
  const exportBackup = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(content, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", `la-abaceria-backup-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  const importBackup = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        if (Array.isArray(json)) {
          if (confirm('¿Estás seguro de que quieres restaurar este backup? Sobrescribirá el contenido actual.')) {
            setIsRestoring(true);
            for (const item of json) {
              await supabase.from('site_content').upsert({
                id: item.id,
                content: item.content,
                category: item.category,
                type: item.type,
                updated_at: new Date()
              });
            }
            alert('Backup restaurado correctamente');
            fetchContent();
          }
        }
      } catch (err) {
        alert('Error al procesar el archivo JSON');
      } finally {
        setIsRestoring(false);
      }
    };
    reader.readAsText(file);
  }

  const restoreToDefaults = async () => {
    if (confirm('¿Restaurar todos los textos a su estado original de fábrica?')) {
      setIsRestoring(true);
      try {
        for (const item of DEFAULT_CONTENT) {
          await supabase.from('site_content').upsert({
            ...item,
            updated_at: new Date()
          });
        }
        alert('Estructura restaurada con éxito');
        fetchContent();
      } catch (err) {
        alert('Error en la restauración');
      } finally {
        setIsRestoring(false);
      }
    }
  }

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-12 animate-in fade-in duration-700">
      <input 
        type="file" 
        id="backup-import" 
        className="hidden" 
        accept=".json"
        onChange={importBackup}
      />

      {/* Top Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-gold/10">
        <div>
          <h2 className="text-3xl font-serif italic text-gold tracking-tight">
            Mantenimiento y Respaldo
          </h2>
          <p className="text-[10px] uppercase tracking-[0.3em] text-gold/40 mt-2 font-bold">
            Herramientas de recuperación · Control maestro de datos
          </p>
        </div>
      </header>

      {/* Backup Controls - Unified */}
      <div className="bg-[#1a120b] p-8 rounded-[3rem] border border-gold/10 flex flex-col xl:flex-row justify-between items-center gap-12 py-20">
        <div className="flex flex-col items-center text-center xl:items-start xl:text-left gap-6">
          <div className="w-20 h-20 rounded-3xl bg-gold/10 flex items-center justify-center text-gold shadow-[0_0_50px_rgba(197,160,89,0.1)]">
            <Database size={40} />
          </div>
          <div>
            <h3 className="text-2xl font-serif italic text-gold">Sistema de Copias de Seguridad</h3>
            <p className="text-[10px] text-gold/40 uppercase tracking-[0.3em] mt-2 font-bold max-w-md">
              Gestiona la integridad de los textos y la estructura del sitio.
              Usa estas herramientas para restaurar el contenido en caso de error.
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6">
          <div className="flex flex-col gap-3">
            <p className="text-[9px] uppercase tracking-widest text-red-500/40 font-bold text-center">Acciones Críticas</p>
            <button 
              disabled={isRestoring}
              onClick={async () => {
                if (confirm('¿ESTÁS TOTALMENTE SEGURO? Esta acción borrará TODOS los textos y configuraciones del sitio. Asegúrate de tener un backup.')) {
                  setIsRestoring(true);
                  const { error } = await supabase.from('site_content').delete().neq('id', 'placeholder');
                  if (error) alert('Error al borrar: ' + error.message);
                  else {
                    alert('Todo el contenido ha sido borrado.');
                    fetchContent();
                  }
                  setIsRestoring(false);
                }
              }}
              className="flex items-center justify-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 px-8 py-4 rounded-2xl text-xs font-bold hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
            >
              <Trash2 size={16} />
              BORRAR TODO
            </button>

            <button 
              disabled={isRestoring}
              onClick={restoreToDefaults}
              className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-gold/60 px-8 py-4 rounded-2xl text-xs font-bold hover:bg-gold/10 hover:text-gold transition-all disabled:opacity-50"
            >
              <RotateCcw size={16} className={isRestoring ? 'animate-spin' : ''} />
              RESTAURAR FÁBRICA
            </button>
          </div>

          <div className="w-px h-auto bg-gold/10 mx-4 hidden xl:block" />

          <div className="flex flex-col gap-3">
            <p className="text-[9px] uppercase tracking-widest text-gold/20 font-bold text-center">Archivos Externos</p>
            <button 
              onClick={exportBackup}
              className="flex items-center justify-center gap-3 bg-gold/10 text-gold px-8 py-4 rounded-2xl text-xs font-bold hover:bg-gold hover:text-black transition-all"
            >
              <Download size={16} />
              EXPORTAR JSON
            </button>
            
            <button 
              onClick={() => document.getElementById('backup-import')?.click()}
              className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-gold/60 px-8 py-4 rounded-2xl text-xs font-bold hover:bg-gold/10 hover:text-gold transition-all"
            >
              <UploadCloud size={16} />
              IMPORTAR BACKUP
            </button>
          </div>
        </div>
      </div>

      <div className="py-20 text-center border border-dashed border-gold/10 rounded-[3rem] bg-gold/[0.02]">
        <p className="text-[10px] tracking-[0.4em] text-gold/20 uppercase font-black">
          Fin del área de mantenimiento
        </p>
      </div>
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
