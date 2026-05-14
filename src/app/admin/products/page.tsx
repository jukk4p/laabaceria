'use client'

import { useEffect, useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { Package, Plus, Search, Edit2, Trash2, X, Upload, Save, Check } from 'lucide-react'
import Image from 'next/image'

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<any>(null)
  const [uploading, setUploading] = useState(false)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const fetchProducts = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('category', { ascending: true })

    if (error) console.error('Error fetching products:', error)
    else setProducts(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (error) alert('Error al eliminar: ' + error.message)
    else fetchProducts()
  }

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const productData = {
      id: formData.get('id') as string,
      name: formData.get('name') as string,
      category: formData.get('category') as string,
      price: formData.get('price') as string,
      description: formData.get('description') as string,
      badge: formData.get('badge') as string || null,
      image_url: formData.get('image_url') as string,
      updated_at: new Date().toISOString()
    }

    const { error } = await supabase
      .from('products')
      .upsert(productData)

    if (error) alert('Error al guardar: ' + error.message)
    else {
      setIsModalOpen(false)
      setEditingProduct(null)
      fetchProducts()
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `${fileName}`

    const { error: uploadError, data } = await supabase.storage
      .from('product-images')
      .upload(filePath, file)

    if (uploadError) {
      alert('Error subiendo imagen: ' + uploadError.message)
    } else {
      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath)
      
      // Update form image_url if we're editing
      if (editingProduct) {
        setEditingProduct({ ...editingProduct, image_url: publicUrl })
      } else {
        // Handle new product case by setting a state or direct DOM update
        const input = document.getElementById('image_url') as HTMLInputElement
        if (input) input.value = publicUrl
      }
    }
    setUploading(false)
  }

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-wrap justify-between items-end gap-6">
        <div>
          <h1 className="text-4xl font-serif text-gold italic mb-4">Gestión de Productos</h1>
          <p className="text-gold/60 font-light">Añade, edita o elimina productos del catálogo.</p>
        </div>
        <button 
          onClick={() => {
            setEditingProduct(null)
            setIsModalOpen(true)
          }}
          className="flex items-center gap-3 px-8 py-4 bg-gold text-bg-dark rounded-2xl font-bold uppercase tracking-widest text-[11px] shadow-[0_15px_30px_rgba(197,160,89,0.2)] hover:scale-105 transition-all"
        >
          <Plus size={18} />
          Nuevo Producto
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-bg-card border border-gold/10 p-6 rounded-3xl flex items-center gap-4">
        <Search className="text-gold/40" size={20} />
        <input 
          type="text" 
          placeholder="Buscar por nombre o categoría..." 
          className="bg-transparent border-none text-gold placeholder:text-gold/20 focus:ring-0 flex-1 font-light"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="py-40 text-center">
          <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      ) : (
        <div className="bg-bg-card border border-gold/10 rounded-[2.5rem] overflow-hidden shadow-2xl overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gold/10 bg-gold/5">
                <th className="px-8 py-6 text-[10px] uppercase tracking-[0.3em] text-gold/40 font-bold">Producto</th>
                <th className="px-8 py-6 text-[10px] uppercase tracking-[0.3em] text-gold/40 font-bold hidden md:table-cell">Categoría</th>
                <th className="px-8 py-6 text-[10px] uppercase tracking-[0.3em] text-gold/40 font-bold">Precio</th>
                <th className="px-8 py-6 text-[10px] uppercase tracking-[0.3em] text-gold/40 font-bold hidden xl:table-cell">Descripción</th>
                <th className="px-8 py-6 text-[10px] uppercase tracking-[0.3em] text-gold/40 font-bold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gold/5">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="group hover:bg-gold/[0.02] transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-bg-dark/50 border border-gold/10 flex-shrink-0">
                        {p.image_url ? (
                          <img 
                            src={p.image_url} 
                            alt={p.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gold/20">
                            <Package size={20} />
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-gold font-serif text-lg leading-tight">{p.name}</h3>
                        {p.badge && (
                          <span className="text-[8px] uppercase tracking-widest text-gold/60 font-bold">{p.badge}</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 hidden md:table-cell">
                    <span className="text-[10px] uppercase tracking-widest text-gold/40 font-bold bg-gold/5 px-3 py-1 rounded-full border border-gold/10">
                      {p.category}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-gold font-bold">{p.price}</span>
                  </td>
                  <td className="px-8 py-5 hidden xl:table-cell max-w-xs">
                    <p className="text-gold/60 text-xs font-light line-clamp-1">
                      {p.description}
                    </p>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => {
                          setEditingProduct(p)
                          setIsModalOpen(true)
                        }}
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-gold/40 hover:text-gold hover:bg-gold/10 transition-all shadow-sm"
                        title="Editar"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(p.id)}
                        className="w-10 h-10 flex items-center justify-center rounded-xl border border-red-500/10 text-red-500/30 hover:text-red-500 hover:bg-red-500/5 transition-all shadow-sm"
                        title="Eliminar"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredProducts.length === 0 && (
            <div className="py-20 text-center text-gold/20 italic font-serif text-xl">
              No se encontraron productos
            </div>
          )}
        </div>
      )}

      {/* Modal Editor */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-md bg-bg-dark/80 animate-in fade-in duration-300">
          <div className="bg-bg-card border border-gold/20 w-full max-w-2xl rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden">
            <div className="p-8 border-b border-gold/10 flex justify-between items-center bg-gold/5">
              <h2 className="text-2xl font-serif text-gold italic">
                {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/5 text-gold/40 hover:text-gold transition-all"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-10 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-gold/40 font-bold ml-2">ID ÚNICO</label>
                  <input 
                    name="id" 
                    required 
                    defaultValue={editingProduct?.id} 
                    readOnly={!!editingProduct}
                    placeholder="ej: jamon-bellota-1"
                    className="w-full bg-bg-base border border-gold/10 rounded-2xl px-6 py-4 text-gold-muted focus:border-gold transition-all outline-none"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-gold/40 font-bold ml-2">CATEGORÍA</label>
                  <select 
                    name="category" 
                    required 
                    defaultValue={editingProduct?.category || 'jamon'}
                    className="w-full bg-bg-base border border-gold/10 rounded-2xl px-6 py-4 text-gold-muted focus:border-gold transition-all outline-none appearance-none"
                  >
                    <option value="jamon">Jamones</option>
                    <option value="embutido">Embutidos</option>
                    <option value="queso">Quesos</option>
                    <option value="conserva">Conservas</option>
                    <option value="cesta">Cestas</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.3em] text-gold/40 font-bold ml-2">NOMBRE DEL PRODUCTO</label>
                <input 
                  name="name" 
                  required 
                  defaultValue={editingProduct?.name}
                  placeholder="ej: Jamón de Bellota 100% Ibérico"
                  className="w-full bg-bg-base border border-gold/10 rounded-2xl px-6 py-4 text-gold-muted focus:border-gold transition-all outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-gold/40 font-bold ml-2">PRECIO (CON SIMBOLO)</label>
                  <input 
                    name="price" 
                    required 
                    defaultValue={editingProduct?.price}
                    placeholder="ej: 350€"
                    className="w-full bg-bg-base border border-gold/10 rounded-2xl px-6 py-4 text-gold-muted focus:border-gold transition-all outline-none"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-gold/40 font-bold ml-2">BADGE / ETIQUETA</label>
                  <input 
                    name="badge" 
                    defaultValue={editingProduct?.badge}
                    placeholder="ej: Reserva Oro (Opcional)"
                    className="w-full bg-bg-base border border-gold/10 rounded-2xl px-6 py-4 text-gold-muted focus:border-gold transition-all outline-none"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.3em] text-gold/40 font-bold ml-2">DESCRIPCIÓN</label>
                <textarea 
                  name="description" 
                  rows={4}
                  defaultValue={editingProduct?.description}
                  className="w-full bg-bg-base border border-gold/10 rounded-2xl px-6 py-4 text-gold-muted focus:border-gold transition-all outline-none resize-none"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] uppercase tracking-[0.3em] text-gold/40 font-bold ml-2">IMAGEN DEL PRODUCTO</label>
                <div className="flex gap-4 items-start">
                  <input 
                    id="image_url"
                    name="image_url" 
                    required 
                    defaultValue={editingProduct?.image_url}
                    className="flex-1 bg-bg-base border border-gold/10 rounded-2xl px-6 py-4 text-gold-muted focus:border-gold transition-all outline-none text-xs"
                  />
                  <label className="cursor-pointer bg-gold/10 hover:bg-gold/20 text-gold p-4 rounded-2xl transition-all border border-gold/10">
                    {uploading ? <div className="w-5 h-5 border-2 border-gold border-t-transparent rounded-full animate-spin" /> : <Upload size={20} />}
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                  </label>
                </div>
              </div>

              <div className="pt-6">
                <button 
                  type="submit"
                  className="w-full bg-gold text-bg-dark font-bold py-5 rounded-2xl flex items-center justify-center gap-3 shadow-[0_20px_50px_rgba(197,160,89,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-[0.2em] text-xs"
                >
                  <Save size={18} />
                  Guardar Producto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
