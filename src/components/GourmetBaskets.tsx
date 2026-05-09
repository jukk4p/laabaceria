"use client";

import React, { useEffect, useRef } from 'react';
import './GourmetBaskets.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GourmetBaskets: React.FC<{ data?: any, items?: any[] }> = ({ data, items }) => {
  const sectionRef = useRef<HTMLElement>(null);
  
  const basketsData = data || {
    eyebrow: 'REGALOS CON ALMA',
    title: 'Cestas Gourmet'
  };

  const displayBaskets = items?.length ? items : [
    {
      id: 1,
      title: "Lote Degustación Tradicional",
      description: "Una selección equilibrada de nuestros mejores embutidos, regañás artesanales y aceite de oliva virgen extra.",
      price: "Desde 35€",
      waLink: "https://wa.me/34691419369?text=Hola, quiero consultar por el Lote Degustación Tradicional (Desde 35€)",
      badge: "Popular"
    },
    {
      id: 2,
      title: "Cesta Regalo Gourmet",
      description: "La experiencia completa: incluye nuestra selección de quesos premiados, embutidos ibéricos y conservas selectas.",
      price: "Desde 65€",
      waLink: "https://wa.me/34691419369?text=Hola, quiero consultar por la Cesta Regalo Gourmet (Desde 65€)",
      badge: "Premium"
    },
    {
      id: 3,
      title: "Pack Selección Abacería",
      description: "Personaliza tu pack con los productos que más te gusten de nuestra vitrina de exposición.",
      price: "A consultar",
      waLink: "https://wa.me/34691419369?text=Hola, quiero personalizar mi propio Pack Selección Abacería",
      badge: "Personalizado"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set(".basket-card", { opacity: 0, y: 30 });

      // Animate on scroll
      gsap.to(".basket-card", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          toggleActions: "play none none none"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="baskets-section" ref={sectionRef} id="cestas">
      <div className="section-header">
        <span className="eyebrow">{basketsData.subtitle}</span>
        <h2 className="section-title text-gradient-gold">{basketsData.title}</h2>
        <p className="section-subtitle">Selecciones artesanales para regalar o disfrutar</p>
      </div>

      <div className="baskets-grid">
        {displayBaskets.map((basket, index) => (
          <div 
            key={index} 
            className="basket-card"
          >
            <div className="basket-top">
              {basket.badge && <span className={`basket-badge ${basket.badge.toLowerCase().replace(' ', '-')}`}>{basket.badge}</span>}
              <div className="basket-image-container">
                <img src={basket.image} alt={basket.title} className="basket-image" />
              </div>
            </div>
            <div className="basket-content">
              <h3>{basket.title}</h3>
              <p>{basket.description || basket.desc}</p>
              <div className="basket-price">{basket.price || 'Consultar'}</div>
              <a 
                href={basket.waLink || `https://wa.me/34691419369?text=Hola, quiero consultar el precio de ${basket.title}`}
                target="_blank" 
                rel="noopener noreferrer" 
                className="basket-cta"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Encargar por WhatsApp
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GourmetBaskets;
