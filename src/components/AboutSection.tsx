'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AboutSection.css';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection({ data }: { data?: any }) {
  const container = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const aboutData = data || {
    tag: 'Nuestra Tradición',
    title: 'Pasión por el producto bien hecho',
    text1: 'En La Abacería, no solo vendemos embutidos; seleccionamos historias. Cada pieza que llega a nuestras vitrinas ha pasado un riguroso proceso de selección en las mejores dehesas.',
    text2: 'Nuestro maestro cortador asegura que cada loncha mantenga la temperatura y el grosor exacto para que la experiencia sea, sencillamente, perfecta.',
    image: '/images/Exposición_jamones_quesos_1.jpg'
  };

  useGSAP(() => {
    // ... animation logic remains same ...
    gsap.from(imgRef.current, {
      opacity: 0,
      x: -50,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 70%",
      }
    });

    gsap.from(textRef.current, {
      opacity: 0,
      x: 50,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 70%",
      }
    });
  }, { scope: container });

  return (
    <section className="about-home" ref={container} id="nosotros">
      <div className="about-home-grid">
        <div className="about-home-img" ref={imgRef}>
          <img src={aboutData.image} alt="Interior de La Abacería" />
        </div>
        <div className="about-home-content" ref={textRef}>
          <span className="section-tag">{aboutData.tag}</span>
          <h2 className="section-title">{aboutData.title}</h2>
          <p className="section-text">{aboutData.text1}</p>
          <p className="section-text">{aboutData.text2}</p>
          <div className="about-home-stats">
            <div className="stat-item">
              <span className="stat-num">+30</span>
              <span className="stat-label">Años de historia</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">100%</span>
              <span className="stat-label">Ibérico de Bellota</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
