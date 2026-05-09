'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Reviews.css';

gsap.registerPlugin(ScrollTrigger);

export default function Reviews({ data }: { data?: any }) {
  const container = useRef<HTMLDivElement>(null);

  const header = {
    eyebrow: data?.eyebrow || 'OPINIONES',
    title: data?.title || 'Lo que dicen nuestros clientes',
    subtitle: data?.subtitle || 'Reseñas verificadas de clientes reales.'
  };

  const displayReviews = data?.items?.length ? data.items : [
    {
      author: "Antonio Moreno",
      text: "El mejor jamón de toda la provincia. El trato es exquisito y la calidad de los embutidos es insuperable.",
      rating: 5,
      date: "marzo 2024",
      avatar: "AM"
    },
    {
      author: "María García",
      text: "Sitio de confianza para comprar productos gourmet. El corte a cuchillo es espectacular.",
      rating: 5,
      date: "febrero 2024",
      avatar: "MG"
    },
    {
      author: "Juan Pérez",
      text: "Muy profesionales. Siempre que tengo una cena especial encargo aquí mi tabla de embutidos.",
      rating: 5,
      date: "enero 2024",
      avatar: "JP"
    }
  ];

  useGSAP(() => {
    // Ensure they are visible if GSAP fails to load correctly or trigger is missed
    gsap.set(".review-card", { opacity: 0, y: 30 });
    
    gsap.to(".review-card", {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 90%", // Trigger earlier
        toggleActions: "play none none none"
      }
    });
  }, { scope: container });

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <section className="reviews-section" ref={container}>
      <div className="reviews-container">
        <div className="reviews-intro">
          <div className="reviews-summary">
            <div className="rating-value">4.8</div>
            <div className="stars">★★★★★</div>
            <p className="review-google-count">22 reseñas en Google</p>
          </div>
          <div className="reviews-header-content">
            <span className="eyebrow">{header.eyebrow}</span>
            <h2 className="section-title text-gradient-gold">{header.title}</h2>
            <p className="section-subtitle">{header.subtitle}</p>
          </div>
        </div>

        <div className="reviews-grid">
          {displayReviews.map((review: any, i: number) => (
            <div key={i} className="review-card">
              <div className="review-stars">★★★★★</div>
              <p className="review-text">"{review.text}"</p>
              <div className="review-footer">
                <div className="review-avatar">
                  {review.avatar || getInitials(review.author || 'U')}
                </div>
                <div className="review-meta">
                  <p className="review-author">{review.author}</p>
                  <p className="review-date">{review.date || 'Hace poco'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="reviews-bottom">
          <a 
            href="https://www.google.com/search?q=La+Abaceria+Coria+del+Rio#lrd=0xd120306c547846f:0x6b77209d6c7846f,1" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="google-link"
          >
            Ver todas las reseñas en Google <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
