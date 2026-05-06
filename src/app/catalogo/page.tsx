import './catalogo.css';

const CATEGORIES = [
  {
    title: "Jamones Ibéricos",
    image: "/images/jamon.png",
    description: "La joya de nuestra abacería. Piezas seleccionadas de bellota y cebo de campo.",
    items: ["Jamón de Bellota 100% Ibérico", "Paleta de Cebo de Campo", "Jamón Reserva Oro"]
  },
  {
    title: "Embutidos Artesanos",
    image: "/images/embutidos.png",
    description: "Elaboración tradicional con el mejor magro y especias naturales.",
    items: ["Caña de Lomo Ibérica", "Chorizo de Bellota", "Salchichón Artesano"]
  },
  {
    title: "Quesos Selectos",
    image: "/images/quesos.png",
    description: "Variedad de quesos de oveja, cabra y mezclas con curaciones de autor.",
    items: ["Queso Viejo de Oveja", "Queso de Cabra al Pimentón", "Mezcla Curado"]
  },
  {
    title: "Vinos y Licores",
    image: "/images/Moscatel_en_botellas.webp", // Mantenemos esta ya que no generé una de vino con IA que fuera mejor
    description: "El acompañamiento perfecto para un buen ibérico.",
    items: ["Moscatel de la Tierra", "Vino Blanco Joven", "Generosos de Jerez"]
  }
];

export default function Catalogo() {
  return (
    <div className="catalogo-page">
      <header className="page-header">
        <h1 className="page-title">Nuestro Catálogo</h1>
        <p className="page-subtitle">Una selección de los mejores productos de nuestra tierra.</p>
      </header>

      <div className="categories-grid">
        {CATEGORIES.map((cat, i) => (
          <div key={i} className="category-section">
            <div className="category-image" style={{ backgroundImage: `url(${cat.image})` }}>
              <div className="category-overlay">
                <h2>{cat.title}</h2>
              </div>
            </div>
            <div className="category-details">
              <p className="category-description">{cat.description}</p>
              <ul className="product-list">
                {cat.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
              <button className="btn-outline">Consultar disponibilidad</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
