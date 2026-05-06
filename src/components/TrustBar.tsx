'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './TrustBar.css';

const TAGS = [
  "JABUGO", "GUIJUELO", "DEHESA DE EXTREMADURA", "VALLE DE LOS PEDROCHES", 
  "CORTE A CUCHILLO", "PRODUCTO ARTESANO", "EDICIÓN LIMITADA", "CALIDAD SUPREMA"
];

export default function TrustBar() {
  const tickerRef = useRef<HTMLDivElement>(null);

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
        {[...TAGS, ...TAGS].map((tag, i) => (
          <span key={i} className="ticker-item">
            {tag} <span className="ticker-dot">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
