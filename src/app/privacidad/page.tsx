import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '../Legal.css';

export default function Privacidad() {
  return (
    <main>
      <Navbar />
      <article className="legal-page">
        <h1>Política de Privacidad</h1>
        <p>
          De conformidad con lo dispuesto en el Reglamento (UE) 2016/679 de 27 de abril de 2016 (GDPR) 
          y la Ley Orgánica 3/2018 de 5 de diciembre (LOPDGDD), le informamos que sus datos de carácter 
          personal serán tratados por La Abacería.
        </p>
        <h2>Finalidad del Tratamiento</h2>
        <p>
          Mantener una relación comercial con el Usuario. Las operaciones previstas para realizar el 
          tratamiento son:
        </p>
        <ul style={{ color: 'var(--color-muted)', paddingLeft: '1.5rem', listStyleType: 'disc' }}>
          <li>Tramitación de pedidos, solicitudes o cualquier tipo de petición.</li>
          <li>Remisión de comunicaciones comerciales publicitarias por email, WhatsApp o redes sociales.</li>
          <li>Realización de estudios estadísticos.</li>
        </ul>
        <h2>Sus Derechos</h2>
        <p>
          Usted tiene derecho a retirar el consentimiento en cualquier momento, así como el derecho 
          de acceso, rectificación, portabilidad y supresión de sus datos.
        </p>
      </article>
      <Footer />
    </main>
  );
}
