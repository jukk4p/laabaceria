'use client';

import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ data }: { data?: any }) {
  const container = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const heroData = data || {
    subtitle: 'JAMONES Y EMBUTIDOS · CORIA DEL RÍO · SEVILLA',
    title: 'El arte del jamón ibérico',
    description: 'Selección artesanal de los mejores embutidos y productos gourmet de nuestra tierra. Tradición y sabor en cada bocado.',
    image: '/images/Exposición_jamones_quesos.jpg'
  };

  useGSAP(() => {
    gsap.to(bgRef.current, {
      yPercent: 15,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    const tl = gsap.timeline({
      defaults: { ease: "expo.out", duration: 1.2 }
    });

    tl.from(contentRef.current, {
      opacity: 0,
      scale: 0.98,
      duration: 1.5,
    })
    .from(subtitleRef.current, { 
      opacity: 0, 
      yPercent: 50, 
      letterSpacing: "1em",
      duration: 1.5 
    }, "-=1")
    .from(titleRef.current, { 
      opacity: 0, 
      yPercent: 30, 
      filter: "blur(10px)",
      duration: 1.8 
    }, "-=1.2")
    .from(descRef.current, { 
      opacity: 0, 
      yPercent: 20, 
      duration: 1.2 
    }, "-=1.4")
    .from(actionsRef.current, { 
      opacity: 0, 
      yPercent: 10,
      duration: 1
    }, "-=1");

  }, { scope: container });

  return (
    <section className="hero" ref={container}>
      <div 
        className="hero-bg" 
        ref={bgRef}
        style={{ backgroundImage: `url(${heroData.image})` }}
      ></div>
      <div className="hero-overlay"></div>
      
      <div className="hero-content" ref={contentRef}>
        <p className="hero-subtitle" ref={subtitleRef}>{heroData.subtitle}</p>
        <h1 className="hero-title text-gradient-gold" ref={titleRef}>{heroData.title}</h1>
        <p className="hero-description" ref={descRef}>
          {heroData.description}
        </p>
        <div className="hero-actions" ref={actionsRef}>
          <a href={heroData.primaryBtnLink || "tel:691419369"} className="btn btn-primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '10px' }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            {heroData.primaryBtnText || 'Llamar ahora'}
          </a>
          <Link href={heroData.secondaryBtnLink || "/catalogo"} className="btn btn-secondary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '10px' }}><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            {heroData.secondaryBtnText || 'Ver catálogo'}
          </Link>
        </div>
      </div>

      <div className="hero-stats">
        <div className="stat-item">
          <span className="stat-value">+30</span>
          <span className="stat-label">Años de historia</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <span className="stat-value">100%</span>
          <span className="stat-label">Ibérico de bellota</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <span className="stat-value">
            4.8 <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: '4px' }}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          </span>
          <span className="stat-label">En Google</span>
        </div>
      </div>
    </section>
  );
}
