import Image from 'next/image'
import Link from 'next/link'
import { 
  Star, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  Heart, 
  Truck, 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  MessageSquare,
  Utensils,
  ChevronDown,
  Beef,
  Sprout,
  Store,
  CheckCircle2,
  Gift,
  ShoppingBag,
  Settings2,
  ExternalLink,
  LayoutGrid,
  Navigation as NavIcon,
  ArrowDown,
  Scissors,
  TreeDeciduous,
  Award as Ribbon,
  Circle,
  Wine
} from 'lucide-react'
import { getSiteContent } from '@/lib/content'
import Ticker from '@/components/Ticker'
import CTABand from '@/components/CTABand'
import BusinessStatus from '@/components/BusinessStatus'

export default async function HomePage() {
  const content = await getSiteContent()

  return (
    <div className="flex flex-col bg-bg-base">
      {/* 1. HERO SECTION - Centralized Design */}
      <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden">
        {/* Ambient background image with premium overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src={content['hero-image'] || "/images/Jamon_oro.jpg"} 
            alt="Fondo Gourmet"
            fill
            className="object-cover opacity-40 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-bg-dark via-bg-dark/60 to-bg-dark" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,theme(colors.bg-dark)_100%)] opacity-70" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="mb-10 flex justify-center opacity-0 animate-[fade-in_1s_ease-out_forwards]">
            <span className="inline-block text-[10px] md:text-[11px] uppercase tracking-[0.5em] text-gold/80 border-b border-gold/20 pb-2 font-bold">
              {content['hero-subtitle'] || "JAMONES Y EMBUTIDOS · CORIA DEL RÍO · SEVILLA"}
            </span>
          </div>
          
          <h1 className="text-6xl md:text-[8rem] font-serif text-[#f4ead5] leading-[1.1] mb-10 max-w-5xl mx-auto opacity-0 animate-[fade-in-up_1s_ease-out_0.3s_forwards]">
            {content['hero-title'] ? (
              content['hero-title'].includes('jamón') ? (
                <>El arte del <span className="text-gold italic font-light">jamón ibérico</span></>
              ) : content['hero-title']
            ) : (
              <>El arte del <span className="text-gold italic font-light">jamón ibérico</span></>
            )}
          </h1>
          
          <p className="text-base md:text-xl text-text-muted mb-14 leading-relaxed max-w-2xl mx-auto font-light opacity-0 animate-[fade-in_1s_ease-out_0.6s_forwards]">
            {content['hero-description'] || "Selección artesanal de los mejores embutidos y productos gourmet de nuestra tierra. Tradición y sabor en cada bocado."}
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 mb-28 opacity-0 animate-[fade-in_1s_ease-out_0.9s_forwards]">
            <a 
              href={content['hero-primary-link'] || "tel:+34691419369"}
              className="bg-gold hover:bg-gold-light text-bg-dark px-12 py-5 rounded-full text-[12px] font-bold uppercase tracking-[0.2em] transition-all flex items-center gap-3 shadow-[0_10px_40px_rgba(197,160,89,0.2)] hover:scale-105 active:scale-95"
            >
              <Phone size={16} />
              {content['hero-primary-text'] || "Llamar ahora"}
            </a>
            <Link 
              href={content['hero-secondary-link'] || "/catalogo"}
              className="border border-gold/30 hover:border-gold text-gold px-12 py-5 rounded-full text-[12px] font-bold uppercase tracking-[0.2em] transition-all backdrop-blur-md hover:bg-gold/5 flex items-center gap-3 active:scale-95"
            >
              <LayoutGrid size={16} />
              {content['hero-secondary-text'] || "Ver catálogo"}
            </Link>
          </div>

          {/* Hero Stats */}
          <div className="max-w-4xl mx-auto py-14 border-t border-white/5 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 opacity-0 animate-[fade-in_1s_ease-out_1.2s_forwards]">
            <div className="text-center md:text-left group cursor-default">
              <p className="text-5xl font-serif text-gold mb-2 group-hover:scale-110 transition-transform duration-500">{content['hero-stat-1-num'] || "+30"}</p>
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold/40 font-bold">{content['hero-stat-1-label'] || "Años de historia"}</p>
            </div>
            
            <div className="w-[1px] h-12 bg-white/5 hidden md:block" />

            <div className="text-center md:text-left group cursor-default">
              <p className="text-5xl font-serif text-gold mb-2 group-hover:scale-110 transition-transform duration-500">{content['hero-stat-2-num'] || "100%"}</p>
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold/40 font-bold">{content['hero-stat-2-label'] || "Ibérico de bellota"}</p>
            </div>

            <div className="w-[1px] h-12 bg-white/5 hidden md:block" />

            <div className="text-center md:text-left group cursor-default">
              <p className="text-5xl font-serif text-gold mb-2 group-hover:scale-110 transition-transform duration-500">{content['hero-stat-3-num'] || "4.8"} <Star size={24} className="inline-block ml-1 text-gold/60 fill-gold/10" /></p>
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold/40 font-bold">{content['hero-stat-3-label'] || "En Google"}</p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gold/40 animate-bounce hidden md:block">
          <ChevronDown size={32} strokeWidth={1} />
        </div>
      </section>

      {/* 2. TICKER - Separation */}
      <Ticker />

      {/* 2. NUESTRA TRADICIÓN (About) - Semantic Reference #130800 */}
      <section id="historia" className="py-32 px-6 bg-bg-section border-y border-gold/10 relative overflow-hidden">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <div className="flex justify-center lg:justify-start">
            <div className="relative aspect-[4/5] w-full max-w-[500px] overflow-hidden rounded-[2.5rem] border border-white/5 z-10 bg-bg-base shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              {content['about-image'] && (
                <Image 
                  src={content['about-image']} 
                  alt="La Abacería"
                  fill
                  className="object-cover opacity-80 transition-transform duration-1000 hover:scale-110"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050302] via-transparent to-transparent opacity-60" />
            </div>
          </div>
          
          <div className="relative">
            <span className="inline-block text-[10px] uppercase tracking-[0.5em] text-gold/50 mb-8 font-bold">{content['about-eyebrow'] || "NUESTRA TRADICIÓN"}</span>
            <h2 className="text-5xl md:text-6xl font-serif text-[#f4ead5] mb-10 leading-[1.2]">
              {content['about-title'] || "Pasión por el producto bien hecho"}
            </h2>
            <p className="text-text-muted text-lg mb-16 leading-relaxed font-light max-w-xl opacity-80">
              {content['about-content'] || "En La Abacería no solo vendemos embutidos, seleccionamos historias. Cada pieza ha pasado un riguroso proceso en las mejores dehesas. Nuestro maestro cortador garantiza la temperatura y el grosor exacto en cada loncha."}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: <Scissors size={24} strokeWidth={1.5} />, title: content['about-feature-1-title'] || "Corte a cuchillo", desc: content['about-feature-1-desc'] || "Maestría en cada loncha para preservar todo el aroma." },
                { icon: <TreeDeciduous size={24} strokeWidth={1.5} />, title: content['about-feature-2-title'] || "Selección en dehesa", desc: content['about-feature-2-desc'] || "Solo las mejores piezas de bellota llegan aquí." },
                { icon: <Ribbon size={24} strokeWidth={1.5} />, title: content['about-feature-3-title'] || "Tradición local", desc: content['about-feature-3-desc'] || "Más de 30 años siendo el referente gourmet." },
                { icon: <CheckCircle2 size={24} strokeWidth={1.5} />, title: content['about-feature-4-title'] || "Calidad suprema", desc: content['about-feature-4-desc'] || "Productos con denominación de origen protegida." }
              ].map((feat, idx) => (
                <div key={idx} className="p-10 border border-white/5 rounded-3xl bg-bg-base transition-all hover:bg-bg-base/80 hover:border-gold/20 group">
                  <div className="mb-6 text-gold/40 group-hover:text-gold transition-colors">{feat.icon}</div>
                  <h3 className="text-base font-bold text-gold mb-3 tracking-tight">{feat.title}</h3>
                  <p className="text-[13px] text-text-muted leading-relaxed font-light opacity-60">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. CESTAS GOURMET - Refined Premium Cards */}
      <section className="py-40 px-6 bg-bg-base relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
        
        <div className="container mx-auto text-center mb-32">
          <span className="inline-block text-[11px] uppercase tracking-[0.5em] text-gold/40 mb-8 font-bold">{content['baskets-eyebrow'] || "EL REGALO PERFECTO"}</span>
          <h2 className="text-5xl md:text-8xl font-serif text-[#f4ead5] mb-8 leading-none italic">{content['baskets-title'] || "Cestas Gourmet"}</h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto font-light opacity-60">{content['baskets-description'] || "Selecciones artesanales para regalar o disfrutar en ocasiones especiales."}</p>
        </div>
        
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { 
                title: content['baskets-card-1-title'] || "Lote Degustación Tradicional", 
                price: content['baskets-tarifa-1-price'] || "35 €", 
                desc: content['baskets-card-1-text'] || "Selección equilibrada de embutidos, regañás artesanales y aceite de oliva virgen extra.",
                badge: content['baskets-card-1-badge'] || "POPULAR",
                image: content['baskets-card-1-image'] || "/images/cristalera_productos_gourmet.jpg"
              },
              { 
                title: content['baskets-card-2-title'] || "Cesta Regalo Gourmet", 
                price: content['baskets-tarifa-2-price'] || "65 €", 
                desc: content['baskets-card-2-text'] || "La experiencia completa: quesos premiados, embutidos ibéricos y vinos de selección.",
                badge: content['baskets-card-2-badge'] || "PREMIUM", 
                featured: true,
                image: content['baskets-card-2-image'] || "/images/cristalera_productos_gourmet.jpg"
              },
              { 
                title: content['baskets-card-3-title'] || "Pack Selección Abacería", 
                price: content['baskets-tarifa-3-price'] || "Precio según selección", 
                desc: content['baskets-card-3-text'] || "Elige tú los productos. Personaliza tu pack con lo que más te guste de nuestra vitrina.",
                badge: content['baskets-card-3-badge'] || "A MEDIDA",
                image: content['baskets-card-3-image'] || "/images/cristalera_productos_gourmet.jpg"
              }
            ].map((cesta, idx) => (
              <div 
                key={idx}
                className={`group bg-bg-dark border ${cesta.featured ? 'border-gold/40 shadow-[0_20px_50px_rgba(197,160,89,0.1)]' : 'border-white/5'} rounded-[2.5rem] overflow-hidden flex flex-col transition-all duration-700 hover:-translate-y-4 h-[720px] relative`}
              >
                {/* Image Area (60%) */}
                <div className="relative h-[430px] overflow-hidden bg-bg-product">
                  <Image 
                    src={cesta.image} 
                    alt={cesta.title}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050302] via-transparent to-transparent opacity-60" />
                  
                  {/* Badge */}
                  <div className="absolute top-8 left-8">
                    <span className="px-5 py-2 text-[10px] font-bold tracking-[0.3em] uppercase bg-gold text-bg-dark rounded-full shadow-2xl">
                      {cesta.badge}
                    </span>
                  </div>
                </div>

                {/* Content Area (40%) */}
                <div className="flex-grow p-12 flex flex-col justify-between">
                  <div>
                    <h3 className="text-3xl font-serif text-[#f4ead5] mb-4 leading-tight group-hover:text-gold transition-colors">
                      {cesta.title}
                    </h3>
                    
                    <p className="text-[14px] text-text-muted mb-6 leading-relaxed font-light opacity-70 group-hover:opacity-100 transition-opacity">
                      {cesta.desc}
                    </p>
                  </div>
                  
                  <div className="mt-auto">
                    <div className="flex items-end justify-between mb-8">
                      <p className="font-serif">
                        <span className="text-[10px] uppercase tracking-[0.4em] text-gold/30 block mb-2 font-bold">Inversión</span>
                        <span className="text-3xl text-gold font-medium">{cesta.price}</span>
                      </p>
                    </div>

                    <a 
                      href={`https://wa.me/${content['social-whatsapp'] || "34691419369"}?text=Hola, me interesa la ${cesta.title}`}
                      target="_blank"
                      className="w-full py-4 text-[12px] tracking-[0.2em] font-bold transition-all border border-gold/20 text-gold/80 hover:bg-gold hover:text-bg-dark hover:border-gold flex items-center justify-center gap-3 rounded-2xl group/btn active:scale-95"
                    >
                      <WhatsAppIcon size={18} className="transition-transform group-hover/btn:scale-110" />
                      Encargar por WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Scroll anchor down */}
        <div className="mt-24 flex justify-center">
          <div className="w-[1px] h-20 bg-gradient-to-b from-gold via-gold-faint to-transparent" />
        </div>
      </section>

      <section className="py-32 px-6 bg-bg-base relative">
        <div className="container mx-auto mb-20">
          <span className="inline-block text-[11px] uppercase tracking-[0.5em] text-gold/40 mb-6 font-bold">{content['gallery-eyebrow'] || "NUESTRO RINCÓN GOURMET"}</span>
          <h2 className="text-4xl md:text-6xl font-serif text-gold leading-tight">
            {content['gallery-title-left'] || "La tienda, en"} <span className="text-gold italic">{content['gallery-title-italic'] || "imágenes"}</span>
          </h2>
        </div>
        
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              img: "/images/local_desde_fuera.jpg", 
              label: "Nuestra fachada"
            },
            { 
              img: "/images/exposicion_vinos.jpg", 
              label: "Vinos de selección"
            },
            { 
              img: "/images/readme_header.png", 
              label: "Corte artesano"
            },
            { 
              img: "/images/cristalera_productos_gourmet.jpg", 
              label: "Nuestras vitrinas"
            }
          ].map((item, i) => (
            <div key={i} className="group relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/5 bg-bg-dark shadow-2xl transition-all duration-700 hover:border-gold/30">
              {/* Ultra Sharp Image - Forced 100% Opacity */}
              <Image 
                src={item.img} 
                alt={item.label}
                fill
                className="object-cover opacity-100 transition-all duration-700 group-hover:scale-105"
                priority={i < 4}
              />
              
              {/* Minimal bottom gradient for text readability only */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent opacity-50" />
              
              {/* Bottom Label */}
              <div className="absolute bottom-10 left-10 z-10">
                <p className="text-sm font-medium text-gold tracking-wide drop-shadow-md">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. RESEÑAS - Literal Copy of Screenshot */}
      <section className="py-32 px-6 bg-bg-base">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20 mb-20">
            <div className="flex flex-col items-center">
              <div className="text-7xl font-serif text-gold mb-2">{content['reviews-rating'] || "4.8"}</div>
              <div className="flex items-center gap-1 text-gold mb-3">
                {[1,2,3,4,5].map(s => <Star key={s} fill="currentColor" size={20} />)}
              </div>
              <p className="text-xs text-text-muted tracking-tight">{content['reviews-text'] || "32 reseñas en Google"}</p>
            </div>
            
            <div className="w-[1px] h-28 bg-gold/10 hidden md:block" />

            <div className="text-center md:text-left">
              <span className="inline-block text-[10px] uppercase tracking-[0.4em] text-gold mb-4 font-bold">{content['reviews-eyebrow'] || "Opiniones"}</span>
              <h2 className="text-4xl md:text-5xl font-serif text-gold leading-tight mb-2">{content['reviews-title'] || "Lo que dicen nuestros clientes"}</h2>
              <p className="text-text-muted text-sm font-light">{content['reviews-subtitle'] || "Reseñas verificadas de clientes reales"}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                name: content['reviews-1-author'] || "Antonio Moreno", 
                date: content['reviews-1-date'] || "Febrero 2025", 
                text: content['reviews-1-text'] || "El mejor jamón de toda la provincia. El trato es exquisito y la calidad insuperable.",
                avatar: content['reviews-1-avatar'] || "AM"
              },
              { 
                name: content['reviews-2-author'] || "María García", 
                date: content['reviews-2-date'] || "Enero 2025", 
                text: content['reviews-2-text'] || "Sitio de confianza para comprar gourmet. El corte a cuchillo es espectacular. Repetiré.",
                avatar: content['reviews-2-avatar'] || "MG"
              },
              { 
                name: content['reviews-3-author'] || "Juan Pérez", 
                date: content['reviews-3-date'] || "Diciembre 2024", 
                text: content['reviews-3-text'] || "Muy profesionales. Siempre que tengo cena especial encargo aquí mi tabla de ibéricos.",
                avatar: content['reviews-3-avatar'] || "JP"
              }
            ].map((review, i) => (
              <div key={i} className="p-10 bg-bg-card border border-white/5 rounded-2xl transition-all hover:bg-bg-card/80">
                <div className="flex items-center gap-1 text-gold mb-6">
                   {[1,2,3,4,5].map(s => <Star key={s} fill="currentColor" size={14} />)}
                </div>
                <p className="text-lg text-text-muted leading-relaxed italic mb-10 font-light italic">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-gold/5 flex items-center justify-center text-gold font-serif text-sm border border-gold/20">
                    {review.avatar}
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-gold tracking-tight">{review.name}</p>
                    <p className="text-[11px] text-text-muted/60">{review.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <Link href="https://www.google.com/search?q=La+Abaceria+Coria+del+Rio#lrd=0xd120306c547846f:0x6b77209d6c7846f,1" target="_blank" className="inline-flex items-center gap-3 text-gold border-b border-gold/20 pb-1 text-[11px] uppercase tracking-[0.3em] hover:text-gold-light hover:border-gold transition-all">
              Ver todas las reseñas en Google
              <ExternalLink size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. VISÍTENOS - High Fidelity Interactive Map */}
      <section className="py-32 px-6 bg-bg-base">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          <div className="lg:col-span-5">
            <span className="inline-block text-[10px] uppercase tracking-[0.4em] text-gold/60 mb-6 font-bold">{content['contact-eyebrow'] || "ESTAMOS EN CORIA"}</span>
            <h2 className="text-5xl md:text-6xl font-serif text-gold mb-16 italic">{content['contact-title'] || "Visítenos"}</h2>
            
            <div className="space-y-10">
              <div className="flex gap-6 items-start">
                <div className="w-10 h-10 rounded-sm border border-gold-faint/20 flex items-center justify-center text-gold/60 shrink-0">
                  <MapPin size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-[9px] uppercase tracking-[0.3em] text-gold/40 mb-2 font-bold">DIRECCIÓN</h4>
                  <p className="text-gold text-base font-serif">{content['contact-address-line1'] || "C. Cervantes, 75"}</p>
                  <p className="text-text-muted text-[13px] font-light">{content['contact-address-line2'] || "41100 Coria del Río, Sevilla"}</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-10 h-10 rounded-sm border border-gold-faint/20 flex items-center justify-center text-gold/60 shrink-0">
                  <Clock size={20} strokeWidth={1.5} />
                </div>
                <div className="w-full">
                  <h4 className="text-[9px] uppercase tracking-[0.3em] text-gold/40 mb-3 font-bold">HORARIO</h4>
                  <div className="space-y-2 max-w-[340px]">
                    <div className="flex justify-between text-[11px]">
                       <span className="text-text-muted uppercase tracking-widest">Lunes a Viernes</span>
                       <span className="text-gold font-bold">{content['contact-hours-mon-fri'] || "08:30 - 14:00 | 17:30 - 21:00"}</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                       <span className="text-text-muted uppercase tracking-widest">Sábados</span>
                       <span className="text-gold font-bold">{content['contact-hours-sat'] || "08:30 - 14:00"}</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                       <span className="text-text-muted uppercase tracking-widest">Domingos</span>
                       <span className="text-gold font-bold uppercase tracking-widest">{content['contact-hours-sun'] || "Cerrado"}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <BusinessStatus />
                  </div>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-10 h-10 rounded-sm border border-gold-faint/20 flex items-center justify-center text-gold/60 shrink-0">
                  <Phone size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-[9px] uppercase tracking-[0.3em] text-gold/40 mb-2 font-bold">TELÉFONO</h4>
                  <p className="text-gold text-base font-serif">{content['contact-phone'] || "+34 691 419 369"}</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-10 h-10 rounded-sm border border-gold-faint/20 flex items-center justify-center text-gold/60 shrink-0">
                  <Mail size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-[9px] uppercase tracking-[0.3em] text-gold/40 mb-2 font-bold">EMAIL</h4>
                  <p className="text-gold text-[15px] font-medium">{content['contact-email'] || "info@laabaceriacoria.es"}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-7 relative group">
            {/* Action Button Above Map */}
            <div className="absolute -top-12 right-0 z-20">
              <a 
                href="https://www.google.com/maps/dir/37.2919148,-6.0527119/LA+ABACERIA+JAMONES+Y+EMBUTIDOS.+PRODUCTOS+GOURMET.,+C.+Cervantes,+75,+41100+Coria+del+R%C3%ADo,+Sevilla/@37.2899402,-6.0549274,1729m/data=!3m2!1e3!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0xd3de5aa4e0c0d93:0x455c656bb08f6e63!2m2!1d-6.051773!2d37.2849864?entry=ttu&g_ep=EgoyMDI2MDUwNi4wIKXMDSoASAFQAw%3D%3D" 
                target="_blank"
                className="bg-[#ebc47a] hover:bg-[#f3d49b] text-bg-dark px-6 py-3 rounded-xl text-[13px] font-bold flex items-center gap-2 shadow-xl transition-all hover:scale-105 active:scale-95"
              >
                <ArrowRight size={18} />
                ¿Cómo llegar?
              </a>
            </div>

            <div className="w-full aspect-square md:aspect-video lg:h-[600px] overflow-hidden rounded-[2.5rem] border border-white/5 shadow-2xl relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3175.764506260714!2d-6.056880523458693!3d37.28655823932822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd120306c547846f%3A0x6b77209d6c7846f!2sC.%20Cervantes%2C%2075%2C%2041100%20Coria%20del%20R%C3%ADo%2C%20Sevilla!5e0!3m2!1ses!2ses!4v1715367800000!5m2!1ses!2ses" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale opacity-80 contrast-125"
              />
            </div>
          </div>
        </div>
      </section>


      {/* 8. CELEBRATION CTA */}
      <CTABand />
    </div>
  )
}function WhatsAppIcon({ size = 16, className = "" }: { size?: number, className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      width={size} 
      height={size} 
      fill="currentColor" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .01 5.403.007 12.039c0 2.121.54 4.19 1.566 6.041L0 24l6.103-1.601a11.832 11.832 0 005.94 1.585h.005c6.637 0 12.042-5.403 12.045-12.039a11.82 11.82 0 00-3.483-8.482z"/>
    </svg>
  )
}
