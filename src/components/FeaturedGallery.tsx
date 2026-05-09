'use client';
import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './FeaturedGallery.css';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedGallery({ data, items }: { data?: any, items?: any[] }) {
  const container = useRef<HTMLDivElement>(null);
  const [selectedImgIndex, setSelectedImgIndex] = useState<number | null>(null);
  
  const displayItems = items?.length ? items : [
    { title: 'Nuestra Fachada', img: '/images/local_desde_fuera.jpg' },
    { title: 'Vinos de Selección', img: '/images/exposicion_vinos.jpg' },
    { title: 'Corte Artesano', img: '/images/Local_desde_dentro.webp' },
    { title: 'Nuestras Vitrinas', img: '/images/cristalera_productos_gourmet.jpg' }
  ];

  useGSAP(() => {
    gsap.from(".gallery-item", {
      opacity: 0,
      scale: 0.8,
      duration: 1,
      stagger: 0.15,
      ease: "expo.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 75%",
      }
    });
  }, { scope: container });

  // Handle keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImgIndex === null) return;
      if (e.key === 'Escape') setSelectedImgIndex(null);
      if (e.key === 'ArrowRight') navigate(1);
      if (e.key === 'ArrowLeft') navigate(-1);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImgIndex]);

  const navigate = (dir: number) => {
    if (selectedImgIndex === null) return;
    const nextIndex = (selectedImgIndex + dir + displayItems.length) % displayItems.length;
    setSelectedImgIndex(nextIndex);
  };

  return (
    <section className="gallery-section" ref={container}>
      <div className="gallery-container">
        <div className="gallery-header">
          <span className="gallery-eyebrow">{data?.subtitle || 'NUESTRO RINCÓN GOURMET'}</span>
          <h2 className="gallery-title text-gradient-gold">{data?.title || 'La tienda, en imágenes'}</h2>
        </div>
        <div className="gallery-grid">
          {displayItems.map((item, i) => (
            <div key={i} className="gallery-item" onClick={() => setSelectedImgIndex(i)}>
              <div className="gallery-card">
                <div className="gallery-img-wrapper">
                  <img src={item.img} alt={item.title} />
                  <div className="gallery-card-overlay">
                    <span className="gallery-card-title">{item.title}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImgIndex !== null && (
        <div className="lightbox-overlay" onClick={() => setSelectedImgIndex(null)}>
          <button className="lightbox-close" onClick={() => setSelectedImgIndex(null)} aria-label="Cerrar">✕</button>
          
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-nav prev" onClick={() => navigate(-1)}>‹</button>
            <div className="lightbox-image-container">
              <img src={displayItems[selectedImgIndex].img} alt={displayItems[selectedImgIndex].title} />
              <div className="lightbox-caption">
                <h3>{displayItems[selectedImgIndex].title}</h3>
                {displayItems[selectedImgIndex].desc && <p>{displayItems[selectedImgIndex].desc}</p>}
              </div>
            </div>
            <button className="lightbox-nav next" onClick={() => navigate(1)}>›</button>
          </div>
        </div>
      )}
    </section>
  );
}
