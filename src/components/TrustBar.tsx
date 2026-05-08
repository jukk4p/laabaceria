'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './TrustBar.css';

export default function TrustBar({ tags }: { tags?: string }) {
  const tickerRef = useRef<HTMLDivElement>(null);
  const displayTags = (tags && tags.trim() !== '') 
    ? tags.split(',').map(t => t.trim()) 
    : [
    "JABUGO", "GUIJUELO", "DEHESA DE EXTREMADURA", "VALLE DE LOS PEDROCHES", 
    "CORTE A CUCHILLO", "PRODUCTO ARTESANO", "EDICIÓN LIMITADA", "CALIDAD SUPREMA"
  ];

  useGSAP(() => {
    gsap.to(".ticker-content", {
      xPercent: -50,
      duration: 20,
      repeat: -1,
      ease: "none"
    });
  }, { scope: tickerRef });

  return (
    <div className="trust-bar" ref={tickerRef}>
      <div className="ticker-content">
        {[...displayTags, ...displayTags].map((tag, i) => (
          <span key={i} className="ticker-item">
            {tag} <span className="ticker-dot">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
