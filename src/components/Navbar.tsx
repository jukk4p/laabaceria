'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import './Navbar.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link href="/" className="navbar-logo">
          La Abacería
        </Link>

        <div className={`navbar-links ${isMobileMenuOpen ? 'open' : ''}`}>
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>Inicio</Link>
          <Link href="/catalogo" onClick={() => setIsMobileMenuOpen(false)}>Catálogo</Link>
          <Link href="/nosotros" onClick={() => setIsMobileMenuOpen(false)}>Nuestra Historia</Link>
          <Link href="/contacto" onClick={() => setIsMobileMenuOpen(false)}>Contacto</Link>
          <a 
            href="https://www.facebook.com/p/Jamones-y-Embutidos-La-Abacer%C3%ADa-100054325518401/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="nav-social"
            aria-label="Facebook"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
          <a 
            href="https://instagram.com/laabaceria" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="nav-social"
            aria-label="Instagram"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <a href="tel:691419369" className="nav-cta">691 41 93 69</a>
        </div>

        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menú"
        >
          <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}></span>
        </button>
      </div>
    </nav>
  );
}
