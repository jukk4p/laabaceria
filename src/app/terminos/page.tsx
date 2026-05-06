import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '../Legal.css';

export default function Terminos() {
  return (
    <main>
      <Navbar />
      <article className="legal-page">
        <h1>Términos y Condiciones</h1>
        <p>
          Las presentes condiciones generales de venta se aplican a todas las ventas de productos 
          efectuadas a través del sitio web de La Abacería.
        </p>
        <h2>Precios</h2>
        <p>
          Todos los precios incluyen el IVA legalmente aplicable. Los precios pueden ser modificados 
          en cualquier momento, pero los cambios no afectarán a los pedidos ya confirmados.
        </p>
        <h2>Devoluciones</h2>
        <p>
          Dada la naturaleza perecedera de nuestros productos, el derecho de desistimiento solo 
          será aplicable si el producto llega en mal estado o no se corresponde con el pedido. 
          En tal caso, dispone de 24 horas para comunicarlo.
        </p>
      </article>
      <Footer />
    </main>
  );
}
