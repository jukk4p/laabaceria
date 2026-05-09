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
    image: '/images/Exposición_jamones_quesos_1.jpg',
    f1_title: 'Corte a cuchillo',
    f1_desc: 'Maestría en cada loncha para preservar todo el aroma.',
    f2_title: 'Selección en dehesa',
    f2_desc: 'Solo las mejores piezas de bellota llegan aquí.',
    f3_title: 'Tradición local',
    f3_desc: 'Más de 30 años siendo el referente gourmet.',
    f4_title: 'Calidad suprema',
    f4_desc: 'Productos con denominación de origen protegida.'
  };

  useGSAP(() => {
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
        <div className="about-home-img-card" ref={imgRef}>
          <img src={aboutData.image} alt={aboutData.title} />
          <div className="img-card-overlay">
            <span className="img-card-label">NUESTRA SELECCIÓN</span>
          </div>
        </div>

        <div className="about-home-content" ref={textRef}>
          <span className="section-tag">{aboutData.tag}</span>
          <h2 className="section-title">{aboutData.title}</h2>
          <p className="section-text">
            {aboutData.text1}
          </p>
          {aboutData.text2 && <p className="section-text" style={{ marginTop: '1rem' }}>{aboutData.text2}</p>}
          
          <div className="about-features-grid">
            <div className="about-feature-card">
              <div className="feature-icon-wrapper">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.5 2.5a2.121 2.121 0 0 1 3 3L7 16l-4 1 1-4 10.5-10.5z"></path>
                  <path d="M12 5l4 4"></path>
                  <path d="M2 22l5-5"></path>
                  <path d="M19 13l2 2"></path>
                </svg>
              </div>
              <div className="about-feature-text">
                <h3>{aboutData.f1_title}</h3>
                <p>{aboutData.f1_desc}</p>
              </div>
            </div>

            <div className="about-feature-card">
              <div className="feature-icon-wrapper">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22v-5"></path>
                  <path d="M9 22h6"></path>
                  <path d="M12 2a5 5 0 0 0-5 5c0 2 1 3.5 3 4.5.5.3 1 .5 1 .5s.5-.2 1-.5c2-1 3-2.5 3-4.5a5 5 0 0 0-5-5z"></path>
                  <path d="M12 17c-2 0-5-1-5-4.5a5 5 0 0 1 1.5-3.5"></path>
                  <path d="M12 17c2 0 5-1 5-4.5a5 5 0 0 0-1.5-3.5"></path>
                </svg>
              </div>
              <div className="about-feature-text">
                <h3>{aboutData.f2_title}</h3>
                <p>{aboutData.f2_desc}</p>
              </div>
            </div>

            <div className="about-feature-card">
              <div className="feature-icon-wrapper">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"></path>
                  <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"></path>
                  <path d="M12 7v5"></path>
                  <path d="M10 9h4"></path>
                </svg>
              </div>
              <div className="about-feature-text">
                <h3>{aboutData.f3_title}</h3>
                <p>{aboutData.f3_desc}</p>
              </div>
            </div>

            <div className="about-feature-card">
              <div className="feature-icon-wrapper">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  <path d="M12 7v6"></path>
                  <path d="M12 17h.01"></path>
                </svg>
              </div>
              <div className="about-feature-text">
                <h3>{aboutData.f4_title}</h3>
                <p>{aboutData.f4_desc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
