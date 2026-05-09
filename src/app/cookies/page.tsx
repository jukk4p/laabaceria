import '../Legal.css';

export const dynamic = 'force-dynamic';

export default async function Cookies() {
  return (
    <article className="legal-page">
      <h1>Política de Cookies</h1>
      <div className="legal-content-rich">
        <section>
          <p>
            Este sitio web utiliza cookies para mejorar la experiencia del usuario. A continuación encontrará información sobre qué son las cookies, qué tipo de cookies utiliza este portal y cómo puede desactivarlas en su navegador.
          </p>
        </section>

        <section>
          <h2>1. ¿Qué son las cookies?</h2>
          <p>
            Las cookies son pequeños archivos que algunas plataformas pueden instalar en su ordenador, smartphone o tableta. Sus funciones pueden ser muy variadas: almacenar sus preferencias de navegación, recopilar información estadística, permitir ciertas funcionalidades técnicas, etc.
          </p>
        </section>

        <section>
          <h2>2. Tipos de cookies que utilizamos</h2>
          <ul>
            <li><strong>Cookies técnicas:</strong> Son aquellas que permiten al usuario la navegación a través de una página web y la utilización de las diferentes opciones o servicios que en ella existan.</li>
            <li><strong>Cookies de análisis:</strong> Son aquellas que nos permiten cuantificar el número de usuarios y realizar la medición y análisis estadístico de la utilización que hacen los usuarios del servicio.</li>
            <li><strong>Cookies de personalización:</strong> Permiten al usuario acceder al servicio con algunas características de carácter general predefinidas.</li>
          </ul>
        </section>

        <section>
          <h2>3. ¿Cómo puede configurar sus preferencias?</h2>
          <p>
            Usted puede permitir, bloquear o eliminar las cookies instaladas en su equipo mediante la configuración de las opciones de su navegador de internet. En el caso de que las bloquee, es posible que ciertos servicios que necesitan su uso no estén disponibles para usted.
          </p>
          <p>
            A continuación le ofrecemos enlaces en los que encontrará información sobre cómo puede activar sus preferencias en los principales navegadores:
          </p>
          <ul>
            <li><strong>Google Chrome:</strong> Configuración &gt; Privacidad y seguridad</li>
            <li><strong>Mozilla Firefox:</strong> Opciones &gt; Privacidad y Seguridad</li>
            <li><strong>Apple Safari:</strong> Preferencias &gt; Privacidad</li>
            <li><strong>Microsoft Edge:</strong> Configuración &gt; Cookies y permisos del sitio</li>
          </ul>
        </section>

        <section>
          <h2>4. Actualizaciones y cambios</h2>
          <p>
            LA ABACERÍA puede modificar esta Política de Cookies en función de nuevas exigencias legislativas, reglamentarias, o con la finalidad de adaptar dicha política a las instrucciones dictadas por la Agencia Española de Protección de Datos.
          </p>
        </section>
      </div>
    </article>
  );
}
