'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Features.css';

gsap.registerPlugin(ScrollTrigger);

export default function Features({ data }: { data?: any[] }) {
  const container = useRef<HTMLDivElement>(null);

  const displayFeatures = data?.length ? data : [
    {
      title: "Corte a Cuchillo",
      desc: "Maestría en cada loncha para preservar todo el aroma y sabor."
    },
    {
      title: "Selección en Dehesa",
      desc: "Solo las mejores piezas de bellota llegan a nuestra abacería."
    },
    {
      title: "Tradición Local",
      desc: "Más de 30 años siendo el referente gourmet de nuestro pueblo."
    }
  ];

  // Map SVGs to features
  const ICONS = [
    (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 22l1.5-1.5M4.5 19.5L19 5a2.121 2.121 0 0 1 3 3L7.5 22.5 2 22z" />
        <path d="M15 5l4 4" />
      </svg>
    ),
    (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20v-8M9 20h6" />
        <path d="M12 4a5 5 0 0 0-5 5c0 2 1 3.5 3 4.5.5.3 1 .5 1 .5s.5-.2 1-.5c2-1 3-2.5 3-4.5a5 5 0 0 0-5-5z" />
        <path d="M7 9a3 3 0 0 1 3-3M14 9a3 3 0 0 0-3-3" />
      </svg>
    ),
    (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="7" />
        <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" />
        <path d="M12 5v6M9 8h6" />
      </svg>
    )
  ];

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
        {displayFeatures.map((f, i) => (
          <div key={i} className="feature-card" style={{ opacity: 0, transform: 'translateY(20px)' }}>
            <div className="feature-icon">{ICONS[i]}</div>
            <h3 className="feature-title">{f.title}</h3>
            <p className="feature-desc">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
