'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Package, LogOut, Plus, Settings, MessageSquare, Layout, Trash2 } from 'lucide-react';

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [siteContent, setSiteContent] = useState<any[]>([]);
  const [currentView, setCurrentView] = useState<'catalog' | 'content' | 'messages'>('catalog');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/admin/login');
        return;
      }
      setUser(user);
      fetchData();
    };
    init();
  }, [router, supabase]);

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([
      fetchProducts(),
      fetchContent()
    ]);
    setLoading(false);
  };

  const fetchProducts = async () => {
    const { data } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setProducts(data);
  };

  const fetchContent = async () => {
    const { data } = await supabase
      .from('site_content')
      .select('*')
      .order('category', { ascending: true });
    if (data) setSiteContent(data);
  };

  const handleUpdateContent = async (id: string, newContent: string) => {
    const { error } = await supabase
      .from('site_content')
      .update({ content: newContent })
      .eq('id', id);
    
    if (!error) {
      setSiteContent(prev => prev.map(item => item.id === id ? { ...item, content: newContent } : item));
    }
  };

  const handleDeleteContent = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este campo? Esto es útil para limpiar campos antiguos que ya no se usan.')) return;
    const { error } = await supabase.from('site_content').delete().eq('id', id);
    if (error) alert(error.message);
    else fetchContent();
  };

  const handleSeed = async () => {
    const isSync = siteContent.length > 0;
    if (!confirm(isSync ? '¿Quieres buscar y añadir nuevos campos editables sin borrar tus cambios actuales?' : '¿Quieres cargar el contenido inicial de la web?')) return;
    
    setLoading(true);
    try {
      const allSeeds = [
        // HERO
        { id: 'hero-title', category: 'hero', content: 'LA ABACERÍA' },
        { id: 'hero-subtitle', category: 'hero', content: 'ULTRAMARINOS FINOS & PRODUCTOS GOURMET' },
        { id: 'hero-description', category: 'hero', content: 'Selección artesanal de los mejores embutidos y productos gourmet de nuestra tierra. Tradición y sabor en cada bocado.' },
        { id: 'hero-image', category: 'hero', content: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&q=80' },
        { id: 'hero-primary-text', category: 'hero', content: 'Llamar ahora' },
        { id: 'hero-primary-link', category: 'hero', content: 'tel:691419369' },
        { id: 'hero-secondary-text', category: 'hero', content: 'Ver catálogo' },
        { id: 'hero-secondary-link', category: 'hero', content: '/catalogo' },
        
        // ABOUT
        { id: 'about-tag', category: 'about', content: 'NUESTRA TRADICIÓN' },
        { id: 'about-title', category: 'about', content: 'Nuestra Historia' },
        { id: 'about-content', category: 'about', content: 'Desde el corazón de nuestro pueblo, seleccionamos lo mejor de nuestra tierra para ofrecerte una experiencia gastronómica única.' },
        { id: 'about-motto', category: 'about', content: 'Calidad, Tradición y Sabor en cada bocado.' },
        { id: 'about-image', category: 'about', content: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80' },

        // BASKETS
        { id: 'baskets-title', content: 'Cestas Gourmet', category: 'baskets' },
        { id: 'baskets-subtitle', content: 'EL REGALO PERFECTO', category: 'baskets' },
        { id: 'baskets-image', content: 'https://images.unsplash.com/photo-1544965850-6f8a66788f9b?auto=format&fit=crop&q=80', category: 'baskets' },
        { id: 'basket-1-title', content: 'Lote Degustación Tradicional', category: 'baskets' },
        { id: 'basket-1-desc', content: 'Una selección equilibrada de nuestros mejores embutidos, regañás artesanales y aceite de oliva.', category: 'baskets' },
        { id: 'basket-1-image', content: '/images/cesta_pequeña.jpg', category: 'baskets' },
        { id: 'basket-1-badge', content: 'Popular', category: 'baskets' },
        { id: 'basket-2-title', content: 'Cesta Regalo Gourmet', category: 'baskets' },
        { id: 'basket-2-desc', content: 'La experiencia completa: incluye nuestra selección de quesos premiados y embutidos ibéricos.', category: 'baskets' },
        { id: 'basket-2-image', content: '/images/cesta_pequeña_variada.jpg', category: 'baskets' },
        { id: 'basket-2-badge', content: 'Premium', category: 'baskets' },
        { id: 'basket-3-title', content: 'Pack Selección Abacería', category: 'baskets' },
        { id: 'basket-3-desc', content: 'Personaliza tu pack con los productos que más te gusten de nuestra vitrina.', category: 'baskets' },
        { id: 'basket-3-image', content: '/images/mas_productos.jpg', category: 'baskets' },
        { id: 'basket-3-badge', content: 'Personalizado', category: 'baskets' },

        // GALLERY
        { id: 'gallery-title', content: 'Nuestro Rincón Gourmet', category: 'gallery' },
        { id: 'gallery-subtitle', content: 'Descubre la esencia de nuestra tienda y la calidad de nuestros productos seleccionados.', category: 'gallery' },
        { id: 'gallery-item-1-title', content: 'Nuestra Fachada', category: 'gallery' },
        { id: 'gallery-item-1-desc', content: 'Ubicados en el corazón de Mairena.', category: 'gallery' },
        { id: 'gallery-item-1-image', content: '/images/local_desde_fuera.jpg', category: 'gallery' },
        { id: 'gallery-item-2-title', content: 'Vinos de Selección', category: 'gallery' },
        { id: 'gallery-item-2-desc', content: 'Maridajes perfectos para nuestros ibéricos.', category: 'gallery' },
        { id: 'gallery-item-2-image', content: '/images/exposicion_vinos.jpg', category: 'gallery' },
        { id: 'gallery-item-3-title', content: 'Corte Artesano', category: 'gallery' },
        { id: 'gallery-item-3-desc', content: 'Maestría y precisión en cada loncha.', category: 'gallery' },
        { id: 'gallery-item-3-image', content: '/images/Local_desde_dentro.webp', category: 'gallery' },
        { id: 'gallery-item-4-title', content: 'Nuestras Vitrinas', category: 'gallery' },
        { id: 'gallery-item-4-desc', content: 'Productos selectos de la máxima calidad.', category: 'gallery' },
        { id: 'gallery-item-4-image', content: '/images/cristalera_productos_gourmet.jpg', category: 'gallery' },

        // SOCIAL
        { id: 'social-instagram', category: 'social', content: 'https://instagram.com/laabaceria' },
        { id: 'social-facebook', category: 'social', content: 'https://facebook.com/laabaceria' },
        { id: 'social-whatsapp', category: 'social', content: '34691419369' },

        // CONTACT
        { id: 'contact-phone', category: 'contact', content: '691419369' },
        { id: 'contact-email', category: 'contact', content: 'info@laabaceria.com' },
        { id: 'contact-address', category: 'contact', content: 'C. San Sebastián, 5, 41510 Mairena del Alcor, Sevilla' },
        { id: 'contact-hours', category: 'contact', content: 'Lunes a Viernes: 09:00 - 14:00 | 17:00 - 20:30\nSábados: 09:30 - 14:30' },

        // GENERAL / SEO / FOOTER
        { id: 'general-site-logo', content: '/logo.png', category: 'general' },
        { id: 'general-meta-description', content: 'La Abacería - Maestros del Jamón Ibérico y Productos Gourmet. Calidad artesanal en Mairena del Alcor.', category: 'general' },
        { id: 'general-footer-tagline', content: 'Calidad, Tradición y Sabor en cada bocado.', category: 'general' },
        { id: 'general-footer-copy', content: '© 2024 La Abacería. Todos los derechos reservados.', category: 'general' },
        { id: 'general-trust-tags', content: 'JABUGO, GUIJUELO, DEHESA DE EXTREMADURA, VALLE DE LOS PEDROCHES, CORTE A CUCHILLO, PRODUCTO ARTESANO, EDICIÓN LIMITADA, CALIDAD SUPREMA', category: 'general' },

        // FEATURES
        { id: 'feature-1-title', content: 'Corte a Cuchillo', category: 'features' },
        { id: 'feature-1-desc', content: 'Maestría en cada loncha para preservar todo el aroma y sabor.', category: 'features' },
        { id: 'feature-2-title', content: 'Selección en Dehesa', category: 'features' },
        { id: 'feature-2-desc', content: 'Solo las mejores piezas de bellota llegan a nuestra abacería.', category: 'features' },
        { id: 'feature-3-title', content: 'Tradición Local', category: 'features' },
        { id: 'feature-3-desc', content: 'Más de 30 años siendo el referente gourmet de nuestro pueblo.', category: 'features' },

        // REVIEWS
        { id: 'review-1-author', content: 'Antonio Moreno', category: 'reviews' },
        { id: 'review-1-text', content: 'El mejor jamón de toda la provincia. El trato es exquisito y la calidad de los embutidos es insuperable.', category: 'reviews' },
        { id: 'review-1-rating', content: '5', category: 'reviews' },
        { id: 'review-2-author', content: 'María García', category: 'reviews' },
        { id: 'review-2-text', content: 'Sitio de confianza para comprar productos gourmet. El corte a cuchillo es espectacular.', category: 'reviews' },
        { id: 'review-2-rating', content: '5', category: 'reviews' },
        { id: 'review-3-author', content: 'Juan Pérez', category: 'reviews' },
        { id: 'review-3-text', content: 'Muy profesionales. Siempre que tengo una cena especial encargo aquí mi tabla de embutidos.', category: 'reviews' },
        { id: 'review-3-rating', content: '4', category: 'reviews' }
      ];

      // Get existing IDs
      const { data: existing } = await supabase.from('site_content').select('id');
      const existingIds = (existing || []).map(e => e.id);

      // Filter new ones
      const newSeeds = allSeeds.filter(s => !existingIds.includes(s.id));

      if (newSeeds.length === 0) {
        alert('Todos los campos ya están presentes en la base de datos.');
        return;
      }

      const { error } = await supabase.from('site_content').insert(newSeeds);
      if (error) throw error;
      
      alert(`Se han añadido ${newSeeds.length} nuevos campos correctamente.`);
      fetchContent();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const seedDatabase = async () => {
    if (!confirm('¿Quieres cargar los productos iniciales?')) return;
    setLoading(true);
    const staticData = [
      { category: "Jamones", name: "Jamón de Bellota 100% Ibérico", price: "Consultar", description: "Piezas seleccionadas con más de 36 meses de curación.", image_url: "/images/Jamon_bellota.jpg" },
      { category: "Jamones", name: "Paleta de Cebo de Campo", price: "Consultar", description: "Sabor intenso y textura jugosa.", image_url: "/images/Jamon_bellota.jpg" },
      { category: "Jamones", name: "Jamón Reserva Oro", price: "Consultar", description: "Nuestra selección especial de la casa.", image_url: "/images/Jamon_oro.jpg" },
      { category: "Embutidos", name: "Caña de Lomo Ibérica", price: "Consultar", description: "Lomo de bellota curado en tripa natural.", image_url: "/images/caña_lomo_bellota.jpg" },
      { category: "Embutidos", name: "Chorizo de Bellota", price: "Consultar", description: "Aliño tradicional con pimentón de la Vera.", image_url: "/images/chorizo_bellota.jpg" },
      { category: "Embutidos", name: "Salchichón Artesano", price: "Consultar", description: "Pimienta negra en grano y magro de primera.", image_url: "/images/salchicho_bellota.jpg" },
      { category: "Quesos", name: "Queso Viejo de Oveja", price: "Consultar", description: "Leche cruda de oveja con 12 meses de maduración.", image_url: "/images/Queso_viejo_oveja.jpg" },
      { category: "Quesos", name: "Queso de Cabra al Pimentón", price: "Consultar", description: "Corteza untada en pimentón ahumado.", image_url: "/images/queso_pimenton.jpg" },
      { category: "Miel", name: "Miel de Tomillo", price: "Consultar", description: "Miel pura de la sierra, artesana.", image_url: "/images/miel_de_tomillo.jpg" },
      { category: "Miel", name: "Miel de Azahar", price: "Consultar", description: "Miel de flores de cítricos, aroma intenso.", image_url: "/images/miel_de_azahar.jpg" },
    ];
    await supabase.from('products').insert(staticData);
    fetchProducts();
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro?')) return;
    await supabase.from('products').delete().eq('id', id);
    fetchProducts();
  };

  if (loading && !products.length && !siteContent.length) return <div className="loading">Cargando...</div>;

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>ADMIN</h2>
        </div>
        <nav className="sidebar-nav">
          <button className={currentView === 'catalog' ? 'active' : ''} onClick={() => setCurrentView('catalog')}>
            <Package size={20} /> Catálogo
          </button>
          <button className={currentView === 'content' ? 'active' : ''} onClick={() => setCurrentView('content')}>
            <Layout size={20} /> Contenido Web
          </button>
          <button className={currentView === 'messages' ? 'active' : ''} onClick={() => setCurrentView('messages')}>
            <MessageSquare size={20} /> Mensajes
          </button>
          <button className={currentView === 'settings' ? 'active' : ''} onClick={() => setCurrentView('catalog')}>
            <Settings size={20} /> Ajustes
          </button>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={20} /> Salir
        </button>
      </aside>

      <main className="admin-content">
        {currentView === 'catalog' ? (
          <>
            <header className="content-header">
              <h1>Gestión de Catálogo</h1>
              <button className="add-btn" onClick={() => {setEditingProduct(null); setShowModal(true);}}>
                <Plus size={18} /> Nuevo Producto
              </button>
            </header>

            <section className="stats-grid">
              <div className="stat-card"><h3>Productos</h3><p>{products.length}</p></div>
              <div className="stat-card"><h3>Categorías</h3><p>{new Set(products.map(p => p.category)).size}</p></div>
              <div className="stat-card"><h3>Activos</h3><p>{products.length}</p></div>
            </section>

            <div className="admin-data-wrapper">
              {/* Desktop Table */}
              <div className="desktop-only data-table">
                <table>
                  <thead>
                    <tr><th>Imagen</th><th>Nombre</th><th>Categoría</th><th>Precio</th><th>Acciones</th></tr>
                  </thead>
                  <tbody>
                    {products.length === 0 ? (
                      <tr>
                        <td colSpan={5} style={{ textAlign: 'center', padding: '3rem' }}>
                          <button onClick={seedDatabase} className="seed-btn">Cargar Catálogo Inicial</button>
                        </td>
                      </tr>
                    ) : (
                      products.map((p) => (
                        <tr key={p.id}>
                          <td><img src={p.image_url || '/images/placeholder.jpg'} className="table-img" /></td>
                          <td><strong>{p.name}</strong></td>
                          <td><span className="badge">{p.category}</span></td>
                          <td>{p.price}</td>
                          <td>
                            <div className="actions">
                              <button onClick={() => {setEditingProduct(p); setShowModal(true);}}>Editar</button>
                              <button onClick={() => handleDelete(p.id)} className="delete">Borrar</button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Mobile List */}
              <div className="mobile-only products-list">
                {products.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '3rem' }}>
                    <button onClick={seedDatabase} className="seed-btn">Cargar Catálogo Inicial</button>
                  </div>
                ) : (
                  products.map((p) => (
                    <div key={p.id} className="product-mobile-card">
                      <div className="pm-main">
                        <img src={p.image_url || '/images/placeholder.jpg'} className="pm-img" />
                        <div className="pm-info">
                          <h3>{p.name}</h3>
                          <span className="badge">{p.category}</span>
                          <p className="pm-price">{p.price}</p>
                        </div>
                      </div>
                      <div className="pm-actions">
                        <button onClick={() => {setEditingProduct(p); setShowModal(true);}}>Editar</button>
                        <button onClick={() => handleDelete(p.id)} className="delete">Borrar</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        ) : currentView === 'content' ? (
          <ContentManager 
            content={siteContent} 
            onUpdate={handleUpdateContent} 
            onDelete={handleDeleteContent}
            onSeed={handleSeed} 
          />
        ) : (
          <div className="empty-view">Sección en desarrollo...</div>
        )}
      </main>

      {showModal && (
        <ProductModal 
          product={editingProduct} 
          onClose={() => setShowModal(false)} 
          onSave={() => { setShowModal(false); fetchProducts(); }}
        />
      )}

      <style jsx>{`
        .admin-container { display: flex; min-height: 100vh; background: #050505; color: white; font-family: var(--font-body); }
        .loading { height: 100vh; display: flex; align-items: center; justify-content: center; background: #050505; color: #c5a059; font-family: var(--font-display); }
        .sidebar { width: 260px; background: #0a0a0a; border-right: 1px solid #c5a05922; display: flex; flex-direction: column; padding: 2rem; transition: all 0.3s ease; }
        .sidebar-header h2 { font-family: var(--font-display); color: #c5a059; letter-spacing: 4px; margin-bottom: 3rem; text-align: center; }
        .sidebar-nav { display: flex; flex-direction: column; gap: 0.5rem; flex: 1; }
        .sidebar-nav button { display: flex; align-items: center; gap: 1rem; padding: 1rem; color: #888; background: none; border: none; border-radius: 4px; transition: 0.3s; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; width: 100%; cursor: pointer; text-align: left; }
        .sidebar-nav button.active, .sidebar-nav button:hover { background: #c5a05911; color: #c5a059; }
        .logout-btn { display: flex; align-items: center; gap: 1rem; padding: 1rem; color: #ff4444; background: none; border: none; cursor: pointer; text-transform: uppercase; letter-spacing: 1px; margin-top: auto; }
        .admin-content { flex: 1; padding: 3rem; overflow-y: auto; }
        .content-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 3rem; flex-wrap: wrap; gap: 1rem; }
        .content-header h1 { font-family: var(--font-display); font-size: 2rem; }
        .add-btn { background: #c5a059; color: black; border: none; padding: 0.8rem 1.5rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 0.5rem; }
        .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-bottom: 3rem; }
        .stat-card { background: #111; padding: 1.5rem; border: 1px solid #222; border-radius: 4px; }
        .stat-card h3 { color: #666; font-size: 0.8rem; text-transform: uppercase; margin-bottom: 0.5rem; }
        .stat-card p { font-size: 2rem; font-family: var(--font-display); color: #c5a059; }
        .data-table { background: #111; border: 1px solid #222; border-radius: 4px; overflow-x: auto; }
        table { width: 100%; border-collapse: collapse; min-width: 600px; }
        th { text-align: left; padding: 1.2rem; background: #1a1a1a; color: #c5a059; font-size: 0.8rem; text-transform: uppercase; border-bottom: 1px solid #222; }
        td { padding: 1.2rem; border-bottom: 1px solid #1a1a1a; color: #888; }
        .table-img { width: 50px; height: 50px; object-fit: cover; border-radius: 4px; }
        .badge { background: #c5a05922; color: #c5a059; padding: 0.2rem 0.6rem; border-radius: 100px; font-size: 0.75rem; }
        .actions { display: flex; gap: 0.5rem; }
        .actions button { background: #222; border: none; color: #ccc; padding: 0.4rem 0.8rem; cursor: pointer; }
        .actions button.delete:hover { background: #ff4444; color: white; }
        .seed-btn { background: transparent; border: 1px solid #c5a059; color: #c5a059; padding: 0.5rem 1rem; cursor: pointer; }
        .empty-view { text-align: center; padding: 5rem; color: #666; font-family: var(--font-display); letter-spacing: 2px; }

        .desktop-only { display: block; }
        .mobile-only { display: none; }

        .product-mobile-card { background: #111; border: 1px solid #222; border-radius: 4px; margin-bottom: 1rem; padding: 1rem; }
        .pm-main { display: flex; gap: 1rem; align-items: center; margin-bottom: 1rem; }
        .pm-img { width: 70px; height: 70px; object-fit: cover; border-radius: 4px; }
        .pm-info { flex: 1; }
        .pm-info h3 { font-size: 1rem; margin: 0 0 0.3rem 0; color: #fff; }
        .pm-price { color: #c5a059; font-weight: bold; margin-top: 0.3rem; }
        .pm-actions { display: flex; gap: 0.5rem; border-top: 1px solid #222; padding-top: 0.8rem; margin-top: 0.5rem; }
        .pm-actions button { flex: 1; padding: 0.8rem; font-size: 0.8rem; border-radius: 4px; cursor: pointer; transition: all 0.2s ease; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
        .pm-actions button:first-child { background: #c5a059; color: black; border: none; }
        .pm-actions button.delete { background: #1a1a1a; border: 1px solid #ff444444; color: #ff4444; }
        .pm-actions button:active { transform: scale(0.95); }

        @media (max-width: 992px) {
          .admin-container { flex-direction: column; }
          .sidebar { width: 100%; border-right: none; border-bottom: 1px solid #c5a05922; padding: 1rem; }
          .sidebar-header h2 { margin-bottom: 1rem; font-size: 1.2rem; }
          .sidebar-nav { flex-direction: row; flex-wrap: wrap; justify-content: center; margin-bottom: 1rem; }
          .sidebar-nav button { width: auto; padding: 0.8rem; font-size: 0.8rem; }
          .logout-btn { margin-top: 0; padding: 0.8rem; justify-content: center; }
          .admin-content { padding: 1.5rem; }
          .stats-grid { grid-template-columns: 1fr; gap: 1rem; }
          .image-field { flex-direction: column; align-items: flex-start; gap: 1rem; }
          .site-img-preview { width: 100%; height: 200px; }
          
          .desktop-only { display: none; }
          .mobile-only { display: block; }
        }

        @media (max-width: 768px) {
          .content-header h1 { font-size: 1.5rem; }
          .sidebar-nav button span { display: none; }
          .sidebar-nav button { padding: 0.5rem; }
        }
      `}</style>
    </div>
  );
}

function ContentManager({ content, onUpdate, onDelete, onSeed }: any) {
  const [uploading, setUploading] = useState<string | null>(null);
  const [localContent, setLocalContent] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<string | null>(null);
  const supabase = createClient();

  const handleImageUpload = async (itemId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(itemId);
    try {
      const fileName = `site-${itemId}-${Math.random()}.${file.name.split('.').pop()}`;
      const { error: uploadError } = await supabase.storage.from('product-images').upload(fileName, file);
      if (uploadError) throw uploadError;
      
      const { data: { publicUrl } } = supabase.storage.from('product-images').getPublicUrl(fileName);
      await onUpdate(itemId, publicUrl);
    } catch (err: any) {
      alert('Error subiendo imagen: ' + err.message);
    } finally {
      setUploading(null);
    }
  };

  const handleSave = async (id: string) => {
    const text = localContent[id];
    if (text === undefined) return;
    setSaving(id);
    await onUpdate(id, text);
    setSaving(null);
  };

  return (
    <div className="content-manager">
      <header className="content-header">
        <div className="header-titles">
          <h1>Contenido de la Web</h1>
          <p className="subtitle">Gestiona todos los textos e imágenes del sitio</p>
        </div>
        <div className="header-actions">
          <button onClick={onSeed} className="seed-btn-secondary">
            {content.length === 0 ? 'Cargar Contenido Inicial' : 'Sincronizar Nuevos Campos'}
          </button>
        </div>
      </header>
      
      <div className="sections-list">
        {['hero', 'about', 'baskets', 'gallery', 'features', 'reviews', 'contact', 'social', 'general'].map(cat => (
          <div key={cat} className="content-section">
            <h2 className="section-title">{
              cat === 'hero' ? 'Cabecera (Hero)' :
              cat === 'about' ? 'Sobre Nosotros' :
              cat === 'baskets' ? 'Cestas Gourmet' :
              cat === 'gallery' ? 'Galería del Local' :
              cat === 'features' ? 'Características / Iconos' :
              cat === 'reviews' ? 'Reseñas de Clientes' :
              cat === 'contact' ? 'Contacto y Horarios' :
              cat === 'social' ? 'Redes Sociales' : 'Ajustes Generales y SEO'
            }</h2>
            <div className="fields-grid">
              {content
                .filter((c: any) => c.category === cat)
                .sort((a: any, b: any) => {
                  const getNum = (id: string) => {
                    const m = id.match(/-(\d+)-/);
                    return m ? parseInt(m[1]) : 0;
                  };
                  const numA = getNum(a.id);
                  const numB = getNum(b.id);
                  if (numA !== numB) return numA - numB;
                  return a.id.localeCompare(b.id);
                })
                .map((item: any) => {
                const getLabel = (id: string) => {
                  const base = id.replace(cat + '-', '');
                  const labels: Record<string, string> = {
                    'title': 'Título Principal',
                    'subtitle': 'Subtítulo / Ceja',
                    'content': 'Contenido de Texto',
                    'image': 'Imagen / Foto',
                    'description': 'Descripción Detallada',
                    'motto': 'Lema / Eslogan',
                    'tag': 'Etiqueta Superior',
                    'address': 'Dirección Física',
                    'phone': 'Teléfono de Contacto',
                    'email': 'Correo Electrónico',
                    'hours': 'Horarios de Apertura',
                    'instagram': 'URL Instagram',
                    'facebook': 'URL Facebook',
                    'whatsapp': 'WhatsApp (Ej: 34600000000)',
                    'tagline': 'Frase Destacada Footer',
                    'copy': 'Texto de Copyright',
                    'tags': 'Palabras Clave (SEO/Trust)',
                    'text': 'Cuerpo del Mensaje',
                    'author': 'Nombre del Cliente',
                    'rating': 'Puntuación (Estrellas)',
                    'badge': 'Distintivo (Badge)',
                    'desc': 'Breve Descripción',
                    'primary-text': 'Texto Botón Principal',
                    'primary-link': 'Enlace Botón Principal',
                    'secondary-text': 'Texto Botón Secundario',
                    'secondary-link': 'Enlace Botón Secundario'
                  };

                  if (id.match(/-\d-/)) {
                    const parts = id.split('-');
                    const index = parts.find(p => !isNaN(Number(p)));
                    const type = parts[parts.length - 1];
                    const itemName = id.includes('basket') ? 'Cesta' : 
                                   id.includes('gallery') ? 'Imagen' : 
                                   id.includes('feature') ? 'Característica' : 'Elemento';
                    return `${itemName} ${index} - ${labels[type] || type}`;
                  }

                  return labels[base] || base.charAt(0).toUpperCase() + base.slice(1).replace(/-/g, ' ');
                };

                return (
                  <div key={item.id} className="field-card">
                    <div className="field-label-row">
                      <label>{getLabel(item.id)}</label>
                      {localContent[item.id] !== undefined && (
                        <span className="unsaved-tag">Pendiente de guardar</span>
                      )}
                    </div>
                  
                    <div className="field-input-group">
                      {item.id.includes('image') || item.id.includes('logo') ? (
                        <div className="image-field">
                          <img src={item.content} alt="Preview" className="site-img-preview" />
                          <div className="upload-controls">
                            <input type="file" onChange={(e) => handleImageUpload(item.id, e)} disabled={uploading === item.id} />
                            {uploading === item.id && <span className="loader">Subiendo...</span>}
                          </div>
                        </div>
                      ) : (
                        <div className="text-input-wrapper">
                          {item.content.length > 80 ? (
                            <textarea 
                              defaultValue={item.content}
                              onChange={(e) => setLocalContent({ ...localContent, [item.id]: e.target.value })}
                              rows={3}
                            />
                          ) : (
                            <input 
                              type="text" 
                              defaultValue={item.content}
                              onChange={(e) => setLocalContent({ ...localContent, [item.id]: e.target.value })}
                            />
                          )}
                          <button 
                            className={`save-field-btn ${saving === item.id ? 'saving' : ''}`}
                            onClick={() => handleSave(item.id)}
                            disabled={saving === item.id || localContent[item.id] === undefined}
                          >
                            {saving === item.id ? '...' : 'Guardar'}
                          </button>
                          <button 
                             className="delete-field-btn"
                             onClick={() => onDelete(item.id)}
                             title="Eliminar este campo (útil para limpiar legacy)"
                           >
                             <Trash2 size={16} />
                           </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              {content.filter((c: any) => c.category === cat).length === 0 && (
                <p className="no-fields">No hay campos en esta sección. Haz clic en "Sincronizar" arriba.</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .content-manager { animation: fadeIn 0.5s ease; }
        
        .content-header { 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          margin-bottom: 3rem; 
          background: #0a0a0a; 
          padding: 2rem; 
          border-bottom: 1px solid #222;
        }
        
        .header-titles h1 { font-family: var(--font-display); color: white; margin: 0; }
        .subtitle { color: #666; margin: 0.5rem 0 0; font-size: 0.9rem; }
        
        .seed-btn-secondary {
          background: #c5a05922;
          color: #c5a059;
          border: 1px solid #c5a05944;
          padding: 0.8rem 1.5rem;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 600;
          transition: 0.3s;
        }
        .seed-btn-secondary:hover { background: #c5a059; color: black; }

        .content-section { 
          margin-bottom: 4rem; 
          padding: 0 2rem;
        }
        
        .section-title { 
          font-family: var(--font-display); 
          color: #c5a059; 
          margin-bottom: 2rem; 
          letter-spacing: 2px; 
          border-left: 3px solid #c5a059; 
          padding-left: 1rem; 
          font-size: 1.5rem;
          text-transform: uppercase;
        }

        .fields-grid { display: grid; grid-template-columns: 1fr; gap: 2.5rem; }
        
        .field-card { display: flex; flex-direction: column; gap: 1rem; background: #080808; padding: 1.5rem; border: 1px solid #111; border-radius: 4px; }
        
        .field-label-row { display: flex; justify-content: space-between; align-items: center; }
        label { color: #888; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600; }
        
        .unsaved-tag { background: #c5a059; color: black; font-size: 0.6rem; padding: 0.2rem 0.5rem; border-radius: 2px; font-weight: bold; text-transform: uppercase; }

        .text-input-wrapper { display: flex; gap: 1rem; align-items: flex-start; }
        
        input, textarea { 
          background: #111; 
          border: 1px solid #222; 
          color: white; 
          padding: 1rem; 
          border-radius: 4px; 
          font-family: var(--font-body); 
          flex: 1; 
          transition: 0.3s; 
          font-size: 1rem;
        }
        
        input:focus, textarea:focus { border-color: #c5a059; outline: none; background: #161616; }

        .save-field-btn {
          background: #c5a059;
          color: black;
          border: none;
          padding: 1rem 1.5rem;
          border-radius: 4px;
          font-weight: bold;
          cursor: pointer;
          transition: 0.3s;
          white-space: nowrap;
          min-width: 100px;
        }
        .save-field-btn:disabled { background: #1a1a1a; color: #444; border-color: #222; cursor: not-allowed; }
        .save-field-btn.saving { opacity: 0.7; }
        
        .delete-field-btn {
          background: #ff444411;
          color: #ff4444;
          border: 1px solid #ff444433;
          padding: 0.5rem;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: 0.3s;
        }
        .delete-field-btn:hover { background: #ff4444; color: white; }

        .image-field { display: flex; align-items: center; gap: 2rem; background: #111; padding: 1.5rem; border-radius: 4px; border: 1px solid #222; }
        .site-img-preview { width: 150px; height: 100px; object-fit: cover; border-radius: 4px; border: 1px solid #333; background: #000; }
        
        .no-fields { color: #444; font-style: italic; background: #050505; padding: 2rem; text-align: center; border: 1px dashed #222; border-radius: 4px; }
        
        .loader { color: #c5a059; font-size: 0.8rem; margin-left: 1rem; }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 768px) {
          .content-header { flex-direction: column; gap: 1.5rem; text-align: center; }
          .text-input-wrapper { flex-direction: column; }
          .save-field-btn { width: 100%; }
          .image-field { flex-direction: column; text-align: center; }
          .site-img-preview { width: 100%; height: 200px; }
          .content-section { padding: 0 1rem; }
        }
      `}</style>
    </div>
  );
}

function ProductModal({ product, onClose, onSave }: any) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    category: product?.category || 'Jamones',
    price: product?.price || 'Consultar',
    description: product?.description || '',
    image_url: product?.image_url || ''
  });
  const [uploading, setUploading] = useState(false);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (product) await supabase.from('products').update(formData).eq('id', product.id);
    else await supabase.from('products').insert([formData]);
    onSave();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fileName = `${Math.random()}.${file.name.split('.').pop()}`;
    await supabase.storage.from('product-images').upload(fileName, file);
    const { data: { publicUrl } } = supabase.storage.from('product-images').getPublicUrl(fileName);
    setFormData({ ...formData, image_url: publicUrl });
    setUploading(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2>{product ? 'Editar Producto' : 'Nuevo Producto'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group"><label>Nombre</label><input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required /></div>
          <div className="form-row">
            <div className="form-group"><label>Categoría</label><select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}><option>Jamones</option><option>Embutidos</option><option>Quesos</option><option>Vinos</option><option>Miel</option><option>Conservas</option></select></div>
            <div className="form-group"><label>Precio</label><input value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} /></div>
          </div>
          <div className="form-group"><label>Descripción</label><textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} /></div>
          <div className="form-group">
            <label>Imagen</label>
            <div className="upload-container">
              {formData.image_url && <img src={formData.image_url} alt="Preview" className="preview-img" />}
              <input type="file" onChange={handleImageUpload} disabled={uploading} />
            </div>
          </div>
          <div className="modal-actions"><button type="button" onClick={onClose} className="cancel-btn">Cancelar</button><button type="submit" className="save-btn">{product ? 'Guardar Cambios' : 'Crear Producto'}</button></div>
        </form>
      </div>
      <style jsx>{`
        .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(5px); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px; }
        .modal-card { background: #111; width: 100%; max-width: 500px; padding: 2.5rem; border: 1px solid #c5a05933; border-radius: 4px; }
        h2 { font-family: var(--font-display); color: #c5a059; margin-bottom: 2rem; font-size: 1.5rem; }
        .form-group { margin-bottom: 1.2rem; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
        label { display: block; margin-bottom: 0.5rem; color: #666; font-size: 0.75rem; text-transform: uppercase; }
        input, select, textarea { width: 100%; padding: 0.7rem; background: #1a1a1a; border: 1px solid #333; color: white; outline: none; }
        input:focus, select:focus, textarea:focus { border-color: #c5a059; }
        .upload-container { display: flex; align-items: center; gap: 1rem; }
        .preview-img { width: 60px; height: 60px; object-fit: cover; }
        .modal-actions { display: flex; justify-content: flex-end; gap: 1rem; margin-top: 2rem; }
        .cancel-btn { background: none; border: 1px solid #333; color: #888; padding: 0.8rem 1.5rem; cursor: pointer; }
        .save-btn { background: #c5a059; color: black; border: none; padding: 0.8rem 1.5rem; font-weight: 700; cursor: pointer; }

        @media (max-width: 480px) {
          .modal-card { padding: 1.5rem; }
          .form-row { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
