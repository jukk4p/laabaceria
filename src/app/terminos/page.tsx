import { createClient } from '@/lib/supabase/server';
import '../Legal.css';

export const dynamic = 'force-dynamic';

export default async function Terminos() {
  const supabase = await createClient();
  const { data: siteContent } = await supabase.from('site_content').select('*');

  const defaultContent = `1. OBJETO Y ÁMBITO DE APLICACIÓN
Las presentes Condiciones Generales regulan el acceso y uso del sitio web de La Abacería, así como la adquisición de sus productos y servicios de reserva.

2. PRODUCTOS Y PRECIOS
La Abacería se reserva el derecho a decidir, en cada momento, los productos que se ofrecen a los usuarios. Los precios indicados en pantalla incluyen el IVA correspondiente.

3. PROCESO DE COMPRA/RESERVA
Los pedidos y reservas podrán gestionarse directamente a través de los canales de contacto facilitados (WhatsApp, teléfono o formulario). La formalización de la reserva implica la aceptación íntegra de estas condiciones.

4. DEVOLUCIONES Y CANCELACIONES
Dada la naturaleza perecedera de muchos de nuestros productos gourmet (jamones, embutidos, quesos), las devoluciones se regirán por la normativa vigente para productos de alimentación. Para cancelaciones de reservas, se ruega avisar con un mínimo de 24 horas de antelación.`;

  const content = siteContent?.find((c: any) => c.id === 'legal-terminos-content')?.content || defaultContent;

  return (
    <article className="legal-page">
      <h1>Términos y Condiciones</h1>
      <div className="legal-content-rich" style={{ whiteSpace: 'pre-wrap' }}>
        {content}
      </div>
    </article>
  );
}
