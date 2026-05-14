'use client'

import PageHero from '@/components/PageHero'

export default function PrivacidadPage() {
  const indexItems = [
    "Responsable del tratamiento",
    "Datos que recogemos",
    "Finalidad del tratamiento",
    "Base legal",
    "Conservación de los datos",
    "Tus derechos",
    "Cesión de datos a terceros",
    "Seguridad"
  ]

  return (
    <div className="flex flex-col bg-bg-base min-h-screen">
      <PageHero 
        eyebrow="LEGAL · LA ABACERÍA"
        title="Política de Privacidad"
        subtitle="Cómo recogemos, usamos y protegemos tus datos personales conforme al RGPD."
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
            {/* 1. Responsable */}
            <section>
              <h2 className="text-xl font-bold text-gold mb-8 flex items-center gap-4">
                <span className="text-gold">1.</span> Responsable del tratamiento
              </h2>
              <ul className="space-y-4 text-gold-muted text-[15px]">
                <li className="flex gap-4">
                  <span className="text-gold/40 text-[10px] uppercase tracking-widest mt-1 min-w-[120px]">Denominación:</span>
                  <span>La Abacería – Jamones y Embutidos Gourmet</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-gold/40 text-[10px] uppercase tracking-widest mt-1 min-w-[120px]">Domicilio:</span>
                  <span>C. Cervantes, 75 – 41100 Coria del Río, Sevilla.</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-gold/40 text-[10px] uppercase tracking-widest mt-1 min-w-[120px]">Email:</span>
                  <span>info@laabaceriacoria.es</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-gold/40 text-[10px] uppercase tracking-widest mt-1 min-w-[120px]">Teléfono:</span>
                  <span>+34 691 419 369</span>
                </li>
              </ul>
            </section>

            {/* 2. Datos */}
            <section>
              <h2 className="text-xl font-bold text-gold mb-8 flex items-center gap-4">
                <span className="text-gold">2.</span> Datos que recogemos
              </h2>
              <div className="text-gold-muted text-[15px] space-y-6">
                <p>Recopilamos los datos que nos proporcionas voluntariamente al contactar con nosotros a través del formulario de contacto, WhatsApp, email o teléfono:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Nombre y apellidos</li>
                  <li>Dirección de email</li>
                  <li>Número de teléfono</li>
                  <li>Dirección postal (para gestión de pedidos)</li>
                  <li>Contenido de tus mensajes y preferencias de productos</li>
                </ul>
                <p>También recogemos datos de navegación a través de cookies técnicas necesarias para el funcionamiento del sitio.</p>
              </div>
            </section>

            {/* 3. Finalidad */}
            <section>
              <h2 className="text-xl font-bold text-gold mb-8 flex items-center gap-4">
                <span className="text-gold">3.</span> Finalidad del tratamiento
              </h2>
              <div className="text-gold-muted text-[15px] space-y-6">
                <p>Utilizamos tus datos para las siguientes finalidades:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Gestionar y procesar tus pedidos y solicitudes.</li>
                  <li>Comunicarnos contigo para facilitar la consulta o pedido.</li>
                  <li>Enviarte información sobre nuestra selección artesanal si lo solicitas expresamente.</li>
                  <li>Cumplir con nuestras obligaciones legales y fiscales.</li>
                </ul>
              </div>
            </section>

            {/* 4. Base legal */}
            <section>
              <h2 className="text-xl font-bold text-gold mb-8 flex items-center gap-4">
                <span className="text-gold">4.</span> Base legal
              </h2>
              <div className="text-gold-muted text-[15px]">
                <p>El tratamiento de tus datos se basa en: (a) la ejecución de un contrato o pre-contrato cuando realizas un pedido; (b) tu consentimiento expreso cuando contactas con nosotros o solicitas información; y (c) el cumplimiento de obligaciones legales aplicables.</p>
              </div>
            </section>

            {/* 5. Conservación */}
            <section>
              <h2 className="text-xl font-bold text-gold mb-8 flex items-center gap-4">
                <span className="text-gold">5.</span> Conservación de los datos
              </h2>
              <div className="text-gold-muted text-[15px]">
                <p>Conservaremos tus datos durante el tiempo necesario para cumplir la finalidad para la que fueron recogidos y para cumplir con las obligaciones legales correspondientes. Los datos de clientes se conservan durante el plazo de prescripción de acciones legales aplicables (generalmente 5 años desde la última transacción).</p>
              </div>
            </section>

            {/* 6. Derechos */}
            <section>
              <h2 className="text-xl font-bold text-gold mb-8 flex items-center gap-4">
                <span className="text-gold">6.</span> Tus derechos
              </h2>
              <div className="text-gold-muted text-[15px] space-y-6">
                <p>Puedes ejercer en cualquier momento los siguientes derechos ante La Abacería:</p>
                <ul className="list-disc pl-5 space-y-2 font-medium">
                  <li>Acceso: conocer qué datos tuyos tratamos.</li>
                  <li>Rectificación: corregir datos inexactos o incompletos.</li>
                  <li>Supresión: solicitar la eliminación de tus datos.</li>
                  <li>Portabilidad: recibir tus datos en formato estructurado.</li>
                  <li>Oposición: oponerte al tratamiento en determinadas circunstancias.</li>
                  <li>Limitación: solicitar la restricción del tratamiento.</li>
                </ul>
                <p>Para ejercer estos derechos, escríbenos a <strong>info@laabaceriacoria.es</strong>. También puedes presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD).</p>
              </div>
            </section>

            {/* 7. Cesión */}
            <section>
              <h2 className="text-xl font-bold text-gold mb-8 flex items-center gap-4">
                <span className="text-gold">7.</span> Cesión de datos a terceros
              </h2>
              <div className="text-gold-muted text-[15px]">
                <p>No cedemos tus datos a terceros salvo cuando sea necesario para la prestación del servicio (empresas de transporte para gestionar envíos) o cuando estemos legalmente obligados a ello. Estas empresas actúan como encargados del tratamiento bajo las instrucciones de La Abacería.</p>
              </div>
            </section>

            {/* 8. Seguridad */}
            <section>
              <h2 className="text-xl font-bold text-gold mb-8 flex items-center gap-4">
                <span className="text-gold">8.</span> Seguridad
              </h2>
              <div className="text-gold-muted text-[15px] border-b border-gold/10 pb-20">
                <p>Aplicamos medidas técnicas y organizativas adecuadas para proteger tus datos frente a accesos no autorizados, pérdida, alteración o divulgación. Nuestro sitio web utiliza cifrado SSL para la transmisión de datos.</p>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  )
}
