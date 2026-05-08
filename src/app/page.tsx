import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import Features from '@/components/Features';
import AboutSection from '@/components/AboutSection';
import FeaturedGallery from '@/components/FeaturedGallery';
import GourmetBaskets from '@/components/GourmetBaskets';
import Reviews from '@/components/Reviews';
import ContactSection from '@/components/ContactSection';
import FloatingCTA from '@/components/FloatingCTA';
import LocalSchema from '@/components/LocalSchema';
import Footer from '@/components/Footer';
import { createClient } from '@/lib/supabase/server';
import './Home.css';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const supabase = await createClient();
  const { data: siteContent } = await supabase.from('site_content').select('*');

  // Helper to get content by ID with fallback
  const getC = (id: string, fallback: string) => 
    siteContent?.find((c: any) => c.id === id)?.content || fallback;

  const heroData = {
    subtitle: getC('hero-subtitle', 'ULTRAMARINOS FINOS & PRODUCTOS GOURMET'),
    title: getC('hero-title', 'LA ABACERÍA'),
    description: getC('hero-description', 'Selección artesanal de los mejores embutidos y productos gourmet de nuestra tierra. Tradición y sabor en cada bocado.'),
    image: getC('hero-image', 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&q=80'),
    primaryBtnText: getC('hero-primary-text', 'Llamar ahora'),
    primaryBtnLink: getC('hero-primary-link', 'tel:691419369'),
    secondaryBtnText: getC('hero-secondary-text', 'Ver catálogo'),
    secondaryBtnLink: getC('hero-secondary-link', '/catalogo')
  };

  const aboutData = {
    tag: getC('about-tag', 'NUESTRA TRADICIÓN'),
    title: getC('about-title', 'Nuestra Historia'),
    text1: getC('about-content', 'Desde el corazón de nuestro pueblo, seleccionamos lo mejor de nuestra tierra para ofrecerte una experiencia gastronómica única.'),
    text2: getC('about-motto', 'Calidad, Tradición y Sabor en cada bocado.'),
    image: getC('about-image', 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80')
  };

  const contactData = {
    address: getC('contact-address', 'C. San Sebastián, 5, 41510 Mairena del Alcor, Sevilla'),
    phone: getC('contact-phone', '+34 691 41 93 69'),
    email: getC('contact-email', 'info@laabaceria.com'),
    schedule: getC('contact-hours', 'Lunes a Viernes: 09:00 - 14:00 | 17:00 - 20:30\nSábados: 09:30 - 14:30')
  };

  const basketsData = {
    eyebrow: getC('baskets-subtitle', 'EL REGALO PERFECTO'),
    title: getC('baskets-title', 'Cestas Gourmet'),
    image: getC('baskets-image', 'https://images.unsplash.com/photo-1544965850-6f8a66788f9b?auto=format&fit=crop&q=80')
  };

  const galleryData = {
    title: getC('gallery-title', 'Nuestra Selección'),
    subtitle: getC('gallery-subtitle', 'Cada pieza cuenta una historia de sabor y tradición.')
  };

  const galleryItems = [
    { 
      title: getC('gallery-item-1-title', 'Nuestra Fachada'), 
      img: getC('gallery-item-1-image', '/images/local_desde_fuera.jpg'),
      desc: getC('gallery-item-1-desc', 'Ubicados en el corazón de Mairena.')
    },
    { 
      title: getC('gallery-item-2-title', 'Vinos de Selección'), 
      img: getC('gallery-item-2-image', '/images/exposicion_vinos.jpg'),
      desc: getC('gallery-item-2-desc', 'Maridajes perfectos para nuestros ibéricos.')
    },
    { 
      title: getC('gallery-item-3-title', 'Corte Artesano'), 
      img: getC('gallery-item-3-image', '/images/Local_desde_dentro.webp'),
      desc: getC('gallery-item-3-desc', 'Maestría y precisión en cada loncha.')
    },
    { 
      title: getC('gallery-item-4-title', 'Nuestras Vitrinas'), 
      img: getC('gallery-item-4-image', '/images/cristalera_productos_gourmet.jpg'),
      desc: getC('gallery-item-4-desc', 'Productos selectos de la máxima calidad.')
    }
  ];

  const basketsItems = [
    { title: getC('basket-1-title', 'Lote Tradicional'), description: getC('basket-1-desc', 'Selección de embutidos.'), image: getC('basket-1-image', '/images/cesta_pequeña.jpg'), badge: getC('basket-1-badge', 'Popular') },
    { title: getC('basket-2-title', 'Cesta Gourmet'), description: getC('basket-2-desc', 'Quesos y embutidos.'), image: getC('basket-2-image', '/images/cesta_pequeña_variada.jpg'), badge: getC('basket-2-badge', 'Premium') },
    { title: getC('basket-3-title', 'Pack Selección'), description: getC('basket-3-desc', 'Personaliza tu pack.'), image: getC('basket-3-image', '/images/mas_productos.jpg'), badge: getC('basket-3-badge', 'Personalizado') }
  ];

  const featuresData = [
    { title: getC('feature-1-title', 'Corte a Cuchillo'), desc: getC('feature-1-desc', 'Maestría en cada loncha.') },
    { title: getC('feature-2-title', 'Selección en Dehesa'), desc: getC('feature-2-desc', 'Solo las mejores piezas.') },
    { title: getC('feature-3-title', 'Tradición Local'), desc: getC('feature-3-desc', 'Más de 30 años de historia.') }
  ];

  const reviewsData = [
    { author: getC('review-1-author', 'Antonio Moreno'), text: getC('review-1-text', 'El mejor jamón.'), rating: getC('review-1-rating', '5') },
    { author: getC('review-2-author', 'María García'), text: getC('review-2-text', 'Sitio de confianza.'), rating: getC('review-2-rating', '5') },
    { author: getC('review-3-author', 'Juan Pérez'), text: getC('review-3-text', 'Muy profesionales.'), rating: getC('review-3-rating', '4') }
  ];

  const footerData = {
    tagline: getC('general-footer-tagline', 'Calidad, Tradición y Sabor en cada bocado.'),
    address: getC('contact-address', 'C. San Sebastián, 5, 41510 Mairena del Alcor, Sevilla'),
    hours: getC('contact-hours', 'Lunes a Viernes: 09:00 - 14:00 | 17:00 - 20:30\nSábados: 09:30 - 14:30'),
    instagram: getC('social-instagram', 'https://instagram.com/laabaceria'),
    facebook: getC('social-facebook', 'https://facebook.com/laabaceria'),
    copy: getC('general-footer-copy', '© 2024 La Abacería. Todos los derechos reservados.')
  };

  return (
    <main>
      <Hero data={heroData} />
      <TrustBar tags={getC('general-trust-tags', '')} />
      <section className="middle-content">
        <AboutSection data={aboutData} />
        <Features data={featuresData} />
      </section>
      <GourmetBaskets data={basketsData} items={basketsItems} />
      <FeaturedGallery data={galleryData} items={galleryItems} />

      <Reviews data={reviewsData} />
      <ContactSection data={contactData} />
      <FloatingCTA 
        phone={getC('contact-phone', '691419369')} 
        whatsapp={getC('social-whatsapp', '34691419369')} 
      />
      <LocalSchema />
    </main>
  );
}
