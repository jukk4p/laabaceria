import React from 'react';

const LocalSchema: React.FC = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "GourmetStore",
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
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:30",
        "closes": "14:30"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "17:30",
        "closes": "21:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/laabaceriacoria",
      "https://www.instagram.com/laabaceriacoria"
    ],
    "priceRange": "$$"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default LocalSchema;
