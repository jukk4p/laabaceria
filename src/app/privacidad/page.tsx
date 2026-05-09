import '../Legal.css';

export const dynamic = 'force-dynamic';

export default async function Privacidad() {
  return (
    <article className="legal-page">
      <h1>Política de Privacidad</h1>
      <div className="legal-content-rich">
        <section>
          <h2>1. Información al Usuario</h2>
          <p>
            LA ABACERÍA, como responsable del Tratamiento, le informa que, según lo dispuesto en el Reglamento (UE) 2016/679, de 27 de abril, (RGPD) y en la L.O. 3/2018, de 5 de diciembre, de protección de datos y garantía de los derechos digitales (LOPDGDD), trataremos sus datos tal y como reflejamos en la presente Política de Privacidad.
          </p>
        </section>

        <section>
          <h2>2. Finalidad del Tratamiento</h2>
          <p>Operaciones previstas para tratar los datos:</p>
          <ul>
            <li>Tramitación de pedidos, solicitudes o cualquier tipo de petición que sea realizada por el usuario a través de cualquiera de las formas de contacto que se ponen a su disposición.</li>
            <li>Gestión de reservas en nuestro establecimiento.</li>
            <li>Envío de comunicaciones comerciales publicitarias por e-mail, WhatsApp o cualquier otro medio electrónico o físico, presente o futuro, que posibilite realizar comunicaciones comerciales.</li>
          </ul>
        </section>

        <section>
          <h2>3. Criterios de Conservación de los Datos</h2>
          <p>
            Se conservarán durante no más tiempo del necesario para mantener el fin del tratamiento o existan prescripciones legales que dictaminen su custodia y cuando ya no sea necesario para ello, se suprimirán con medidas de seguridad adecuadas para garantizar la anonimización de los datos o la destrucción total de los mismos.
          </p>
        </section>

        <section>
          <h2>4. Comunicación de los Datos</h2>
          <p>
            No se comunicarán los datos a terceros, salvo obligación legal o a proveedores de servicios vinculados a la ejecución de pedidos y logística.
          </p>
        </section>

        <section>
          <h2>5. Derechos del Usuario</h2>
          <p>Usted tiene derecho a:</p>
          <ul>
            <li>Retirar el consentimiento en cualquier momento.</li>
            <li>Acceso, rectificación, portabilidad y supresión de sus datos, y limitación u oposición a su tratamiento.</li>
            <li>Derecho a presentar una reclamación ante la Autoridad de control (www.aepd.es) si considera que el tratamiento no se ajusta a la normativa vigente.</li>
          </ul>
        </section>

        <section>
          <h2>6. Datos de Contacto</h2>
          <p>
            Para ejercer sus derechos, puede dirigirse por correo postal a C. Cervantes, 75, 41100 Coria del Río, Sevilla o por email a <strong>info@laabaceriacoria.es</strong>.
          </p>
        </section>
      </div>
    </article>
  );
}
