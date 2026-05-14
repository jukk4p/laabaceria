import { getProducts, getSiteContent } from '@/lib/content'
import CatalogoClient from '@/components/CatalogoClient'
import PageHero from '@/components/PageHero'

export const dynamic = 'force-dynamic'

export default async function CatalogoPage() {
  const [products, siteContent] = await Promise.all([
    getProducts(),
    getSiteContent()
  ])
  
  return (
    <div className="flex flex-col min-h-screen">
      <PageHero 
        eyebrow={siteContent['catalogo-eyebrow'] || "SELECCIÓN ARTESANAL"}
        title={siteContent['catalogo-title'] || "Nuestro Catálogo"}
        subtitle={siteContent['catalogo-subtitle'] || "Descubre nuestra exclusiva selección de jamones ibéricos, embutidos artesanos y productos gourmet de la máxima calidad."}
        eyebrowId="catalogo-eyebrow"
        titleId="catalogo-title"
        subtitleId="catalogo-subtitle"
      />
      <CatalogoClient initialProducts={products} />
    </div>
  )
}
