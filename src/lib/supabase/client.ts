import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    // Si faltan las variables (como en el paso de build de Railway), 
    // devolvemos un cliente vacío o manejamos el error sin explotar.
    console.warn("Supabase keys missing. This is expected during build if not provided.");
    return {} as any;
  }

  return createBrowserClient(url, key)
}
