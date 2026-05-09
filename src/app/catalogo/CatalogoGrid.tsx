'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
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
  { id: 's9', category: "Miel", name: "Miel de Tomillo", price: "CONSULTAR PRECIO", description: "Miel pura de la sierra, artesana.", image_url: "/images/miel_tomillo.png?v=1" },
  { id: 's10', category: "Miel", name: "Miel de Azahar", price: "CONSULTAR PRECIO", description: "Miel de flores de cítricos, aroma intenso.", image_url: "/images/miel_azahar.png?v=1" },
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
        .select('*');
      
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
            <div key={product.id} className={`product-card category-${product.category.toLowerCase().replace(/\s+/g, '-')}`}>
              <div className="product-image-wrapper">
                <Image 
                  src={product.image_url || '/images/placeholder.jpg'} 
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="product-price">{product.price}</div>
                <a 
                  href={getWaLink(product.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wa-order-btn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
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
