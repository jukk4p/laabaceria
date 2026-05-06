'use client';

import { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Parallax effect on background (Rule #13: use yPercent for performance)
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

    // Premium Reveal (Rule #15: Fluid animations)
    const tl = gsap.timeline({
      defaults: { ease: "expo.out", duration: 1.2 }
    });

    tl.from(contentRef.current, {
      opacity: 0,
      scale: 0.98,
      backdropFilter: "blur(0px)",
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

    // Subtle floating animation for the content glass card
    gsap.to(contentRef.current, {
      y: -10,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

  }, { scope: container });

  return (
    <section className="hero" ref={container}>
      <div className="hero-bg" ref={bgRef}></div>
      <div className="hero-overlay"></div>
      
      <div className="hero-content" ref={contentRef}>
        <p className="hero-subtitle" ref={subtitleRef}>Desde 1990 · Coria del Río · Sevilla</p>
        <h1 className="hero-title" ref={titleRef}>El Arte del Jamón Ibérico</h1>
        <p className="hero-description" ref={descRef}>
          Selección artesanal de los mejores embutidos y productos gourmet 
          de nuestra tierra. Tradición y sabor en cada corte.
        </p>
        <div className="hero-actions" ref={actionsRef}>
          <a href="tel:691419369" className="btn btn-primary">
            Llamar ahora
          </a>
          <Link href="#cestas" className="btn btn-secondary">
            Ver catálogo
          </Link>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <span>Desliza para descubrir</span>
        <div className="arrow"></div>
      </div>
    </section>
  );
}
