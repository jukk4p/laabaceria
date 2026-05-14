import { createClient } from './supabase/server'

export type SiteContent = Record<string, string>

export async function getSiteContent(): Promise<SiteContent> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('site_content')
    .select('id, content')

  if (error) {
    console.error('Error fetching site content:', error)
    return {}
  }

  const contentMap: SiteContent = {}
  data?.forEach((item) => {
    contentMap[item.id] = item.content
  })

  return contentMap
}

export async function getProducts() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return data || []
}
