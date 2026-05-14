'use client'

import { useState, useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { Pencil, Save, X, Upload, RefreshCw } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface AdminEditableProps {
  id: string
  content: string
  type?: 'text' | 'image'
  category?: string
  children: React.ReactNode
  className?: string
  tableName?: string
  field?: string
}

export default function AdminEditable({ 
  id, 
  content, 
  type = 'text', 
  category = 'general', 
  children, 
  className = '',
  tableName = 'site_content',
  field = 'content'
}: AdminEditableProps) {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(content)
  const [isSaving, setIsSaving] = useState(false)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      // Verificamos si hay sesión activa. Podríamos ser más estrictos con el rol si fuera necesario.
      setIsAdmin(!!session)
    }
    checkAdmin()
  }, [])

  if (!isAdmin) {
    return className ? <div className={className}>{children}</div> : <>{children}</>
  }

  const handleSave = async () => {
    setIsSaving(true)
    
    let updateData: any = { [field]: value, updated_at: new Date() }
    if (tableName === 'site_content') {
      updateData.id = id
      updateData.category = category
    }

    const { error } = tableName === 'site_content' 
      ? await supabase.from(tableName).upsert(updateData)
      : await supabase.from(tableName).update(updateData).eq('id', id)
    
    if (error) {
      alert('Error al guardar: ' + error.message)
    } else {
      setIsEditing(false)
      router.refresh()
      window.location.reload()
    }
    setIsSaving(false)
  }

  const handleFileUpload = async (file: File) => {
    setIsSaving(true)
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

      let updateData: any = { [field]: publicUrl, updated_at: new Date() }
      if (tableName === 'site_content') {
        updateData.id = id
        updateData.category = category
      }

      const { error: updateError } = tableName === 'site_content'
        ? await supabase.from(tableName).upsert(updateData)
        : await supabase.from(tableName).update(updateData).eq('id', id)

      if (updateError) throw updateError
      
      router.refresh()
      window.location.reload()
    } catch (error: any) {
      alert('Error subiendo imagen: ' + error.message)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className={`relative group/editable transition-all duration-300 max-w-full ${className} ${isEditing ? 'ring-2 ring-gold/50 rounded-lg bg-gold/5' : 'hover:ring-1 hover:ring-gold/30 hover:rounded-lg'}`}>
      {children}
      
      {/* Botón de Editar (Flotante) */}
      {!isEditing && (
        <button 
          onClick={() => setIsEditing(true)}
          className="absolute top-4 right-4 bg-gold text-black p-2 rounded-full opacity-0 group-hover/editable:opacity-100 transition-all shadow-[0_0_20px_rgba(197,160,89,0.5)] hover:scale-110 z-[100]"
        >
          <Pencil size={14} />
        </button>
      )}

      {/* Editor Inline */}
      {isEditing && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-fit z-[101] flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl rounded-2xl border border-gold/20 shadow-[0_0_50px_rgba(0,0,0,0.8)] animate-in fade-in zoom-in-95 duration-300 p-6 space-y-4">
          {type === 'text' ? (
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full bg-transparent border-b border-gold/50 text-gold text-center outline-none font-serif italic mb-2 text-sm"
              rows={value.length > 50 ? 3 : 1}
              autoFocus
            />
          ) : (
            <div className="text-center space-y-2 py-2">
               <input 
                type="file" 
                id={`upload-${id}`} 
                className="hidden" 
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleFileUpload(file)
                }}
              />
              <button 
                onClick={() => document.getElementById(`upload-${id}`)?.click()}
                className="flex flex-col items-center gap-1 text-gold hover:text-gold-light transition-colors"
              >
                <div className="bg-gold/10 p-2 rounded-full border border-gold/20">
                  <Upload size={16} />
                </div>
                <span className="text-[8px] font-bold tracking-widest uppercase">Subir Imagen</span>
              </button>
            </div>
          )}

          <div className="flex gap-2">
            {type === 'text' && (
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="bg-gold text-black px-3 py-1 rounded-full text-[9px] font-bold flex items-center gap-2 hover:scale-105 transition-all"
              >
                {isSaving ? <RefreshCw size={10} className="animate-spin" /> : <Save size={10} />}
                GUARDAR
              </button>
            )}
            <button 
              onClick={() => setIsEditing(false)}
              className="bg-white/10 text-white px-3 py-1 rounded-full text-[9px] font-bold hover:bg-white/20 transition-all"
            >
              <X size={10} className="inline mr-1" />
              CERRAR
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
