'use client';

import './envios.css';

export default function Envios() {
  return (
    <div className="envios-page">
      <header className="page-header">
        <h1 className="page-title">Envíos y Entregas</h1>
        <p className="page-subtitle">Llevamos el sabor de nuestra abacería directamente a su mesa.</p>
      </header>

      <div className="envios-container">
        <div className="envios-grid">
          <div className="envio-card">
            <div className="card-icon">🚚</div>
            <h3>Ámbito de Entrega</h3>
            <p>Realizamos envíos a toda la <strong>Península Ibérica</strong>. Para envíos a Baleares, Canarias o internacional, por favor consúltenos directamente.</p>
          </div>

          <div className="envio-card">
            <div className="card-icon">⏱️</div>
            <h3>Plazos de Entrega</h3>
            <p>Nuestros pedidos suelen entregarse en un plazo de <strong>24 a 48 horas</strong> laborables para garantizar la frescura de los productos.</p>
          </div>

          <div className="envio-card">
            <div className="card-icon">🛡️</div>
            <h3>Garantía de Calidad</h3>
            <p>Todos nuestros productos viajan en embalajes reforzados y, si el producto lo requiere, con temperatura controlada.</p>
          </div>
        </div>

        <div className="tarifas-section">
          <h2>Tarifas de Envío</h2>
          <div className="tarifas-table">
            <div className="tarifa-row">
              <span>Pedidos superiores a 150€</span>
              <span className="price">GRATIS</span>
            </div>
            <div className="tarifa-row">
              <span>Envío Estándar (Península)</span>
              <span className="price">6,95€</span>
            </div>
            <div className="tarifa-row">
              <span>Recogida en tienda (Coria del Río)</span>
              <span className="price">GRATIS</span>
            </div>
          </div>
        </div>

        <div className="cta-section">
          <p>¿Tiene alguna duda sobre su envío?</p>
          <a href="https://wa.me/34691419369" className="btn-primary">Consultar por WhatsApp</a>
        </div>
      </div>
    </div>
  );
}
