'use client'

import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { useCart } from '@/context/CartContext'
import { ArrowLeft, Plus, ShoppingCart, Award, CheckCircle2, ShieldCheck, RefreshCw } from 'lucide-react'
import { WhatsAppIcon } from '@/components/SocialIcons'

export default function ProductDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const { addToCart } = useCart()
  const [product, setProduct] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(true)
  
  const supabase = createClient()

  React.useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', params.id)
        .single()
      
      if (data) setProduct(data)
      setLoading(false)
    }
    fetchProduct()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-dark flex flex-col items-center justify-center p-6">
        <RefreshCw size={32} className="text-gold animate-spin mb-4" />
        <p className="text-gold font-serif italic">Cargando selección gourmet...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-bg-dark flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-serif text-gold mb-4">Producto no encontrado</h1>
        <button 
          onClick={() => router.push('/catalogo')}
          className="text-gold border border-gold/20 px-8 py-3 rounded-full hover:bg-gold hover:text-bg-dark transition-all"
        >
          Volver al catálogo
        </button>
      </div>
    )
  }

  const categoryLabel = (cat: string) => {
    switch(cat) {
      case 'jamon': return 'JAMÓN IBÉRICO';
      case 'embutido': return 'EMBUTIDO';
      case 'queso': return 'QUESO';
      case 'conserva': return 'CONSERVA';
      case 'cesta': return 'CESTA GOURMET';
      default: return cat.toUpperCase();
    }
  }

  return (
    <div className="min-h-screen bg-bg-dark pt-32 pb-32 selection:bg-gold/30">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Navigation / Breadcrumb */}
        <nav className="mb-16">
          <button 
            onClick={() => router.back()}
            className="group flex items-center gap-3 text-gold/30 hover:text-gold transition-all duration-500 uppercase tracking-[0.3em] text-[10px] font-bold"
          >
            <div className="w-8 h-[1px] bg-gold/20 group-hover:w-12 group-hover:bg-gold transition-all duration-500" />
            Volver al catálogo
          </button>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          
          {/* Image Gallery Column (5/12) */}
          <div className="lg:col-span-5 space-y-8 sticky top-32">
            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-gold/10 bg-bg-product group shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
              <Image 
                src={product.image_url || product.image || '/images/placeholder.jpg'} 
                alt={product.name}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                priority
              />
              
              {/* Luxury Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/40 to-transparent" />
              
              {/* Corner Badges */}
              <div className="absolute top-8 left-8 flex flex-col gap-2">
                {product.category === 'jamon' && (
                  <span className="bg-gold text-bg-dark text-[9px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-2xl">
                    Auténtico Jabugo
                  </span>
                )}
              </div>
            </div>
            
            {/* Guarantee Pills */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Award, label: 'Calidad' },
                { icon: ShieldCheck, label: 'Origen' },
                { icon: CheckCircle2, label: 'Artesano' }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2 p-4 rounded-3xl bg-bg-card/30 border border-gold/5">
                  <item.icon size={18} className="text-gold/40" />
                  <span className="text-[9px] uppercase tracking-widest text-gold/40 font-bold">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Product Details Column (7/12) */}
          <div className="lg:col-span-7 flex flex-col pt-4">
            <div className="inline-flex items-center gap-4 mb-8">
              <span className="h-[1px] w-8 bg-gold/30" />
              <p className="text-gold/40 uppercase tracking-[0.6em] text-[11px] font-bold">
                {categoryLabel(product.category)}
              </p>
            </div>

            <h1 className="text-5xl md:text-7xl font-serif text-gold-muted leading-[1.1] mb-10">
              {product.name}
            </h1>

            <div className="flex items-center gap-6 mb-12">
              <div className="bg-bg-card/50 border border-gold/20 px-8 py-4 rounded-2xl">
                <span className="text-4xl font-serif text-gold leading-none">
                  {product.price.split('/')[0]}
                </span>
                {product.price.includes('/') && (
                  <span className="text-lg text-gold/40 font-light lowercase ml-1">
                    /{product.price.split('/')[1]}
                  </span>
                )}
              </div>
              <div className="h-12 w-[1px] bg-gold/10" />
              <p className="text-gold/30 text-xs italic font-serif max-w-[140px]">
                Selección exclusiva disponible por tiempo limitado.
              </p>
            </div>

            <div className="prose prose-invert max-w-none mb-16">
              <h3 className="text-gold/60 text-[11px] uppercase tracking-[0.3em] font-bold mb-6 flex items-center gap-4">
                La Experiencia Abacería
                <span className="flex-grow h-[1px] bg-gold/10" />
              </h3>
              <p className="text-gold-muted/80 text-xl font-light leading-relaxed font-serif italic mb-10">
                "{product.description}"
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="p-6 rounded-3xl bg-gradient-to-br from-bg-card/20 to-transparent border border-gold/5">
                  <h4 className="text-gold text-[10px] uppercase tracking-widest font-bold mb-3">Maridaje Recomendado</h4>
                  <p className="text-gold/50 text-sm leading-relaxed">
                    Ideal para acompañar con vinos tintos de crianza o blancos secos. Potencia su sabor con picos artesanos.
                  </p>
                </div>
                <div className="p-6 rounded-3xl bg-gradient-to-br from-bg-card/20 to-transparent border border-gold/5">
                  <h4 className="text-gold text-[10px] uppercase tracking-widest font-bold mb-3">Notas de Cata</h4>
                  <p className="text-gold/50 text-sm leading-relaxed">
                    Textura untuosa con matices dulces y frutos secos. Aroma profundo y persistente.
                  </p>
                </div>
              </div>
            </div>

            {/* Actions Panel */}
            <div className="bg-bg-card/40 border border-gold/10 p-10 rounded-[3rem] backdrop-blur-md">
              <div className="flex flex-col sm:flex-row gap-6">
                <button 
                  onClick={() => addToCart(product)}
                  className="flex-[2] bg-gold hover:bg-[#f3d49b] text-bg-dark py-6 rounded-2xl font-bold uppercase tracking-[0.3em] text-[12px] flex items-center justify-center gap-4 shadow-[0_20px_50px_rgba(197,160,89,0.3)] transition-all duration-500 hover:-translate-y-2 active:scale-[0.98]"
                >
                  <ShoppingCart size={18} />
                  Añadir al Carrito
                </button>
                
                <button 
                  onClick={() => window.open(`https://wa.me/34691419369?text=Hola, tengo una duda sobre: ${product.name}`, '_blank')}
                  className="flex-grow border border-gold/20 hover:border-gold/50 text-gold rounded-2xl transition-all duration-500 flex items-center justify-center gap-3 group px-8"
                >
                  <WhatsAppIcon size={18} className="text-gold/40 group-hover:text-gold transition-colors" />
                  <span className="text-[10px] uppercase tracking-widest font-bold">Consultar</span>
                </button>
              </div>
              
              <div className="mt-8 flex items-center justify-center gap-6 opacity-30">
                <div className="h-[1px] flex-grow bg-gold" />
                <p className="text-[9px] uppercase tracking-[0.4em] font-bold whitespace-nowrap">
                  Garantía La Abacería desde 1990
                </p>
                <div className="h-[1px] flex-grow bg-gold" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
