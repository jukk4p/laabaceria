import { createClient } from '@/lib/supabase/server';
import ContactForm from '@/components/ContactForm';
import './contacto.css';

export const dynamic = 'force-dynamic';

export default async function Contacto() {
  const supabase = await createClient();
  const { data: siteContent } = await supabase.from('site_content').select('*');

  const getC = (id: string, fallback: string) => 
    siteContent?.find(c => c.id === id)?.content || fallback;

  const contactData = {
    title: getC('contacto-page-title', 'Contacto'),
    subtitle: getC('contacto-page-subtitle', 'Estamos a su disposición para cualquier consulta o pedido especial.'),
    b2bTitle: getC('contacto-b2b-title', '¿Necesitas cestas para tu empresa?'),
    b2bText: getC('contacto-b2b-text', 'Contacta con nosotros para un presupuesto personalizado y selección de piezas exclusivas.'),
    info: {
      address: getC('social-address', 'C. Cervantes, 1, 41100 Coria del Río, Sevilla'),
      phone: getC('social-phone', '+34 691 41 93 69'),
      email: getC('social-email', 'info@laabaceria.com'),
      hours: getC('social-hours', 'L-V: 9:00-14:00, 17:00-20:00 | S: 10:00-14:00')
    }
  };

  return (
    <div className="contacto-page">
      <header className="page-header">
        <h1 className="page-title">{contactData.title}</h1>
        <p className="page-subtitle">{contactData.subtitle}</p>
      </header>

      <div className="contacto-container">
        <div className="contacto-grid">
          <div className="contacto-info-premium">
            <div className="info-section">
              <h3>Ubicación y Horario</h3>
              <div className="info-item">
                <span className="info-label">Dirección</span>
                <p>{contactData.info.address}</p>
              </div>
              <div className="info-item">
                <span className="info-label">Horario de Atención</span>
                <p style={{ whiteSpace: 'pre-wrap' }}>{contactData.info.hours}</p>
              </div>
            </div>

            <div className="info-section">
              <h3>Contacto Directo</h3>
              <div className="info-item">
                <span className="info-label">Teléfono / WhatsApp</span>
                <p className="accent-text">{contactData.info.phone}</p>
              </div>
              <div className="info-item">
                <span className="info-label">Correo Electrónico</span>
                <p>{contactData.info.email}</p>
              </div>
            </div>

            <div className="b2b-premium-card">
              <h4>{contactData.b2bTitle}</h4>
              <p>{contactData.b2bText}</p>
              <a href={`https://wa.me/${contactData.info.phone.replace(/\s+/g, '')}`} className="btn-gold-sm">
                WhatsApp B2B
              </a>
            </div>
          </div>

          <div className="contacto-form-wrapper">
            <div className="form-card-premium">
              <div className="form-header">
                <h2>Envíenos un mensaje</h2>
                <p>Le responderemos en menos de 24 horas laborables.</p>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>

        <div className="map-section-premium">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3174.966378411037!2d-6.053535923467657!3d37.27962454044572!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1213076e000001%3A0x6b7b744d930034a7!2sC.%20Cervantes%2C%201%2C%2041100%20Coria%20del%20R%C3%ADo%2C%20Sevilla!5e0!3m2!1ses!2ses!4v1715183421234!5m2!1ses!2ses" 
            width="100%" 
            height="450" 
            style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
