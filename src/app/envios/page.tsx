import PageHero from '@/components/PageHero'
import CTABand from '@/components/CTABand'
import EnviosClient from '@/components/EnviosClient'
import { getSiteContent } from '@/lib/content'
import AdminEditable from '@/components/AdminEditable'

export const dynamic = 'force-dynamic'

export default async function EnviosPage() {
  const content = await getSiteContent()

  return (
    <main className="min-h-screen">
      <PageHero 
        eyebrow={content['envios-hero-eyebrow'] || "SERVICIO A DOMICILIO"}
        title={content['envios-hero-title'] || "Envíos y Pedidos"}
        subtitle={content['envios-hero-subtitle'] || "Disfrute de la máxima calidad de nuestros ibéricos sin salir de casa, con todas las garantías de frescura y rapidez."}
        eyebrowId="envios-hero-eyebrow"
        titleId="envios-hero-title"
        subtitleId="envios-hero-subtitle"
      />

      <EnviosClient content={content} />

      <CTABand 
        title={content['envios-cta-title'] || "¿Listo para hacer tu pedido?"}
        subtitle={content['envios-cta-subtitle'] || "Escríbenos por WhatsApp y te atendemos en menos de 1 hora en horario de apertura."}
        buttonText={content['envios-cta-buttonText'] || "Hacer pedido por WhatsApp"}
        titleId="envios-cta-title"
        subtitleId="envios-cta-subtitle"
        buttonTextId="envios-cta-buttonText"
      />
    </main>
  )
}
