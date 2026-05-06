import './nosotros.css';

export default function Nosotros() {
  return (
    <div className="nosotros-page">
      <header className="page-header">
        <h1 className="page-title">Nuestra Historia</h1>
        <p className="page-subtitle">Tres décadas de pasión por el producto ibérico.</p>
      </header>

      <section className="history-content">
        <div className="history-text">
          <h2>Desde Coria del Río para el mundo</h2>
          <p>
            La Abacería nació hace más de 30 años con un objetivo claro: 
            traer la excelencia de las dehesas españolas directamente al 
            corazón de Coria del Río. Lo que empezó como un pequeño local 
            familiar se ha convertido hoy en un referente gourmet en Sevilla.
          </p>
          <p>
            Nuestra filosofía no ha cambiado: seleccionamos cada pieza en origen, 
            respetando los tiempos de curación y el saber hacer de los maestros jamoneros. 
            No vendemos solo comida, vendemos un trozo de nuestra cultura.
          </p>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">30+</span>
              <span className="stat-label">Años de experiencia</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">10k+</span>
              <span className="stat-label">Clientes satisfechos</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Calidad garantizada</span>
            </div>
          </div>
        </div>
        <div className="history-image">
          <div className="image-real" style={{ backgroundImage: 'url("/images/Local_desde_dentro.webp")' }}>
            <div className="image-caption">Nuestra bodega en Coria</div>
          </div>
        </div>
      </section>
    </div>
  );
}
