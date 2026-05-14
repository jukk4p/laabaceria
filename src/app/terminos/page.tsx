'use client'

import PageHero from '@/components/PageHero'

export default function TerminosPage() {
  const indexItems = [
    "Proceso de compra",
    "Precios y formas de pago",
    "Envío y entrega",
    "Devoluciones y desistimiento",
    "Garantías",
    "Modificaciones"
  ]

  return (
    <div className="flex flex-col bg-bg-base min-h-screen">
      <PageHero 
        eyebrow="LEGAL · LA ABACERÍA"
        title="Términos y Condiciones"
        subtitle="Condiciones generales que regulan la compra de productos en La Abacería."
      />

      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <p className="text-gold/40 text-xs mb-12 font-medium italic">Última actualización: enero de 2026</p>

          <div className="bg-bg-card border border-gold/10 p-8 md:p-10 rounded-2xl mb-20 max-w-2xl">
            <h3 className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold mb-6">ÍNDICE</h3>
            <ul className="space-y-3">
              {indexItems.map((item, idx) => (
                <li key={idx} className="flex gap-4 text-sm">
                  <span className="text-gold font-bold">{idx + 1}.</span>
                  <span className="text-gold-muted hover:text-gold transition-colors cursor-pointer">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-24">
            {/* 1. Proceso de compra */}
            <section id="section-1">
              <h2 className="text-xl font-bold text-gold mb-8 flex items-center gap-4">
                <span className="text-gold">1.</span> Proceso de compra
              </h2>
              <div className="text-gold-muted text-[15px] space-y-6">
                <p>
                  Los pedidos en La Abacería se realizan a través de los canales habilitados: WhatsApp (+34 691 419 369), formulario de contacto web o llamada telefónica. Una vez recibida tu solicitud, te enviaremos confirmación con el detalle del pedido, precio final e instrucciones de pago.
                </p>
                <p>
                  El contrato de compraventa se perfecciona en el momento en que La Abacería confirma expresamente la disponibilidad de los productos y el cliente confirma el pedido.
                </p>
              </div>
            </section>

            {/* 2. Precios */}
            <section id="section-2">
              <h2 className="text-xl font-bold text-gold mb-8 flex items-center gap-4">
                <span className="text-gold">2.</span> Precios y formas de pago
              </h2>
              <div className="text-gold-muted text-[15px] leading-relaxed space-y-8">
                <p>Todos los precios mostrados en el sitio web incluyen el IVA correspondiente. La Abacería se reserva el derecho de modificar los precios sin previo aviso, garantizando siempre el precio vigente en el momento de la confirmación del pedido.</p>
                <div>
                  <h4 className="text-gold text-sm font-bold mb-4 uppercase tracking-wider">Formas de pago aceptadas</h4>
                  <ul className="space-y-3 pl-2">
                    <li className="flex gap-3 items-center">
                      <span className="text-gold w-1 h-1 rounded-full bg-gold shrink-0"></span>
                      <span>Efectivo (en tienda física)</span>
                    </li>
                    <li className="flex gap-3 items-center">
                      <span className="text-gold w-1 h-1 rounded-full bg-gold shrink-0"></span>
                      <span>Tarjeta de débito/crédito (Visa, Mastercard)</span>
                    </li>
                    <li className="flex gap-3 items-center">
                      <span className="text-gold w-1 h-1 rounded-full bg-gold shrink-0"></span>
                      <span>Transferencia bancaria</span>
                    </li>
                    <li className="flex gap-3 items-center">
                      <span className="text-gold w-1 h-1 rounded-full bg-gold shrink-0"></span>
                      <span>Bizum (consultar disponibilidad)</span>
                    </li>
                  </ul>
                </div>
                <p className="italic text-gold/40 font-medium">No almacenamos datos de tarjetas bancarias. Los pagos por transferencia deben realizarse antes de la preparación del pedido.</p>
              </div>
            </section>

            {/* 3. Envíos */}
            <section id="section-3">
              <h2 className="text-xl font-bold text-gold mb-8 flex items-center gap-4">
                <span className="text-gold">3.</span> Envío y entrega
              </h2>
              <div className="text-gold-muted text-[15px] leading-relaxed space-y-6">
                <p>Realizamos envíos a toda la Península Ibérica. Los pedidos se procesan de lunes a viernes (excepto festivos). Debido a la naturaleza artesanal de nuestros productos, algunos tiempos de preparación pueden variar.</p>
                <ul className="space-y-3 pl-2">
                  <li className="flex gap-3">
                    <span className="text-gold mt-1.5 w-1 h-1 rounded-full bg-gold shrink-0"></span>
                    <span><strong>Provincia de Sevilla:</strong> 24-48 horas laborables.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gold mt-1.5 w-1 h-1 rounded-full bg-gold shrink-0"></span>
                    <span><strong>Resto de la Península:</strong> 48-72 horas laborables.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* 4. Devoluciones */}
            <section id="section-4">
              <h2 className="text-xl font-bold text-gold mb-8 flex items-center gap-4">
                <span className="text-gold">4.</span> Devoluciones y desistimiento
              </h2>
              <div className="text-gold-muted text-[15px] space-y-6">
                <p>
                  Los productos alimenticios que pueden deteriorarse rápidamente quedan excluidos del derecho de desistimiento de 14 días conforme al artículo 103 del Real Decreto Legislativo 1/2007.
                </p>
                <p>
                  No obstante, si el producto llega en mal estado o no corresponde al pedido confirmado, lo gestionaremos con reenvío o reembolso íntegro. Debes notificarnos en las primeras 24 horas desde la recepción con fotografía del producto y el embalaje.
                </p>
              </div>
            </section>

            {/* 5. Garantía */}
            <section id="section-5">
              <h2 className="text-xl font-bold text-gold mb-8 flex items-center gap-4">
                <span className="text-gold">5.</span> Garantías
              </h2>
              <div className="text-gold-muted text-[15px] space-y-6">
                <p>
                  Todos nuestros productos cumplen con la normativa española y europea de seguridad alimentaria. Las fechas de caducidad o consumo preferente se indican en el etiquetado de cada producto conforme a la normativa vigente.
                </p>
                <p>
                  La Abacería garantiza que los productos son auténticos, corresponden a las denominaciones indicadas y han sido almacenados en las condiciones adecuadas hasta su envío.
                </p>
              </div>
            </section>

            {/* 6. Modificaciones */}
            <section id="section-6">
              <h2 className="text-xl font-bold text-gold mb-8 flex items-center gap-4">
                <span className="text-gold">6.</span> Modificaciones
              </h2>
              <div className="text-gold-muted text-[15px] border-b border-gold/10 pb-20 space-y-6">
                <p>
                  La Abacería se reserva el derecho a modificar estas condiciones en cualquier momento. Las modificaciones entrarán en vigor desde su publicación en el sitio web. Los pedidos en curso se regirán por las condiciones vigentes en el momento de su confirmación.
                </p>
                <p>Para cualquier duda sobre estas condiciones, contáctanos en <strong>info@laabaceriacoria.es</strong>.</p>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  )
}
