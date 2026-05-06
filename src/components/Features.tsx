'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Features.css';

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    title: "Corte a Cuchillo",
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 17.5L3 6l3-3 11.5 11.5" />
        <path d="M13 19l6-6" />
        <path d="M16 16l4 4" />
        <path d="M19 21l2-2" />
      </svg>
    ),
    desc: "Maestría en cada loncha para preservar todo el aroma y sabor."
  },
  {
    title: "Selección en Dehesa",
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20V10" />
        <path d="M18 14l-6-6-6 6" />
        <path d="M20 20a8 8 0 0 0-16 0" />
      </svg>
    ),
    desc: "Solo las mejores piezas de bellota llegan a nuestra abacería."
  },
  {
    title: "Tradición Local",
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    desc: "Más de 30 años siendo el referente gourmet de Coria del Río."
  }
];

export default function Features() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(".feature-card", {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 90%",
      }
    });
  }, { scope: container });

  return (
    <section className="features-section" ref={container}>
      <div className="features-grid">
        {FEATURES.map((f, i) => (
          <div key={i} className="feature-card">
            <div className="feature-icon">{f.icon}</div>
            <h3 className="feature-title">{f.title}</h3>
            <p className="feature-desc">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
