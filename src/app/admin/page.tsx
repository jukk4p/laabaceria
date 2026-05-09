'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Package, LogOut, Plus, Settings, MessageSquare, Layout, Trash2, Monitor, Info, Gift, Image, CheckCircle, Quote, Phone, Share2, Search, History, Mail, Truck, FileText } from 'lucide-react';

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [siteContent, setSiteContent] = useState<any[]>([]);
  const [currentView, setCurrentView] = useState<'catalog' | 'content' | 'messages' | 'settings'>('catalog');
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
        { id: 'about-content', category: 'about', content: 'Desde el corazón de Coria del Río, seleccionamos lo mejor de nuestra tierra para ofrecerte una experiencia gastronómica única.' },
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
        { id: 'gallery-item-1-desc', content: 'Ubicados en el corazón de Coria del Río.', category: 'gallery' },
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
        { id: 'contact-eyebrow', category: 'contact', content: 'ESTAMOS EN CORIA' },
        { id: 'contact-title', category: 'contact', content: 'Visítenos' },
        { id: 'contact-phone', category: 'contact', content: '691419369' },
        { id: 'contact-email', category: 'contact', content: 'info@laabaceriacoria.es' },
        { id: 'contact-address', category: 'contact', content: 'C. Cervantes, 75, 41100 Coria del Río, Sevilla' },
        { id: 'contact-hours', category: 'contact', content: 'Lun - Vie: 8:30 - 14:00 | 17:30 - 21:00\nSábado: 8:30 - 14:00' },

        // GENERAL / SEO / FOOTER
        { id: 'general-site-logo', content: '/logo.png', category: 'general' },
        { id: 'general-meta-description', content: 'La Abacería - Maestros del Jamón Ibérico y Productos Gourmet en Coria del Río.', category: 'general' },
        { id: 'general-footer-tagline', content: 'Calidad, Tradición y Sabor en cada bocado.', category: 'general' },
        { id: 'general-footer-copy', content: '© 2024 La Abacería. Todos los derechos reservados.', category: 'general' },
        { id: 'general-trust-tags', content: 'JABUGO, GUIJUELO, DEHESA DE EXTREMADURA, VALLE DE LOS PEDROCHES, CORTE A CUCHILLO, PRODUCTO ARTESANO, EDICIÓN LIMITADA, CALIDAD SUPREMA', category: 'general' },
        { id: 'footer-hours-weekday-label', content: 'Lunes a Sábado:', category: 'general' },
        { id: 'footer-hours-weekday', content: '09:30 - 15:00, 18:00 - 21:00', category: 'general' },
        { id: 'footer-hours-sunday-label', content: 'Domingo:', category: 'general' },
        { id: 'footer-hours-sunday', content: '10:00 - 15:00', category: 'general' },

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
        { id: 'review-1-date', content: 'marzo 2024', category: 'reviews' },
        { id: 'review-1-avatar', content: 'AM', category: 'reviews' },
        { id: 'review-2-author', content: 'María García', category: 'reviews' },
        { id: 'review-2-text', content: 'Sitio de confianza para comprar productos gourmet. El corte a cuchillo es espectacular.', category: 'reviews' },
        { id: 'review-2-rating', content: '5', category: 'reviews' },
        { id: 'review-2-date', content: 'febrero 2024', category: 'reviews' },
        { id: 'review-2-avatar', content: 'MG', category: 'reviews' },
        { id: 'review-3-author', content: 'Juan Pérez', category: 'reviews' },
        { id: 'review-3-text', content: 'Muy profesionales. Siempre que tengo una cena especial encargo aquí mi tabla de embutidos.', category: 'reviews' },
        { id: 'review-3-rating', content: '5', category: 'reviews' },
        { id: 'review-3-date', content: 'enero 2024', category: 'reviews' },
        { id: 'review-3-avatar', content: 'JP', category: 'reviews' },

        // NOSOTROS
        { id: 'nosotros-page-title', content: 'Nuestra Historia', category: 'nosotros' },
        { id: 'nosotros-page-subtitle', content: 'Tres décadas de pasión por el producto ibérico.', category: 'nosotros' },
        { id: 'nosotros-section-title', content: 'Desde Coria del Río para el mundo', category: 'nosotros' },
        { id: 'nosotros-text-1', content: 'La Abacería nació hace más de 30 años con un objetivo claro: traer la excelencia de las dehesas españolas directamente al corazón de Coria del Río. Lo que empezó como un pequeño local familiar se ha convertido hoy en un referente gourmet en Sevilla.', category: 'nosotros' },
        { id: 'nosotros-text-2', content: 'Nuestra filosofía no ha cambiado: seleccionamos cada pieza en origen, respetando los tiempos de curación y el saber hacer de los maestros jamoneros. No vendemos solo comida, vendemos un trozo de nuestra cultura.', category: 'nosotros' },
        { id: 'nosotros-stat-1-num', content: '30+', category: 'nosotros' },
        { id: 'nosotros-stat-1-label', content: 'Años de experiencia', category: 'nosotros' },
        { id: 'nosotros-stat-2-num', content: '10k+', category: 'nosotros' },
        { id: 'nosotros-stat-2-label', content: 'Clientes satisfechos', category: 'nosotros' },
        { id: 'nosotros-stat-3-num', content: '100%', category: 'nosotros' },
        { id: 'nosotros-stat-3-label', content: 'Calidad garantizada', category: 'nosotros' },

        // CONTACTO PAGE
        { id: 'contacto-page-title', content: 'Contacto', category: 'contacto' },
        { id: 'contacto-page-subtitle', content: 'Estamos a su disposición para cualquier consulta o pedido especial.', category: 'contacto' },
        { id: 'contacto-b2b-title', content: '¿Necesitas cestas para tu empresa?', category: 'contacto' },
        { id: 'contacto-b2b-text', content: 'Contacta con nosotros para un presupuesto personalizado y selección de piezas exclusivas.', category: 'contacto' },

        // ENVIOS PAGE
        { id: 'envios-page-title', content: 'Envíos y Entregas', category: 'envios' },
        { id: 'envios-page-subtitle', content: 'Llevamos el sabor de nuestra abacería directamente a su mesa.', category: 'envios' },
        { id: 'envios-card-1-title', content: 'Ámbito de Entrega', category: 'envios' },
        { id: 'envios-card-1-text', content: 'Realizamos envíos a toda la Península Ibérica. Para envíos a Baleares, Canarias o internacional, por favor consúltenos directamente.', category: 'envios' },
        { id: 'envios-card-1-icon', content: '🚚', category: 'envios' },
        { id: 'envios-card-2-title', content: 'Plazos de Entrega', category: 'envios' },
        { id: 'envios-card-2-text', content: 'Nuestros pedidos suelen entregarse en un plazo de 24 a 48 horas laborables para garantizar la frescura de los productos.', category: 'envios' },
        { id: 'envios-card-2-icon', content: '⏱️', category: 'envios' },
        { id: 'envios-card-3-title', content: 'Garantía de Calidad', category: 'envios' },
        { id: 'envios-card-3-text', content: 'Todos nuestros productos viajan en embalajes reforzados y, si el producto lo requiere, con temperatura controlada.', category: 'envios' },
        { id: 'envios-card-3-icon', content: '🛡️', category: 'envios' },
        { id: 'envios-tarifa-1-label', content: 'Pedidos superiores a 150€', category: 'envios' },
        { id: 'envios-tarifa-1-price', content: 'GRATIS', category: 'envios' },
        { id: 'envios-tarifa-2-label', content: 'Envío Estándar (Península)', category: 'envios' },
        { id: 'envios-tarifa-2-price', content: '6,95€', category: 'envios' },
        { id: 'envios-tarifa-3-label', content: 'Recogida en tienda (Coria del Río)', category: 'envios' },
        { id: 'envios-tarifa-3-price', content: 'GRATIS', category: 'envios' },

        // LEGAL
        { 
          id: 'legal-aviso-content', 
          category: 'legal',
          content: `1. DATOS IDENTIFICATIVOS
En cumplimiento con el deber de información recogido en el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico, se reflejan los siguientes datos: la empresa titular de la web es LA ABACERÍA (en adelante La Abacería), con domicilio en C. Cervantes, 75, 41100 Coria del Río, Sevilla. Correo electrónico: info@laabaceriacoria.es.

2. USUARIOS
El acceso y/o uso de este portal de La Abacería atribuye la condición de USUARIO, que acepta, desde dicho acceso y/o uso, las Condiciones Generales de Uso aquí reflejadas.

3. USO DEL PORTAL
laabaceriacoria.es proporciona el acceso a multitud de informaciones, servicios o datos en Internet pertenecientes a La Abacería. El USUARIO asume la responsabilidad del uso del portal.

4. PROTECCIÓN DE DATOS
La Abacería cumple con las directrices del Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD), velando por garantizar un correcto uso y tratamiento de los datos personales del usuario.` 
        },
        { 
          id: 'legal-privacidad-content', 
          category: 'legal',
          content: `RESPONSABLE DEL TRATAMIENTO: LA ABACERÍA
FINALIDAD: Gestión de consultas, reservas y envío de información sobre nuestros productos gourmet.
LEGITIMACIÓN: Consentimiento del interesado.
DESTINATARIOS: No se cederán datos a terceros, salvo obligación legal.
DERECHOS: Tiene derecho a acceder, rectificar y suprimir los datos, así como otros derechos, como se explica en la información adicional.

Información adicional: Los datos personales proporcionados se conservarán mientras se mantenga la relación comercial o durante los años necesarios para cumplir con las obligaciones legales. Usted puede ejercer sus derechos dirigiéndose a C. Cervantes, 75, 41100 Coria del Río, Sevilla o vía email.` 
        },
        { 
          id: 'legal-cookies-content', 
          category: 'legal',
          content: `Este sitio web utiliza cookies para mejorar la experiencia del usuario. A continuación encontrará información sobre qué son las cookies, qué tipo de cookies utiliza este portal y cómo puede desactivarlas en su navegador.

¿QUÉ SON LAS COOKIES?
Las cookies son pequeños archivos que algunas plataformas pueden instalar en su ordenador, smartphone o tableta.

TIPOS DE COOKIES QUE UTILIZAMOS:
1. Cookies técnicas: Son aquellas que permiten al usuario la navegación a través de una página web y la utilización de las diferentes opciones o servicios que en ella existan.
2. Cookies de análisis: Son aquellas que nos permiten cuantificar el número de usuarios y realizar la medición y análisis estadístico de la utilización que hacen los usuarios del servicio.
3. Cookies de personalización: Permiten al usuario acceder al servicio con algunas características de carácter general predefinidas.` 
        },
        { 
          id: 'legal-terminos-content', 
          category: 'legal',
          content: `1. OBJETO Y ÁMBITO DE APLICACIÓN
Las presentes Condiciones Generales regulan el acceso y uso del sitio web de La Abacería, así como la adquisición de sus productos.

2. PRODUCTOS Y PRECIOS
La Abacería se reserva el derecho a decidir, en cada momento, los productos que se ofrecen a los usuarios. Los precios indicados en pantalla incluyen el IVA.

3. PROCESO DE COMPRA/RESERVA
Los pedidos y reservas podrán gestionarse directamente a través de los canales de contacto facilitados (WhatsApp, teléfono). La formalización de la reserva implica la aceptación de estas condiciones.

4. DEVOLUCIONES
Dada la naturaleza perecedera de muchos de nuestros productos (jamones, embutidos, quesos), las devoluciones se regirán por la normativa vigente para productos de alimentación y consumo inmediato.` 
        }
      ];

      // Get existing IDs
      const { data: existing } = await supabase.from('site_content').select('id');
      const existingIds = (existing || []).map((e: any) => e.id);

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
          <button className={currentView === 'settings' ? 'active' : ''} onClick={() => setCurrentView('settings')}>
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
        ) : currentView === 'messages' ? (
          <div className="empty-view">
            <MessageSquare size={48} style={{ marginBottom: '1rem', opacity: 0.2 }} />
            <h2>Buzón de Mensajes</h2>
            <p>Aquí aparecerán los mensajes enviados desde el formulario de contacto.</p>
          </div>
        ) : currentView === 'settings' ? (
          <div className="empty-view">
            <Settings size={48} style={{ marginBottom: '1rem', opacity: 0.2 }} />
            <h2>Ajustes del Sistema</h2>
            <p>Configuración de cuenta, seguridad y backups.</p>
          </div>
        ) : (
          <div className="empty-view">Sección no encontrada</div>
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
  const [activeCategory, setActiveCategory] = useState('hero');
  const supabase = createClient();

  const categories = [
    { id: 'hero', label: 'Home - Hero', icon: <Monitor size={18} /> },
    { id: 'about', label: 'Home - Sobre Nosotros', icon: <Info size={18} /> },
    { id: 'baskets', label: 'Home - Cestas Gourmet', icon: <Gift size={18} /> },
    { id: 'gallery', label: 'Home - Galería', icon: <Image size={18} /> },
    { id: 'reviews', label: 'Home - Reseñas', icon: <Quote size={18} /> },
    { id: 'contact', label: 'Home - Contacto', icon: <Phone size={18} /> },
    { id: 'nosotros', label: 'Página - Nuestra Historia', icon: <History size={18} /> },
    { id: 'contacto', label: 'Página - Contacto', icon: <Mail size={18} /> },
    { id: 'envios', label: 'Página - Envíos', icon: <Truck size={18} /> },
    { id: 'social', label: 'Redes Sociales', icon: <Share2 size={18} /> },
    { id: 'general', label: 'SEO y Pie de página', icon: <Search size={18} /> },
    { id: 'legal', label: 'Páginas Legales', icon: <FileText size={18} /> },
    { id: 'features', label: 'Home - Características (Oculto)', icon: <CheckCircle size={18} /> },
  ];

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
    // Clear local state for this item after saving
    const newLocal = { ...localContent };
    delete newLocal[id];
    setLocalContent(newLocal);
    setSaving(null);
  };

  return (
    <div className="content-manager-v2">
      <header className="cm-header">
        <div className="cm-title-wrapper">
          <h1>Editor de Contenido</h1>
          <p>Personaliza cada rincón de tu sitio web en tiempo real</p>
        </div>
        <button onClick={onSeed} className="cm-sync-btn">
          <Settings size={16} />
          {content.length === 0 ? 'Cargar Contenido Inicial' : 'Sincronizar Estructura'}
        </button>
      </header>

      <div className="cm-main-layout">
        <aside className="cm-nav">
          {categories.map(cat => (
            <button 
              key={cat.id}
              className={`cm-nav-item ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.icon}
              <span>{cat.label}</span>
              {content.some((c: any) => c.category === cat.id && localContent[c.id] !== undefined) && (
                <span className="dot-indicator" />
              )}
            </button>
          ))}
        </aside>

        <main className="cm-content-area">
          <div className="cm-category-view">
            <div className="cm-category-header">
              <h2>{categories.find((c: any) => c.id === activeCategory)?.label}</h2>
              <span className="count-tag">
                {content.filter((c: any) => c.category === activeCategory).length} campos
              </span>
            </div>

            <div className="cm-fields-stack">
              {content
                .filter((c: any) => c.category === activeCategory)
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
                    const base = id.replace(activeCategory + '-', '');
                    const labels: Record<string, string> = {
                      'title': 'Título', 'subtitle': 'Subtítulo', 'content': 'Texto',
                      'image': 'Imagen', 'description': 'Descripción', 'motto': 'Lema',
                      'tag': 'Etiqueta', 'address': 'Dirección', 'phone': 'Teléfono',
                      'email': 'Email', 'hours': 'Horarios', 'instagram': 'Instagram',
                      'facebook': 'Facebook', 'whatsapp': 'WhatsApp', 'tagline': 'Frase Footer',
                      'copy': 'Copyright', 'tags': 'SEO Tags', 'text': 'Mensaje',
                      'author': 'Autor', 'rating': 'Puntuación', 'badge': 'Badge',
                      'desc': 'Breve desc', 'primary-text': 'Botón 1 (Texto)',
                      'primary-link': 'Botón 1 (Link)', 'secondary-text': 'Botón 2 (Texto)',
                      'secondary-link': 'Botón 2 (Link)',
                      'page-title': 'Título de Página', 'page-subtitle': 'Subtítulo de Página',
                      'section-title': 'Título de Sección', 'text-1': 'Párrafo 1', 'text-2': 'Párrafo 2',
                      'title': 'Título de Sección', 'eyebrow': 'Subtítulo (Eyebrow)',
                      'address': 'Dirección Física', 'phone': 'Teléfono', 'email': 'Email',
                      'hours': 'Horario (Texto)',
                      'stat-1-num': 'Dato 1 (Cifra)', 'stat-1-label': 'Dato 1 (Etiqueta)',
                      'stat-2-num': 'Dato 2 (Cifra)', 'stat-2-label': 'Dato 2 (Etiqueta)',
                      'stat-3-num': 'Dato 3 (Cifra)', 'stat-3-label': 'Dato 3 (Etiqueta)',
                      'b2b-title': 'Título B2B', 'b2b-text': 'Texto B2B',
                      'card-1-title': 'Tarjeta 1 (Título)', 'card-1-text': 'Tarjeta 1 (Texto)', 'card-1-icon': 'Tarjeta 1 (Icono/Emoji)',
                      'card-2-title': 'Tarjeta 2 (Título)', 'card-2-text': 'Tarjeta 2 (Texto)', 'card-2-icon': 'Tarjeta 2 (Icono/Emoji)',
                      'card-3-title': 'Tarjeta 3 (Título)', 'card-3-text': 'Tarjeta 3 (Texto)', 'card-3-icon': 'Tarjeta 3 (Icono/Emoji)',
                      'tarifa-1-label': 'Tarifa 1 (Etiqueta)', 'tarifa-1-price': 'Tarifa 1 (Precio)',
                      'tarifa-2-label': 'Tarifa 2 (Etiqueta)', 'tarifa-2-price': 'Tarifa 2 (Precio)',
                      'tarifa-3-label': 'Tarifa 3 (Etiqueta)', 'tarifa-3-price': 'Tarifa 3 (Precio)',
                      'aviso-content': 'Contenido Aviso Legal', 'privacidad-content': 'Contenido Privacidad', 'terminos-content': 'Contenido Términos',
                      'date': 'Fecha', 'avatar': 'Iniciales Avatar'
                    };

                    if (id.match(/-\d-/)) {
                      const parts = id.split('-');
                      const index = parts.find(p => !isNaN(Number(p)));
                      const type = parts[parts.length - 1];
                      const itemName = id.includes('basket') ? 'Cesta' : 
                                     id.includes('gallery') ? 'Imagen' : 
                                     id.includes('feature') ? 'Característica' : 'Elemento';
                      return `${itemName} ${index} — ${labels[type] || type}`;
                    }
                    return labels[base] || base.charAt(0).toUpperCase() + base.slice(1).replace(/-/g, ' ');
                  };

                  const isImage = item.id.includes('image') || item.id.includes('logo');
                  const isDirty = localContent[item.id] !== undefined;

                  return (
                    <div key={item.id} className={`cm-field-card ${isDirty ? 'dirty' : ''}`}>
                      <div className="cm-card-top">
                        <label className="cm-field-label">{getLabel(item.id)}</label>
                        <div className="cm-card-actions">
                          {isDirty && <span className="cm-status-badge">Cambios pendientes</span>}
                          <button className="cm-delete-btn" onClick={() => onDelete(item.id)}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      <div className="cm-card-body">
                        {isImage ? (
                          <div className="cm-image-edit">
                            <div className="cm-image-preview">
                              <img src={item.content} alt="Preview" />
                              <div className="cm-image-overlay">
                                <label className="cm-upload-trigger">
                                  <input type="file" onChange={(e: any) => handleImageUpload(item.id, e)} disabled={uploading === item.id} />
                                  <span>{uploading === item.id ? 'Subiendo...' : 'Cambiar Imagen'}</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="cm-text-edit">
                            {item.content.length > 80 || item.id.includes('hours') || item.id.includes('address') || item.id.includes('text') ? (
                              <textarea 
                                defaultValue={item.content}
                                onChange={(e: any) => setLocalContent({ ...localContent, [item.id]: e.target.value })}
                                placeholder="Escribe aquí..."
                                rows={4}
                              />
                            ) : (
                              <input 
                                type="text" 
                                defaultValue={item.content}
                                onChange={(e: any) => setLocalContent({ ...localContent, [item.id]: e.target.value })}
                                placeholder="Escribe aquí..."
                              />
                            )}
                          </div>
                        )}
                      </div>

                      <div className="cm-card-footer">
                        <span className="cm-item-id">{item.id}</span>
                        <button 
                          className={`cm-save-btn ${isDirty ? 'visible' : ''}`}
                          onClick={() => handleSave(item.id)}
                          disabled={saving === item.id || !isDirty}
                        >
                          {saving === item.id ? 'Guardando...' : 'Guardar Cambios'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              
              {content.filter((c: any) => c.category === activeCategory).length === 0 && (
                <div className="cm-empty-state">
                  <Package size={48} />
                  <h3>No hay campos disponibles</h3>
                  <p>Parece que esta sección aún no ha sido sincronizada con la base de datos.</p>
                  <button onClick={onSeed} className="cm-sync-btn-inline">Sincronizar Ahora</button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      <style jsx>{`
        .content-manager-v2 { animation: fadeIn 0.5s ease; color: white; }
        
        .cm-header { 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          margin-bottom: 2rem; 
          background: #0a0a0a; 
          padding: 1.5rem 2rem; 
          border-bottom: 1px solid #1a1a1a;
          border-radius: 8px 8px 0 0;
        }
        
        .cm-title-wrapper h1 { font-family: var(--font-display); color: #c5a059; margin: 0; font-size: 1.8rem; }
        .cm-title-wrapper p { color: #666; margin: 0.3rem 0 0; font-size: 0.85rem; }
        
        .cm-sync-btn {
          background: transparent;
          color: #c5a059;
          border: 1px solid #c5a05944;
          padding: 0.6rem 1.2rem;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: 0.3s;
          font-size: 0.8rem;
          text-transform: uppercase;
        }
        .cm-sync-btn:hover { background: #c5a05922; border-color: #c5a059; }

        .cm-main-layout { display: flex; gap: 2rem; min-height: 600px; }
        
        .cm-nav { width: 240px; display: flex; flex-direction: column; gap: 0.4rem; }
        .cm-nav-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: transparent;
          border: 1px solid transparent;
          border-radius: 6px;
          color: #888;
          cursor: pointer;
          transition: 0.2s;
          text-align: left;
          position: relative;
        }
        .cm-nav-item:hover { background: #111; color: #ccc; }
        .cm-nav-item.active { background: #c5a05911; color: #c5a059; border-color: #c5a05922; }
        .cm-nav-item span { font-size: 0.9rem; font-weight: 500; }
        
        .dot-indicator { 
          position: absolute; 
          right: 12px; 
          width: 6px; 
          height: 6px; 
          background: #c5a059; 
          border-radius: 50%; 
          box-shadow: 0 0 10px #c5a059;
        }

        .cm-content-area { flex: 1; background: #080808; border-radius: 8px; border: 1px solid #111; }
        
        .cm-category-view { padding: 2rem; }
        .cm-category-header { 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #111;
        }
        .cm-category-header h2 { font-family: var(--font-display); font-size: 1.4rem; color: #fff; margin: 0; }
        .count-tag { font-size: 0.7rem; color: #444; text-transform: uppercase; letter-spacing: 1px; }

        .cm-fields-stack { display: flex; flex-direction: column; gap: 1.5rem; }
        
        .cm-field-card { 
          background: #0a0a0a; 
          border: 1px solid #1a1a1a; 
          border-radius: 8px; 
          padding: 1.5rem; 
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .cm-field-card.dirty { border-color: #c5a05944; background: #0c0b09; }
        
        .cm-card-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.2rem; }
        .cm-field-label { color: #666; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 700; }
        
        .cm-card-actions { display: flex; align-items: center; gap: 1rem; }
        .cm-status-badge { color: #c5a059; font-size: 0.65rem; font-weight: 600; text-transform: uppercase; }
        .cm-delete-btn { background: transparent; border: none; color: #333; cursor: pointer; transition: 0.2s; }
        .cm-delete-btn:hover { color: #ff4444; }

        .cm-card-body { margin-bottom: 1.2rem; }
        
        input, textarea { 
          width: 100%;
          background: #111; 
          border: 1px solid #222; 
          color: #eee; 
          padding: 1rem; 
          border-radius: 4px; 
          font-family: var(--font-body); 
          transition: 0.2s; 
          font-size: 0.95rem;
          line-height: 1.6;
        }
        input:focus, textarea:focus { border-color: #c5a05966; outline: none; background: #141414; }

        .cm-image-preview { 
          position: relative; 
          width: 240px; 
          height: 140px; 
          border-radius: 6px; 
          overflow: hidden; 
          border: 1px solid #222;
        }
        .cm-image-preview img { width: 100%; height: 100%; object-fit: cover; }
        .cm-image-overlay { 
          position: absolute; 
          inset: 0; 
          background: rgba(0,0,0,0.6); 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          opacity: 0; 
          transition: 0.3s; 
        }
        .cm-image-preview:hover .cm-image-overlay { opacity: 1; }
        
        .cm-upload-trigger { cursor: pointer; display: flex; flex-direction: column; align-items: center; }
        .cm-upload-trigger input { display: none; }
        .cm-upload-trigger span { color: white; font-size: 0.8rem; font-weight: 600; border: 1px solid white; padding: 0.5rem 1rem; border-radius: 4px; }

        .cm-card-footer { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #111; padding-top: 1rem; }
        .cm-item-id { font-family: monospace; font-size: 0.7rem; color: #333; }
        
        .cm-save-btn {
          background: #c5a059;
          color: black;
          border: none;
          padding: 0.6rem 1.2rem;
          border-radius: 4px;
          font-weight: 700;
          font-size: 0.8rem;
          cursor: pointer;
          transition: 0.3s;
          opacity: 0;
          transform: translateY(5px);
          pointer-events: none;
        }
        .cm-save-btn.visible { opacity: 1; transform: translateY(0); pointer-events: all; }
        .cm-save-btn:hover { background: #d4b478; }
        .cm-save-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .cm-empty-state { text-align: center; padding: 6rem 2rem; color: #333; }
        .cm-empty-state h3 { color: #555; margin: 1.5rem 0 0.5rem; }
        .cm-sync-btn-inline { background: #c5a059; color: black; border: none; padding: 0.8rem 1.5rem; border-radius: 4px; font-weight: 700; margin-top: 1.5rem; cursor: pointer; }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 992px) {
          .cm-main-layout { flex-direction: column; }
          .cm-nav { width: 100%; flex-direction: row; overflow-x: auto; padding-bottom: 1rem; }
          .cm-nav-item { flex-shrink: 0; padding: 0.8rem; }
          .cm-nav-item span { display: none; }
          .cm-nav-item { width: 50px; justify-content: center; }
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
          <div className="form-group"><label>Nombre</label><input value={formData.name} onChange={(e: any) => setFormData({...formData, name: e.target.value})} required /></div>
          <div className="form-row">
            <div className="form-group"><label>Categoría</label><select value={formData.category} onChange={(e: any) => setFormData({...formData, category: e.target.value})}><option>Jamones</option><option>Embutidos</option><option>Quesos</option><option>Vinos</option><option>Miel</option><option>Conservas</option></select></div>
            <div className="form-group"><label>Precio</label><input value={formData.price} onChange={(e: any) => setFormData({...formData, price: e.target.value})} /></div>
          </div>
          <div className="form-group"><label>Descripción</label><textarea rows={3} value={formData.description} onChange={(e: any) => setFormData({...formData, description: e.target.value})} /></div>
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
