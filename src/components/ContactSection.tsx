'use client';

import React, { useState, useEffect } from 'react';
import './ContactSection.css';

const ContactSection: React.FC<{ data?: any }> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      // Get Sevilla time (UTC+2 in summer, UTC+1 in winter)
      const sevillaTime = new Date(now.toLocaleString("en-US", {timeZone: "Europe/Madrid"}));
      const day = sevillaTime.getDay(); // 0 = Sunday, 1 = Monday, ...
      const hours = sevillaTime.getHours();
      const minutes = sevillaTime.getMinutes();
      const currentTime = hours + minutes / 60;

      // Monday to Friday: 8:30 - 14:00 | 17:30 - 21:00
      // Saturday: 8:30 - 14:00
      // Sunday: Closed

      if (day >= 1 && day <= 5) {
        if ((currentTime >= 8.5 && currentTime < 14) || (currentTime >= 17.5 && currentTime < 21)) {
          setIsOpen(true);
        } else {
          setIsOpen(false);
        }
      } else if (day === 6) {
        if (currentTime >= 8.5 && currentTime < 14) {
          setIsOpen(true);
        } else {
          setIsOpen(false);
        }
      } else {
        setIsOpen(false);
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const contactData = data || {
    address: 'C. Cervantes, 75, 41100 Coria del Río, Sevilla',
    phone: '+34 691 41 93 69',
    email: 'info@laabaceriacoria.es',
  };

  return (
    <section className="contact-section" id="contacto">
      <div className="contact-container">
        <div className="contact-grid">
          <div className="contact-details">
            <div className="contact-header">
              <span className="eyebrow">{data?.eyebrow || 'ESTAMOS EN CORIA'}</span>
              <h2 className="section-title text-gradient-gold">{data?.title || 'Visítenos'}</h2>
            </div>

            <div className="info-list">
              <div className="info-item">
                <div className="info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <div className="info-text">
                  <h4>DIRECCIÓN</h4>
                  <p>{contactData.address}</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                </div>
                <div className="info-text">
                  <h4>HORARIO</h4>
                  <div className="schedule-grid">
                    {(() => {
                      const scheduleText = contactData.schedule || 'Lunes - Viernes: 8:30 - 14:00 | 17:30 - 21:00\nSábado: 8:30 - 14:00\nDomingo: Cerrado';
                      // Split by newline or by '|' if it looks like a separator (followed by a day name)
                      const lines = scheduleText.includes('\n') 
                        ? scheduleText.split('\n') 
                        : scheduleText.split(/\s*\|\s*(?=[A-Z])/); // Split by | only if followed by Capital letter (Day)

                      return lines.map((line: string, index: number) => {
                        const parts = line.split(':');
                        const day = parts[0];
                        const hours = parts.slice(1).join(':'); // Rejoin in case hours have colons
                        
                        return (
                          <div className="schedule-row" key={index}>
                            <span>{day?.trim()}</span>
                            <span className={hours?.toLowerCase().includes('cerrado') ? 'closed' : ''}>
                              {hours?.trim() || ''}
                            </span>
                          </div>
                        );
                      });
                    })()}
                  </div>
                  <div className={`status-badge ${isOpen ? 'open' : 'closed'}`}>
                    <span className="status-dot"></span>
                    {isOpen ? 'Abierto ahora' : 'Cerrado ahora'}
                  </div>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
                <div className="info-text">
                  <h4>TELÉFONO</h4>
                  <p><a href={`tel:${contactData.phone.replace(/\s/g, '')}`}>{contactData.phone}</a></p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <div className="info-text">
                  <h4>EMAIL</h4>
                  <p><a href={`mailto:${contactData.email}`}>{contactData.email}</a></p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-map-wrapper">
            <div className="map-actions">
              <a 
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent('La Abacería C. Cervantes 75 Coria del Río')}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="map-btn-primary"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                ¿Cómo llegar?
              </a>
            </div>
            <div className="contact-map-card">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3174.965724584282!2d-6.052684823469032!3d37.28424563960014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1203597b696f01%3A0x6b7a2d480746973c!2sC.%20Cervantes%2C%2075%2C%2041100%20Coria%20del%20R%C3%ADo%2C%20Sevilla!5e0!3m2!1ses!2ses!4v1714971234567!5m2!1ses!2ses" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de La Abacería"
                className="contact-map-iframe"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
