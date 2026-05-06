import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '../Legal.css';

export default function Envios() {
  return (
    <main>
      <Navbar />
      <article className="legal-page">
        <h1>Envíos y Devoluciones</h1>
        <p>
          En La Abacería nos aseguramos de que su pedido llegue en condiciones óptimas. 
          Trabajamos con servicios de mensajería especializados en productos delicados.
        </p>
        <h2>Plazos de Entrega</h2>
        <p>
          <strong>Península:</strong> 24-48 horas laborables.<br />
          <strong>Baleares:</strong> 3-5 días laborables.<br />
          <strong>Coria del Río:</strong> Reparto propio en 24h.
        </p>
        <h2>Gastos de Envío</h2>
        <p>
          Los gastos de envío son gratuitos para pedidos superiores a 150€ en la Península. 
          Para pedidos inferiores, el coste estándar es de 6.95€.
        </p>
        <h2>Conservación</h2>
        <p>
          Nuestros productos se envían en embalajes térmicos cuando es necesario para 
          garantizar que la cadena de frío y la calidad no se vean alteradas durante el transporte.
        </p>
      </article>
      <Footer />
    </main>
  );
}
