'use client';

import { useState } from 'react';
import './contacto.css';

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    asunto: 'Información',
    mensaje: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Nuevo mensaje de contacto:
Nombre: ${formData.nombre}
Teléfono: ${formData.telefono}
Email: ${formData.email}
Asunto: ${formData.asunto}
Mensaje: ${formData.mensaje}`;

    const waLink = `https://wa.me/34691419369?text=${encodeURIComponent(text)}`;
    window.open(waLink, '_blank');
  };

  return (
    <div className="contacto-page">
      <header className="page-header">
        <h1 className="page-title">Contacto</h1>
        <p className="page-subtitle">Estamos a su disposición para cualquier consulta o pedido especial.</p>
      </header>

      <div className="contacto-container">
        <div className="contacto-grid">
          {/* Formulario */}
          <div className="contacto-form-wrapper">
            <form onSubmit={handleSubmit} className="contacto-form">
              <div className="form-group">
                <label>Nombre completo</label>
                <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required placeholder="Su nombre..." />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Teléfono</label>
                  <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} required placeholder="600 000 000" />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="email@ejemplo.com" />
                </div>
              </div>
              <div className="form-group">
                <label>Asunto</label>
                <select name="asunto" value={formData.asunto} onChange={handleChange}>
                  <option value="Pedido">Pedido</option>
                  <option value="Información">Información General</option>
                  <option value="Cestas Gourmet">Cestas Gourmet</option>
                  <option value="Empresa/B2B">Empresa / B2B</option>
                </select>
              </div>
              <div className="form-group">
                <label>Mensaje</label>
                <textarea name="mensaje" value={formData.mensaje} onChange={handleChange} required rows={5} placeholder="¿En qué podemos ayudarle?"></textarea>
              </div>
              <button type="submit" className="submit-btn">Enviar por WhatsApp</button>
            </form>

            <div className="b2b-notice">
              <h3>¿Necesitas cestas para tu empresa?</h3>
              <p>Contacta con nosotros para un presupuesto personalizado y selección de piezas exclusivas.</p>
            </div>
          </div>

          {/* Información y Mapa */}
          <div className="contacto-info">
            <div className="info-card">
              <h3>La Abacería</h3>
              <p><strong>Dirección:</strong> C. Cervantes, 75, 41100 Coria del Río, Sevilla</p>
              <p><strong>Teléfono:</strong> <a href="tel:691419369">691 41 93 69</a></p>
              <p><strong>Email:</strong> info@laabaceriacoria.es</p>
              
              <div className="horario">
                <h4>Horario Comercial</h4>
                <p>Lunes a Sábado: 09:30 - 14:30 | 17:30 - 21:00</p>
                <p>Domingos: Cerrado</p>
              </div>
            </div>

            <div className="map-wrapper">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3175.760241031354!2d-6.0526709!3d37.2889212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd12053676e109d7%3A0xc314125518401!2sLA%20ABACERIA%20JAMONES%20Y%20EMBUTIDOS!5e0!3m2!1ses!2ses!4v1714987000000!5m2!1ses!2ses" 
                width="100%" 
                height="300" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
                title="Mapa de La Abacería"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
