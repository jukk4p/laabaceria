'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

const CATEGORIES = ["Jamones", "Embutidos", "Quesos", "Vinos", "Miel", "Conservas"];

const STATIC_PRODUCTS = [
  { id: 's1', category: "Jamones", name: "Jamón de Bellota 100% Ibérico", price: "Consultar", description: "Piezas seleccionadas con más de 36 meses de curación.", image_url: "/images/Jamon_bellota.jpg" },
  { id: 's2', category: "Jamones", name: "Paleta de Cebo de Campo", price: "Consultar", description: "Sabor intenso y textura jugosa.", image_url: "/images/Jamon_bellota.jpg" },
  { id: 's3', category: "Jamones", name: "Jamón Reserva Oro", price: "Consultar", description: "Nuestra selección especial de la casa.", image_url: "/images/Jamon_oro.jpg" },
  { id: 's4', category: "Embutidos", name: "Caña de Lomo Ibérica", price: "Consultar", description: "Lomo de bellota curado en tripa natural.", image_url: "/images/caña_lomo_bellota.jpg" },
  { id: 's5', category: "Embutidos", name: "Chorizo de Bellota", price: "Consultar", description: "Aliño tradicional con pimentón de la Vera.", image_url: "/images/chorizo_bellota.jpg" },
  { id: 's6', category: "Embutidos", name: "Salchichón Artesano", price: "Consultar", description: "Pimienta negra en grano y magro de primera.", image_url: "/images/salchicho_bellota.jpg" },
  { id: 's7', category: "Quesos", name: "Queso Viejo de Oveja", price: "Consultar", description: "Leche cruda de oveja con 12 meses de maduración.", image_url: "/images/Queso_viejo_oveja.jpg" },
  { id: 's8', category: "Quesos", name: "Queso de Cabra al Pimentón", price: "Consultar", description: "Corteza untada en pimentón ahumado.", image_url: "/images/queso_pimenton.jpg" },
  { id: 's9', category: "Miel", name: "Miel de Tomillo", price: "Consultar", description: "Miel pura de la sierra, artesana.", image_url: "/images/miel_de_tomillo.jpg" },
  { id: 's10', category: "Miel", name: "Miel de Azahar", price: "Consultar", description: "Miel de flores de cítricos, aroma intenso.", image_url: "/images/miel_de_azahar.jpg" },
];

export default function CatalogoGrid() {
  const [activeCategory, setActiveCategory] = useState("Jamones");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      // Forzamos que no use caché del navegador
      const { data, error } = await supabase
        .from('products')
        .select('*', { count: 'exact' });
      
      console.log("Productos cargados:", data);

      if (data && data.length > 0) {
        setProducts(data);
      } else {
        console.log("Cargando productos estáticos (fallback)");
        setProducts(STATIC_PRODUCTS);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [supabase]);

  const filteredProducts = products.filter(p => p.category === activeCategory);

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
        {loading ? (
          <div className="loading-placeholder">Cargando catálogo...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="empty-category">No hay productos en esta categoría.</div>
        ) : (
          filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image-wrapper">
                <img src={product.image_url || '/images/placeholder.jpg'} alt={product.name} />
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
          ))
        )}
      </div>

      <style jsx>{`
        .loading-placeholder, .empty-category {
          grid-column: 1 / -1;
          text-align: center;
          padding: 4rem;
          color: #888;
          font-family: var(--font-display);
          letter-spacing: 2px;
        }
      `}</style>
    </div>
  );
}
