"use client";

import React, { useEffect, useRef } from 'react';
import './GourmetBaskets.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const baskets = [
  {
    id: 1,
    title: "Cesta Selección",
    description: "Una cuidada combinación de embutidos artesanos y nuestra selección de vino tinto de la casa.",
    price: "45€",
    image: "/images/cesta_seleccion.png",
    waLink: "https://wa.me/34691419369?text=Hola, quiero encargar la Cesta Selección de 45€"
  },
  {
    id: 2,
    title: "Cesta Ibérica",
    description: "Protagonizada por nuestro jamón de bellota cortado a mano, queso añejo y aceite de oliva virgen extra premium.",
    price: "85€",
    image: "/images/cesta_iberica.png",
    waLink: "https://wa.me/34691419369?text=Hola, quiero encargar la Cesta Ibérica de 85€",
    badge: "MÁS VENDIDA"
  },
  {
    id: 3,
    title: "Cesta Gran Gourmet",
    description: "Nuestra selección más completa y exclusiva, diseñada para las ocasiones más especiales.",
    price: "125€",
    image: "/images/cesta_gran_gourmet.png",
    waLink: "https://wa.me/34691419369?text=Hola, quiero encargar la Cesta Gran Gourmet de 125€"
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
