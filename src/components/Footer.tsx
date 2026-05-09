'use client';
import React, { useState, useEffect } from 'react';
import './Footer.css';
import Link from 'next/link';

const Footer: React.FC<{ data?: any }> = ({ data }) => {
  const [isOpen, setIsOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const madridTime = new Intl.DateTimeFormat('es-ES', {
        timeZone: 'Europe/Madrid',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
        weekday: 'long'
      }).formatToParts(now);

      const hour = parseInt(madridTime.find(p => p.type === 'hour')?.value || '0');
      const minute = parseInt(madridTime.find(p => p.type === 'minute')?.value || '0');
      const weekday = madridTime.find(p => p.type === 'weekday')?.value.toLowerCase() || '';
      
      const currentTime = hour * 60 + minute;

      // Horario estandarizado
      // Lun-Vie: 8:30 - 14:00 | 17:30 - 21:00
      // Sábado: 8:30 - 14:00
      // Domingo: Cerrado

      let open = false;
      const isWeekend = weekday.includes('sábado') || weekday.includes('saturday') || weekday.includes('domingo') || weekday.includes('sunday');
      const isSaturday = weekday.includes('sábado') || weekday.includes('saturday');

      if (isSaturday) {
        if (currentTime >= (8 * 60 + 30) && currentTime < (14 * 60)) open = true;
      } else if (!isWeekend) {
        // Lun-Vie
        if ((currentTime >= (8 * 60 + 30) && currentTime < (14 * 60)) || 
            (currentTime >= (17 * 60 + 30) && currentTime < (21 * 60))) {
          open = true;
        }
      }
      
      setIsOpen(open);
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const whatsappURL = `https://wa.me/${data?.whatsapp || '34691419369'}?text=Hola,%20me%20gustaría%20información%20sobre%20vuestros%20lotes%20gourmet.`;

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Column 1: Brand */}
          <div className="footer-col brand-col">
            <h2 className="footer-logo">LA ABACERÍA</h2>
            <p className="footer-tagline">{data?.tagline || 'CALIDAD · TRADICIÓN · SABOR'}</p>
            <p className="footer-description">
              {data?.description || 'Tienda de referencia en jamones ibéricos y embutidos artesanales en Coria del Río, Sevilla. Desde 1990.'}
            </p>
            <div className="footer-social">
              <a href={data?.facebook || "https://www.facebook.com/p/Jamones-y-Embutidos-La-Abacer%C3%ADa-100054325518401/"} target="_blank" rel="noopener noreferrer" className="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.378 14.192 5 15.115 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z"/></svg>
              </a>
              <a href={data?.instagram || "https://www.instagram.com/la_abaceria_/"} target="_blank" rel="noopener noreferrer" className="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div className="footer-col">
            <h4 className="footer-heading">EXPLORAR</h4>
            <ul className="footer-links">
              <li><Link href="/">Inicio</Link></li>
              <li><Link href="/catalogo">Catálogo</Link></li>
              <li><Link href="/#cestas">Cestas Gourmet</Link></li>
              <li><Link href="/nosotros">Nuestra Historia</Link></li>
              <li><Link href="/envios">Envíos y Pedidos</Link></li>
            </ul>
          </div>

          {/* Column 3: Visit & Contact (Merged) */}
          <div className="footer-col">
            <h4 className="footer-heading">VISÍTENOS</h4>
            <div className="footer-info">
              <div className="footer-info-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <p>C. Cervantes, 75<br />41100 Coria del Río, Sevilla</p>
              </div>
              <div className="footer-info-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                <div className="hours-mini">
                  <p><span>{data?.hoursWeekdayLabel || 'Lunes a Sábado:'}</span> {data?.hoursWeekday || '09:30 - 15:00, 18:00 - 21:00'}</p>
                  <p><span>{data?.hoursSundayLabel || 'Domingo:'}</span> {data?.hoursSunday || '10:00 - 15:00'}</p>
                  {isOpen !== null && (
                    <div className={`status-pill ${isOpen ? 'open' : 'closed'}`} style={{ marginTop: '10px', marginLeft: '4px' }}>
                      <span className="status-dot"></span>
                      {isOpen ? 'Abierto ahora' : 'Cerrado ahora'}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="footer-contact-mini">
                <a href={`tel:${data?.phone || '691419369'}`} className="footer-info-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  {data?.phone || '691 41 93 69'}
                </a>
                <a href={`mailto:${data?.email || 'info@laabaceriacoria.es'}`} className="footer-info-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  {data?.email || 'info@laabaceriacoria.es'}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">© 2026 La Abacería · Jamones y Embutidos Gourmet · Coria del Río, Sevilla</p>
          <div className="footer-legal">
            <Link href="/aviso-legal">Aviso Legal</Link>
            <span className="separator">·</span>
            <Link href="/privacidad">Privacidad</Link>
            <span className="separator">·</span>
            <Link href="/cookies">Cookies</Link>
            <span className="separator">·</span>
            <Link href="/terminos">Términos</Link>
            <span className="separator">·</span>
            <span className="made-in">Hecho con amor en Andalucía</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
