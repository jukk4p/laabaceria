'use client';

import { useState } from 'react';

const CATEGORIES = ["Jamones", "Embutidos", "Quesos", "Vinos", "Miel", "Conservas"];

const PRODUCTS = [
  // Jamones
  { id: 1, category: "Jamones", name: "Jamón de Bellota 100% Ibérico", price: "Consultar", description: "Piezas seleccionadas con más de 36 meses de curación.", img: "/images/Jamon.webp" },
  { id: 2, category: "Jamones", name: "Paleta de Cebo de Campo", price: "Consultar", description: "Sabor intenso y textura jugosa.", img: "/images/Jamon.webp" },
  { id: 3, category: "Jamones", name: "Jamón Reserva Oro", price: "Consultar", description: "Nuestra selección especial de la casa.", img: "/images/Jamon.webp" },
  
  // Embutidos
  { id: 4, category: "Embutidos", name: "Caña de Lomo Ibérica", price: "Consultar", description: "Lomo de bellota curado en tripa natural.", img: "/images/Exposición_jamones_quesos.jpg" },
  { id: 5, category: "Embutidos", name: "Chorizo de Bellota", price: "Consultar", description: "Aliño tradicional con pimentón de la Vera.", img: "/images/Exposición_jamones_quesos_1.jpg" },
  { id: 6, category: "Embutidos", name: "Salchichón Artesano", price: "Consultar", description: "Pimienta negra en grano y magro de primera.", img: "/images/Exposición_jamones_quesos.jpg" },

  // Quesos
  { id: 7, category: "Quesos", name: "Queso Viejo de Oveja", price: "Consultar", description: "Leche cruda de oveja con 12 meses de maduración.", img: "/images/queso_viriato.jpg" },
  { id: 8, category: "Quesos", name: "Queso de Cabra al Pimentón", price: "Consultar", description: "Corteza untada en pimentón ahumado.", img: "/images/queso_viriato.jpg" },
  { id: 9, category: "Quesos", name: "Mezcla Curado", price: "Consultar", description: "Equilibrio perfecto entre vaca, cabra y oveja.", img: "/images/queso_viriato.jpg" },

  // Vinos
  { id: 10, category: "Vinos", name: "Moscatel de la Tierra", price: "Consultar", description: "Dulce natural ideal para postres o aperitivos.", img: "/images/Moscatel_en_botellas.webp" },
  { id: 11, category: "Vinos", name: "Vino Blanco Joven", price: "Consultar", description: "Afrutado y fresco, selección de la casa.", img: "/images/exposicion_vinos.jpg" },
  
  // Miel
  { id: 12, category: "Miel", name: "Miel de Romero", price: "Consultar", description: "Miel pura de la sierra, artesana.", img: "/images/miel_de_tomillo.jpg" },
  { id: 13, category: "Miel", name: "Miel de Milflores", price: "Consultar", description: "Variedad silvestre de temporada.", img: "/images/miel_de_azahar.jpg" },

  // Conservas
  { id: 14, category: "Conservas", name: "Anchoas del Cantábrico", price: "Consultar", description: "Filetes seleccionados en aceite de oliva.", img: "/images/cristalera_productos_gourmet.jpg" },
  { id: 15, category: "Conservas", name: "Ventresca de Atún", price: "Consultar", description: "Calidad premium, elaboración artesanal.", img: "/images/cristalera_productos_gourmet.jpg" },
];

export default function CatalogoGrid() {
  const [activeCategory, setActiveCategory] = useState("Jamones");

  const filteredProducts = PRODUCTS.filter(p => p.category === activeCategory);

  const getWaLink = (name: string) => {
    return `https://wa.me/34691419369?text=${encodeURIComponent(`Hola, me interesa el producto: ${name}`)}`;
  };

  return (
    <div className="catalogo-container">
      <div className="filter-tabs">
        {CATEGORIES.map(cat => (
          <button 
            key={cat}
            className={`tab-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image-wrapper">
              <img src={product.img} alt={product.name} />
              <span className="product-price">{product.price}</span>
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <a 
                href={getWaLink(product.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="wa-order-btn"
              >
                Encargar por WhatsApp
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
