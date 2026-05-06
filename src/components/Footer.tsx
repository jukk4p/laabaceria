import React from 'react';
import './Footer.css';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Column 1: Brand */}
          <div className="footer-col brand-col">
            <h2 className="footer-logo">La Abacería</h2>
            <p className="footer-tagline">
              Dedicados a la selección de las mejores piezas de jamón y productos artesanos desde nuestras raíces en Coria del Río.
            </p>
            <div className="footer-social">
              <a href="https://www.facebook.com/p/Jamones-y-Embutidos-La-Abacer%C3%ADa-100054325518401/" target="_blank" rel="noopener noreferrer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
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
              C. Cervantes, 75<br />
              41100 Coria del Río, Sevilla
            </address>
            <div className="footer-hours">
              <p>Lun - Sáb: 09:30 - 14:30 | 17:30 - 21:00</p>
              <p>Dom: Cerrado</p>
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
          <p>© {new Date().getFullYear()} La Abacería Coria del Río. Maestros del Ibérico.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
