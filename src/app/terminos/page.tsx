import '../Legal.css';

export const dynamic = 'force-dynamic';

export default async function Terminos() {
  return (
    <article className="legal-page">
      <h1>Términos y Condiciones</h1>
      <div className="legal-content-rich">
        <section>
          <h2>1. Objeto y Ámbito de Aplicación</h2>
          <p>
            Las presentes Condiciones Generales regulan el acceso, navegación y uso del sitio web de LA ABACERÍA, así como las responsabilidades derivadas de la utilización de sus contenidos y cualquier otra comunicación comercial, incluyendo la adquisición de productos gourmet y servicios de reserva.
          </p>
        </section>

        <section>
          <h2>2. Productos y Precios</h2>
          <p>
            LA ABACERÍA se reserva el derecho a decidir, en cada momento, los productos que se ofrecen a los usuarios. Los precios indicados en pantalla están expresados en euros e incluyen el Impuesto sobre el Valor Adiñido (IVA) correspondiente.
          </p>
          <p>
            A pesar de nuestros esfuerzos por mantener la información actualizada, las imágenes de los productos (especialmente en el caso de cortes de jamón o embutidos artesanales) son ilustrativas y el producto final puede variar ligeramente en apariencia.
          </p>
        </section>

        <section>
          <h2>3. Proceso de Compra y Reserva</h2>
          <p>
            Actualmente, los pedidos y reservas se gestionan de forma personalizada a través de nuestros canales directos (WhatsApp, Teléfono o Formulario de Contacto). La confirmación de un pedido o reserva por estos medios implica la aceptación íntegra de estas condiciones.
          </p>
        </section>

        <section>
          <h2>4. Envíos y Entregas</h2>
          <p>
            Los plazos de entrega y costes de envío se comunicarán de forma transparente durante el proceso de compra personalizada. LA ABACERÍA trabaja con proveedores logísticos especializados para garantizar que los productos gourmet lleguen en condiciones óptimas.
          </p>
        </section>

        <section>
          <h2>5. Devoluciones y Desistimiento</h2>
          <p>
            Dada la naturaleza perecedera de muchos de nuestros productos (jamones, embutidos, quesos), el derecho de desistimiento solo será aplicable si el producto no ha sido abierto o manipulado y mantiene su precinto original, salvo en casos de defectos de calidad demostrables.
          </p>
        </section>

        <section>
          <h2>6. Legislación Aplicable y Jurisdicción</h2>
          <p>
            Las presentes condiciones se regirán por la legislación española. Para cualquier controversia que pudiera derivarse del acceso o uso de este sitio web, LA ABACERÍA y el USUARIO se someten a los Juzgados y Tribunales de Sevilla, con renuncia expresa a cualquier otro fuero que pudiera corresponderles.
          </p>
        </section>
      </div>
    </article>
  );
}
