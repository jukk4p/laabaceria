import React from 'react';
import './ContactSection.css';

const ContactSection: React.FC = () => {
  return (
    <section className="contact-section" id="contacto">
      <div className="contact-container">
        <div className="contact-header">
          <span className="eyebrow">ESTAMOS EN CORIA</span>
          <h2 className="section-title">Visítenos</h2>
          <div className="title-divider"></div>
        </div>

        <div className="contact-grid">
          {/* Info Column */}
          <div className="contact-info">
            <div className="info-block">
              <h3>Ubicación</h3>
              <p>C. Cervantes, 75, 41100 Coria del Río, Sevilla</p>
              <a 
                href="https://www.google.com/maps/dir/?api=1&destination=La+Abaceria+Coria+del+Rio" 
                target="_blank" 
                rel="noopener noreferrer"
                className="map-link"
              >
                Cómo llegar <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>

            <div className="info-block">
              <h3>Contacto</h3>
              <p>
                Teléfono: <a href="tel:691419369">691 41 93 69</a><br />
                Email: info@laabaceriacoria.es
              </p>
            </div>

            <div className="info-block">
              <h3>Horario</h3>
              <p>
                Lunes a Sábado:<br />
                09:30 – 14:30 | 17:30 – 21:00<br />
                Domingos: Cerrado
              </p>
            </div>
          </div>

          {/* Map Column */}
          <div className="contact-map-wrapper">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3174.965724584282!2d-6.052684823469032!3d37.28424563960014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1203597b696f01%3A0x6b7a2d480746973c!2sC.%20Cervantes%2C%2075%2C%2041100%20Coria%20del%20R%C3%ADo%2C%20Sevilla!5e0!3m2!1ses!2ses!4v1714971234567!5m2!1ses!2ses" 
              width="100%" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de La Abacería"
              className="contact-map"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
