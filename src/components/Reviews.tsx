'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Reviews.css';

gsap.registerPlugin(ScrollTrigger);

const REVIEWS = [
  {
    author: "Antonio Moreno",
    text: "El mejor jamón de toda la provincia. El trato es exquisito y la calidad de los embutidos es insuperable.",
    rating: 5
  },
  {
    author: "María García",
    text: "Sitio de confianza para comprar productos gourmet. El corte a cuchillo es espectacular.",
    rating: 5
  },
  {
    author: "Juan Pérez",
    text: "Muy profesionales. Siempre que tengo una cena especial encargo aquí mi tabla de embutidos.",
    rating: 4
  }
];

export default function Reviews() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".review-card", {
      opacity: 0,
      x: 30,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
      }
    });
  }, { scope: container });

  return (
    <section className="reviews-section" ref={container}>
      <div className="reviews-header">
        <h2 className="reviews-title">Lo que dicen nuestros clientes</h2>
        <div className="reviews-overall">
          <span className="rating-value">4.8</span>
          <div className="stars">★★★★★</div>
          <span className="review-count">(32 reseñas en Google)</span>
        </div>
      </div>
      <div className="reviews-grid">
        {REVIEWS.map((review, i) => (
          <div key={i} className="review-card">
            <div className="review-rating">{"★".repeat(review.rating)}</div>
            <p className="review-text">"{review.text}"</p>
            <p className="review-author">— {review.author}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
