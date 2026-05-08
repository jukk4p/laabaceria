import React from 'react';
import './Footer.css';
import Link from 'next/link';

const Footer: React.FC<{ data?: any }> = ({ data }) => {
  const fData = data || {
    tagline: 'Selección de las mejores piezas de jamón y productos artesanos.',
    address: 'C. San Sebastián, 5, 41510 Mairena del Alcor, Sevilla',
    hours: 'Lunes a Viernes: 09:00 - 14:00 | 17:00 - 20:30',
    instagram: 'https://instagram.com/laabaceria',
    facebook: 'https://facebook.com/laabaceria',
    copy: '© 2024 La Abacería. Todos los derechos reservados.'
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Column 1: Brand */}
          <div className="footer-col brand-col">
            <h2 className="footer-logo">La Abacería</h2>
            <p className="footer-tagline">
              {fData.tagline}
            </p>
            <div className="footer-social">
              {fData.facebook && (
                <a href={fData.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              )}
              {fData.instagram && (
                <a href={fData.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Explore */}
          <div className="footer-col">
            <h4 className="footer-heading">Explorar</h4>
            <ul className="footer-links">
              <li><Link href="/catalogo">Nuestra Selección</Link></li>
              <li><Link href="/#cestas">Cestas Gourmet</Link></li>
              <li><Link href="/nosotros">Nuestra Historia</Link></li>
              <li><Link href="/contacto">Contacto</Link></li>
            </ul>
          </div>

          {/* Column 3: Visit */}
          <div className="footer-col">
            <h4 className="footer-heading">Visítenos</h4>
            <address className="footer-address">
              {fData.address}
            </address>
            <div className="footer-hours" style={{ whiteSpace: 'pre-wrap' }}>
              {fData.hours}
            </div>
          </div>

          {/* Column 4: Legal */}
          <div className="footer-col">
            <h4 className="footer-heading">Legal</h4>
            <ul className="footer-links">
              <li><Link href="/aviso-legal">Aviso Legal</Link></li>
              <li><Link href="/privacidad">Privacidad</Link></li>
              <li><Link href="/envios">Envíos</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>{fData.copy}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
