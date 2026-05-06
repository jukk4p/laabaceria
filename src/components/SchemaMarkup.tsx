export default function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://laabaceria.es/#business",
        "name": "La Abacería Jamones y Embutidos",
        "description": "Tienda especializada en jamones ibéricos, embutidos artesanales y productos gourmet en Coria del Río, Sevilla.",
        "url": "https://laabaceria.es",
        "telephone": "+34691419369",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Calle Cervantes, 75",
          "addressLocality": "Coria del Río",
          "postalCode": "41100",
          "addressRegion": "Sevilla",
          "addressCountry": "ES"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 37.285,
          "longitude": -6.058
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "closes": "21:00"
        },
        "priceRange": "€€",
        "servesCuisine": ["Jamones ibéricos", "Embutidos", "Productos gourmet"],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "32",
          "bestRating": "5"
        },
        "image": "https://laabaceria.es/images/hero.png"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
