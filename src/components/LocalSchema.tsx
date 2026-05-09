import React from 'react';

const LocalSchema: React.FC = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    "name": "La Abacería",
    "image": "https://laabaceriacoria.es/images/hero.png",
    "@id": "https://laabaceriacoria.es",
    "url": "https://laabaceriacoria.es",
    "telephone": "+34691419369",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "C. Cervantes, 75",
      "addressLocality": "Coria del Río",
      "addressRegion": "Sevilla",
      "postalCode": "41100",
      "addressCountry": "ES"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 37.284245,
      "longitude": -6.052684
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:30",
        "closes": "14:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "17:30",
        "closes": "21:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "08:30",
        "closes": "14:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/laabaceria",
      "https://www.instagram.com/laabaceria"
    ],
    "priceRange": "€€",
    "servesCuisine": "Gourmet, Ibéricos, Vinos",
    "hasMap": "https://www.google.com/maps?cid=126344556677889900"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default LocalSchema;
