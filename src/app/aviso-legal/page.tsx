import { createClient } from '@/lib/supabase/server';
import '../Legal.css';

export const dynamic = 'force-dynamic';

export default async function AvisoLegal() {
  return (
    <article className="legal-page">
      <h1>Aviso Legal</h1>
      <div className="legal-content-rich">
        <section>
          <h2>1. Datos Identificativos</h2>
          <p>
            En cumplimiento con el deber de información recogido en el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico, se reflejan los siguientes datos:
          </p>
          <ul>
            <li><strong>Titular:</strong> LA ABACERÍA (Jamones y Embutidos La Abacería)</li>
            <li><strong>CIF/NIF:</strong> [Pendiente de completar]</li>
            <li><strong>Dirección:</strong> C. Cervantes, 75, 41100 Coria del Río, Sevilla</li>
            <li><strong>Email:</strong> info@laabaceriacoria.es</li>
            <li><strong>Teléfono:</strong> +34 691 41 93 69</li>
            <li><strong>Actividad:</strong> Venta de productos cárnicos, jamones, embutidos y productos gourmet.</li>
          </ul>
        </section>

        <section>
          <h2>2. Usuarios</h2>
          <p>
            El acceso y/o uso de este portal de La Abacería atribuye la condición de USUARIO, que acepta, desde dicho acceso y/o uso, las Condiciones Generales de Uso aquí reflejadas. Las citadas Condiciones serán de aplicación independientemente de las Condiciones Generales de Contratación que en su caso resulten de obligado cumplimiento.
          </p>
        </section>

        <section>
          <h2>3. Uso del Portal</h2>
          <p>
            <strong>laabaceriacoria.es</strong> proporciona el acceso a multitud de informaciones, servicios, programas o datos (en adelante, "los contenidos") en Internet pertenecientes a La Abacería o a sus licenciantes a los que el USUARIO pueda tener acceso.
          </p>
          <p>
            El USUARIO asume la responsabilidad del uso del portal. Dicha responsabilidad se extiende al registro que fuese necesario para acceder a determinados servicios o contenidos. En dicho registro el USUARIO será responsable de aportar información veraz y lícita.
          </p>
        </section>

        <section>
          <h2>4. Propiedad Intelectual e Industrial</h2>
          <p>
            La Abacería por sí o como cesionaria, es titular de todos los derechos de propiedad intelectual e industrial de su página web, así como de los elementos contenidos en la misma (a título enunciativo, imágenes, sonido, audio, vídeo, software o textos; marcas o logotipos, combinaciones de colores, estructura y diseño, selección de materiales usados, programas de ordenador necesarios para su funcionamiento, acceso y uso, etc.), titularidad de La Abacería o bien de sus licenciantes.
          </p>
          <p>
            Todos los derechos reservados. En virtud de lo dispuesto en los artículos 8 y 32.1, párrafo segundo, de la Ley de Propiedad Intelectual, quedan expresamente prohibidas la reproducción, la distribución y la comunicación pública, incluida su modalidad de puesta a disposición, de la totalidad o parte de los contenidos de esta página web, con fines comerciales, en cualquier soporte y por cualquier medio técnico, sin la autorización de La Abacería.
          </p>
        </section>

        <section>
          <h2>5. Exclusión de Garantías y Responsabilidad</h2>
          <p>
            La Abacería no se hace responsable, en ningún caso, de los daños y perjuicios de cualquier naturaleza que pudieran ocasionar, a título enunciativo: errores u omisiones en los contenidos, falta de disponibilidad del portal o la transmisión de virus o programas maliciosos o lesivos en los contenidos, a pesar de haber adoptado todas las medidas tecnológicas necesarias para evitarlo.
          </p>
        </section>

        <section>
          <h2>6. Modificaciones</h2>
          <p>
            La Abacería se reserva el derecho de efectuar sin previo aviso las modificaciones que considere oportunas en su portal, pudiendo cambiar, suprimir o añadir tanto los contenidos y servicios que se presten a través de la misma como la forma en la que éstos aparezcan presentados o localizados en su portal.
          </p>
        </section>
      </div>
    </article>
  );
}


