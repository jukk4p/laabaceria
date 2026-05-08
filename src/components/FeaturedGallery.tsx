'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './FeaturedGallery.css';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedGallery({ data, items }: { data?: any, items?: any[] }) {
  const container = useRef<HTMLDivElement>(null);
  
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

  return (
    <section className="gallery-section" ref={container}>
      <div className="gallery-header">
        <h2 className="gallery-title">{data?.title || 'Nuestra Selección'}</h2>
        <p className="gallery-subtitle">{data?.subtitle || 'Cada pieza cuenta una historia de sabor y tradición.'}</p>
      </div>
      <div className="gallery-grid">
        {displayItems.map((item, i) => (
          <div key={i} className="gallery-item">
            <div className="gallery-img-wrapper">
              <img src={item.img} alt={item.title} />
              <div className="gallery-overlay">
                <h3>{item.title}</h3>
                {item.desc && <p>{item.desc}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
