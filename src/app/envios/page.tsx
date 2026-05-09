'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './envios.css';

gsap.registerPlugin(ScrollTrigger);

export default function Envios() {
  const [siteContent, setSiteContent] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await supabase.from('site_content').select('*');
      if (data) setSiteContent(data);
    };
    fetchContent();

    // GSAP Animations
    const ctx = gsap.context(() => {
      gsap.from('.page-header', {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out'
      });

      gsap.from('.envio-card-premium', {
        opacity: 0,
        y: 40,
        stagger: 0.2,
        duration: 0.8,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.envios-grid',
          start: 'top 85%'
        }
      });

      gsap.from('.tarifas-section-premium', {
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.tarifas-section-premium',
          start: 'top 90%'
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const getC = (id: string, fallback: string) => 
    siteContent?.find((c: any) => c.id === id)?.content || fallback;

  const pageData = {
    title: getC('envios-page-title', 'Envíos y Entregas'),
    subtitle: getC('envios-page-subtitle', 'Llevamos el sabor de nuestra abacería directamente a su mesa con la máxima garantía de frescura.'),
    cards: [
      {
        icon: getC('envios-card-1-icon', '🚚'),
        title: getC('envios-card-1-title', 'Ámbito de Entrega'),
        text: getC('envios-card-1-text', 'Realizamos envíos a toda la Península Ibérica. Para Baleares, Canarias o internacional, contacte para presupuesto personalizado.')
      },
      {
        icon: getC('envios-card-2-icon', '⏱️'),
        title: getC('envios-card-2-title', 'Plazos de Entrega'),
        text: getC('envios-card-2-text', 'Entrega en 24/48h laborables. Seleccionamos y preparamos su pedido en el momento para garantizar la frescura.')
      },
      {
        icon: getC('envios-card-3-icon', '🛡️'),
        title: getC('envios-card-3-title', 'Garantía de Calidad'),
        text: getC('envios-card-3-text', 'Embalaje reforzado y temperatura controlada si el producto lo requiere. Su pedido llegará en condiciones óptimas.')
      }
    ],
    tarifas: [
      { label: getC('envios-tarifa-1-label', 'Pedidos superiores a 150€'), price: getC('envios-tarifa-1-price', 'GRATIS'), highlight: true },
      { label: getC('envios-tarifa-2-label', 'Envío Estándar (Península)'), price: getC('envios-tarifa-2-price', '6,95€'), highlight: false },
      { label: getC('envios-tarifa-3-label', 'Recogida en tienda (Coria del Río)'), price: getC('envios-tarifa-3-price', 'GRATIS'), highlight: false }
    ]
  };

  return (
    <div className="envios-page">
      <header className="page-header">
        <span className="premium-tag">LOGÍSTICA GOURMET</span>
        <h1 className="page-title">{pageData.title}</h1>
        <p className="page-subtitle">{pageData.subtitle}</p>
        <div className="header-line"></div>
      </header>

      <div className="envios-container">
        <div className="envios-grid">
          {pageData.cards.map((card, i) => (
            <div key={i} className="envio-card-premium">
              <div className="card-bg-glow"></div>
              <div className="card-icon-wrapper">
                <span className="card-icon">{card.icon}</span>
              </div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          ))}
        </div>

        <div className="tarifas-section-premium">
          <div className="tarifas-inner">
            <div className="tarifas-header">
              <h2>Tarifas de Envío</h2>
              <p className="tarifas-intro">Transparencia y claridad en cada entrega</p>
            </div>
            
            <div className="tarifas-list">
              {pageData.tarifas.map((t, i) => (
                <div key={i} className={`tarifa-item ${t.highlight ? 'featured' : ''}`}>
                  <div className="tarifa-info">
                    <span className="tarifa-label">{t.label}</span>
                    {t.highlight && <span className="best-value">RECOMENDADO</span>}
                  </div>
                  <div className="tarifa-price-wrapper">
                    <span className="tarifa-price">{t.price}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="tarifas-footer">
              <p>* Los plazos pueden variar en épocas de alta demanda como Navidad.</p>
            </div>
          </div>
        </div>

        <div className="shipping-cta-premium">
          <div className="cta-grid">
            <div className="cta-text">
              <h3>¿Necesita un envío especial?</h3>
              <p>Gestionamos pedidos urgentes, regalos de empresa y envíos internacionales de forma personalizada.</p>
            </div>
            <div className="cta-actions">
              <a href={`https://wa.me/34691419369?text=Hola,%20tengo%20una%20duda%20sobre%20un%20envío.`} className="btn-gold-fill">
                CONSULTAR POR WHATSAPP
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
