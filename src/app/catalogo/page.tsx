import CatalogoGrid from './CatalogoGrid';
import './catalogo.css';

export default function Catalogo() {
  return (
    <div className="catalogo-page">
      <header className="page-header">
        <h1 className="page-title">Nuestro Catálogo</h1>
        <p className="page-subtitle">Piezas seleccionadas con la maestría de más de 30 años de tradición.</p>
      </header>

      <CatalogoGrid />
    </div>
  );
}
