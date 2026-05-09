import { createClient } from '@/lib/supabase/server';
import '../Legal.css';

export const dynamic = 'force-dynamic';

export default async function Cookies() {
  const supabase = await createClient();
  const { data: siteContent } = await supabase.from('site_content').select('*');

  const defaultContent = `Este sitio web utiliza cookies para mejorar la experiencia del usuario. A continuación encontrará información sobre qué son las cookies, qué tipo de cookies utiliza este portal y cómo puede desactivarlas en su navegador.

¿QUÉ SON LAS COOKIES?
Las cookies son pequeños archivos que algunas plataformas pueden instalar en su ordenador, smartphone o tableta.

TIPOS DE COOKIES QUE UTILIZAMOS:
1. Cookies técnicas: Son aquellas que permiten al usuario la navegación a través de una página web y la utilización de las diferentes opciones o servicios que en ella existan.
2. Cookies de análisis: Son aquellas que nos permiten cuantificar el número de usuarios y realizar la medición y análisis estadístico de la utilización que hacen los usuarios del servicio.
3. Cookies de personalización: Permiten al usuario acceder al servicio con algunas características de carácter general predefinidas.`;

  const content = siteContent?.find((c: any) => c.id === 'legal-cookies-content')?.content || defaultContent;

  return (
    <article className="legal-page">
      <h1>Política de Cookies</h1>
      <div className="legal-content-rich" style={{ whiteSpace: 'pre-wrap' }}>
        {content}
      </div>
    </article>
  );
}
