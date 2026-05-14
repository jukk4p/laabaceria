import { createClient } from './supabase/client'

export type SiteContent = Record<string, string>

export async function getSiteContent(): Promise<SiteContent> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('site_content')
    .select('id, content')

  if (error) {
    console.error('Error fetching site content:', error)
    return {}
  }

  const contentMap: SiteContent = {}
  data?.forEach((item: { id: string; content: string }) => {
    contentMap[item.id] = item.content
  })

  return contentMap
}

export async function getProducts() {
  const supabase = createClient()
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

export async function getMessages(supabaseClient?: any) {
  const supabase = supabaseClient || createClient()
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })


  if (error) {
    console.error('Error fetching messages:', error)
    return []
  }

  return data || []
}

