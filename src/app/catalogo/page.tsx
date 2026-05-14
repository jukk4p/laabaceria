import { getProducts } from '@/lib/content'
import CatalogoClient from '@/components/CatalogoClient'
import PageHero from '@/components/PageHero'

export const dynamic = 'force-dynamic'

export default async function CatalogoPage() {
  const products = await getProducts()
  
  return (
    <div className="flex flex-col min-h-screen">
      <PageHero 
        eyebrow="SELECCIÓN ARTESANAL"
        title="Nuestro Catálogo"
        subtitle="Descubre nuestra exclusiva selección de jamones ibéricos, embutidos artesanos y productos gourmet de la máxima calidad."
      />
      <CatalogoClient initialProducts={products} />
    </div>
  )
}
