import { createClient } from '@/lib/supabase/server';
import ContactForm from '../../components/ContactForm';
import './contacto.css';

export const dynamic = 'force-dynamic';

export default async function Contacto() {
  const supabase = await createClient();
  const { data: siteContent } = await supabase.from('site_content').select('*');

  const getC = (id: string, fallback: string) => 
    siteContent?.find((c: any) => c.id === id)?.content || fallback;

  const contactData = {
    title: getC('contacto-page-title', 'Contacto'),
    subtitle: getC('contacto-page-subtitle', 'Estamos a su disposición para cualquier consulta o pedido especial.'),
    b2bTitle: getC('contacto-b2b-title', '¿Necesitas cestas para tu empresa?'),
    b2bText: getC('contacto-b2b-text', 'Contacta con nosotros para un presupuesto personalizado y selección de piezas exclusivas.'),
    info: {
      address: getC('contact-address', 'C. Cervantes, 75, 41100 Coria del Río, Sevilla'),
      phone: getC('contact-phone', '691 41 93 69'),
      email: getC('contact-email', 'info@laabaceriacoria.es'),
      hours: getC('contact-hours', 'Lun - Vie: 8:30 - 14:00 | 17:30 - 21:00\nSábado: 8:30 - 14:00')
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
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '10px' }}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.896 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
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
            style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2) sepia(0.5) hue-rotate(-20deg)' }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
