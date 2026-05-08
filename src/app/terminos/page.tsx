import { createClient } from '@/lib/supabase/server';
import '../Legal.css';

export const dynamic = 'force-dynamic';

export default async function Terminos() {
  const supabase = await createClient();
  const { data: siteContent } = await supabase.from('site_content').select('*');

  const content = siteContent?.find(c => c.id === 'legal-terminos-content')?.content || 'Contenido no disponible.';

  return (
    <article className="legal-page">
      <h1>Términos y Condiciones</h1>
      <div className="legal-content-rich" style={{ whiteSpace: 'pre-wrap' }}>
        {content}
      </div>
    </article>
  );
}
