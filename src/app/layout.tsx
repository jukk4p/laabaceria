import type { Metadata } from 'next'
import './globals.css'
import LayoutWrapper from '@/components/LayoutWrapper'
import { getSiteContent } from '@/lib/content'

export const metadata: Metadata = {
  title: 'La Abacería | Jamones Ibéricos Gourmet · Coria del Río',
  description: 'Tienda gourmet de referencia en Coria del Río, Sevilla. Jamones ibéricos, embutidos artesanales y cestas gourmet desde 1990.',
  openGraph: {
    images: ['/og-image.jpg'],
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const content = await getSiteContent()
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    "name": "La Abacería",
    "description": "Tienda gourmet de jamones ibéricos y embutidos artesanales",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "C. Cervantes, 75",
      "addressLocality": "Coria del Río",
      "postalCode": "41100",
      "addressRegion": "Sevilla",
      "addressCountry": "ES"
    },
    "telephone": "+34691419369",
    "email": "info@laabaceriacoria.es",
    "url": "https://laabaceria.ivangonzalez.cloud",
    "openingHours": [
      "Mo-Fr 08:30-14:00",
      "Mo-Fr 17:30-21:00",
      "Sa 08:30-14:00"
    ],
    "priceRange": "€€",
    "servesCuisine": "Spanish"
  }

  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-bg-base text-gold antialiased">
        <LayoutWrapper content={content}>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  )
}
