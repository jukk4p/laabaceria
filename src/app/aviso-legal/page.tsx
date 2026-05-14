'use client'

import PageHero from '@/components/PageHero'

export default function AvisoLegalPage() {
  const indexItems = [
    "Datos identificativos del titular",
    "Objeto y ámbito de aplicación",
    "Condiciones de uso",
    "Propiedad intelectual e industrial",
    "Responsabilidad",
    "Legislación aplicable"
  ]

  return (
    <div className="flex flex-col bg-bg-base min-h-screen">
      <PageHero 
        eyebrow="LEGAL · LA ABACERÍA"
        title="Aviso Legal"
        subtitle="Información legal sobre el titular del sitio web y las condiciones de uso."
      />

      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Last Update */}
          <p className="text-gold/40 text-xs mb-12 font-medium italic">Última actualización: enero de 2026</p>

          {/* Index Box */}
          <div className="bg-bg-card border border-gold/10 p-8 md:p-10 rounded-2xl mb-20 max-w-2xl">
            <h3 className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold mb-6">ÍNDICE</h3>
            <ul className="space-y-3">
              {indexItems.map((item, idx) => (
                <li key={idx} className="flex gap-4 text-sm">
                  <span className="text-gold font-bold">{idx + 1}.</span>
                  <span className="text-text-muted hover:text-gold transition-colors cursor-pointer">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Content Sections */}
          <div className="space-y-24">
            {/* 1. Datos Identificativos */}
            <section id="section-1">
              <h2 className="text-xl font-bold text-gold mb-8 flex items-center gap-4">
                <span className="text-gold">1.</span> Datos identificativos del titular
              </h2>
              <div className="text-gold-muted text-[15px] leading-relaxed space-y-6">
                <p>
                  En cumplimiento de la Ley 34/2002, de 11 de julio, de servicios de la sociedad de la información y de Comercio Electrónico (LSSI-CE), se informa de los datos identificativos del responsable de este sitio web:
                </p>
                <ul className="space-y-4 pt-2">
                  {[
                    { label: "Denominación", value: "La Abacería – Jamones y Embutidos Gourmet" },
                    { label: "Domicilio", value: "C. Cervantes, 75 – 41100 Coria del Río, Sevilla." },
                    { label: "Teléfono", value: "+34 691 419 369" },
                    { label: "Email", value: "info@laabaceriacoria.es" },
                    { label: "Web", value: "laabaceria.juangonzalez.cloud" }
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-4 items-start">
                      <span className="text-gold/60 shrink-0 min-w-[120px] font-medium text-xs uppercase tracking-wider mt-1">{item.label}:</span>
                      <span className="text-gold-muted">{item.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* 2. Objeto y ámbito */}
            <section id="section-2">
              <h2 className="text-xl font-bold text-gold mb-8 flex items-center gap-4">
                <span className="text-gold">2.</span> Objeto y ámbito de aplicación
              </h2>
              <div className="text-gold-muted text-[15px] leading-relaxed">
                <p>
                  El presente Aviso Legal regula el acceso y uso del sitio web titularidad de La Abacería, al que se accede a través de la URL indicada. El acceso al sitio web atribuye la condición de usuario e implica la aceptación de las presentes condiciones.
                </p>
              </div>
            </section>

            {/* 3. Condiciones de uso */}
            <section id="section-3">
              <h2 className="text-xl font-bold text-gold mb-8 flex items-center gap-4">
                <span className="text-gold">3.</span> Condiciones de uso
              </h2>
              <div className="text-gold-muted text-[15px] leading-relaxed space-y-6">
                <p>
                  El usuario se compromete a utilizar el sitio web de conformidad con la ley, la moral y el orden público. Queda prohibido utilizar el sitio con fines ilícitos o lesivos, o que de cualquier forma puedan dañar o perjudicar el sitio o sus servicios.
                </p>
                <div>
                  <h4 className="text-gold text-sm font-bold mb-4 uppercase tracking-wider">Uso correcto del sitio</h4>
                  <p>
                    El usuario debe abstenerse de obtener informaciones, mensajes, gráficos, dibujos, archivos de sonido y/o imagen, fotografías, grabaciones, software y, en general, cualquier clase de material accesible a través del sitio web, utilizando para ello medios o procedimientos distintos de los que se hayan puesto a su disposición.
                  </p>
                </div>
              </div>
            </section>

            {/* 4. Propiedad Intelectual */}
            <section id="section-4">
              <h2 className="text-xl font-bold text-gold mb-8 flex items-center gap-4">
                <span className="text-gold">4.</span> Propiedad intelectual e industrial
              </h2>
              <div className="text-gold-muted text-[15px] leading-relaxed space-y-6">
                <p>
                  Todos los contenidos del sitio web (textos, fotografías, gráficos, imágenes, iconos, tecnología, software, enlaces y demás contenidos audiovisuales o sonoros) son propiedad de La Abacería o de terceros que han autorizado su uso.
                </p>
                <p>
                  Queda expresamente prohibida la reproducción, distribución, comunicación pública y transformación de los contenidos de este sitio web sin la autorización expresa y por escrito del titular.
                </p>
              </div>
            </section>

            {/* 5. Responsabilidad */}
            <section id="section-5">
              <h2 className="text-xl font-bold text-gold mb-8 flex items-center gap-4">
                <span className="text-gold">5.</span> Responsabilidad
              </h2>
              <div className="text-gold-muted text-[15px] leading-relaxed">
                <p>
                  La Abacería no se hace responsable de los daños y perjuicios de cualquier naturaleza que pudieran derivarse de la falta de disponibilidad o continuidad del funcionamiento del sitio web, del mal uso que el usuario haga del sitio, ni de la información contenida en el mismo cuando provenga de fuentes ajenas.
                </p>
              </div>
            </section>

            {/* 6. Legislación */}
            <section id="section-6">
              <h2 className="text-xl font-bold text-gold mb-8 flex items-center gap-4">
                <span className="text-gold">6.</span> Legislación aplicable
              </h2>
              <div className="text-gold-muted text-[15px] leading-relaxed border-b border-gold/10 pb-20">
                <p>
                  Las relaciones entre La Abacería y los usuarios se rigen por la legislación española vigente. Para la resolución de cualquier controversia, las partes se someten a los juzgados y tribunales de Sevilla, España.
                </p>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  )
}
