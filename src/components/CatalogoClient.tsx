'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import ProductCard from '@/components/ProductCard'
import { PRODUCTS } from '@/data/products'

const categories = [
  { id: 'all', label: 'Todo' },
  { id: 'jamon', label: 'Jamones' },
  { id: 'embutido', label: 'Embutidos' },
  { id: 'queso', label: 'Quesos' },
  { id: 'conserva', label: 'Conservas' },
  { id: 'cesta', label: 'Cestas Gourmet' },
]

const secondaryFilters = [
  "SIERRA DE EXTREMADURA",
  "VALLE DE LOS PEDROCHES",
  "CORTE A CUCHILLO",
  "PRODUCTO ARTESANO"
]

export default function CatalogoClient({ initialProducts }: { initialProducts: any[] }) {
  const searchParams = useSearchParams()
  const initialCat = searchParams.get('cat')
  
  // We use the high-end static PRODUCTS as the primary data source for the "blindado" look
  const products = PRODUCTS;
  
  const [activeCategory, setActiveCategory] = useState(initialCat || 'all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProducts = products.filter(p => {
    const pCat = (p.category || '').toLowerCase().trim()
    const activeCat = activeCategory.toLowerCase().trim()
    const matchesCategory = activeCategory === 'all' || pCat === activeCat
    const matchesSearch = (p.name || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (p.description || '').toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="flex flex-col min-h-screen bg-bg-base">
      {/* Top Meta Filters Bar */}
      <div className="bg-bg-card border-b border-gold/10 py-4">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-10">
            {secondaryFilters.map(filter => (
              <span key={filter} className="text-[9px] tracking-[0.3em] text-gold/30 hover:text-gold/60 cursor-default transition-colors font-bold whitespace-nowrap">
                {filter}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-20">
        {/* Main Category Selection Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-24">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id)
                setSearchQuery('')
              }}
              className={`px-10 py-4 rounded-2xl text-[12px] font-bold tracking-[0.15em] transition-all duration-300 border ${
                activeCategory === cat.id 
                  ? 'bg-gold text-bg-dark border-gold shadow-[0_10px_30px_rgba(197,160,89,0.2)] scale-105' 
                  : 'bg-transparent text-gold border-gold/10 hover:border-gold/40'
              }`}
            >
              {cat.label.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Product Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-40 border border-dashed border-gold/10 rounded-[4rem] bg-bg-card/30">
            <div className="max-w-md mx-auto">
              <p className="text-gold/40 font-serif text-2xl italic mb-6">No se han encontrado productos</p>
              <button 
                onClick={() => setActiveCategory('all')}
                className="text-gold text-[10px] uppercase tracking-[0.3em] border border-gold/20 px-8 py-3 rounded-full hover:bg-gold hover:text-bg-dark hover:border-gold transition-all font-bold"
              >
                Ver todo el catálogo
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer-like spacing */}
      <div className="py-20"></div>
    </div>
  )
}
