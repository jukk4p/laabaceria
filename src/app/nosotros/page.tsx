import { createClient } from '@/lib/supabase/server';
import './nosotros.css';

export const dynamic = 'force-dynamic';

export default async function Nosotros() {
  const supabase = await createClient();
  const { data: siteContent } = await supabase.from('site_content').select('*');

  const getC = (id: string, fallback: string) => 
    siteContent?.find((c: any) => c.id === id)?.content || fallback;

  const nosotrosData = {
    pageTitle: getC('nosotros-page-title', 'Nuestra Historia'),
    pageSubtitle: getC('nosotros-page-subtitle', 'Tres décadas de pasión por el producto ibérico.'),
    sectionTitle: getC('nosotros-section-title', 'Desde Coria del Río para el mundo'),
    text1: getC('nosotros-text-1', 'La Abacería nació hace más de 30 años con un objetivo claro: traer la excelencia de las dehesas españolas directamente al corazón de Coria del Río. Lo que empezó como un pequeño local familiar se ha convertido hoy en un referente gourmet en Sevilla.'),
    text2: getC('nosotros-text-2', 'Nuestra filosofía no ha cambiado: seleccionamos cada pieza en origen, respetando los tiempos de curación y el saber hacer de los maestros jamoneros. No vendemos solo comida, vendemos un trozo de nuestra cultura.'),
    stats: [
      { num: getC('nosotros-stat-1-num', '30+'), label: getC('nosotros-stat-1-label', 'Años de experiencia') },
      { num: getC('nosotros-stat-2-num', '10k+'), label: getC('nosotros-stat-2-label', 'Clientes satisfechos') },
      { num: getC('nosotros-stat-3-num', '100%'), label: getC('nosotros-stat-3-label', 'Calidad garantizada') }
    ]
  };

  return (
    <div className="nosotros-page">
      <header className="page-header">
        <h1 className="page-title">{nosotrosData.pageTitle}</h1>
        <p className="page-subtitle">{nosotrosData.pageSubtitle}</p>
      </header>

      <section className="history-content">
        <div className="history-text">
          <div className="gold-accent-line"></div>
          <h2>{nosotrosData.sectionTitle}</h2>
          <div className="text-paragraphs">
            <p>{nosotrosData.text1}</p>
            <p>{nosotrosData.text2}</p>
          </div>
          
          <div className="stats-grid-premium">
            {nosotrosData.stats.map((stat, i) => (
              <div key={i} className="stat-item-premium">
                <span className="stat-number-premium">{stat.num}</span>
                <span className="stat-label-premium">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="history-image">
          <div className="image-wrapper-premium">
            <div className="image-real" style={{ backgroundImage: 'url("/images/Local_desde_dentro.webp")' }}>
              <div className="image-caption-premium">Nuestra esencia en Coria del Río</div>
            </div>
            <div className="image-border-gold"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
