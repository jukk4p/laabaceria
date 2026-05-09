'use client';

import React, { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import './ContactForm.css';

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message'),
      created_at: new Date().toISOString()
    };

    try {
      const supabase = createClient();
      const { error: submitError } = await supabase.from('messages').insert([data]);
      if (submitError) throw submitError;
      
      setSent(true);
    } catch (err: any) {
      console.error('Error sending message:', err);
      setError('Hubo un error al enviar el mensaje. Por favor, inténtelo de nuevo o contacte por WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="contact-success">
        <div className="success-icon">✓</div>
        <h3>¡Mensaje enviado con éxito!</h3>
        <p>Gracias por contactar con La Abacería. Le responderemos lo antes posible.</p>
        <button onClick={() => setSent(false)} className="btn-gold-sm">Enviar otro mensaje</button>
      </div>
    );
  }

  return (
    <form className="contact-form-premium" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Nombre Completo</label>
        <input type="text" id="name" name="name" required placeholder="Ej: Antonio García" />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input type="email" id="email" name="email" required placeholder="tu@email.com" />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Teléfono (Opcional)</label>
          <input type="tel" id="phone" name="phone" placeholder="600 000 000" />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="message">Su Mensaje</label>
        <textarea id="message" name="message" required rows={5} placeholder="¿En qué podemos ayudarle?"></textarea>
      </div>

      {error && <p className="form-error">{error}</p>}

      <button type="submit" className="submit-btn-premium" disabled={loading}>
        {loading ? (
          'Enviando...'
        ) : (
          <>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '10px' }}>
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
            Enviar Mensaje
          </>
        )}
      </button>
    </form>
  );
};

export default ContactForm;
