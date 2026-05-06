import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '../Legal.css';

export default function AvisoLegal() {
  return (
    <main>
      <Navbar />
      <article className="legal-page">
        <h1>Aviso Legal</h1>
        <p>
          En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad 
          de la Información y Comercio Electrónico (LSSICE), se exponen a continuación los datos 
          identificativos de la empresa:
        </p>
        <div className="legal-card">
          <p><strong>Titular:</strong> La Abacería Coria S.L.</p>
          <p><strong>NIF:</strong> B-12345678</p>
          <p><strong>Dirección:</strong> C. Cervantes, 75, 41100 Coria del Río, Sevilla</p>
          <p><strong>Email:</strong> info@laabaceriacoria.es</p>
          <p><strong>Teléfono:</strong> 691 41 93 69</p>
        </div>
        <h2>Condiciones de Uso</h2>
        <p>
          El acceso y uso de este sitio web atribuye la condición de USUARIO, que acepta, desde dicho 
          acceso y/o uso, las presentes condiciones generales de uso.
        </p>
        <p>
          El sitio web de La Abacería proporciona el acceso a multitud de informaciones, servicios o 
          datos pertenecientes a La Abacería a los que el USUARIO puede tener acceso.
        </p>
      </article>
      <Footer />
    </main>
  );
}
