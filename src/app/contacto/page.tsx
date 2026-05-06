import './contacto.css';

export default function Contacto() {
  return (
    <div className="contacto-page">
      <header className="page-header">
        <h1 className="page-title">Contacto</h1>
        <p className="page-subtitle">Ven a visitarnos o llámanos para hacer tu pedido.</p>
      </header>

      <section className="contacto-container">
        <div className="contacto-info">
          <div className="info-card">
            <h3>Visítanos</h3>
            <p>Calle Cervantes, 75</p>
            <p>41100 Coria del Río</p>
            <p>Sevilla, España</p>
          </div>

          <div className="info-card">
            <h3>Llámanos</h3>
            <p className="phone-number">691 41 93 69</p>
            <p>Atención personalizada</p>
          </div>

          <div className="info-card">
            <h3>Horario</h3>
            <p>Lunes a Sábado</p>
            <p>09:00 — 14:30</p>
            <p>17:30 — 21:00</p>
          </div>

          <div className="info-card">
            <h3>Síguenos</h3>
            <a href="https://www.facebook.com/p/Jamones-y-Embutidos-La-Abacer%C3%ADa-100054325518401/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-text)', textDecoration: 'none' }}>
              Facebook: La Abacería
            </a>
          </div>

          <div className="contacto-actions">
            <p style={{ color: 'var(--color-accent)', marginBottom: 'var(--space-sm)', fontSize: '0.9rem' }}>¿Necesitas lotes para tu empresa? Consúltanos.</p>
            <a href="https://wa.me/34691419369" className="btn btn-whatsapp">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Escribir por WhatsApp
            </a>
          </div>
        </div>

        <div className="contacto-map">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3174.9667793444453!2d-6.058!3d37.285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd120d2f00000001%3A0x0!2zMzfCsDE3JzA2LjAiTiA2wrAwMycyOC44Ilc!5e0!3m2!1ses!2ses!4v1714934000000!5m2!1ses!2ses" 
            width="100%" 
            height="450" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
