export interface Product {
  id: string
  name: string
  description: string
  price: string
  category: 'jamon' | 'embutido' | 'queso' | 'conserva' | 'cesta' | string
  image?: string
  image_url?: string
  badge?: string
  featured?: boolean
  created_at?: string
}
