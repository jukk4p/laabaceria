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
