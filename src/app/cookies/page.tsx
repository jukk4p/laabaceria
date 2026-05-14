'use client'

import PageHero from '@/components/PageHero'

export default function CookiesPage() {
  const indexItems = [
    "¿Qué son las cookies?",
    "Tipos de cookies que usamos",
    "Cookies de terceros",
    "Cómo gestionar las cookies",
    "Actualizaciones"
  ]

  return (
    <div className="flex flex-col bg-bg-base min-h-screen">
      <PageHero 
        eyebrow="LEGAL · LA ABACERÍA"
        title="Política de Cookies"
        subtitle="Información sobre las cookies que utilizamos y cómo puedes gestionarlas."
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
            {/* 1. Qué son */}
            <section>
              <h2 className="text-xl font-bold text-gold mb-8 flex items-center gap-4">
                <span className="text-gold">1.</span> ¿Qué son las cookies?
              </h2>
              <div className="text-gold-muted text-[15px] leading-relaxed">
                <p>Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web. Permiten que el sitio recuerde tus preferencias y mejoren tu experiencia de navegación. No contienen datos personales identificables por sí solas.</p>
              </div>
            </section>

            {/* 2. Tipos */}
            <section>
              <h2 className="text-xl font-bold text-gold mb-8 flex items-center gap-4">
                <span className="text-gold">2.</span> Tipos de cookies que usamos
              </h2>
              <div className="text-gold-muted text-[15px] space-y-8">
                <div>
                  <h4 className="text-gold text-sm font-bold mb-3 uppercase tracking-wider">Cookies técnicas (necesarias)</h4>
                  <p>Son imprescindibles para el funcionamiento básico del sitio. No requieren tu consentimiento y no pueden desactivarse. Incluyen cookies de sesión y preferencias básicas de navegación.</p>
                </div>
                <div>
                  <h4 className="text-gold text-sm font-bold mb-3 uppercase tracking-wider">Cookies analíticas</h4>
                  <p>Nos permiten conocer cómo los usuarios interactúan con el sitio (páginas más visitadas, tiempo de permanencia, errores). Usamos Google Analytics con IP anonimizada. Requieren tu consentimiento.</p>
                </div>
                <div>
                  <h4 className="text-gold text-sm font-bold mb-3 uppercase tracking-wider">Cookies de redes sociales</h4>
                  <p>Se generan al interactuar con los botones de Facebook o Instagram integrados en el sitio. Su uso está sujeto a las políticas de privacidad de cada red social.</p>
                </div>
              </div>
            </section>

            {/* 3. Terceros */}
            <section>
              <h2 className="text-xl font-bold text-gold mb-8 flex items-center gap-4">
                <span className="text-gold">3.</span> Cookies de terceros
              </h2>
              <div className="text-gold-muted text-[15px] space-y-6">
                <p>Las siguientes empresas pueden instalar cookies en tu dispositivo a través de nuestro sitio:</p>
                <ul className="space-y-3 pl-2">
                  <li className="flex gap-3">
                    <span className="text-gold mt-1.5 w-1 h-1 rounded-full bg-gold shrink-0"></span>
                    <span><strong>Google Analytics:</strong> análisis de tráfico y comportamiento de usuario</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gold mt-1.5 w-1 h-1 rounded-full bg-gold shrink-0"></span>
                    <span><strong>Google Maps:</strong> mapa interactivo de localización</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gold mt-1.5 w-1 h-1 rounded-full bg-gold shrink-0"></span>
                    <span><strong>Facebook / Meta:</strong> botón de redes sociales</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-gold mt-1.5 w-1 h-1 rounded-full bg-gold shrink-0"></span>
                    <span><strong>Instagram:</strong> botón de redes sociales</span>
                  </li>
                </ul>
                <p className="pt-4 italic">Cada proveedor tiene su propia política de privacidad que te recomendamos consultar.</p>
              </div>
            </section>

            {/* 4. Gestión */}
            <section>
              <h2 className="text-xl font-bold text-gold mb-8 flex items-center gap-4">
                <span className="text-gold">4.</span> Cómo gestionar las cookies
              </h2>
              <div className="text-gold-muted text-[15px] space-y-8">
                <p>Puedes aceptar, rechazar o configurar las cookies en cualquier momento a través del panel de configuración de cookies que aparece al acceder al sitio por primera vez.</p>
                <div>
                  <p className="mb-6 font-medium text-gold">También puedes configurar tu navegador para bloquear o eliminar cookies:</p>
                  <ul className="space-y-3 pl-2">
                    <li className="flex gap-3 items-center">
                      <span className="text-gold w-1 h-1 rounded-full bg-gold shrink-0"></span>
                      <span><strong>Chrome:</strong> Configuración → Privacidad → Cookies</span>
                    </li>
                    <li className="flex gap-3 items-center">
                      <span className="text-gold w-1 h-1 rounded-full bg-gold shrink-0"></span>
                      <span><strong>Firefox:</strong> Preferencias → Privacidad y seguridad</span>
                    </li>
                    <li className="flex gap-3 items-center">
                      <span className="text-gold w-1 h-1 rounded-full bg-gold shrink-0"></span>
                      <span><strong>Safari:</strong> Preferencias → Privacidad</span>
                    </li>
                    <li className="flex gap-3 items-center">
                      <span className="text-gold w-1 h-1 rounded-full bg-gold shrink-0"></span>
                      <span><strong>Edge:</strong> Configuración → Privacidad</span>
                    </li>
                  </ul>
                </div>
                <p className="pt-4 font-medium text-gold/60">Ten en cuenta que deshabilitar cookies técnicas puede afectar al funcionamiento del sitio.</p>
              </div>
            </section>

            {/* 5. Actualizaciones */}
            <section>
              <h2 className="text-xl font-bold text-gold mb-8 flex items-center gap-4">
                <span className="text-gold">5.</span> Actualizaciones
              </h2>
              <div className="text-gold-muted text-[15px] border-b border-gold/10 pb-20">
                <p>Podemos actualizar esta Política de Cookies cuando sea necesario para reflejar cambios en nuestras prácticas o en la legislación aplicable. Te recomendamos revisarla periódicamente. La fecha de última actualización aparece al inicio del documento.</p>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  )
}
