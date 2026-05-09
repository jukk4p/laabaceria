import { createClient } from '@/lib/supabase/server';
import '../Legal.css';

export const dynamic = 'force-dynamic';

export default async function AvisoLegal() {
  const supabase = await createClient();
  const { data: siteContent } = await supabase.from('site_content').select('*');

  const defaultContent = `1. DATOS IDENTIFICATIVOS
En cumplimiento con el deber de información recogido en el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico, se reflejan los siguientes datos: la empresa titular de la web es LA ABACERÍA (en adelante La Abacería), con domicilio en C. Cervantes, 75, 41100 Coria del Río, Sevilla. Correo electrónico: info@laabaceriacoria.es.

2. USUARIOS
El acceso y/o uso de este portal de La Abacería atribuye la condición de USUARIO, que acepta, desde dicho acceso y/o uso, las Condiciones Generales de Uso aquí reflejadas.

3. USO DEL PORTAL
laabaceriacoria.es proporciona el acceso a multitud de informaciones, servicios o datos en Internet pertenecientes a La Abacería. El USUARIO asume la responsabilidad del uso del portal.

4. PROTECCIÓN DE DATOS
La Abacería cumple con las directrices del Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD), velando por garantizar un correcto uso y tratamiento de los datos personales del usuario.`;

  const content = siteContent?.find((c: any) => c.id === 'legal-aviso-content')?.content || defaultContent;

  return (
    <article className="legal-page">
      <h1>Aviso Legal</h1>
      <div className="legal-content-rich" style={{ whiteSpace: 'pre-wrap' }}>
        {content}
      </div>
    </article>
  );
}
