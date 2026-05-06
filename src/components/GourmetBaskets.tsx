"use client";

import React, { useEffect, useRef } from 'react';
import './GourmetBaskets.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const baskets = [
  {
    id: 1,
    title: "Lote Degustación Tradicional",
    description: "Una selección equilibrada de nuestros mejores embutidos, regañás artesanales y aceite de oliva virgen extra.",
    price: "Consultar",
    image: "/images/cesta_pequeña.jpg",
    waLink: "https://wa.me/34691419369?text=Hola, quiero consultar el precio del Lote Degustación Tradicional",
    badge: "Popular"
  },
  {
    id: 2,
    title: "Cesta Regalo Gourmet",
    description: "La experiencia completa: incluye nuestra selección de quesos premiados, embutidos ibéricos y conservas selectas.",
    price: "Consultar",
    image: "/images/cesta_pequeña_variada.jpg",
    waLink: "https://wa.me/34691419369?text=Hola, quiero consultar el precio de la Cesta Regalo Gourmet",
    badge: "Premium"
  },
  {
    id: 3,
    title: "Pack Selección Abacería",
    description: "Personaliza tu pack con los productos que más te gusten de nuestra vitrina de exposición.",
    price: "Consultar",
    image: "/images/mas_productos.jpg",
    waLink: "https://wa.me/34691419369?text=Hola, quiero consultar por un Pack Selección Abacería",
    badge: "Personalizado"
  }
];

const GourmetBaskets: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

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
        <span className="eyebrow">REGALOS CON ALMA</span>
        <h2 className="section-title">Cestas Gourmet</h2>
        <div className="title-divider"></div>
      </div>

      <div className="baskets-grid">
        {baskets.map((basket, index) => (
          <div 
            key={basket.id} 
            className="basket-card"
          >
            <div className="basket-image-wrapper">
              {basket.badge && <span className="basket-badge">{basket.badge}</span>}
              <img src={basket.image} alt={basket.title} className="basket-image" />
              <div className="basket-price-tag">{basket.price}</div>
            </div>
            <div className="basket-content">
              <h3>{basket.title}</h3>
              <p>{basket.description}</p>
              <a 
                href={basket.waLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="basket-cta"
              >
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
