import { getProducts } from '@/lib/content'
import CatalogoClient from '@/components/CatalogoClient'

export const dynamic = 'force-dynamic'

export default async function CatalogoPage() {
  const products = await getProducts()
  console.log(`[CatalogoPage] Fetched ${products?.length || 0} products`);

  return <CatalogoClient initialProducts={products} />
}
