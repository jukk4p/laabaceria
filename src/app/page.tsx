import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import Features from '@/components/Features';
import AboutSection from '@/components/AboutSection';
import FeaturedGallery from '@/components/FeaturedGallery';
import GourmetBaskets from '@/components/GourmetBaskets';
import CelebrationCTA from '@/components/CelebrationCTA';
import Reviews from '@/components/Reviews';
import ContactSection from '@/components/ContactSection';
import FloatingCTA from '@/components/FloatingCTA';
import LocalSchema from '@/components/LocalSchema';
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
    image: getC('about-image', 'https://res.cloudinary.com/di92bc96z/image/upload/v1741477546/Exposici%C3%B3n_jamones_quesos_1.jpg'),
    f1_title: getC('about-f1-title', 'Corte a cuchillo'),
    f1_desc: getC('about-f1-desc', 'Maestría en cada loncha para preservar todo el aroma.'),
    f2_title: getC('about-f2-title', 'Selección en dehesa'),
    f2_desc: getC('about-f2-desc', 'Solo las mejores piezas de bellota llegan aquí.'),
    f3_title: getC('about-f3-title', 'Tradición local'),
    f3_desc: getC('about-f3-desc', 'Más de 30 años siendo el referente gourmet.'),
    f4_title: getC('about-f4-title', 'Calidad suprema'),
    f4_desc: getC('about-f4-desc', 'Productos con denominación de origen protegida.'),
  };

  const contactData = {
    eyebrow: getC('contact-eyebrow', 'ESTAMOS EN CORIA'),
    title: getC('contact-title', 'Visítenos'),
    address: getC('contact-address', 'C. Cervantes, 75, 41100 Coria del Río, Sevilla'),
    phone: getC('contact-phone', '+34 691 41 93 69'),
    email: getC('contact-email', 'info@laabaceriacoria.es'),
    schedule: getC('contact-hours', 'Lun - Vie: 8:30 - 14:00 | 17:30 - 21:00\nSábado: 8:30 - 14:00')
  };

  const basketsData = {
    eyebrow: getC('baskets-subtitle', 'EL REGALO PERFECTO'),
    title: getC('baskets-title', 'Cestas Gourmet'),
    image: getC('baskets-image', 'https://images.unsplash.com/photo-1544965850-6f8a66788f9b?auto=format&fit=crop&q=80')
  };

  const galleryData = {
    subtitle: getC('gallery-subtitle', 'Descubre la esencia de nuestra tienda y la calidad de nuestros productos seleccionados.'),
    title: getC('gallery-title', 'Nuestro Rincón Gourmet')
  };

  const galleryItems = [
    { 
      title: getC('gallery-item-1-title', 'Nuestra Fachada'), 
      img: getC('gallery-item-1-image', '/images/local_desde_fuera.jpg'),
      desc: getC('gallery-item-1-desc', 'Ubicados en el corazón de Coria del Río.')
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
    { 
      title: getC('basket-1-title', 'Lote Degustación Tradicional'), 
      description: getC('basket-1-desc', 'Selección equilibrada de embutidos, regañás artesanales y aceite de oliva virgen extra.'), 
      image: getC('basket-1-image', '/images/cesta_pequeña.jpg'),
      price: getC('basket-1-price', 'Desde 35 €'),
      badge: getC('basket-1-badge', 'Popular') 
    },
    { 
      title: getC('basket-2-title', 'Cesta Regalo Gourmet'), 
      description: getC('basket-2-desc', 'La experiencia completa: quesos premiados, embutidos ibéricos y vinos de selección.'), 
      image: getC('basket-2-image', '/images/cesta_pequeña_variada.jpg'),
      price: getC('basket-2-price', 'Desde 65 €'),
      badge: getC('basket-2-badge', 'Premium') 
    },
    { 
      title: getC('basket-3-title', 'Pack Selección Abacería'), 
      description: getC('basket-3-desc', 'Elige tú los productos. Personaliza tu pack con lo que más te guste de nuestra vitrina.'), 
      image: getC('basket-3-image', '/images/mas_productos.jpg'),
      price: getC('basket-3-price', 'Precio según selección'),
      badge: getC('basket-3-badge', 'A Medida') 
    }
  ];

  const featuresData = [
    { 
      title: getC('feature-1-title', 'Corte a Cuchillo'), 
      desc: getC('feature-1-desc', 'Maestría en cada loncha para preservar todo el aroma y sabor.') 
    },
    { 
      title: getC('feature-2-title', 'Selección en Dehesa'), 
      desc: getC('feature-2-desc', 'Solo las mejores piezas de bellota llegan a nuestra abacería.') 
    },
    { 
      title: getC('feature-3-title', 'Tradición Local'), 
      desc: getC('feature-3-desc', 'Más de 30 años siendo el referente gourmet de nuestro pueblo.') 
    }
  ];

  const reviewsData = {
    eyebrow: getC('reviews-eyebrow', 'OPINIONES'),
    title: getC('reviews-title', 'Lo que dicen nuestros clientes'),
    subtitle: getC('reviews-subtitle', 'Reseñas verificadas de clientes reales.'),
    items: [
      { 
        author: getC('review-1-author', 'Antonio Moreno'), 
        text: getC('review-1-text', 'El mejor jamón de toda la provincia. El trato es exquisito.'), 
        rating: getC('review-1-rating', '5'),
        date: getC('review-1-date', 'marzo 2024'),
        avatar: getC('review-1-avatar', 'AM')
      },
      { 
        author: getC('review-2-author', 'María García'), 
        text: getC('review-2-text', 'Sitio de confianza para comprar productos gourmet.'), 
        rating: getC('review-2-rating', '5'),
        date: getC('review-2-date', 'febrero 2024'),
        avatar: getC('review-2-avatar', 'MG')
      },
      { 
        author: getC('review-3-author', 'Juan Pérez'), 
        text: getC('review-3-text', 'Muy profesionales. Siempre que tengo una cena especial encargo aquí.'), 
        rating: getC('review-3-rating', '5'),
        date: getC('review-3-date', 'enero 2024'),
        avatar: getC('review-3-avatar', 'JP')
      }
    ]
  };

  return (
    <main>
      <Hero data={heroData} />
      <TrustBar tags={getC('general-trust-tags', '')} />
      <section className="middle-content">
        <AboutSection data={aboutData} />
      </section>
      <GourmetBaskets data={basketsData} items={basketsItems} />
      <FeaturedGallery data={galleryData} items={galleryItems} />

      <Reviews data={reviewsData} />
      <ContactSection data={contactData} />
      <CelebrationCTA />
      <FloatingCTA 
        phone={getC('contact-phone', '691419369')} 
        whatsapp={getC('social-whatsapp', '34691419369')} 
      />
      <LocalSchema />
    </main>
  );
}
