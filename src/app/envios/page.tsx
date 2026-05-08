import { createClient } from '@/lib/supabase/server';
import './envios.css';

export const dynamic = 'force-dynamic';

export default async function Envios() {
  const supabase = await createClient();
  const { data: siteContent } = await supabase.from('site_content').select('*');

  const getC = (id: string, fallback: string) => 
    siteContent?.find(c => c.id === id)?.content || fallback;

  const pageData = {
    title: getC('envios-page-title', 'Envíos y Entregas'),
    subtitle: getC('envios-page-subtitle', 'Llevamos el sabor de nuestra abacería directamente a su mesa.'),
    cards: [
      {
        icon: getC('envios-card-1-icon', '🚚'),
        title: getC('envios-card-1-title', 'Ámbito de Entrega'),
        text: getC('envios-card-1-text', 'Realizamos envíos a toda la Península Ibérica. Para envíos a Baleares, Canarias o internacional, por favor consúltenos directamente.')
      },
      {
        icon: getC('envios-card-2-icon', '⏱️'),
        title: getC('envios-card-2-title', 'Plazos de Entrega'),
        text: getC('envios-card-2-text', 'Nuestros pedidos suelen entregarse en un plazo de 24 a 48 horas laborables para garantizar la frescura de los productos.')
      },
      {
        icon: getC('envios-card-3-icon', '🛡️'),
        title: getC('envios-card-3-title', 'Garantía de Calidad'),
        text: getC('envios-card-3-text', 'Todos nuestros productos viajan en embalajes reforzados y, si el producto lo requiere, con temperatura controlada.')
      }
    ],
    tarifas: [
      { label: getC('envios-tarifa-1-label', 'Pedidos superiores a 150€'), price: getC('envios-tarifa-1-price', 'GRATIS') },
      { label: getC('envios-tarifa-2-label', 'Envío Estándar (Península)'), price: getC('envios-tarifa-2-price', '6,95€') },
      { label: getC('envios-tarifa-3-label', 'Recogida en tienda (Coria del Río)'), price: getC('envios-tarifa-3-price', 'GRATIS') }
    ]
  };

  return (
    <div className="envios-page">
      <header className="page-header">
        <h1 className="page-title">{pageData.title}</h1>
        <p className="page-subtitle">{pageData.subtitle}</p>
      </header>

      <div className="envios-container">
        <div className="envios-grid">
          {pageData.cards.map((card, i) => (
            <div key={i} className="envio-card-premium">
              <div className="card-icon-wrapper">
                <span className="card-icon">{card.icon}</span>
              </div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          ))}
        </div>

        <div className="tarifas-section-premium">
          <div className="tarifas-header">
            <h2>Tarifas de Envío</h2>
            <div className="gold-divider"></div>
          </div>
          <div className="tarifas-table">
            {pageData.tarifas.map((t, i) => (
              <div key={i} className="tarifa-row">
                <span className="tarifa-label">{t.label}</span>
                <span className="tarifa-price">{t.price}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="cta-section-premium">
          <div className="cta-content">
            <h3>¿Alguna duda sobre su pedido?</h3>
            <p>Atención personalizada inmediata por WhatsApp</p>
            <a href={`https://wa.me/${getC('social-whatsapp', '34691419369')}`} className="btn-gold-outline">
              Consultar Envío
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
