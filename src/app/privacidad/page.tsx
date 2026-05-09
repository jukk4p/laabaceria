import { createClient } from '@/lib/supabase/server';
import '../Legal.css';

export const dynamic = 'force-dynamic';

export default async function Privacidad() {
  const supabase = await createClient();
  const { data: siteContent } = await supabase.from('site_content').select('*');

  const defaultContent = `RESPONSABLE DEL TRATAMIENTO: LA ABACERÍA
FINALIDAD: Gestión de consultas, reservas y envío de información sobre nuestros productos gourmet.
LEGITIMACIÓN: Consentimiento del interesado.
DESTINATARIOS: No se cederán datos a terceros, salvo obligación legal.
DERECHOS: Tiene derecho a acceder, rectificar y suprimir los datos, así como otros derechos, como se explica en la información adicional.

Información adicional: Los datos personales proporcionados se conservarán mientras se mantenga la relación comercial o durante los años necesarios para cumplir con las obligaciones legales. Usted puede ejercer sus derechos dirigiéndose a C. Cervantes, 75, 41100 Coria del Río, Sevilla o vía email: info@laabaceriacoria.es.`;

  const content = siteContent?.find((c: any) => c.id === 'legal-privacidad-content')?.content || defaultContent;

  return (
    <article className="legal-page">
      <h1>Política de Privacidad</h1>
      <div className="legal-content-rich" style={{ whiteSpace: 'pre-wrap' }}>
        {content}
      </div>
    </article>
  );
}
